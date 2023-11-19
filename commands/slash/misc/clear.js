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
import main from "#functions/misc/clear.js";
import { ApplicationCommandType, PermissionFlagsBits } from "discord.js";

/**
 * @type {import("../../../index.js").Scommand}
 */
export default {
  name: "clear",
  description: "Clear messages in the channel.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "misc",
  type: ApplicationCommandType.ChatInput,
  options: [{
    name: "message",
    description: "The message that you want delete.",
    type: 4,
    required: true,
  }],

  run: async (client, interaction) => {
    return main("slash", { client, interaction });
  }
};

// Path: commands\slash\misc\clear.js
