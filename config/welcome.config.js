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
import "dotenv/config.js";
import { EmbedBuilder } from "discord.js";

const welcome = {
  enable: process.env.WELCOME_ENABLE || true,
  channel_id: process.env.WELCOME_CHANNEL || "1083339991884767354",
  message: (member) => {
    const server_icon = member.guild.iconURL({ dynamic: true, size: 512 });
    const user_avatar = member.user.displayAvatarURL({
      dynamic: true,
      size: 512,
    });

    return {
      embeds: [
        new EmbedBuilder()
          .setColor("Blue")
          .setTitle(`Hello, ${member.user.username}!`)
          .setImage(user_avatar)
          .setDescription(
            `Hi ${member} Welcome To Our Server **__${member.guild.name}__**
            \n\nSebelum itu, silahkan membuka <#1083345847439331348> untuk membaca peraturan server kami
            \n\nDilanjutkan ke <#1083353375787208784> untuk melihat berita terkini
            \n\nGood Luck!`
          )
          .addFields(
            { name: "Ketua Kelas", value: "Aditya Eka R", inline: true },
            {
              name: "Wakil Ketua kelas",
              value: "Ahmad Ichsan M",
              inline: true,
            }
          )
          .setFooter({
            text: `${member.guild.name} | Bot by Nakaaaa#8558`,
            iconURL: server_icon,
          })
          .setTimestamp(),
      ],
    };
  }
}

export default welcome;

// Path: config/welcome.js