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
import { ApplicationCommandType, PermissionFlagsBits } from "discord.js";

/**
 * @type {import("../../../index.js").Scommand}
 */
export default {
  name: "ping",
  description: "Show your ping to the bot.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "misc",
  type: ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    return client.sendEmbed(
      interaction,
      {
        color: "Blue",
        title: "🏓 Pong",
        description: `\`\`\`Latency: ${client.ws.ping}ms \nAPI Latency: ${
          interaction.createdTimestamp - Date.now()
        }ms\`\`\``,
        footer: client.getFooter(interaction, "interaction"),
      },
      true
    );
  },
};

// Path: commands\slash\misc\ping.js
