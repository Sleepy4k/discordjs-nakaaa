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
import initBot from "./bot.js";
import initWeb from "./web.js";
import { Bot } from "#handlers/client.js";

const client = new Bot();

initBot(client, client.config.bot.token);
initWeb(client);

// Path: server\init.js
