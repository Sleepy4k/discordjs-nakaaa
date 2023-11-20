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
 * Register all slash commands
 *
 * @param {Bot} client
 *
 * @returns {Promise<void>}
 */
export default async (client) => {
  const { global, guild_id } = client.config.slash;

  try {
    let allCommands = [];
    const commandsDir = await readdir(`./commands/slash`);

    const items = await Promise.all(
      commandsDir.map(async (dir) => {
        if (!client.config.nsfw.enable && dir === client.config.nsfw.directory) return;

        const commands = await readdir(`./commands/slash/${dir}`);
        let filterCommands = commands.filter((f) => f.endsWith(".js"));

        for (const cmd of filterCommands) {
          /**
           * @type {client.scommands}
           */
          const command = await import(`#slashCommands/${dir}/${cmd}`).then((r) => r.default);

          if (command.name) {
            client.scommands.set(command.name, command);
            allCommands.push(command);
            client.logStatus(command.name, true, "Slash");
          } else {
            client.logStatus(command.name, false, "Slash");
          }
        }
      })
    );

    await Promise.all(items);

    client.on("ready", async () => {
      if (global) {
        client.application.commands.fetch().then((commands) => {
          for (const command of commands.values()) {
            client.application.commands.delete(command.id);
          }
        }).catch((error) => print(error.message, "error"));
        client.application.commands.set(allCommands);
      } else {
        client.guilds.cache.get(guild_id)?.commands.set(allCommands);
      }
    });
  } catch (error) {
    print(error.message, "error");
  }
};

// Path: handlers\slashHandler.js
