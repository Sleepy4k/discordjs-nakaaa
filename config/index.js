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

const config = {
  options: {
    name: process.env.BOT_NAME || "Sleepy4k",
    icon: process.env.BOT_ICON || "https://i.imgur.com/8Q9ZQ2M.png",
    token: process.env.BOT_TOKEN || "your-bot-token",
    prefix: process.env.BOT_PREFIX || "$",
    author: process.env.BOT_AUTHOR || "Nakaaaa#8558",
    browser: process.env.BOT_BROWSER || "Discord iOS",
  },
  activity: {
    type: process.env.ACTIVITY_TYPE || "dnd",
    description: process.env.ACTIVITY_NAME || "Bot Status",
  },
  emoji: {
    success: "✅",
    error: "❌",
    loading: "🔃",
    warn: "⚠️",
    info: "ℹ️",
  },
  slash: {
    global: true,
    guild_id: ["1083959134602412164"],
  },
  anti_crash: {
    enable: true,
    webhook: {
      url:
        process.env.ANTI_CRASH_URL ||
        "https://discord.com/api/webhooks/1084337532105392148/cQsOCefThG_am0tZ4fKi9gcr3WhPBlrB347WYGsfrcz5iUv7dEzLUhT2f9wgO0MEXbXs",
    },
  },
  welcome: {
    enable: true,
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
    },
  },
  goodbye: {
    enable: true,
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
    },
  },
  bad_words: {
    enable: true,
    list: [
      "anjing",
      "babi",
      "bangsat",
      "kontol",
      "memek",
      "puki",
      "ngentot",
      "goblok",
      "tolol",
      "bego",
      "bejat",
      "bacot",
    ],
  },
};

export default config;

// Path: config\index.js
