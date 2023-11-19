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

  const validAnswer = ["heads", "tails"];
  const result = Math.floor(Math.random() * 2);
  const ephemeral = type === "slash" ? true : false;
  const answer = ephemeral ? interaction.options.getString("guess") : (args.slice(0).join(" ")).toLowerCase();

  if (!answer || !validAnswer.includes(answer)) return client.sendEmbed(interaction, {
    color: "Red",
    title: "Coin flip",
    description: `\`\`\`Usage: ${prefix}coin <Heads/Tails>\`\`\``,
    footer: client.getFooter(interaction, type),
  }, ephemeral);

  const coin = (result === 0) ? "heads" : "tails";

  if (coin === answer) return client.sendEmbed(interaction, {
    color: "Green",
    title: "Coin flip",
    description: `\`\`\`Result: ${coin} \nGuess: ${answer} \nStatus: You win!\`\`\``,
    footer: client.getFooter(interaction, type),
  }, ephemeral);

  return client.sendEmbed(interaction, {
    color: "Red",
    title: "Coin flip",
    description: `\`\`\`Result: ${coin} \nGuess: ${answer} \nStatus: You lose!\`\`\``,
    footer: client.getFooter(interaction, type),
  }, ephemeral);
}