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
import "dotenv/config.js";

const chatbot = {
  token: process.env.CHATBOT_TOKEN || "",
  charId: process.env.CHATBOT_CHAR_ID | ""
}

export default chatbot;

// Path: config/chatbot.js