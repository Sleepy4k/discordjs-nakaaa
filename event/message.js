const config = require("../config");
const { dataMap } = require("./handler.js");

/**
 * @param {import('discord.js').Client} client
 */
module.exports = (client) =>
  client.on("messageCreate", async (message) => {
    if (!message.content.startsWith(config.options.prefix)) return;

    const commandArgs = message.content
      .slice(config.options.prefix.length)
      .trim()
      .split(/ +/g);
    const commandName = commandArgs.shift().toLowerCase();

    let command =
      (await client.commands.get(commandName)) ||
      (await client.commands.find(
        (x) => x.aliases && x.aliases.includes(commandName)
      ));
    if (command == undefined)
      return message.reply(
        config.lang.error.unknown_command(message.author, commandName)
      );

    const current_time = Date.now();
    const time_stamps = dataMap.get(command.name);
    const cooldown_amount = command.cooldown * 1000;

    if (time_stamps.has(message.author.id)) {
      const expiration_time =
        time_stamps.get(message.author.id) + cooldown_amount;
      if (current_time < expiration_time) {
        const time_left = (expiration_time - current_time) / 1000;
        return await message.reply(
          config.lang.error.cooldown(message.author, time_left, commandName)
        );
      }
    }

    time_stamps.set(message.author.id, current_time);
    setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

    if (!command)
      command = client.commands.get(client.aliases.get(commandName));
    if (command) command.exec(client, message, commandArgs);
  });
