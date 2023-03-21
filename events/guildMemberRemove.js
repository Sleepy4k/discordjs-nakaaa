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

/**
 * @type {import("..").EventHandler}
 */
export default {
  name: "guildMemberRemove",

  run: async (client, member) => {
    if (!client.config.goodbye.enable) return;

    const channel = member.guild.channels.cache.get(
      client.config.goodbye.channel_id
    );

    if (!channel) return;

    return channel.send(client.config.goodbye.message(member));
  },
};

// Path: events\guildMemberRemove.js
