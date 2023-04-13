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
import print from "../utils/print.js";

/**
 * @type {import("..").EventHandler}
 */
export default {
  name: "guildMemberAdd",

  run: async (client, member) => {
    if (!client.config.welcome.enable) return;

    const channel = member.guild.channels.cache.get(
      client.config.welcome.channel_id
    );

    if (!channel) return;

    return channel
      .send(client.config.welcome.message(member))
      .catch((error) => {
        print(`Error: ${error.message}`);
      });
  },
};

// Path: events\guildMemberAdd.js
