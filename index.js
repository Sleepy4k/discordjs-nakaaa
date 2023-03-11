const { Client, Intents } = require('discord.js'); // Importing Client and Intent from Discord.js
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],
}); // Constructing Client

const { token } = require('./config.json'); // Importing token from Config.json
const welcome = require('./welcome'); // Importing guildMemberAdd event from welcome.
client.on('ready', () => {
    welcome(client);
    client.user?.setPresence({
        status: 'idle' || 'dnd',
        activities: [
            {
                name: 'Watching XII RPL 1 with bu agustiana' || 'Listening to XII RPL 1 with bu agustiana' || 'Playing XII RPL 1 with bu agustiana',
                type: 'WACTHING' || 'LISTENING' || 'PLAYING',
            },
        ],
    }); // Setting Status
    console.log('Listening on Discord Server'); // Please don't remove this.
});

client.login(token);
