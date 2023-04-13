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
  name: "ping",
  description: "Show your ping to the bot.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "misc",
  cooldown: 5,

  run: async (client, message, args, prefix) => {
    return client
      .sendEmbed(message, {
        color: "Blue",
        title: "🏓 Pong",
        description: `\`\`\`Latency: ${client.ws.ping}ms \nAPI Latency: ${
          message.createdTimestamp - Date.now()
        }ms\`\`\``,
        footer: client.getFooter(message),
      })
      .catch((err) => {
        print(`SendEmbed Error: ${err.message}`);
      });
  },
};

// Path: commands\message\misc\ping.js
