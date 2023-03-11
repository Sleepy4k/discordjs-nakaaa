const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  cooldown: 2,
  aliases: ["latency"],

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').Message} message
   */
  exec: async (client, message, args) => {
    message.channel.send("🏓 Pinging....").then(async (msg) => {
      msg.delete();

      const pEmbed = new MessageEmbed()
        .setTitle("🏓 Pong!")
        .setColor("BLUE")
        .setDescription(
          `Latency : ${Math.floor(
            msg.createdTimestamp - message.createdTimestamp
          )}ms\nAPI Latency : ${client.ws.ping}ms`
        );

      message.channel.send({ embeds: [pEmbed] });
    });
  },
};
