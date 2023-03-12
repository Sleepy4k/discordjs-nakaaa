const { EmbedBuilder } = require("discord.js");
const { parseDur } = require("../utils/parseDur");

module.exports = {
  name: "uptime",
  cooldown: 2,

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').Message} message
   */
  exec: async (client, message, args) => {
    const duration = parseDur(client.uptime);

    message.channel.send("⌛ Loading...").then(async (msg) => {
      msg.delete();

      const pEmbed = new EmbedBuilder()
        .setTitle(":inbox_tray: Online for")
        .setColor("BLUE")
        .setDescription(`**${duration}**`);

      message.channel.send({ embeds: [pEmbed] });
    });
  },
};
