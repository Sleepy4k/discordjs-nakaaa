/**
 * Coding service by Sleepy4k <sarahpalastring@gmail.com>
 *
 * Reselling this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Written by:
 * Apri Pandu Wicaksono
 *
 * Link: https://github.com/sleepy4k
 *
 * March 12, 2023
 */
import { ApplicationCommandType, PermissionFlagsBits } from "discord.js";

/**
 * @type {import("../../../index.js").Scommand}
 */
export default {
  name: "play",
  description: "Play a song.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "music",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "search",
      description: "The song you want to play.",
      type: 3,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const song = await interaction.options.getString("search");

    if (!song)
      return client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Error",
          description: "```Please provide a song name.```",
          footer: client.getFooter(interaction, "interaction"),
        },
        true
      );

    const results = await client.player.search(song).catch((error) => {
      print(`Search Error: ${error.message}`);

      return client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Error",
          description:
            "```The service is experiencing some problems, please try again.```",
          footer: client.getFooter(interaction, "interaction"),
        },
        true
      );
    });

    if (!results || !results.hasTracks()) {
      return client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Error",
          description: "```No results found.```",
          footer: client.getFooter(interaction, "interaction"),
        },
        true
      );
    }

    let queue;

    try {
      queue = await client.player.nodes.create(interaction.guild, {
        volume: 75,
        selfDeaf: true,
        selfMute: false,
        leaveOnEnd: false,
        leaveOnEmpty: true,
        leaveOnEndCooldown: 60000,
        leaveOnEmptyCooldown: 60000,
        metadata: {
          channel: interaction.channel,
          client: interaction.guild.members.me,
          requestedBy: interaction.user,
        },
      });
    } catch (error) {
      print(`Create Error: ${error.interaction}`);
    }

    try {
      if (!queue.connection)
        await queue?.connect(interaction.member.voice.channel).catch((error) => {
          print(`Connect Error: ${error.message}`);
        });
    } catch (error) {
      print(`Connect Error: ${error.message}`);

      if (!queue?.deleted) {
        await queue?.delete().catch((error) => {
          print(`Delete Error: ${error.message}`);
        });
      }

      return client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Error",
          description: "```Failed to connect to the voice channel.```",
          footer: client.getFooter(interaction, "interaction"),
        },
        true
      );
    }

    try {
      results.playlist
      ? queue.addTracks(results.tracks)
      : queue.addTrack(results.tracks[0]);

      if (!queue.isPlaying()) await queue.node.play();
    } catch (error) {
      print(`Add Error: ${error.message}`);
    }

    return client.sendEmbed(
      interaction,
      {
        color: "Green",
        title: "Success",
        description: `\`\`\`Added ${
          results.playlist ? "playlist" : "song"
        } to the queue.\`\`\``,
        footer: client.getFooter(interaction, "interaction"),
      },
      true
    );
  },
};

// Path: commands\slash\music\play.js
