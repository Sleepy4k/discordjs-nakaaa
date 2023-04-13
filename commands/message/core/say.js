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
import print from "../../../utils/print.js";
import { PermissionFlagsBits } from "discord.js";

/**
 * @type {import("../../../index.js").Mcommand}
 */
export default {
  name: "say",
  description: "Make the bot say something.",
  userPermissions: PermissionFlagsBits.SendMessages,
  botPermissions: PermissionFlagsBits.SendMessages,
  category: "core",
  cooldown: 5,

  run: async (client, message, args, prefix) => {
    let say = args.slice(0).join(" ");

    if (!say) {
      return client
        .sendEmbed(message, {
          color: "Red",
          title: "Say something!",
          description: `\`\`\`Usage: ${prefix}say <text>\`\`\``,
          footer: client.getFooter(message),
        })
        .catch((err) => {
          print(`SendEmbed Error: ${err.message}`);
        });
    }

    return client
      .sendEmbed(message, {
        color: "Navy",
        description: `\`\`\`${say}\`\`\``,
        footer: client.getFooter(message),
      })
      .catch((err) => {
        print(`SendEmbed Error: ${err.message}`);
      });
  },
};

// Path: commands\message\core\say.js
