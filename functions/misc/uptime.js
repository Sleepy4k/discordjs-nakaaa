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
import parseDur from "#utils/parseDur.js";

export default async function main(type, data) {
  const { client, interaction, args, prefix } = data;

  const ephemeral = type === "slash" ? true : false;
  const uptime = parseDur(client.uptime);

  return client.sendEmbed(interaction, {
    color: "Yellow",
    title: ":inbox_tray: Bot Uptime",
    description: `\`\`\`Uptime: ${uptime}\`\`\``,
    footer: client.getFooter(interaction, type),
  }, ephemeral);
}