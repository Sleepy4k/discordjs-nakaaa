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

  let mode = null;
  const methods = ["off", "single", "all"];
  const ephemeral = type === "slash" ? true : false;
  const loopMode = ephemeral ? interaction.options.getString("mode") : (args.slice(0).join(" ")).tolowerCase();

  try {
    const guildId = interaction.guild.id;
    const queue = await client.player.nodes.get(guildId);

    if (!queue || !queue.isPlaying()) return client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: "```There is no music currently playing.```",
      footer: client.getFooter(interaction, type),
    }, ephemeral);

    if (!loopMode || !methods.includes(loopMode)) return client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: "```Please specify a mode. (off, single, all)```",
      footer: client.getFooter(interaction, type),
    }, ephemeral);

    switch (loopMode) {
      case "off":
        mode = 0;
        break;
      case "single":
        mode = 1;
        break;
      case "all":
        mode = 2;
        break;
    }

    if (mode === queue.repeatMode) return client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: "```Loop mode is already set to this mode.```",
      footer: client.getFooter(interaction, type),
    }, ephemeral);

    await queue.setRepeatMode(mode);

    return client.sendEmbed(interaction, {
      color: "Blue",
      title: "Success",
      description: `\`\`\`Loop mode has been set to ${loopMode}.\`\`\``,
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