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
  name: "volume",
  description: "Change the volume of the music.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "music",
  cooldown: 5,

  run: async (client, message, args, prefix) => {
    const minVolume = 0;
    const maxVolume = 100;
    const volume = args[0];
    const queue = await client.player.nodes.get(message.guild.id);

    if (!queue || !queue.isPlaying())
      return client.sendEmbed(message, {
        color: "Red",
        title: "Error",
        description: "```There is no music currently playing.```",
        footer: client.getFooter(message),
      });

    const vol = parseInt(volume, 10);

    if (!vol)
      return client.sendEmbed(message, {
        color: "Red",
        title: "Error",
        description: `\`\`\`Current volume: ${queue.volume} / ${maxVolume} to change the volume, please enter a number between 1 and 100. example: ${prefix}volume 50\`\`\``,
        footer: client.getFooter(message),
      });

    if (vol > maxVolume)
      return client.sendEmbed(message, {
        color: "Red",
        title: "Error",
        description: `\`\`\`The maximum volume is ${maxVolume}.\`\`\``,
        footer: client.getFooter(message),
      });

    if (vol < minVolume)
      return client.sendEmbed(message, {
        color: "Red",
        title: "Error",
        description: `\`\`\`The minimum volume is ${minVolume}.\`\`\``,
        footer: client.getFooter(message),
      });

    if (vol === queue.volume)
      return client.sendEmbed(message, {
        color: "Red",
        title: "Error",
        description: `\`\`\`The volume is already ${vol}.\`\`\``,
        footer: client.getFooter(message),
      });

    let success = false;

    try {
      success = await queue.node.setVolume(vol);
    } catch (error) {
      print(`SetVolume Error: ${error.message}`);
    }

    if (!success)
      return client.sendEmbed(message, {
        color: "Red",
        title: "Error",
        description: "```Failed to set the volume.```",
        footer: client.getFooter(message),
      });

    return client.sendEmbed(message, {
      color: "Blue",
      title: "Success",
      description: `\`\`\`Volume has been set to ${vol}.\`\`\``,
      footer: client.getFooter(message),
    });
  },
};

// Path: commands\message\music\volume.js
