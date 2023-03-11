const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "say",
  cooldown: 2,
  aliases: ["curhat"],

  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').Message} message
   */
  exec: async (client, message, args) => {
    try {
      let string_message = args.slice(0).join(" ");
      if (string_message == "") string_message = " ";

      if (message.attachments.size > 0) {
        let mAuthor = message.author.lastMessageID;
        let message_id = message.channel.messages.cache.get(`${mAuthor}`);
        let gAttachment = message_id.attachments.map((file) => file.id);
        let attachment_id = message_id.attachments.get(`${gAttachment}`);
        let attached = `${attachment_id.url}`;

        message.delete();

        message.channel.send(`${string_message}`, {
          disableEveryone: true,
          files: [`${attached}`],
        });
      } else {
        if (!args[0]) {
          return;
        } else {
          message.delete();

          message.channel.send(`${string_message}`, { disableEveryone: true });
        }
      }
    } catch (error) {
      return message.channel.send(`Something went wrong: ${error.message}`);
    }
  },
};
