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

const config = require("../config");

/**
 * @param {import('discord.js').Client} client
 */
module.exports = (client) =>
  client.on("messageCreate", async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === "DM") return;
    if (!message.content.startsWith(client.prefix)) return;

    const args = message.content
      .slice(client.prefix.length)
      .trim()
      .split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);

    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) {
      if (command.cooldown) {
        if (cooldown.has(`${command.name}${message.author.id}`))
          return message.channel.send({
            content: config.messages["COOLDOWN_MESSAGE"].replace(
              "<duration>",
              ms(
                cooldown.get(`${command.name}${message.author.id}`) -
                  Date.now(),
                { long: true }
              )
            ),
          });

        command.run(client, message, args);
        cooldown.set(
          `${command.name}${message.author.id}`,
          Date.now() + command.cooldown
        );

        setTimeout(() => {
          cooldown.delete(`${command.name}${message.author.id}`);
        }, command.cooldown);
      } else command.run(client, message, args);
    }
  });
