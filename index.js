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
import { Bot } from "./handlers/client.js";
import createServer from "./dashboard/bin/www.js";

export const client = new Bot();

createServer(client);

client.build(client.config.options.token);

// Path: index.js
