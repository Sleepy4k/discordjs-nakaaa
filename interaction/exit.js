const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  name: "exit",
  data: new SlashCommandBuilder()
    .setName("exit")
    .setDescription("Kick the bot from the channel."),

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

    queue.destroy();

    await interaction.reply("Why you do this to me?");
  },
};
