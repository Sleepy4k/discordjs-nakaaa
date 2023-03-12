const { useQueue } = require("discord-player");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  name: "clear",
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription(
      "Clears the current queue and removes all enqueued tracks."
    ),

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  exec: async (client, interaction) => {
    const queue = useQueue(interaction.guild.id);

    if (!queue) return interaction.reply(`I am not in a voice channel`);
    if (!queue.tracks) return interaction.reply(`There is nothing to clear`);

    queue.tracks.clear();
    queue.history.clear();

    return interaction.reply(`I have **cleared** the queue`);
  },
};
