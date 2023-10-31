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
  name: "volume",
  description: "Change the volume of the music.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "music",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "volume",
      description: "The volume you want to set.",
      type: 4,
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const minVolume = 0;
    const maxVolume = 100;
    const volume = interaction.options.getInteger("volume");
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

    const vol = parseInt(volume, 10);

    if (!vol)
      return client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Error",
          description: `\`\`\`Current volume: ${queue.volume} / ${maxVolume} to change the volume, please enter a number between 1 and 100. example: ${prefix}volume 50\`\`\``,
          footer: client.getFooter(interaction, "interaction"),
        },
        true
      );

    if (vol > maxVolume)
      return client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Error",
          description: `\`\`\`The maximum volume is ${maxVolume}.\`\`\``,
          footer: client.getFooter(interaction, "interaction"),
        },
        true
      );

    if (vol < minVolume)
      return client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Error",
          description: `\`\`\`The minimum volume is ${minVolume}.\`\`\``,
          footer: client.getFooter(interaction, "interaction"),
        },
        true
      );

    if (vol === queue.volume)
      return client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Error",
          description: `\`\`\`The volume is already set to ${vol}.\`\`\``,
          footer: client.getFooter(interaction, "interaction"),
        },
        true
      );

    let success = false;

    try {
      success = await queue.node.setVolume(vol);
    } catch (error) {
      print(`SetVolume Error: ${error.message}`);
    }

    if (!success)
      return client.sendEmbed(
        interaction,
        {
          color: "Red",
          title: "Error",
          description: `\`\`\`Failed to set the volume.\`\`\``,
          footer: client.getFooter(interaction, "interaction"),
        },
        true
      );

    return client.sendEmbed(
      interaction,
      {
        color: "Blue",
        title: "Success",
        description: `\`\`\`Volume has been set to ${vol}.\`\`\``,
        footer: client.getFooter(interaction, "interaction"),
      },
      true
    );
  },
};

// Path: commands\slash\music\volume.js
