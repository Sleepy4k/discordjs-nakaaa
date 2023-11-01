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
 * Parse duration to human readable
 *
 * @param {Number} ms
 *
 * @returns {String}
 */
export default function parseDur(ms) {
  let seconds = ms / 1000;

  const days = parseInt(seconds / 86400);
  seconds = seconds % 86400;

  const hours = parseInt(seconds / 3600);
  seconds = seconds % 3600;

  const minutes = parseInt(seconds / 60);
  seconds = parseInt(seconds % 60);

  if (days) {
    return `${days} day, ${hours} hours, ${minutes} minutes`;
  } else if (hours) {
    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  } else if (minutes) {
    return `${minutes} minutes, ${seconds} seconds`;
  }

  return `${seconds} second(s)`;
}

// Path: utils\parseDur.js
