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
import web from "./web.config.js";
import bot from "./bot.config.js";
import nsfw from "./nsfw.config.js";
import slash from "./slash.config.js";
import emoji from "./emoji.config.js";
import chatbot from "./chatbot.config.js";
import welcome from "./welcome.config.js";
import goodbye from "./goodbye.config.js";
import handler from "./handler.config.js";
import activity from "./activity.config.js";
import bad_words from "./bad_words.config.js";
import anti_crash from "./anti_crash.config.js";

const config = {
  bot,
  web,
  nsfw,
  emoji,
  slash,
  chatbot,
  welcome,
  goodbye,
  handler,
  activity,
  bad_words,
  anti_crash,
};

export default config;

// Path: config\_index.js
