const { usePlayer } = require("discord-player");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  name: "volume",
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Changes the volume of the track and entire queue.")
    .addIntegerOption((options) =>
      options
        .setName("volume")
        .setRequired(true)
        .setDescription("The amount of volume you want to change to")
    ),

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  exec: async (client, interaction) => {
    const player = usePlayer(interaction.guildId);
    const volume = interaction.options.getInteger("volume");

    if (!player) return interaction.reply("I am not in a voice channel");
    if (!player.queue.currentTrack)
      return interaction.reply("There is no track **currently** playing");

    await interaction.deferReply();
    player.setVolume(volume);
    return interaction.followUp({
      content: `I **changed** the volume to: **${player.volume}%**`,
    });
  },
};
