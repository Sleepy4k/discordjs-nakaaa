const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  name: "queue",
  data: new SlashCommandBuilder()
    .setName("queue")
    .setDescription("shows first 10 songs in the queue"),

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  exec: async (client, interaction) => {
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue || !queue.playing) {
      await interaction.reply("There are no songs in the queue");
      return;
    }

    const queueString = queue.tracks
      .slice(0, 10)
      .map((song, i) => {
        return `${i}) [${song.duration}]\` ${song.title} - <@${song.requestedBy.id}>`;
      })
      .join("\n");

    const currentSong = queue.current;

    const embed = new MessageEmbed()
      .setDescription(
        `**Currently Playing**\n` +
          (currentSong
            ? `\`[${currentSong.duration}]\` ${currentSong.title} - <@${currentSong.requestedBy.id}>`
            : "None") +
          `\n\n**Queue**\n${queueString}`
      )
      .setThumbnail(currentSong.setThumbnail);

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
