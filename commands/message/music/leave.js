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
  name: "leave",
  description: "Leave current voice channel.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "music",
  cooldown: 5,

  run: async (client, message, args, prefix) => {
    const queue = client.player.nodes.get(message.guild.id);

    if (!queue || !queue.isPlaying())
      return client.sendEmbed(message, {
        color: "Red",
        title: "Error",
        description: "```There is no music currently playing.```",
        footer: client.getFooter(message),
      });

    if (!queue.deleted) queue.delete();

    return client.sendEmbed(message, {
      color: "Blue",
      title: "Success",
      description: "```Left the voice channel.```",
      footer: client.getFooter(message),
    });
  },
};

// Path: commands\message\music\clear.js
