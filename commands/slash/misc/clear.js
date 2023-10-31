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
  name: "clear",
  description: "Clear messages in the channel.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "misc",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "message",
      description: "The message that you want delete.",
      type: 4,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const message = interaction.options.getInteger("message");

    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages))
      return client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "❌ You don't have permission to use this command",
          description: `\`\`\`You need Manage Messages permission to use this command.\`\`\``,
          footer: client.getFooter(interaction, "interaction"),
        },
        true
      );

    const amount = parseInt(message) + 1;

    if (isNaN(amount))
      return client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "❌ Invalid number",
          description: `\`\`\`Please provide a valid number.\`\`\``,
          footer: client.getFooter(interaction, "interaction"),
        },
        true
      );

    if (amount <= 1 || amount > 100)
      return client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "❌ Invalid number",
          description: `\`\`\`Please provide a number between 1 and 99.\`\`\``,
          footer: client.getFooter(interaction, "interaction"),
        },
        true
      );

    interaction.channel.bulkDelete(amount, true).catch((err) => {
      console.error(err);

      return client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "❌ An error occurred",
          description: `\`\`\`An error occurred while trying to clear messages in this channel.\`\`\``,
          footer: client.getFooter(interaction, "interaction"),
        },
        true
      );
    });

    return client.sendEmbed(
      interaction,
      {
        color: "Blue",
        title: "🗑️ Cleared messages",
        description: `\`\`\`Successfully cleared ${amount - 1} messages.\`\`\``,
        footer: client.getFooter(interaction, "interaction"),
      },
      true
    );
  },
};

// Path: commands\slash\misc\clear.js
