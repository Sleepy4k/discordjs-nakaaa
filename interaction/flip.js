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
  name: "flip",
  description: "Flip a coin.",
  cooldown: 1,
  options: [],

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  exec: async (client, interaction) => {
    try {
      const result = Math.floor(Math.random() * 2);

      if (result === 0) {
        return interaction.reply("Heads!");
      } else if (result === 1) {
        return interaction.reply("Tails!");
      }
    } catch (error) {
      return interaction.reply(`Something went wrong: ${error}`);
    }
  },
};
