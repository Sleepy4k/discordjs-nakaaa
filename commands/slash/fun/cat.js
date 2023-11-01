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
import { ApplicationCommandType, PermissionFlagsBits } from "discord.js";

/**
 * @type {import("../../../index.js").Scommand}
 */
export default {
  name: "cat",
  description: "Show random cat image.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "fun",
  type: ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    try {
      const response = await axios.get("https://some-random-api.ml/img/cat");
      const { link } = response.data;

      return client.sendEmbed(interaction, {
        color: "Aqua",
        title: "Cute cat!",
        image: link,
        footer: client.getFooter(interaction, "interaction"),
      }, true);
    } catch (error) {
      return client.sendEmbed(interaction, {
        color: "Red",
        title: "Error",
        description: "```An error occurred while running this command.```",
        footer: client.getFooter(interaction, "interaction"),
      }, true);
    }
  },
};

// Path: commands\slash\fun\cat.js
