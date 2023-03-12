const config = require("./config");
const { Player } = require("discord-player");
const { Client, Collection, GatewayIntentBits } = require("discord.js");

const client = new Client({
  fetchAllMembers: true,
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
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
cooldowns = new Collection();

client.player = new Player(client, {
  ytdlOptions: {
    smoothVolume: true,
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
});

client.player.events.on("playerStart", (queue, track) => {
  queue.metadata.channel.send(`Started playing **${track.title}**!`);
});

client.player.events.on("playerError", (queue, error, track) => {
  return queue.metadata.channel.send(
    `There was an error with **${track.title}**!`
  );
});

require("./event/handler.js").exec(client);
require("./event/anticrash.js")(client);

client.login(config.options.token);
