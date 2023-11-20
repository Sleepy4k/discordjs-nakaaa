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
import { Bot } from "#server/bot.js";
import { readdir } from "node:fs/promises";

/**
 * Handle all events
 *
 * @param {Bot} client
 *
 * @returns {Promise<void>}
 */
export default async (client) => {
  try {
    const eventFiles = await readdir("./events");
    const eventFilesFiltered = eventFiles.filter((file) => file.endsWith(".js"));

    const items = await Promise.all(
      eventFilesFiltered.map(async (file) => {
        /**
         * @type {import("../index.js").EventHandler}
         */
        let event = await import(`#events/${file}`).then((r) => r.default);

        if (event?.name) {
          client.events.set(event.name, event);
          client.logStatus(event.name, true, "Event");
          client.on(event.name, (...args) => event.run(client, ...args));
        } else {
          client.logStatus(event.name, false, "Event");
        }
      })
    );

    await Promise.all(items);
  } catch (error) {
    print(error.message, "error");
  }
};

// Path: handlers\eventHandler.js
