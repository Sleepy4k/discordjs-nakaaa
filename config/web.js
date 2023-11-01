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
  name: process.env.WEB_NAME || "Sleepy4k",
  env: process.env.WEB_ENV || "production",
  port: process.env.PORT || 3000,
  url: process.env.URL || "http://localhost:3000"
}

export default web;

// Path: config/web.js