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
  name: "coin",
  description: "Flip a coin.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "fun",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "guess",
      description: "Guess the coin side.",
      type: 4,
      choices: [
        {
          name: "Heads",
          value: 0,
        },
        {
          name: "Tails",
          value: 1,
        },
      ],
      required: true,
    },
  ],

  run: async (client, interaction) => {
    try {
      const result = Math.floor(Math.random() * 2);
      const guess = interaction.options.getInteger("guess");

      if (result === guess) {
        return client.sendEmbed(
          interaction,
          {
            color: "Green",
            title: ":coin: Coin flip",
            description: `
              **Result:** ${result === 0 ? "Heads" : "Tails"}
              **Guess:** ${guess === 0 ? "Heads" : "Tails"}
              **Status:** You win!
            `,
            footer: client.getFooter(interaction, "interaction"),
          },
          true
        );
      } else {
        return client.sendEmbed(
          interaction,
          {
            color: "DarkGreen",
            title: ":coin: Coin flip",
            description: `
              **Result:** ${result === 0 ? "Heads" : "Tails"}
              **Guess:** ${guess === 0 ? "Heads" : "Tails"}
              **Status:** You lose!
            `,
            footer: client.getFooter(interaction, "interaction"),
          },
          true
        );
      }
    } catch (error) {
      return client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: ":x: Error",
          description: `
            **Something went wrong:** ${error.message}
          `,
          footer: client.getFooter(interaction, "interaction"),
        },
        true
      );
    }
  },
};

// Path: commands\message\fun\coin.js
