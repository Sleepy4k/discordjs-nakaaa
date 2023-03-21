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
import config from "../config/index.js";

/**
 * @type {import("..").EventHandler}
 */
export default {
  name: "messageCreate",

  run: async (client, message) => {
    if (message.author.bot || !message.guild || !message.id) return;

    if (config.bad_words.enable) {
      config.bad_words.list.forEach(async (badword) => {
        if (message.content.match(badword)) {
          await message.delete().catch((e) => {});

          return client
            .sendEmbed(message, {
              title: "Bad Words",
              description: `**${message.author.tag}**, You can't say that word here!`,
              footer: client.getFooter(message),
            })
            .then((msg) => {
              setTimeout(() => {
                msg.delete();
              }, 5000);
            })
            .catch((error) => console.log(error));
        }
      });
    }
  },
};
