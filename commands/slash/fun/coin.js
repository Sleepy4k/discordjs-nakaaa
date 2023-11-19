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
import main from "#functions/fun/coin.js";
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
  options: [{
    name: "guess",
    description: "Guess the coin side.",
    type: 3,
    choices: [
      {
        name: "Heads",
        value: "heads",
      },
      {
        name: "Tails",
        value: "tails",
      }
    ],
    required: true,
  }],

  run: async (client, interaction) => {
    return main("slash", { client, interaction });
  }
};

// Path: commands\message\fun\coin.js
