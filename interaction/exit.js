const { usePlayer } = require("discord-player");

module.exports = {
  name: "exit",
  description: "Kick the bot from the channel.",
  cooldown: 1,
  options: [],

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  exec: async (client, interaction) => {
    const player = usePlayer(interaction.guildId);

    if (!player) return interaction.reply("I am not in a voice channel");
    if (!player.queue.currentTrack)
      return interaction.reply("There is no track **currently** playing");

    player.queue.destroy();

    await interaction.reply("Why you do this to me?");
  },
};
