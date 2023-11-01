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
import parseDur from "../../../utils/parseDur.js";

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "uptime",
  description: "Show bot uptime.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "misc",
  cooldown: 5,

  run: async (client, message, args, prefix) => {
    const uptime = parseDur(client.uptime);

    return client.sendEmbed(message, {
      color: "Yellow",
      title: ":inbox_tray: Bot Uptime",
      description: `\`\`\`Uptime: ${uptime}\`\`\``,
      footer: client.getFooter(message),
    });
  },
};

// Path: commands\message\misc\uptime.js
