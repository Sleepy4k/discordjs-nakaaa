const config = require("./config");
const { Player } = require("discord-player");
const { registerPlayerEvents } = require("./utils/botEvent.js");
const {
  Client,
  Partials,
  Collection,
  GatewayIntentBits,
} = require("discord.js");

const client = new Client({
  restTimeOffset: 0,
  autoReconnect: true,
  fetchAllMembers: true,
  disabledEvents: ["TYPING_START"],
  allowedMentions: {
    parse: ["users", "roles"],
    repliedUser: true,
  },
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
  ],
  partials: [
    Partials.User,
    Partials.Channel,
    Partials.Message,
    Partials.Reaction,
    Partials.GuildMember,
    Partials.GuildScheduledEvent,
  ],
});

client.prefix = config.options.prefix;
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.errros = new Collection();
cooldowns = new Collection();

client.player = new Player(client, {
  ytdlOptions: {
    quality: "highestaudio",
    highWaterMark: 1 << 25,
  },
});

require("./event/handler.js").exec(client);
require("./event/anticrash.js")(client);

client.login(config.options.token);
