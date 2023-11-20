/**
 * Coding service by Sleepy4k <sarahpalastring@gmail.com>
 *
 * Reselling this file, via any medium is strictly prohibited
 * Proprietary and confidential
 *
 * Written by:
 * Apri Pandu Wicaksono
 *
 * Link: https://github.com/sleepy4k
 *
 * March 12, 2023
*/
import print from "#utils/print.js";

export default async function main(type, data) {
  const { client, interaction, args, prefix } = data;

  let queue;
  const ephemeral = type === "slash" ? true : false;
  const song = ephemeral ? interaction.options.getString("search") : args.slice(0).join(" ");

  try {
    const memberChannel = interaction.member.voice.channel;

    if (!memberChannel) return client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: "```You must be in a voice channel to use this command.```",
      footer: client.getFooter(interaction, type),
    }, ephemeral);

    if (!song) return client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: "```Please provide a song name.```",
      footer: client.getFooter(interaction, type),
    }, ephemeral);

    const results = await client.player.search(song);

    if (!results || !results.hasTracks()) return client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: "```No results found.```",
      footer: client.getFooter(interaction, type),
    }, ephemeral);

    if (ephemeral) await interaction.deferReply({ ephemeral });
    if (ephemeral) await client.sendEmbed(interaction, {
      color: "Blue",
      title: "Searching...",
      description: `\`\`\`Searching for ${results.playlist ? results.tracks.length : results.tracks[0].title}...\`\`\``,
      footer: client.getFooter(interaction, type),
    }, ephemeral);

    if (client.player.queues.has(interaction.guild.id)) queue = await client.player.nodes.get(interaction.guild.id);
    else {
      await client.sendEmbed(interaction, {
        color: "Green",
        title: "Success",
        description: `\`\`\`Creating queue for ${memberChannel.name}...\`\`\``,
        footer: client.getFooter(interaction, "interaction"),
      }, true);

      queue = await client.player.nodes.create(interaction.guild, {
        volume: 75,
        selfDeaf: true,
        selfMute: false,
        leaveOnEnd: false,
        leaveOnEmpty: true,
        leaveOnEndCooldown: 60000,
        leaveOnEmptyCooldown: 60000,
        metadata: {
          channel: interaction.channel,
          requestedBy: interaction.user,
          client: interaction.guild.members.me
        }
      });
    }

    if (!queue.connection) {
      await client.sendEmbed(interaction, {
        color: "Green",
        title: "Success",
        description: `\`\`\`Connecting to ${memberChannel.name}...\`\`\``,
        footer: client.getFooter(interaction, type),
      }, ephemeral);

      await queue?.connect(memberChannel);
    };

    results.playlist ? queue?.addTrack(results.tracks) : queue?.addTrack(results.tracks[0]);

    if (!queue.isPlaying()) await queue.node.play();

    return client.sendEmbed(interaction, {
      color: "Green",
      title: "Success",
      description: `\`\`\`Playing ${results.playlist ? results.tracks.length : results.tracks[0].title}...\`\`\``,
      footer: client.getFooter(interaction, type),
    }, ephemeral);
  } catch (error) {
    print(error.message, "error");

    if (!queue?.deleted) await queue?.delete();

    return client.sendEmbed(interaction, {
      color: "Red",
      title: "Error",
      description: "```There was an error trying to get the queue.```",
      footer: client.getFooter(interaction, type),
    }, ephemeral);
  }
}