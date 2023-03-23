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
  name: "restart",
  description: "Restart the bot.",
  userPermissions: PermissionFlagsBits.BotOwner,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "core",
  type: ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    try {
      await client
        .sendEmbed(
          interaction,
          {
            color: "Green",
            title: "Restarting...",
            description: `\`\`\`Restarting the bot...\`\`\``,
            footer: client.getFooter(interaction, "interaction"),
          },
          true
        )
        .then(() => client.destroy())
        .then(() => client.login(client.config.options.token))
        .then(() =>
          client.sendEmbed(
            interaction,
            {
              color: "Green",
              title: "Restarted",
              description: `\`\`\`Restarted the bot.\`\`\``,
              footer: client.getFooter(interaction, "interaction"),
            },
            true
          )
        );
    } catch (error) {
      console.log(error);

      return client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "❌ An error occurred",
          description: `\`\`\`An error occurred, please try again!\`\`\``,
          footer: client.getFooter(interaction, "interaction"),
        },
        true
      );
    }
  },
};

// Path: commands\slash\core\restart.js
