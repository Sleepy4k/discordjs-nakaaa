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
import print from "#utils/print.js";
import CharacterAI from "node_characterai";
import { PermissionsBitField } from "discord.js";

let AIChat = null;
let isAIAutehnticated = false;
const characterAI = new CharacterAI();

export default {
  name: "messageCreate",

  run: async (client, message) => {
    if (message.author.bot || !message.guild || !message.id) return;

    let mentionprefix = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(client.prefix)})\\s*`);
    if (!mentionprefix.test(message.content)) return;

    const [_text, nprefix] = message.content.match(mentionprefix);
    const args = message.content.slice(nprefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0 && nprefix.includes(client.user.id)) return await client.sendEmbed(message, {
      description: "Kamu kenapa? kok mention aku? kangen ya? :smiling_face_with_tear:",
    });

    if (cmd.length > 0 && !client.mcommands.has(cmd) && !client.mcommands.find((cmds) => cmds.aliases && cmds.aliases.includes(cmd))) {
      if (!isAIAutehnticated && client.config.chatbot.token && client.config.chatbot.charId) {
        await characterAI.authenticateWithToken("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IkVqYmxXUlVCWERJX0dDOTJCa2N1YyJ9.eyJpc3MiOiJodHRwczovL2NoYXJhY3Rlci1haS51cy5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDQ0NzQ0MTY5NTE3MjQ1NTM5MTMiLCJhdWQiOlsiaHR0cHM6Ly9hdXRoMC5jaGFyYWN0ZXIuYWkvIiwiaHR0cHM6Ly9jaGFyYWN0ZXItYWkudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcwMDQ0ODcxNywiZXhwIjoxNzAzMDQwNzE3LCJhenAiOiJkeUQzZ0UyODFNcWdJU0c3RnVJWFloTDJXRWtucVp6diIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.hD52MQTZSi_qqvLYFYFfFoTFJEkrIcMY8_iCQoAFV08j63i5rk043vo3lf_KBqpZs_Fq37IlTHRsXgHR5F8STF7rFMvYtNhH0ecQI_G3YnhZKeXyETiwDCKFxzp044X1XYN5V0UUCr8CQvcaihB8oG8_-05cmxgjs40vzLJPoBdoU3F4qsRuWJ4xMsm1q3LeAPZIYVDhZiYWtvIUnMOfBp_n3-yAMLPLExumuaknn-qsBUSDF4aZxjarrn4w5jIKF4J82F2a4w0IjeYPUk_3LeNALSwECu9wpxcRBucQYRT_7HkoywqLzMDcASUkuf5UAF7W5-8gllKkX2Ke2BEIdA");
        const characterId = "IFdILKj2qmOyv6V53N85CGezo9V8v7dOMKXw42vuTrQ";
        AIChat = await characterAI.createOrContinueChat(characterId);
        isAIAutehnticated = true;
      }

      const response = await AIChat.sendAndAwaitResponse(cmd, true);

      return await client.sendEmbed(message, {
        description: response.text,
      });
    }

    const command = client.mcommands.get(cmd) || client.mcommands.find((cmds) => cmds.aliases && cmds.aliases.includes(cmd));
    if (!command) return client.sendEmbed(message, {
      title: "Invalid Command",
      description: `\`${cmd}\` is not valid command !!`,
      footer: client.getFooter(message),
    });

    if (command.userPermissions &&!message.member.permissions.has(PermissionsBitField.resolve(command.userPermissions))) {
      return client.sendEmbed(message, {
        title: "Permission Error",
        description: "You don't have enough Permissions !!",
        footer: client.getFooter(message),
      });
    } else if (command.botPermissions && !message.guild.members.me.permissions.has(PermissionsBitField.resolve(command.botPermissions))) {
      return client.sendEmbed(message, {
        title: "Permission Error",
        description: "I don't have enough Permissions !!",
        footer: client.getFooter(message),
      });
    } else if (client.cooldown(message, command) !== false) {
      return client.sendEmbed(message, {
        title: "Cooldown",
        description: `You are On Cooldown , wait \`${client.cooldown(message, command).toFixed()}\` Seconds`,
        footer: client.getFooter(message),
      });
    } else {
      print(`${message.author.tag} (${message.author.id}) ran command ${command.name} in ${message.guild.name} (${message.guild.id})`, "info");
      command.run(client, message, args, client.prefix);
    }
  },
};

/**
 * Escape regex
 *
 * @param {string} newprefix
 *
 * @returns {string}
 */
function escapeRegex(newprefix) {
  return newprefix?.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}

// Path: events\messageCreate.js
