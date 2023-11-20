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

const web = {
  hostname: process.env.WEB_HOSTNAME || "localhost",
  port: process.env.WEB_PORT || 3000,
  env: process.env.WEB_ENV || "production",
  name: process.env.WEB_NAME || "Sleepy4k",
}

export default web;

// Path: config/web.js