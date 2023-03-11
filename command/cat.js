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
    const response = await axios.get("https://some-random-api.ml/img/cat");
    const data = response.data;

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setTitle(`Requested by ${message.author.tag}`)
      .setImage(data.link)
      .setFooter({
        text: `XII RPL 1 | Bot by Nakaaaa#8558`,
        iconURL:
          "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
      });

    message.channel.send({ embeds: [embed] });
  },
};
