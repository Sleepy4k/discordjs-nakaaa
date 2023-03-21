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
import { readdir } from "node:fs/promises";
import { logStatus } from "./functions.js";

/**
 * @param {Bot} client
 */
export default async (client) => {
  const { global, guild_id } = client.config.slash;

  try {
    let allCommands = [];
    const commandsDir = await readdir(`./commands/slash`);
    const items = await Promise.all(
      commandsDir.map(async (dir) => {
        const commands = await readdir(`./commands/slash/${dir}`);
        let filterCommands = commands.filter((f) => f.endsWith(".js"));
        for (const cmd of filterCommands) {
          /**
           * @type {import("../index.js").Scommand}
           */
          const command = await import(`../commands/slash/${dir}/${cmd}`).then(
            (r) => r.default
          );
          if (command.name) {
            client.scommands.set(command.name, command);
            allCommands.push(command);
            logStatus(command.name, true, "Slash");
          } else {
            logStatus(command.name, false, "Slash");
          }
        }
      })
    );

    await Promise.all(items);

    client.on("ready", async () => {
      if (global) {
        client.application.commands.set(allCommands);
      } else {
        client.guilds.cache.get(guild_id)?.commands.set(allCommands);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
