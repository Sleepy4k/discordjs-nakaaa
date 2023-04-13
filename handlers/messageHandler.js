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
import { Bot } from "./client.js";
import print from "../utils/print.js";
import { readdir } from "node:fs/promises";
import { logStatus } from "./functions.js";

/**
 * @param {Bot} client
 */
export default async (client) => {
  try {
    const commandsDir = await readdir(`./commands/message`);
    const items = await Promise.all(
      commandsDir.map(async (dir) => {
        const commands = await readdir(`./commands/message/${dir}`);
        let filterCommands = commands.filter((f) => f.endsWith(".js"));
        for (const cmd of filterCommands) {
          /**
           * @type {import("../index.js").Scommand}
           */
          const command = await import(
            `../commands/message/${dir}/${cmd}`
          ).then((r) => r.default);
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
    print(`Error: ${error.message}`);
  }
};

// Path: handlers\messageHandler.js
