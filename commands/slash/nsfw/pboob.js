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
  name: "pboob",
  description: "Show random porn boob image.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "nsfw",
  type: ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    if (!interaction.channel.nsfw)
      return client.sendEmbed(interaction, {
        color: "Red",
        title: "Warning",
        description: "```This channel is not NSFW channel.```",
        footer: client.getFooter(interaction, "interaction"),
      }, true);

    try {
      const response = await axios.get("https://nekobot.xyz/api/image?type=boobs");
      const image = response.data.message;

      return client.sendEmbed(interaction, {
        color: "Random",
        title: "Here your boob image",
        image: image,
        footer: client.getFooter(interaction, "interaction"),
      }, true);
    } catch (error) {
      return client.sendEmbed(interaction, {
        color: "Red",
        title: "Error",
        description: `\`\`\`${error.message}\`\`\``,
        footer: client.getFooter(interaction, "interaction"),
      }, true);
    }
  },
};

// Path: commands\slash\nsfw\pboob.js
