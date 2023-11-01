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
import print from "../../../utils/print.js";
import { PermissionFlagsBits } from "discord.js";

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "play",
  description: "Play a song.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "music",
  cooldown: 5,

  run: async (client, message, args, prefix) => {
    const song = args.slice(0).join(" ");

    if (!song)
      return client.sendEmbed(message, {
        color: "Red",
        title: "Error",
        description: "```Please provide a song name.```",
        footer: client.getFooter(message),
      });

    const results = await client.player.search(song).catch((error) => {
      print(`Search Error: ${error.message}`);

      return client.sendEmbed(message, {
        color: "Red",
        title: "Error",
        description: "```The service is experiencing some problems, please try again.```",
        footer: client.getFooter(message),
      });
    });

    if (!results || !results.hasTracks())
      return client.sendEmbed(message, {
        color: "Red",
        title: "Error",
        description: "```No results found.```",
        footer: client.getFooter(message),
      });

    if (!message.member.voice.channel)
      return client.sendEmbed(message, {
        color: "Red",
        title: "Error",
        description: "```You're not in a voice channel.```",
        footer: client.getFooter(message),
      });

    let queue;

    try {
      queue = await client.player.nodes.create(message.guild, {
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
    } catch (error) {
      print(`Create Error: ${error.message}`);
    }

    try {
      if (!queue.connection)
        await queue?.connect(message.member.voice.channel).catch((error) => {
          print(`Connect Error: ${error.message}`);
        });
    } catch (error) {
      print(`Connect Error: ${error.message}`);

      if (!queue?.deleted)
        await queue?.delete().catch((error) => {
          print(`Delete Error: ${error.message}`);
        });

      return client.sendEmbed(message, {
        color: "Red",
        title: "Error",
        description: "```I can't join audio channel.```",
        footer: client.getFooter(message),
      });
    }

    try {
      results.playlist ? queue.addTrack(results.tracks) : queue.addTrack(results.tracks[0]);

      if (!queue.isPlaying()) await queue.node.play();
    } catch (error) {
      print(`Add Error: ${error.message}`);

      return client.sendEmbed(message, {
        color: "Red",
        title: "Error",
        description: "```There was an error trying to play this song.```",
        footer: client.getFooter(message),
      });
    }

    return client.sendEmbed(message, {
      color: "Blue",
      title: "Success",
      description: `\`\`\`Added ${results.playlist ? "playlist" : "song"} to the queue.\`\`\``,
      footer: client.getFooter(message),
    });
  },
};

// Path: commands\message\music\play.js
