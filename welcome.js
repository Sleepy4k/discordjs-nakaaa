const { MessageEmbed } = require('discord.js'); // Importing MessageEmbed from Discord.js
const ruleId = '1083345847439331348'; // Rules ChannelID
const channelId = '1083339991884767354'; // Welcome ChannelID
const announcementId = '1083353375787208784'; // Announcement ChannelID

module.exports = (client) => {
    client.on('guildMemberAdd', (member) => {
        const server_name = member.guild.name; // Server Name
        const server_icon = member.guild.iconURL({ dynamic: true, size: 512 }); // Server Icon
        const user = member; // Mentions the Member
        const user_avatar = member.user.displayAvatarURL({ dynamic: true, size: 512 }); // User's Avatar
        const username = member.user.username; // Shows Member's Username
        const tag = member.user.tag; // Shows Member's Username and Tag

        const message = `${user}`;
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(`Hello, ${username}!`)
            .setImage(user_avatar)
            .setDescription(
                `Hi ${user} Welcome To Our Server **__${server_name}__** \n\nSebelum itu, silahkan membuka <#${ruleId}> untuk membaca peraturan server kami \n\nDilanjutkan ke <#${announcementId}> untuk melihat berita terkini \n\nGood Luck!`
            )
            .addFields({ name: 'Ketua Kelas', value: 'Adhitya Eka R', inline: true }, { name: 'Wakil Ketua kelas', value: 'Ahmad Ichsan M', inline: true })
            .setFooter({
                text: `${server_name} | Bot by Nakaaaa#8558`,
                iconURL: server_icon,
            })
            .setTimestamp();

        const channel = member.guild.channels.cache.get(channelId);
        channel.send({
            content: message,
            embeds: [embed],
        });
    });
};
