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
  name: "resume",
  description: "Resume the current song.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "music",
  cooldown: 5,

  run: async (client, message, args, prefix) => {
    const queue = await client.player.nodes.get(message.guild.id);

    if (!queue)
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

    let success = false;

    try {
      success = await queue.node.resume();
    } catch (error) {
      print(`Resume Error: ${error.message}`);
    }

    if (!success)
      return client
        .sendEmbed(message, {
          color: "Red",
          title: "Error",
          description: "```Failed to resume the current song.```",
          footer: client.getFooter(message),
        })
        .catch((err) => {
          print(`SendEmbed Error: ${err.message}`);
        });

    return client
      .sendEmbed(message, {
        color: "Blue",
        title: "Success",
        description: "```Resumed the current song.```",
        footer: client.getFooter(message),
      })
      .catch((err) => {
        print(`SendEmbed Error: ${err.message}`);
      });
  },
};

// Path: commands\message\music\resume.js
