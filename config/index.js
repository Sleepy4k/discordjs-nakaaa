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
  interactions: {
    profile: {
      /**
       * @returns { SlashCommandBuilder }
       */
      data: () => {
        return new SlashCommandBuilder()
          .setName("profile")
          .setDescription("Show XII RPL 1 Profile");
      },
      /**
       * @param {import('discord.js').Client} client
       * @returns
       */
      message: (client) => {
        const embed = new EmbedBuilder()
          .setColor("Random")
          .setTitle("XII RPL 1 Profile")
          .setDescription("Ordanary Profile of XII RPL 1")
          .addFields({
            name: "Angkatan 28",
            value: "2020 - 2023",
            inline: false,
          })
          .addFields(
            {
              name: "Kelas",
              value: "XII RPL 1",
              inline: true,
            },
            {
              name: "Wali Kelas",
              value: "Agustina Dwi N, S.Pd",
              inline: true,
            },
            {
              name: "Jumlah Siswa",
              value: "34",
              inline: true,
            }
          )
          .setFooter({
            text: `XII RPL 1 | Bot by Nakaaaa#8558`,
            iconURL:
              "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
          })
          .setTimestamp();

        return {
          embeds: [embed],
          ephemeral: true,
        };
      },
    },
    siswa: {
      /**
       * @returns { SlashCommandBuilder }
       */
      data: () => {
        return new SlashCommandBuilder()
          .setName("siswa")
          .setDescription("List of XII RPL 1 Students");
      },
      /**
       * @param {import('discord.js').Client} client
       * @returns
       */
      message: (client) => {
        const embed = new EmbedBuilder()
          .setColor("Random")
          .setTitle("XII RPL 1 Students")
          .setDescription("List of XII RPL 1 Students")
          .addFields(
            {
              name: "A. Fredy Fitriadi M",
              value: "Absen 1",
              inline: true,
            },
            {
              name: "Abid Alauddin",
              value: "Absen 2",
              inline: true,
            },
            {
              name: "Abshar Hifzhudin",
              value: "Absen 3",
              inline: true,
            },
            {
              name: "Achmad Shofiyudin F.A",
              value: "Absen 4",
              inline: true,
            },
            {
              name: "Adam Fadhil S",
              value: "Absen 5",
              inline: true,
            },
            {
              name: "Adam Putra P",
              value: "Absen 6",
              inline: true,
            },
            {
              name: "Aditya Eka R",
              value: "Absen 7",
              inline: true,
            },
            {
              name: "Afridho Nur Z",
              value: "Absen 8",
              inline: true,
            },
            {
              name: "Agung Malik I",
              value: "Absen 9",
              inline: true,
            },
            {
              name: "Ahmad Aufa G.D.S",
              value: "Absen 10",
              inline: true,
            },
            {
              name: "Ahmad Ichsan M",
              value: "Absen 11",
              inline: true,
            },
            {
              name: "Akmal Hikmah T",
              value: "Absen 12",
              inline: true,
            },
            {
              name: "Alben Nugroho",
              value: "Absen 13",
              inline: true,
            },
            {
              name: "Albert Jonathan S",
              value: "Absen 14",
              inline: true,
            },
            {
              name: "Alfath Ashkhabus S",
              value: "Absen 15",
              inline: true,
            },
            {
              name: "Alifa Oty S",
              value: "Absen 16",
              inline: true,
            },
            {
              name: "Alrefa Putri M",
              value: "Absen 17",
              inline: true,
            },
            {
              name: "Alvin Adam M.S",
              value: "Absen 18",
              inline: true,
            },
            {
              name: "Ananda Regita C",
              value: "Absen 19",
              inline: true,
            },
            {
              name: "Anandito Hani S",
              value: "Absen 20",
              inline: true,
            },
            {
              name: "Andika Neviantoro",
              value: "Absen 21",
              inline: true,
            },
            {
              name: "Angger Panji L",
              value: "Absen 22",
              inline: true,
            },
            {
              name: "Anggit Adi P",
              value: "Absen 23",
              inline: true,
            },
            {
              name: "Anggit Refiyan",
              value: "Absen 24",
              inline: true,
            },
            {
              name: "Anisa Az-Zahra",
              value: "Absen 25",
              inline: true,
            }
          )
          .setFooter({
            text: `XII RPL 1 | Bot by Nakaaaa#8558`,
            iconURL:
              "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
          })
          .setTimestamp();

        return {
          embeds: [embed],
          ephemeral: true,
        };
      },
    },
    siswa2: {
      /**
       * @returns { SlashCommandBuilder }
       */
      data: () => {
        return new SlashCommandBuilder()
          .setName("siswa2")
          .setDescription("List of XII RPL 1 Students");
      },
      /**
       * @param {import('discord.js').Client} client
       * @returns
       */
      message: (client) => {
        const embed = new EmbedBuilder()
          .setColor("Random")
          .setTitle("XII RPL 1 Students")
          .setDescription("List of XII RPL 1 Students")
          .addFields(
            {
              name: "Apri Pandu W",
              value: "Absen 26",
              inline: false,
            },
            {
              name: "Ardia Alif R",
              value: "Absen 27",
              inline: true,
            },
            {
              name: "Ardzaricho Revansyah",
              value: "Absen 28",
              inline: true,
            },
            {
              name: "Ariella Lintang A",
              value: "Absen 29",
              inline: true,
            },
            {
              name: "Arif Dermawan",
              value: "Absen 30",
              inline: true,
            },
            {
              name: "Arina Intan R",
              value: "Absen 31",
              inline: true,
            },
            {
              name: "Arliey Januar A.P.M",
              value: "Absen 32",
              inline: true,
            },
            {
              name: "Arsya Fathiha R",
              value: "Absen 33",
              inline: true,
            },
            {
              name: "Arsyad Maulana A",
              value: "Absen 34",
              inline: true,
            }
          )
          .setFooter({
            text: `XII RPL 1 | Bot by Nakaaaa#8558`,
            iconURL:
              "https://cdn.discordapp.com/icons/1083339991331131392/495bb6b9a8bd90d2c09627ce2bec9a45.webp",
          })
          .setTimestamp();

        return {
          embeds: [embed],
          ephemeral: true,
        };
      },
    },
  },
};
