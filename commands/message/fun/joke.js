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
import print from "../../../utils/print.js";
import { PermissionFlagsBits } from "discord.js";

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "joke",
  description: "Give you a dad joke.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "fun",
  cooldown: 5,

  run: async (client, message, args, prefix) => {
    const dj = new DadJokes();
    let joke;

    try {
      joke = await dj.randomJoke();
    } catch (error) {
      print(`Dad Joke Error: ${error.message}`);

      return client
        .sendEmbed(
          message,
          {
            color: "DarkAqua",
            title: "Dad Joke",
            description: `\`\`\`Looks like the dad is too tired to tell you some jokes, please try again later.\`\`\``,
            footer: client.getFooter(message),
          },
          true
        )
        .catch((err) => {
          print(`SendEmbed Error: ${err.message}`);
        });
    }

    return client
      .sendEmbed(message, {
        color: "DarkAqua",
        title: "Dad Joke",
        description: `\`\`\`${joke}\`\`\``,
        footer: client.getFooter(message),
      })
      .catch((err) => {
        print(`SendEmbed Error: ${err.message}`);
      });
  },
};

// Path: commands\message\fun\joke.js
