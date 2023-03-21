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
  name: "coin",
  description: "Flip a coin.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "fun",
  cooldown: 5,

  run: async (client, message, args, prefix) => {
    let result = Math.floor(Math.random() * 2) + 1;
    let coin = result === 1 ? "Heads" : "Tails";

    let answer = args.slice(0).join(" ");
    if (!answer) {
      return client.sendEmbed(message, {
        color: "Red",
        title: "Coin flip",
        description: `
          **Usage:** \`${prefix}coin <Heads/Tails>\`
        `,
        footer: client.getFooter(message),
      });
    }

    return client.sendEmbed(message, {
      color: "Green",
      title: "Coin flip",
      description: `
        **Result:** ${coin}
        **Guess:** ${answer}
        **Status:** ${coin === answer ? "You win!" : "You lose!"}
      `,
      footer: client.getFooter(message),
    });
  },
};
