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
import axios from "axios";
import print from "../../../utils/print.js";
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
    try {
      const response = await axios.get("https://api.dadjokes.io/api/random/joke");
      const joke = response.data.body[0];

      return client.sendEmbed(
        interaction,
        {
          color: "DarkAqua",
          title: "Dad Joke",
          description: `\`\`\`${joke.setup}\n\n${joke.punchline}\`\`\``,
          footer: client.getFooter(interaction, "interaction"),
        },
        true
      );
    } catch (error) {
      print(`DadJokes Error: ${error.message}`);

      return client.sendEmbed(
        interaction,
        {
          color: "DarkAqua",
          title: "Dad Joke",
          description: `\`\`\`Looks like the dad is too tired to tell you some jokes, please try again later.\`\`\``,
          footer: client.getFooter(interaction, "interaction"),
        },
        true
      );
    }
  },
};

// Path: commands\slash\fun\joke.js
