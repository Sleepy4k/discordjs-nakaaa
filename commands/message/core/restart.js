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
import { PermissionFlagsBits } from "discord.js";

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "restart",
  description: "Restart the bot.",
  userPermissions: PermissionFlagsBits.BotOwner,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "core",
  cooldown: 5,

  run: async (client, message, args, prefix) => {
    try {
      await client
        .sendEmbed(message, {
          color: "Green",
          title: "Restarting...",
          description: `\`\`\`Restarting the bot...\`\`\``,
          footer: client.getFooter(message),
        })
        .then((msg) => {
          setTimeout(() => {
            msg.delete();
          }, 1500);
        })
        .then(() => client.destroy())
        .then(() => client.login(client.config.options.token))
        .then(() =>
          client.sendEmbed(message, {
            color: "Green",
            title: "Restarted",
            description: `\`\`\`Restarted the bot.\`\`\``,
            footer: client.getFooter(message),
          })
        );
    } catch (error) {
      console.log(error);

      return client
        .sendEmbed(message, {
          color: "Red",
          title: "❌ An error occurred",
          description: `\`\`\`An error occurred, please try again!\`\`\``,
          footer: client.getFooter(message),
        })
        .then((msg) => {
          setTimeout(() => {
            msg.delete();
          }, 5000);
        });
    }
  },
};

// Path: commands\message\core\restart.js
