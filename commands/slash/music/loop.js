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
  name: "loop",
  description: "Loop the queue.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "music",
  type: ApplicationCommandType.ChatInput,
  options: [{
    name: "mode",
    description: "Loop mode.",
    type: 3,
    required: true,
    choices: [
      {
        name: "Off",
        value: "off",
      },
      {
        name: "Single",
        value: "single",
      },
      {
        name: "All",
        value: "all",
      },
    ],
  }],

  run: async (client, interaction) => {
    let mode = null;
    const arg = interaction.options.getString("mode");
    const methods = ["off", "single", "all"];
    const queue = client.player.nodes.get(interaction.guild.id);

    if (!queue || !queue.isPlaying())
      return client.sendEmbed(interaction, {
        color: "Red",
        title: "Error",
        description: "```There is no music currently playing.```",
        footer: client.getFooter(interaction, "interaction"),
      }, true);

    if (!arg)
      return client.sendEmbed(interaction, {
        color: "Red",
        title: "Error",
        description: "```Please specify a mode. (off, single, all)```",
        footer: client.getFooter(interaction, "interaction"),
      }, true);

    switch (arg.toLowerCase()) {
      case "off":
        mode = 0;
        break;
      case "single":
        mode = 1;
        break;
      case "all":
        mode = 2;
        break;
      default:
        return client.sendEmbed(interaction, {
          color: "Red",
          title: "Error",
          description: "```Please specify a mode. (off, single, all)```",
          footer: client.getFooter(interaction, "interaction"),
        }, true);
    }

    await queue.setRepeatMode(mode);

    return client.sendEmbed(interaction, {
      color: "Green",
      title: "Success",
      description: `\`\`\`Loop mode has been set to ${methods[mode]}.\`\`\``,
      footer: client.getFooter(interaction, "interaction"),
    }, true);
  },
};

// Path: commands\slash\music\loop.js
