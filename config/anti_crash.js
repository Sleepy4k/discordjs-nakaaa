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

const anti_crash = {
  enable: process.env.ANTI_CRASH_ENABLE || true,
  webhook: {
    url:
      process.env.ANTI_CRASH_URL ||
      "https://discord.com/api/webhooks/1084337532105392148/cQsOCefThG_am0tZ4fKi9gcr3WhPBlrB347WYGsfrcz5iUv7dEzLUhT2f9wgO0MEXbXs",
  }
}

export default anti_crash;

// Path: config/anti_crash.js