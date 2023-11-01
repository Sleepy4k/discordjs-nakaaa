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
import { PermissionFlagsBits } from "discord.js";

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "cat",
  description: "Show random cat image.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "fun",
  cooldown: 5,

  run: async (client, message, args, prefix) => {
    try {
      const response = await axios.get("https://some-random-api.ml/img/cat");
      const { link } = response.data;

      return client.sendEmbed(message, {
        color: "Aqua",
        title: "Cute cat!",
        image: link,
        footer: client.getFooter(message),
      });
    } catch (error) {
      print(`Cat Error: ${error.message}`);

      return client.sendEmbed(message, {
        color: "Red",
        title: "Cat Error",
        description: `\`\`\`Error: ${error.message}\`\`\``,
        footer: client.getFooter(message),
      });
    }
  },
};

// Path: commands\message\fun\cat.js
