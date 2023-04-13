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
  name: "skip",
  description: "Skip the current song.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "music",
  type: ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    const queue = client.player.nodes.get(interaction.guild.id);

    if (!queue || !queue.isPlaying())
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

    if (queue.repeatMode === 1) {
      queue.setRepeatMode(0);
      queue.node.skip();
      await wait(1000);
      queue.setRepeatMode(1);
    } else {
      queue.node.skip();
    }

    return client.sendEmbed(
      interaction,
      {
        color: "Blue",
        title: "Success",
        description: "```Skipped the current song.```",
        footer: client.getFooter(interaction, "interaction"),
      },
      true
    );
  },
};

// Path: commands\slash\music\skip.js
