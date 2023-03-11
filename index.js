const config = require("./config");
const { Collection, Client, Intents } = require("discord.js");

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
  ws: {
    properties: {
      $browser: config.options.browser,
    },
  },
});

client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();

require("./event/handler.js").exec(client);

client.login(config.options.token);
