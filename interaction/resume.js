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
    const queue = client.player.getQueue(interaction.guildId);

    if (!queue) {
      await interaction.reply("There are no songs in the queue");
      return;
    }

    queue.setPaused(false);

    await interaction.reply("Player has been resumed.");
  },
};
