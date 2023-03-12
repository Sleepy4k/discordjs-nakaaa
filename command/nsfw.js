const axios = require("axios");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "nsfw",
  cooldown: 2,

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').Message} message
   */
  exec: async (client, message, args) => {
    try {
      let type = args.join(" ");

      if (!type) {
        const response = await axios.get(
          "https://scathach.redsplit.org/v3/nsfw/gif/"
        );
        const porn = response.data;

        const embed = new EmbedBuilder()
          .setColor("RANDOM")
          .setTitle(`Requested by ${message.author.tag}`)
          .setImage(porn.url)
          .setFooter({
            text: `XII RPL 1 | Bot by Nakaaaa#8558`,
            iconURL:
              "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
          });
        message.channel.send({ embeds: [embed] });
      } else if (type === "gif") {
        const response = await axios.get(
          "https://scathach.redsplit.org/v3/nsfw/gif/"
        );
        const porn = response.data;

        const embed = new EmbedBuilder()
          .setColor("RANDOM")
          .setTitle(`Requested by ${message.author.tag}`)
          .setImage(porn.url)
          .setFooter({
            text: `XII RPL 1 | Bot by Nakaaaa#8558`,
            iconURL:
              "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
          });
        message.channel.send({ embeds: [embed] });
      } else if (type === "jav") {
        const response = await axios.get(
          "https://scathach.redsplit.org/v3/nsfw/jav/"
        );
        const jav = response.data;

        const embed = new EmbedBuilder()
          .setColor("RANDOM")
          .setTitle(`Requested by ${message.author.tag}`)
          .setImage(jav.url)
          .setFooter({
            text: `XII RPL 1 | Bot by Nakaaaa#8558`,
            iconURL:
              "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
          });

        message.channel.send({ embeds: [embed] });
      }
    } catch (error) {
      return message.channel.send(`Something went wrong: ${error.message}`);
    }
  },
};
