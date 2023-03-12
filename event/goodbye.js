const { EmbedBuilder } = require("discord.js");
const channelId = "1084131071886635058";

/**
 * @param {import('discord.js').Client} client
 */
module.exports = (client) => {
  client.on("guildMemberRemove", (member) => {
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
      .setTitle(`Selamat Tinggal, ${username}!`)
      .setImage(user_avatar)
      .setDescription(
        `Selamat tinggal ${member} Maafin dari kami kalau kami ada berbuat yang kamu tidak suka :(`
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
