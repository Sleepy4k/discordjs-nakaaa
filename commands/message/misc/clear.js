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
  name: "clear",
  description: "Clear messages in the channel.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "misc",
  cooldown: 5,

  run: async (client, message, args, prefix) => {
    if (!message.member.permissions.has(PermissionFlagsBits.ManageMessages))
      return client
        .sendEmbed(message, {
          color: "Red",
          title: "❌ You don't have permission to use this command",
          description: `\`\`\`You need Manage Messages permission to use this command.\`\`\``,
          footer: client.getFooter(message),
        })
        .then((msg) => {
          setTimeout(() => {
            msg.delete();
          }, 5000);
        });

    const amount = parseInt(args[0]) + 1;

    if (isNaN(amount))
      return client
        .sendEmbed(message, {
          color: "Red",
          title: "❌ Invalid number",
          description: `\`\`\`Please provide a valid number.\`\`\``,
          footer: client.getFooter(message),
        })
        .then((msg) => {
          setTimeout(() => {
            msg.delete();
          }, 5000);
        });

    if (amount <= 1 || amount > 100)
      return client
        .sendEmbed(message, {
          color: "Red",
          title: "❌ Invalid number",
          description: `\`\`\`Please provide a number between 1 and 99.\`\`\``,
          footer: client.getFooter(message),
        })
        .then((msg) => {
          setTimeout(() => {
            msg.delete();
          }, 5000);
        });

    message.channel.bulkDelete(amount, true).catch((err) => {
      console.error(err);

      return client.sendEmbed(message, {
        color: "Red",
        title: "❌ Error",
        description: `\`\`\`There was an error trying to clear messages in this channel!\`\`\``,
        footer: client.getFooter(message),
      });
    });

    return client
      .sendEmbed(message, {
        color: "Blue",
        title: "🗑️ Cleared messages",
        description: `\`\`\`Successfully cleared ${amount - 1} messages.\`\`\``,
        footer: client.getFooter(message),
      })
      .then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 5000);
      });
  },
};

// Path: commands\message\misc\clear.js
