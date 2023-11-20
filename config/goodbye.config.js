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

const goodbye = {
  enable: process.env.GOODBYE_ENABLE || true,
  channel_id: process.env.GOODBYE_CHANNEL || "1084131071886635058",
  message: (member) => {
    const server_icon = member.guild.iconURL({ dynamic: true, size: 512 });
    const user_avatar = member.user.displayAvatarURL({
      dynamic: true,
      size: 512,
    });

    return {
      embeds: [
        new EmbedBuilder()
          .setColor("Red")
          .setTitle(`Selamat Tinggal, ${member.user.username}!`)
          .setImage(user_avatar)
          .setDescription(
            `Selamat tinggal ${member} Maafin dari kami kalau kami ada berbuat yang kamu tidak suka :(`
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

export default goodbye;

// Path: config/goodbye.js