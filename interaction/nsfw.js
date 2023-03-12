const axios = require("axios");
const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "nsfw",
  description: "Please dont use it.",
  cooldown: 1,
  options: [
    {
      name: "type",
      description: "Type of nsfw.",
      type: 3,
      choices: [
        {
          name: "gif",
          value: "gif",
        },
        {
          name: "jav",
          value: "jav",
        },
      ],
      required: true,
    },
  ],

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  exec: async (client, interaction) => {
    try {
      let type = interaction.options.getString("type", false);

      if (!type) {
        const response = await axios.get(
          "https://scathach.redsplit.org/v3/nsfw/gif/"
        );
        const porn = response.data;

        const embed = new EmbedBuilder()
          .setColor("Random")
          .setTitle(`Requested by ${interaction.user.tag}`)
          .setImage(porn.url)
          .setFooter({
            text: `XII RPL 1 | Bot by Nakaaaa#8558`,
            iconURL:
              "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
          });

        interaction.reply({ embeds: [embed], ephemeral: true });
      } else if (type === "gif") {
        const response = await axios.get(
          "https://scathach.redsplit.org/v3/nsfw/gif/"
        );
        const porn = response.data;

        const embed = new EmbedBuilder()
          .setColor("Random")
          .setTitle(`Requested by ${interaction.user.tag}`)
          .setImage(porn.url)
          .setFooter({
            text: `XII RPL 1 | Bot by Nakaaaa#8558`,
            iconURL:
              "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
          });

        interaction.reply({ embeds: [embed], ephemeral: true });
      } else if (type === "jav") {
        const response = await axios.get(
          "https://scathach.redsplit.org/v3/nsfw/jav/"
        );
        const jav = response.data;

        const embed = new EmbedBuilder()
          .setColor("Random")
          .setTitle(`Requested by ${interaction.user.tag}`)
          .setImage(jav.url)
          .setFooter({
            text: `XII RPL 1 | Bot by Nakaaaa#8558`,
            iconURL:
              "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
          });

        interaction.reply({ embeds: [embed], ephemeral: true });
      }
    } catch (error) {
      return interaction.reply(`Something went wrong: ${error}`);
    }
  },
};
