const { usePlayer } = require("discord-player");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  name: "resume",
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Resumes the current song"),

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  exec: async (client, interaction) => {
    const player = usePlayer(interaction.guildId);

    if (!player) return interaction.reply("I am not in a voice channel");
    if (!player.queue.currentTrack)
      return interaction.reply("There is no track **currently** playing");

    player.queue.node.resume();

    await interaction.reply("Player has been resumed.");
  },
};
