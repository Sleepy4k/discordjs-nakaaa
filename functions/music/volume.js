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

  const minVolume = 0;
  const maxVolume = 100;
  const ephemeral = type === "slash" ? true : false;
  const volume = ephemeral ? interaction.options.getInteger("volume") : parseInt(args[0]);

  try {
    if (!interaction.member.voice.channel) return client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: "```You must be in a voice channel to use this command.```",
      footer: client.getFooter(interaction, type),
    }, ephemeral);

    const guildId = interaction.guild.id;
    const queue = await client.player.nodes.get(guildId);

    if (!queue || !queue.isPlaying()) return client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: "```There is no music currently playing.```",
      footer: client.getFooter(interaction, type),
    }, ephemeral);

    if (!volume) return client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: `\`\`\`Current volume: ${queue.volume} / ${maxVolume} to change the volume, please enter a number between 1 and 100. example: ${ephemeral ? "" : prefix}volume 50\`\`\``,
      footer: client.getFooter(interaction, type),
    }, ephemeral);

    if (volume > maxVolume) return client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: `\`\`\`The maximum volume is ${maxVolume}.\`\`\``,
      footer: client.getFooter(interaction, type),
    }, ephemeral);

    if (volume < minVolume) return client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: `\`\`\`The minimum volume is ${minVolume}.\`\`\``,
      footer: client.getFooter(interaction, type),
    }, ephemeral);

    if (volume === queue.volume) return client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: `\`\`\`The current volume is ${queue.volume}.\`\`\``,
      footer: client.getFooter(interaction, type),
    }, ephemeral);

    const success = await queue.node.setVolume(volume);

    if (!success) return client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: "```There was an error trying to change the volume.```",
      footer: client.getFooter(interaction, type),
    }, ephemeral);

    return client.sendEmbed(interaction, {
      color: "Blue",
      title: "Success",
      description: `\`\`\`The volume has been set to ${volume}.\`\`\``,
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