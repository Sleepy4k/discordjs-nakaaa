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
  name: "stop",
  description: "Stop the music.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "music",
  cooldown: 5,

  run: async (client, message, args, prefix) => {
    const queue = client.player.nodes.get(message.guild.id);

    if (!queue)
      return client.sendEmbed(message, {
        color: "Red",
        title: "Error",
        description: "```There is no queue.```",
        footer: client.getFooter(message),
      });

    await queue.delete();

    return client.sendEmbed(message, {
      color: "Blue",
      title: "Success",
      description: "```Music has been stopped.```",
      footer: client.getFooter(message),
    });
  },
};

// Path: commands\message\music\stop.js
