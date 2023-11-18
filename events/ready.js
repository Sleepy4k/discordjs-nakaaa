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
import { ActivityType } from "discord.js";

export default {
  name: "ready",

  run: async (client) => {
    print(`${client.user.tag} : Ready to serve ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);

    try {
      client.user.setPresence({
        activities: [{
          name: client.config.activity.description,
          type: ActivityType.Watching,
        }],
        status: client.config.activity.type,
      });
    } catch (error) {
      print(error.message, "error");
    }
  },
};

// Path: events\ready.js
