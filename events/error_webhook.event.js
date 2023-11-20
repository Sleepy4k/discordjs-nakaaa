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
import { inspect } from "util";
import config from "#config/_index.js";
import { WebhookClient, EmbedBuilder } from "discord.js";

export default {
  name: "error",

  run: async (err) => {
    if (!config.anti_crash.enable) return;

    const webhook = new WebhookClient({
      url: config.anti_crash.webhook.url,
    });

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle("Error")
      .setDescription(`\`\`\`${inspect(err, { depth: 0 }).slice(0, 1000)}\`\`\``)
      .setURL("https://discordjs.guide/popular-topics/errors.html#api-errors")
      .setTimestamp();

    return webhook.send({ embeds: [embed] });
  }
};

// Path: events\error.js
