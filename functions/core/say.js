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
  const say = ephemeral ? interaction.options.getString("text") : args.slice(0).join(" ");

  if (!say) return client.sendEmbed(interaction, {
    color: "Red",
    title: "Say something!",
    description: `\`\`\`Usage: ${prefix}say <text>\`\`\``,
    footer: client.getFooter(interaction, type),
  }, ephemeral);

  return client.sendEmbed(interaction, {
    color: "Navy",
    description: `\`\`\`${say}\`\`\``,
    footer: client.getFooter(interaction, type),
  })
}