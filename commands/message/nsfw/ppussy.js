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
import { PermissionFlagsBits } from "discord.js";

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "ppussy",
  description: "Show random pussy image.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "nsfw",
  cooldown: 5,

  run: async (client, message, args, prefix) => {
    if (!message.channel.nsfw)
      return client.sendEmbed(message, {
        color: "Red",
        title: "Warning",
        description: "```This channel is not NSFW channel.```",
        footer: client.getFooter(message),
      });

    const response = await axios.get(
      "https://nekobot.xyz/api/image?type=pussy"
    );
    const image = response.data.message;

    return client.sendEmbed(message, {
      color: "Random",
      title: "Here your pussy image",
      image: image,
      footer: client.getFooter(message),
    });
  },
};

// Path: commands\message\nsfw\ppussy.js
