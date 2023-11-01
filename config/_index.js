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
import web from "./web.js";
import bot from "./bot.js";
import nsfw from "./nsfw.js";
import slash from "./slash.js";
import emoji from "./emoji.js";
import welcome from "./welcome.js";
import goodbye from "./goodbye.js";
import activity from "./activity.js";
import bad_words from "./bad_words.js";
import anti_crash from "./anti_crash.js";

const config = {
  bot,
  web,
  nsfw,
  emoji,
  slash,
  welcome,
  goodbye,
  activity,
  bad_words,
  anti_crash,
};

export default config;

// Path: config\_index.js
