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
  name: "pgif",
  description: "Show random porn gif.",
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
      });

    try {
      const response = await axios.get("https://nekobot.xyz/api/image?type=pgif");
      const gif = response.data.message;

      return client.sendEmbed(
        interaction,
        {
          color: "Random",
          title: "Here your gif",
          image: gif,
          footer: client.getFooter(interaction, "interaction"),
        },
        true
      );
    } catch (error) {
      return client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Error",
          description: `\`\`\`${error.message}\`\`\``,
          footer: client.getFooter(interaction, "interaction"),
        },
        true
      );
    }
  },
};

// Path: commands\slash\nsfw\pgif.js
