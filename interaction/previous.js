const { useHistory } = require("discord-player");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  name: "previous",
  data: new SlashCommandBuilder()
    .setName("previous")
    .setDescription("Plays previous track."),

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  exec: async (client, interaction) => {
    const history = useHistory(interaction.guild.id);

    if (!history)
      return interaction.reply({
        content: `I am not in a voice channel`,
        ephemeral: true,
      });

    if (!history.previousTrack)
      return interaction.reply({
        content: "No previous track in history!",
        ephemeral: true,
      });

    await interaction.deferReply();

    await history.previous();

    return interaction.followUp({
      content: `⏯ | I have skipped to the previous track`,
    });
  },
};
