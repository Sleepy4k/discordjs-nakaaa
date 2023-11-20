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
import { Bot } from "./bot.js";
import createServer from "#dashboard/bin/www.js";

const client = new Bot();

/**
 * Host express server
 */
createServer(client);

/**
 * Host discord bot
 */
client.build(client.config.bot.token).catch((err) => console.error(err));

// Path: server\init.js
