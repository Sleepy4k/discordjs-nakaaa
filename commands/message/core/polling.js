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
  name: "polling",
  description: "Make a polling.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "core",
  cooldown: 5,

  run: async (client, message, args, prefix) => {
    let polling = args.slice(0).join(" ");
    if (!polling) {
      return client.sendEmbed(message, {
        color: "Red",
        title: "Polling something!",
        description: `
          **Usage:** \`${prefix}polling <text>\`
        `,
        footer: client.getFooter(message),
      });
    }

    return client
      .sendEmbed(message, {
        color: "Gold",
        title: "Polling",
        description: `\`\`\`${polling}\`\`\``,
        footer: client.getFooter(message),
      })
      .then((msg) => {
        msg.react("👍");
        msg.react("👎");
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
