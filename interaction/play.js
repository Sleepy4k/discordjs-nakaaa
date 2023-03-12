const playdl = require("play-dl");
const { QueryType } = require("discord-player");

module.exports = {
  name: "play",
  description:
    "Plays the specified song from YouTube, Soundcloud, Spotify etc.",
  cooldown: 1,
  options: [
    {
      name: "search",
      description: "Plays and enqueues track(s) of the query provided.",
      type: 3,
      required: true,
    },
  ],

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   */
  exec: async (client, interaction) => {
    const channel = interaction.member.voice.channel;

    if (!channel)
      return interaction.reply("You are not connected to a voice channel!");

    const song = interaction.options.getString("search", true);
    const result = await interaction.client.player.search(song, {
      requestedBy: interaction.user,
      searchEngine: QueryType.AUTO,
    });

    if (!result || !result.tracks.length) {
      return interaction.reply("No tracks were found for your query");
    }

    try {
      const queue = await interaction.client.player.createQueue(
        interaction.guild,
        {
          metadata: interaction,
          guild: interaction.guildId,
          selfDeaf: true,
          leaveOnEmptyCooldown: 300000,
          leaveOnEnd: false,
          leaveOnStop: true,

          async onBeforeCreateStream(track, source, _queue) {
            if (track.url.includes("youtube.com")) {
              return (
                await playdl.stream(track.url, {
                  discordPlayerCompatibility: true,
                })
              ).stream;
            } else if (track.url.includes("spotify.com")) {
              return (
                await playdl.stream(
                  await playdl
                    .search(`${track.author} ${track.title} lyric`, {
                      limit: 1,
                      source: { youtube: "video" },
                    })
                    .then((x) => x[0].url),
                  { discordPlayerCompatibility: true }
                )
              ).stream;
            }
          },
        }
      );

      try {
        if (!queue.connection) await queue.connect(channel);
      } catch (error) {
        console.error(error);
        await queue.destroy();
        return await interaction.editReply(
          "Could not join your voice channel!"
        );
      }

      result.playlist
        ? queue.addTracks(result.tracks)
        : queue.addTrack(result.tracks[0]);

      await interaction.editReply({
        content: `🎶 | Enqueued **${
          result.playlist ? result.tracks.length : 1
        }** ${result.playlist ? "tracks" : "track"} from **${
          result.playlist ? result.playlist.name : result.tracks[0].title
        }**`,
      });

      if (!queue.playing) await queue.play();
    } catch (error) {
      return interaction.followUp(`Something went wrong: ${error}`);
    }
  },
};
