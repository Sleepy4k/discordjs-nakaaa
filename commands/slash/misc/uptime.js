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
import parseDur from "../../../utils/parseDur.js";
import { ApplicationCommandType, PermissionFlagsBits } from "discord.js";

/**
 * @type {import("../../../index.js").Scommand}
 */
export default {
  name: "uptime",
  description: "Show bot uptime.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "misc",
  type: ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    const uptime = parseDur(client.uptime);

    return client.sendEmbed(
      interaction,
      {
        color: "Yellow",
        title: ":inbox_tray: Bot Uptime",
        description: `
          **Uptime:** ${uptime}
        `,
        footer: client.getFooter(interaction, "interaction"),
      },
      true
    );
  },
};

// Path: commands\slash\misc\uptime.js
