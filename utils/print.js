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

/**
 * Parse current date and time to human readable for console log with message
 *
 * @param {String} message
 *
 * @returns {void}
 */
export default function print(message) {
  const now = new Date();
  const date = now.toLocaleDateString();
  const time = now.toLocaleTimeString();

  console.log(`[${date} ${time}] ${message}`);
}

// Path: utils\parseDur.js
