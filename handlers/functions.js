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
import print from "../utils/print.js";
import { Collection, CommandInteraction } from "discord.js";

/**
 * Handle cooldown for commands
 *
 * @param {CommandInteraction} interaction
 * @param {String} cmd
 *
 * @returns {Boolean}
 */
export function cooldown(interaction, cmd) {
  if (!interaction || !cmd) return;

  let { client, member } = interaction;
  if (!client.cooldowns.has(cmd.name)) client.cooldowns.set(cmd.name, new Collection());

  const now = Date.now();
  const timestamps = client.cooldowns.get(cmd.name);
  const cooldownAmount = cmd.cooldown * 1000;

  if (timestamps.has(member.id)) {
    const expirationTime = timestamps.get(member.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      print(`${member.user.tag} : ${cmd.name} | Cooldown: ${timeLeft.toFixed(1)} seconds.`, "info");
      return timeLeft;
    }

    timestamps.set(member.id, now);
    setTimeout(() => timestamps.delete(member.id), cooldownAmount);
    return false;
  }

  timestamps.set(member.id, now);
  setTimeout(() => timestamps.delete(member.id), cooldownAmount);
  return false;
}

/**
 * Set log status for console log
 *
 * @param {String} name
 * @param {Boolean} isLoaded
 * @param {String} type
 *
 * @returns {void}
 */
export function logStatus(name, isLoaded, type) {
  const statusIcon = isLoaded ? "\x1b[32m✅\x1b[0m" : "\x1b[31m❌\x1b[0m";
  const statusText = isLoaded ? "Loaded" : "Not Loaded";

  print(`${type} : ${name} | Status: ${statusIcon} ${statusText}`, "info");
}

// Path: handlers\functions.js
