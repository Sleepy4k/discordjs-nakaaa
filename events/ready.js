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
import { ActivityType } from "discord.js";

/**
 * @type {import("..").EventHandler}
 */
export default {
  name: "ready",

  run: async (client) => {
    console.log(`> ${client.user.tag} is Ready !!`);
    client.user.setPresence({
      activities: [
        {
          name: client.config.options.activity.description,
          type: ActivityType.Watching,
        },
      ],
      status: client.config.options.activity.type,
    });
  },
};

// Path: events\ready.js
