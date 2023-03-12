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

const DadJokes = require("dadjokes-wrapper");
const dj = new DadJokes();

module.exports = {
  name: "joke",
  description: "Give you a dad joke.",
  cooldown: 1,
  options: [],

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  exec: async (client, interaction) => {
    try {
      dj.randomJoke()
        .then((result) => {
          return interaction.reply(result);
        })
        .catch((err) => {
          console.log(err);
          return interaction.reply({
            content:
              "Looks like the dad is too tired to tell you some jokes, please try again later.",
            ephemeral: true,
          });
        });
    } catch (error) {
      return interaction.reply(`Something went wrong: ${error}`);
    }
  },
};
