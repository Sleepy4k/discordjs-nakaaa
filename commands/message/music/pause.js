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
  name: "pause",
  description: "Pause the current song.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "music",
  cooldown: 5,

  run: async (client, message, args, prefix) => {
    const queue = await client.player.nodes.get(message.guild.id);

    if (!queue || !queue.isPlaying())
      return client
        .sendEmbed(message, {
          color: "Red",
          title: "Error",
          description: "```There is no music currently playing.```",
          footer: client.getFooter(message),
        })
        .catch((err) => {
          print(`SendEmbed Error: ${err.message}`);
        });

    const success = await queue.node.pause();

    if (!success)
      return client
        .sendEmbed(message, {
          color: "Red",
          title: "Error",
          description: "```Failed to pause the current song.```",
          footer: client.getFooter(message),
        })
        .catch((err) => {
          print(`SendEmbed Error: ${err.message}`);
        });

    return client
      .sendEmbed(message, {
        color: "Blue",
        title: "Success",
        description: "```Paused the current song.```",
        footer: client.getFooter(message),
      })
      .catch((err) => {
        print(`SendEmbed Error: ${err.message}`);
      });
  },
};

// Path: commands\message\music\pause.js
