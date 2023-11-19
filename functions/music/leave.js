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

    if (ephemeral) await interaction.deferReply({ ephemeral }).catch((error) => print(error.message, "error"));
    if (!queue.deleted) await queue.delete();

    return client.sendEmbed(interaction, {
      color: "Blue",
      title: "Success",
      description: "```Left the voice channel.```",
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