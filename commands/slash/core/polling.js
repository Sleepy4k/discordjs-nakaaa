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
  name: "polling",
  description: "Make a polling.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "core",
  type: ApplicationCommandType.ChatInput,
  options: [{
    name: "polling",
    description: "Polling text",
    type: 3,
    required: true,
  }],

  run: async (client, interaction) => {
    const polling = await interaction.options.getString("polling");

    if (!polling)
      return client.sendEmbed(interaction, {
        color: "Red",
        title: "Error",
        description: "```Please provide a polling text.```",
        footer: client.getFooter(interaction, "interaction"),
      }, true);

    const poll = await client.sendEmbed(interaction, {
      color: "Gold",
      title: "Polling",
      description: `\`\`\`${polling}\`\`\``,
      footer: client.getFooter(interaction, "interaction"),
    }, false, true);

    await poll.react("👍");
    await poll.react("👎");

    return poll;
  },
};

// Path: commands\slash\core\polling.js
