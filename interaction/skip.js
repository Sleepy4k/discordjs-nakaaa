const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  name: "skip",
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips the current song"),

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  exec: async (client, interaction) => {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue) {
      await interaction.reply("There are no songs in the queue");
      return;
    }

    const currentSong = queue.current;
    queue.skip();

    const embed = new MessageEmbed()
      .setDescription(`${currentSong.title} has been skipped!`)
      .setThumbnail(currentSong.thumbnail);

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
