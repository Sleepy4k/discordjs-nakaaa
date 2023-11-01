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
import print from "../utils/print.js";
import { InteractionType, PermissionsBitField } from "discord.js";

/**
 * @type {import("..").EventHandler}
 */
export default {
  name: "interactionCreate",

  run: async (client, interaction) => {
    if (interaction.user.bot || !interaction.guild) return;

    if (interaction.type == InteractionType.ApplicationCommand) {
      const command = client.scommands.get(interaction.commandName);

      if (!command)
        return await client.send(interaction, {
          content: `\`${interaction.commandName}\` is not valid command !!`,
          ephemeral: true,
        });

      if (command.userPermissions && !interaction.member.permissions.has(PermissionsBitField.resolve(command.userPermissions))) {
        return await client.sendEmbed(interaction, {
          title: "Permission Error",
          description: "You don't have enough Permissions !!",
          footer: client.getFooter(interaction, "interaction"),
        }, true);
      } else if (command.botPermissions && !interaction.guild.members.me.permissions.has(PermissionsBitField.resolve(command.botPermissions))) {
        return await client.sendEmbed(interaction, {
          title: "Permission Error",
          description: "I don't have enough Permissions !!",
          footer: client.getFooter(interaction, "interaction"),
        }, true);
      } else {
        print(`${interaction.user.tag} (${interaction.user.id}) ran command ${command.name} in ${interaction.guild.name} (${interaction.guild.id})`)
        command.run(client, interaction);
      }
    }
  },
};

// Path: events\interactionCreate.js
