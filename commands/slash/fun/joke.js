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
import DadJokes from "dadjokes-wrapper";
import { ApplicationCommandType, PermissionFlagsBits } from "discord.js";

/**
 * @type {import("../../../index.js").Scommand}
 */
export default {
  name: "joke",
  description: "Give you a dad joke.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "fun",
  type: ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    const dj = new DadJokes();
    let joke;

    try {
      joke = await dj.random();
    } catch (error) {
      return client.sendEmbed(
        interaction,
        {
          color: "DarkAqua",
          title: "Dad Joke",
          description: `
            \`Looks like the dad is too tired to tell you some jokes, please try again later.\`
          `,
          footer: client.getFooter(interaction, "interaction"),
        },
        true
      );
    }

    return client.sendEmbed(
      interaction,
      {
        color: "DarkAqua",
        title: "Dad Joke",
        description: `
          \`${joke}\`
        `,
        footer: client.getFooter(interaction, "interaction"),
      },
      true
    );
  },
};
