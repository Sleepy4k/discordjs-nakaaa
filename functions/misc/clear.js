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
import print from "#utils/print.js";
import { PermissionFlagsBits } from "discord.js";

export default async function main(type, data) {
  const { client, interaction, args, prefix } = data;

  const ephemeral = type === "slash" ? true : false;
  const totalMessage = ephemeral ? interaction.options.getInteger("message") : args[0];

  if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) return client.sendEmbed(interaction, {
    color: "Red",
    title: "Clear message",
    description: `\`\`\`You need Manage Messages permission to use this command.\`\`\``,
    footer: client.getFooter(interaction, type),
  }, ephemeral);

  if (!totalMessage || isNaN(totalMessage)) return client.sendEmbed(interaction, {
    color: "Red",
    title: "Clear message",
    description: `\`\`\`Usage: ${ephemeral ? "" : prefix}clear <Message>\`\`\``,
    footer: client.getFooter(interaction, type),
  }, ephemeral);

  if (totalMessage < 1 || totalMessage > 100) return client.sendEmbed(interaction, {
    color: "Red",
    title: "Clear message",
    description: `\`\`\`Please provide a number between 1 and 99.\`\`\``,
    footer: client.getFooter(interaction, type),
  }, ephemeral);

  try {
    await interaction.channel.bulkDelete(parseInt(totalMessage) + 1, true);

    return client.sendEmbed(interaction, {
      color: "Green",
      title: "Clear message",
      description: `\`\`\`Successfully deleted ${totalMessage} messages.\`\`\``,
      footer: client.getFooter(interaction, type),
    }, ephemeral).then((msg) => {
      if (ephemeral) return;

      setTimeout(() => msg.delete(), 2500);
    }).catch((err) => print(err.message, "error"));
  } catch (error) {
    print(error.message, "error");

    return client.sendEmbed(interaction, {
      color: "Red",
      title: "Clear message",
      description: `\`\`\`An error occurred while running this command.\`\`\``,
      footer: client.getFooter(interaction, type),
    }, ephemeral);
  }
}