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

const ruleId = "1083345847439331348";
const channelId = "1083339991884767354";
const announcementId = "1083353375787208784";
const { EmbedBuilder } = require("discord.js");

/**
 * @param {import('discord.js').Client} client
 */
module.exports = (client) => {
  client.on("guildMemberAdd", (member) => {
    const user = member;
    const server_name = member.guild.name;
    const username = member.user.username;
    const server_icon = member.guild.iconURL({ dynamic: true, size: 512 });
    const user_avatar = member.user.displayAvatarURL({
      dynamic: true,
      size: 512,
    });

    const message = `${user}`;
    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle(`Hello, ${username}!`)
      .setImage(user_avatar)
      .setDescription(
        `Hi ${user} Welcome To Our Server **__${server_name}__** \n\nSebelum itu, silahkan membuka <#${ruleId}> untuk membaca peraturan server kami \n\nDilanjutkan ke <#${announcementId}> untuk melihat berita terkini \n\nGood Luck!`
      )
      .addFields(
        { name: "Ketua Kelas", value: "Aditya Eka R", inline: true },
        { name: "Wakil Ketua kelas", value: "Ahmad Ichsan M", inline: true }
      )
      .setFooter({
        text: `${server_name} | Bot by Nakaaaa#8558`,
        iconURL: server_icon,
      })
      .setTimestamp();

    const channel = member.guild.channels.cache.get(channelId);

    if (!channel) return;

    channel.send({
      content: message,
      embeds: [embed],
    });
  });
};
