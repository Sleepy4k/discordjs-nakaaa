const dataMap = new Map();
const config = require("../config");
const { readdirSync } = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const rest = new REST({ version: "10" }).setToken(config.options.token);

/**
 * @param {import('discord.js').Client} client
 */
const load = (client) => {
  const events = readdirSync(`event/`).filter((file) => file.endsWith(".js"));
  const commands = readdirSync(`command/`).filter((file) =>
    file.endsWith(".js")
  );

  console.log("Registering commands..");

  for (let file of commands) {
    let pull = require(`../command/${file}`);
    if (pull.name) client.commands.set(pull.name, pull);

    if (!dataMap.has(pull.name)) dataMap.set(pull.name, new Map());
    if (pull.aliases && Array.isArray(pull.aliases))
      pull.aliases.forEach((alias) =>
        client.aliases.set({ alias: alias, name: pull.name })
      );
  }

  console.log("Succesfully registered commands.");
  console.log("Registering events..");

  for (let file of events) {
    if (file == "handler.js") continue;
    if (file == "anticrash.js") continue;

    let pull = require(`./${file}`);
    pull(client);
  }

  console.log("Succesfully registered event.");
};

/**
 * @param {import('discord.js').Client} client
 */
const loadInteraction = (client) => {
  let commands = [];

  console.log("Registering interactions...");

  const interactions = readdirSync(`interaction/`).filter((file) =>
    file.endsWith(".js")
  );

  for (let file of interactions) {
    let pull = require(`../interaction/${file}`);
    if (pull.name) dataMap.set(pull.name, pull);
    commands.push({
      name: pull.name,
      description: pull.description,
      options: pull.options,
    });
  }

  client.guilds.cache.forEach(async (guild) => {
    try {
      await rest.put(
        Routes.applicationGuildCommands(client.user.id, guild.id),
        {
          body: commands,
        }
      );
    } catch (e) {
      if (e) console.error("cannot register interaction: " + e);
    }
  });

  console.log("Succesfully registered interaction.");
};

module.exports = {
  exec: async (client) => {
    load(client);
  },
  dataMap: dataMap,
  loadInteraction,
};
