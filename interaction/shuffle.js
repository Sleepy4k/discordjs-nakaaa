const { useQueue } = require("discord-player");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  name: "shuffle",
  data: new SlashCommandBuilder()
    .setName("shuffle")
    .setDescription("Shuffles the tracks in the queue."),

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  exec: async (client, interaction) => {
    const queue = useQueue(interaction.guild.id);
    if (!queue) return interaction.reply(`I am not in a voice channel`);

    if (queue.tracks.size < 2)
      return interaction.reply(
        `There aren't **enough tracks** in queue to **shuffle**`
      );

    queue.tracks.shuffle();

    return interaction.reply(`I have **shuffled** the queue`);
  },
};
