const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  options: {
    prefix: "!!",
    browser: "Discord iOS",
    status: {
      enable: true,
      type: "ONLINE",
    },
    activity: {
      enable: true,
      description: "On XII RPL 1 Discord Server",
      type: "WATCHING",
      url: "https://hub.com",
    },
    botId: "752179590776094780",
    token:
      "NzUyMTc5NTkwNzc2MDk0Nzgw.GClmrt.TKYejBs-OxncsHMarkODRwmQ8a0fZHvCnsYdw8",
  },
  lang: {
    error: {
      /**
       * @param { Date } time_left - Sisa waktu
       * @param { String } command - Nama Perintah
       * @param { import('discord.js').User } author - Pengeksukusi command
       * @returns { JSON }
       */
      cooldown: (author, time_left, command) => {
        return {
          embeds: [
            new EmbedBuilder()
              .setDescription(
                `Mohon ${time_left.toFixed(
                  1
                )} detik lagi sebelum menggunakan ${command}`
              )
              .setTitle("Cooldown")
              .setColor("Random")
              .setTimestamp(),
          ],
        };
      },
      unknown_command: (author, command) => {
        return {
          content: `Perintah ${command} tidak dikenali.`,
        };
      },
    },
    verification: {
      success: (author, name) => {
        return {
          content: "Sucessfully verified",
        };
      },
      duplicate: (author, name) => {
        return {
          content: "Username already exists!",
        };
      },
      position_above: (author, name) => {
        return {
          content: "I can't change your nickname, because you're above me!",
        };
      },
      missing_permission: (author, name) => {
        return {
          content: "I can't change your nickname, please contact administrator",
        };
      },
      already_verified: (author, name) => {
        return {
          content: "You are already verified!",
        };
      },
    },
  },
  commands: {
    verification: {
      prefix: "[Mod]",
      verified_role: "1084037342282657792",
      channel_id: "1083343830184624148",
      success: (client, message) => {
        return {
          content: "Successfully verified",
        };
      },
    },
  },
};
