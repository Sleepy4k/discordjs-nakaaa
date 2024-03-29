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
import print from "#utils/print.js";

export default {
  name: "messageCreate",

  run: async (client, message) => {
    if (message.author.bot || !message.guild || !message.id) return;

    const { list, enable } = client.config.bad_words;
    if (!enable) return;

    list.forEach(async (badword) => {
      if (message.content.match(badword)) {
        await message.delete().catch((e) => print(e.message, "error"));
        print(`${message.author.tag} (${message.author.id}) send bad word '${message}' in ${message.guild.name} (${message.guild.id})`, "info");

        return client.sendEmbed(message, {
          title: "Bad Words",
          description: `**${message.author.tag}**, You can't say that word here!`,
          footer: client.getFooter(message),
        }).then((msg) => setTimeout(() => msg.delete(), 2500)).catch((err) => print(err.message, "error"));
      }
    });
  }
};

// Path: events\antiBadWord.js
