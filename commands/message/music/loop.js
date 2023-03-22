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
import { PermissionFlagsBits } from "discord.js";

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "loop",
  description: "Loop the queue.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "music",
  cooldown: 5,

  run: async (client, message, args, prefix) => {
    let mode = null;
    const arg = args.slice(0).join(" ");
    const methods = ["off", "single", "all"];
    const queue = client.player.nodes.get(message.guild.id);

    if (!queue || !queue.isPlaying())
      return client.sendEmbed(message, {
        color: "Red",
        title: "Error",
        description: "```There is no music currently playing.```",
        footer: client.getFooter(message),
      });

    if (!arg)
      return client.sendEmbed(message, {
        color: "Red",
        title: "Error",
        description: "```Please specify a mode. (off, single, all)```",
        footer: client.getFooter(message),
      });

    switch (arg.toLowerCase()) {
      case "off":
        mode = 0;
        break;
      case "single":
        mode = 1;
        break;
      case "all":
        mode = 2;
      default:
        return client.sendEmbed(message, {
          color: "Red",
          title: "Error",
          description: "```Please specify a mode. (off, single, all)```",
          footer: client.getFooter(message),
        });
        break;
    }

    await queue.setRepeatMode(mode);

    return client.sendEmbed(message, {
      color: "Blue",
      title: "Success",
      description: `\`\`\`Loop mode has been set to ${methods[mode]}.\`\`\``,
      footer: client.getFooter(message),
    });
  },
};

// Path: commands\message\music\loop.js