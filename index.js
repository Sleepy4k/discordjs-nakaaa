const config = require("./config");
const { Player } = require("discord-player");
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
client.errros = new Collection();

client.player = new Player(client, {
  leaveOnEnd: false,
  leaveOnStop: false,
  leaveOnEmpty: false,
  autoSelfDeaf: true,
  enableLive: true,
  quality: "high",
  timeout: 10000,
  volume: 100,
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
});

require("./event/handler.js").exec(client);
require("./event/anticrash.js")(client);

client.login(config.options.token);
