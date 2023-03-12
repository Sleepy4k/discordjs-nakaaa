const { useHistory } = require("discord-player");

module.exports = {
  name: "previous",
  description: "Plays previous track.",
  cooldown: 1,
  options: [],

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
