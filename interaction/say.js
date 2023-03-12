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

module.exports = {
  name: "say",
  description: "Say something.",
  cooldown: 1,
  options: [
    {
      name: "text",
      description: "Text to say.",
      type: 3,
      required: true,
    },
  ],

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  exec: async (client, interaction) => {
    try {
      interaction.reply({
        content: interaction.options.getString("text", true),
      });
    } catch (error) {
      return interaction.reply(`Something went wrong: ${error}`);
    }
  },
};
