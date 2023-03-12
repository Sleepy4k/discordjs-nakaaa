const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "polling",
  cooldown: 2000,

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').Message} message
   */
  exec: async (client, message, args) => {
    let poll = args.join(" ");

    if (!poll) {
      let emptyEmbed = new EmbedBuilder()
        .setTitle("woahh")
        .setColor("#fc2403")
        .setDescription(
          `Hey <@${message.author.id}>, you need to specify a polling!`
        )
        .setFooter({
          text: `XII RPL 1 | Bot by Nakaaaa#8558`,
          iconURL:
            "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
        });
      message.channel.send({ embeds: [emptyEmbed] }).then((msg) => {
        setTimeout(() => {
          msg.delete();
        }, 5000);
      });
      message.delete();
    } else {
      let embed = new EmbedBuilder()
        .setColor("Random")
        .setTitle("Polling baru")
        .setDescription("```fix\n " + poll + "\n```")
        .setFooter({
          text: `${message.author.tag} | Bot by Nakaaaa#8558`,
          iconURL:
            "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
        })
        .setTimestamp(new Date());
      message.channel
        .send({ embeds: [embed] })
        .then((message) => {
          const sent = message;
          sent
            .react("✔️")
            .then(() => {
              sent.react("❌");
            })
            .catch(console.error);
        })
        .catch(console.error);
      return message.delete();
    }
  },
};
