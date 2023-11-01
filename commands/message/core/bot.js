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
import os from "os";
import cpuStat from "cpu-stat";
import moment from "moment/moment.js";
import print from "../../../utils/print.js";
import parseDur from "../../../utils/parseDur.js";
import { version, PermissionFlagsBits } from "discord.js";

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "bot",
  description: "Show bot information.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "core",
  cooldown: 5,

  run: async (client, message, args, prefix) => {
    const formatOS = {
      aix: "IBM AIX",
      darwin: "Darwin",
      freebsd: "FreeBSD",
      linux: "Linux",
      openbsd: "OpenBSD",
      sunos: "SunOS",
      win32: "Windows",
    };

    try {
      cpuStat.usagePercent(function (error, percent, seconds) {
        if (error) return console.error(error);

        return client.sendEmbed(message, {
          title: "Bot Information",
          thumbnail: client.user.displayAvatarURL({
            dynamic: true,
            size: 512,
          }),
          color: message.guild.members.cache.get(client.user.id).displayHexColor,
          fields: [
            {
              name: "============================",
              value: "**GENERAL** \n**============================**",
              inline: false,
            },
            {
              name: "🗿 Bot Name",
              value: `\`\`\`${client.user.tag}\`\`\``,
              inline: false,
            },
            {
              name: "📇 Bot ID",
              value: `\`\`\`${client.user.id}\`\`\``,
              inline: false,
            },
            {
              name: "🌐 Servers",
              value: `\`\`\`${client.guilds.cache.size.toLocaleString()} Servers\`\`\``,
              inline: false,
            },
            {
              name: "👥 Users",
              value: `\`\`\`${client.users.cache.size.toLocaleString()} Users\`\`\``,
              inline: false,
            },
            {
              name: "📺 Channels",
              value: `\`\`\`${client.channels.cache.size.toLocaleString()} Channels\`\`\``,
              inline: false,
            },
            {
              name: "============================",
              value: "**SYSTEM** \n**============================**",
              inline: false,
            },
            {
              name: "📡 Platform",
              value: `\`\`\`${formatOS[os.platform()]}\`\`\``,
              inline: false,
            },
            {
              name: "📇 Node.js",
              value: `\`\`\`${process.version}\`\`\``,
              inline: false,
            },
            {
              name: "🌐 Discord.js",
              value: `\`\`\`v${version}\`\`\``,
              inline: false,
            },
            {
              name: "📟 CPU",
              value: `\`\`\`md\n${
                os.cpus().map((i) => `${i.model}`)[0]
              }\`\`\``,
              inline: false,
            },
            {
              name: "📟 CPU usage",
              value: `\`\`\`${percent.toFixed(2)}%\`\`\``,
              inline: false,
            },
            {
              name: "📟 Arch",
              value: `\`\`\`${os.arch()}\`\`\``,
              inline: false,
            },
            {
              name: "📟 Cores",
              value: `\`\`\`${os.cpus().length}\`\`\``,
              inline: false,
            },
            {
              name: "📟 CPU Speed",
              value: `\`\`\`${
                os.cpus().map((i) => `${i.speed}`)[0]
              }MHz\`\`\``,
              inline: false,
            },
            {
              name: "📡 Memory Usage",
              value: `\`\`\`${(
                process.memoryUsage().heapUsed /
                1024 /
                1024
              ).toFixed(2)} MB\`\`\``,
              inline: false,
            },
            {
              name: "============================",
              value: "**OTHER** \n**============================**",
              inline: false,
            },
            {
              name: "📅 Ping",
              value: `\`\`\`${client.ws.ping}ms\`\`\``,
              inline: false,
            },
            {
              name: "📅 Prefix",
              value: `\`\`\`${client.config.bot.prefix}\`\`\``,
              inline: false,
            },
            {
              name: "📅 Uptime",
              value: `\`\`\`${parseDur(client.uptime)}\`\`\``,
              inline: false,
            },
            {
              name: "📅 Created at",
              value: `\`\`\`${moment(client.user.createdTimestamp).format(
                "MMMM Do YYYY, h:mm:ss"
              )} | ${Math.floor(
                (Date.now() - client.user.createdTimestamp) / 86400000
              )} days(s) ago\`\`\``,
            },
          ],
          footer: client.getFooter(message)
        });
      });
    } catch (error) {
      print(`Something went wrong: ${error}`);

      return client.sendEmbed(message, {
        title: "Error",
        description: `Something went wrong: ${error}`,
        color: "RED",
        footer: client.getFooter(message),
      });
    }
  },
};

// Path: commands\message\core\bot.js
