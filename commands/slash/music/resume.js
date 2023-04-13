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
import { ApplicationCommandType, PermissionFlagsBits } from "discord.js";

/**
 * @type {import("../../../index.js").Scommand}
 */
export default {
  name: "resume",
  description: "Resume the current song.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "music",
  type: ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    const queue = client.player.nodes.get(interaction.guild.id);

    if (!queue)
      return client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Error",
          description: "```There is no music currently playing.```",
          footer: client.getFooter(interaction, "interaction"),
        },
        true
      );

    const success = await queue.node.resume();

    if (!success)
      return client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Error",
          description: "```Failed to resume the current song.```",
          footer: client.getFooter(interaction, "interaction"),
        },
        true
      );

    return client.sendEmbed(
      interaction,
      {
        color: "Blue",
        title: "Success",
        description: "```Resumed the current song.```",
        footer: client.getFooter(interaction, "interaction"),
      },
      true
    );
  },
};

// Path: commands\slash\music\resume.js
