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

const activity = {
  type: process.env.ACTIVITY_TYPE || "dnd",
  description: process.env.ACTIVITY_NAME || "Bot Status"
}

export default activity;

// Path: config/activity.js