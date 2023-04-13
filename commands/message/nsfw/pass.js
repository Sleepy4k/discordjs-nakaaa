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
  name: "pass",
  description: "Show random porn ass image.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "nsfw",
  cooldown: 5,

  run: async (client, message, args, prefix) => {
    if (!message.channel.nsfw)
      return client
        .sendEmbed(message, {
          color: "Red",
          title: "Warning",
          description: "```This channel is not NSFW channel.```",
          footer: client.getFooter(message),
        })
        .catch((err) => {
          print(`SendEmbed Error: ${err.message}`);
        });

    let image;

    try {
      const response = await axios.get(
        "https://nekobot.xyz/api/image?type=ass"
      );
      image = response.data.message;
    } catch (error) {
      print(`Pass Error: ${error.message}`);
    }

    return client
      .sendEmbed(message, {
        color: "Random",
        title: "Here your ass image",
        image: image,
        footer: client.getFooter(message),
      })
      .catch((err) => {
        print(`SendEmbed Error: ${err.message}`);
      });
  },
};

// Path: commands\message\nsfw\pass.js
