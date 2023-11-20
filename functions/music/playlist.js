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
import print from "#utils/print.js";

export default async function main(type, data) {
  const { client, interaction, args, prefix } = data;

  const ephemeral = type === "slash" ? true : false;

  try {
    const guildId = interaction.guild.id;
    const queue = await client.player.nodes.get(guildId);

    if (!queue || !queue.isPlaying()) return client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: "```There is no music currently playing.```",
      footer: client.getFooter(interaction, type),
    }, ephemeral);

    const tracks = queue.tracks.map((track, index) => `${++index}. ${track.title}`);
    const nowPlaying = `Now Playing: ${queue.currentTrack.title}\n\n`;

    let tracksQueue = "";

    if (tracks.length < 1) {
      tracksQueue = "------------------------------";
    } else if (tracks.length > 9) {
      tracksQueue = tracks.slice(0, 10).join("\n");
      tracksQueue += `\nand ${tracks.length - 10} other songs`;
    } else {
      tracksQueue = tracks.join("\n");
    }

    let loopStatus = queue.repeatMode ? (queue.repeatMode === 2 ? "All" : "One") : "Off";

    return client.sendEmbed(interaction, {
      color: "Blue",
      title: "Playlist",
      fields: { name: nowPlaying, value: tracksQueue },
      description: `\nLoop: ${loopStatus}`,
      footer: client.getFooter(interaction, type),
    }, ephemeral);
  } catch (error) {
    print(error.message, "error");

    return client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: "```There was an error trying to get the queue.```",
      footer: client.getFooter(interaction, type),
    }, ephemeral);
  }
}