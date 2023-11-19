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
export default async function main(type, data) {
  const { client, interaction, args, prefix } = data;

  const ephemeral = type === "slash" ? true : false;
  const latency = interaction.createdTimestamp - Date.now();
  const apiLatency = Math.round(client.ws.ping);

  return client.sendEmbed(interaction, {
    color: "Blue",
    title: "🏓 Pong",
    description: `\`\`\`Latency: ${latency}ms \nAPI Latency: ${apiLatency}ms\`\`\``,
    footer: client.getFooter(interaction, type),
  }, ephemeral);
}