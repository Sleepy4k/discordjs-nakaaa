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
import { Bot } from "#handlers/client.js";
import { readdir } from "node:fs/promises";
import { logStatus } from "#handlers/functions.js";

/**
 * Register all message commands
 *
 * @param {Bot} client
 *
 * @returns {Promise<void>}
 */
export default async (client) => {
  try {
    const commandsDir = await readdir(`./commands/message`);

    const items = await Promise.all(
      commandsDir.map(async (dir) => {
        if (!client.config.nsfw.enable && dir === client.config.nsfw.directory) return;

        const commands = await readdir(`./commands/message/${dir}`);
        let filterCommands = commands.filter((f) => f.endsWith(".js"));

        for (const cmd of filterCommands) {
          /**
           * @type {client.mcommands}
           */
          const command = await import(`#messageCommands/${dir}/${cmd}`).then((r) => r.default);

          if (command.name) {
            client.mcommands.set(command.name, command);
            logStatus(command.name, true, "Message");
          } else {
            logStatus(command.name, false, "Message");
          }
        }
      })
    );

    await Promise.all(items);
  } catch (error) {
    print(error.message, "error");
  }
};

// Path: handlers\messageHandler.js
