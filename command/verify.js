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

const config = require("../config");

module.exports = {
  name: "verify",
  cooldown: 2000,

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').Message} message
   */
  exec: async (client, message, args) => {
    if (message.channelId != config.commands.verification.channel_id) return;
    args = args.join(" ");
    const role = message.guild.members.me.roles.cache.first();
    const senderRole = message.member.roles.cache.first();
    const deleteMessages = (message1, message2) => {
      setTimeout(() => message1.delete(), 2500);
      setTimeout(() => message2.delete(), 2500);
    };

    if (
      message.member.roles.cache.has(config.commands.verification.verified_role)
    )
      return message
        .reply(config.lang.verification.already_verified(message.author, args))
        .then((message2) => deleteMessages(message, message2));
    if (senderRole.position > role.position)
      return message
        .reply(config.lang.verification.position_above(message.author, args))
        .then((message2) => deleteMessages(message, message2));
    if (
      message.member.permissions.has("ADMINISTRATOR") &&
      senderRole.position > role.position
    )
      return message
        .reply(config.lang.verification.position_above(message.author, args))
        .then((message2) => deleteMessages(message, message2));
    if (
      !message.guild.members.me.permissions.has("MANAGE_NICKNAMES") ||
      !message.guild.members.me.permissions.has("MANAGE_ROLES")
    )
      return message
        .reply(
          config.lang.verification.missing_permission(message.author, args)
        )
        .then((message2) => deleteMessages(message, message2));

    const success = await message.reply(
      config.lang.verification.success(message.author, args)
    );
    await message.member.setNickname(
      config.commands.verification.prefix + " " + args
    );
    const newRole = await message.member.guild.roles.fetch(
      config.commands.verification.verified_role
    );
    await message.member.roles.add(newRole);

    deleteMessages(message, success);
  },
};
