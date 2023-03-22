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
  name: "playlist",
  description: "See the playlist.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "music",
  type: ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    const queue = client.player.nodes.get(interaction.guild.id);

    if (!queue || !queue.currentTrack)
      return client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Error",
          description: "```There is no music currently playing.```",
          footer: client.getFooter(interaction),
        },
        true
      );

    const tracks = queue.tracks.map(
      (track, index) => `${++index}. ${track.title}`
    );

    let nowPlaying = `Now Playing: ${queue.currentTrack.title}\n\n`;
    let tracksQueue = "";

    if (tracks.length < 1) {
      tracksQueue = "------------------------------";
    } else if (tracks.length > 9) {
      tracksQueue = tracks.slice(0, 10).join("\n");
      tracksQueue += `\nand ${tracks.length - 10} other songs`;
    } else {
      tracksQueue = tracks.join("\n");
    }

    let loopStatus = queue.repeatMode
      ? queue.repeatMode === 2
        ? "All"
        : "One"
      : "Off";

    return client.sendEmbed(
      interaction,
      {
        color: "Blue",
        title: "Playlist",
        fields: { name: nowPlaying, value: tracksQueue },
        description: `\nLoop: ${loopStatus}`,
        footer: client.getFooter(interaction),
      },
      true
    );
  },
};

// Path: commands\slash\music\playlist.js
