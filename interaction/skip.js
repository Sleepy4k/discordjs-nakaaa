const { EmbedBuilder } = require("discord.js");
const { usePlayer } = require("discord-player");
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
    const player = usePlayer(interaction.guildId);

    if (!player) return interaction.reply("I am not in a voice channel");
    if (!player.queue.currentTrack)
      return interaction.reply("There is no track **currently** playing");

    const currentSong = player.queue.currentTrack;

    player.queue.node.skip();

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(`${currentSong.title} has been skipped!`)
          .setThumbnail(currentSong.thumbnail),
      ],
    });
  },
};
