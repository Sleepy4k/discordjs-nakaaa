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
  const polling = ephemeral ? interaction.options.getString("polling") : args.slice(0).join(" ");

  if (!polling) return client.sendEmbed(interaction, {
    color: "Red",
    title: "Polling something!",
    description: `\`\`\`Usage: ${ephemeral ? "" : prefix}polling <text>\`\`\``,
    footer: client.getFooter(interaction, type),
  }, ephemeral);

  const poll = await client.sendEmbed(interaction, {
    color: "Gold",
    title: "Polling",
    description: `\`\`\`${polling}\`\`\``,
    footer: client.getFooter(interaction, type),
  }, false, true);

  await poll.react("👍");
  await poll.react("👎");

  return poll;
}