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
  name: "say",
  description: "Make the bot say something.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "core",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "text",
      description: "Text to say",
      type: 3,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const say = interaction.options.getString("text");

    return client.sendEmbed(interaction, {
      color: "Navy",
      title: "Say",
      description: `\`\`\`${say}\`\`\``,
      footer: client.getFooter(interaction, "interaction"),
    });
  },
};
