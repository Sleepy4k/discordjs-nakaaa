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
      name: "song",
      description: "The song you want to play.",
      type: 3,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const song = interaction.options.getString("song");

    if (!song)
      return client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Error",
          description: "```Please provide a song name.```",
          footer: client.getFooter(interaction),
        },
        true
      );

    const results = await client.player.search(song).catch((error) => {
      console.log(error);
      return client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Error",
          description:
            "```The service is experiencing some problems, please try again.```",
          footer: client.getFooter(interaction),
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
          footer: client.getFooter(interaction),
        },
        true
      );
    }

    const queue = await client.player.nodes.create(interaction.guild, {
      volume: 75,
      selfDeaf: true,
      selfMute: false,
      leaveOnEnd: false,
      leaveOnEmpty: true,
      leaveOnEndCooldown: 60000,
      leaveOnEmptyCooldown: 60000,
      metadata: {
        channel: message.channel,
        client: message.guild.members.me,
        requestedBy: message.user,
      },
    });

    try {
      if (!queue.connection)
        await queue.connect(interaction.member.voice.channel);
    } catch (error) {
      console.log(error);

      if (!queue?.deleted) await queue.delete();

      return client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Error",
          description: "```Failed to connect to the voice channel.```",
          footer: client.getFooter(interaction),
        },
        true
      );
    }

    results.playlist
      ? queue.addTracks(results.tracks)
      : queue.addTrack(results.tracks[0]);

    if (!queue.isPlaying()) await queue.node.play();

    return client.sendEmbed(
      interaction,
      {
        color: "Green",
        title: "Success",
        description: `\`\`\`Added ${
          results.playlist ? "playlist" : "song"
        } to the queue.\`\`\``,
        footer: client.getFooter(interaction),
      },
      true
    );
  },
};

// Path: commands\slash\music\play.js
