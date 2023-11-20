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
import config from "#config/_index.js";
import { Player } from "discord-player";
import CharacterAI from "node_characterai";
import {
  Client,
  Message,
  Partials,
  Collection,
  EmbedBuilder,
  GatewayIntentBits,
  CommandInteraction
} from "discord.js";

export class Bot extends Client {
  constructor() {
    super({
      shards: "auto",
      restTimeOffset: 0,
      autoReconnect: true,
      fetchAllMembers: true,
      failIfNotExists: false,
      disabledEvents: ["TYPING_START"],
      allowedMentions: {
        users: [],
        roles: [],
        repliedUser: true,
        parse: ["users", "roles"],
      },
      intents: [
        GatewayIntentBits.Guilds, // for guild related things
        GatewayIntentBits.GuildMembers, // for guild members related things
        GatewayIntentBits.GuildInvites, // for guild invite managing
        GatewayIntentBits.GuildMessages, // for guild messages things
        GatewayIntentBits.GuildWebhooks, // for discord webhooks
        GatewayIntentBits.MessageContent, // enable if you need message content things
        GatewayIntentBits.DirectMessages, // for dm messages
        GatewayIntentBits.GuildPresences, // for user presence things
        GatewayIntentBits.GuildVoiceStates, // for voice related things
        GatewayIntentBits.GuildIntegrations, // for discord Integrations
        GatewayIntentBits.GuildMessageTyping, // for message typing things
        GatewayIntentBits.DirectMessageTyping, // for dm message typinh
        GatewayIntentBits.GuildMessageReactions, // for message reactions things
        GatewayIntentBits.GuildEmojisAndStickers, // for manage emojis and stickers
        GatewayIntentBits.DirectMessageReactions, // for dm message reaction
      ],
      partials: [
        Partials.User, // for discord user
        Partials.Message, // for message
        Partials.Channel, // for text channel
        Partials.Reaction, // for message reaction
        Partials.GuildMember, // for guild member
        Partials.ThreadMember, // for thread member
        Partials.GuildScheduledEvent, // for guild events
      ],
      ws: {
        properties: {
          $browser: config.bot.browser,
        },
      },
    });

    this.config = config;
    this.events = new Collection();
    this.scommands = new Collection();
    this.mcommands = new Collection();
    this.cooldowns = new Collection();
    this.prefix = this.config.bot.prefix;
    this.chatbot = {
      AIChat: null,
      isAIAutehnticated: false,
      characterAI: new CharacterAI(),
    };

    this.player = new Player(this, {
      ytdlOptions: {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 27,
      },
    });
  }

  /**
   * Build the bot with token
   *
   * @param {string} token
   *
   * @returns {Promise<void>}
   */
  async build(token) {
    await loadHandlers(this);
    await this.player.extractors.loadDefault();
    this.login(token).catch((e) => {
      print(e.message, "error");
    });
  }

  /**
   * Send embed to interaction
   *
   * @param {CommandInteraction} interaction
   * @param {object} data
   * @param {boolean} ephemeral
   *
   * @returns {Promise<Message>}
   */
  async sendEmbed(interaction, data, ephemeral = false, fetchReply = false) {
    try {
      const embed = new EmbedBuilder();

      if (data.url) embed.setURL(data.url);
      if (data.title) embed.setTitle(data.title);
      if (data.color) embed.setColor(data.color);
      if (data.image) embed.setImage(data.image);
      if (data.footer) embed.setFooter(data.footer);
      if (data.author) embed.setAuthor(data.author);
      if (data.fields) embed.addFields(data.fields);
      if (data.thumbnail) embed.setThumbnail(data.thumbnail);
      if (data.description) embed.setDescription(data.description);

      embed.setTimestamp();

      return await this.send(interaction, {
        embeds: [embed],
        ephemeral: ephemeral,
        fetchReply: fetchReply
      });
    } catch (error) {
      print(`Send Embed Error: ${error.message}`);

      if (interaction) return await this.send(interaction, {
        content: "Error: " + error.message,
        ephemeral: ephemeral,
        fetchReply: fetchReply
      });

      return await interaction.channel.send({
        content: "Error: " + error.message,
        ephemeral: ephemeral,
        fetchReply: fetchReply
      });
    }
  }

  /**
   * Get footer for embed
   *
   * @param {CommandInteraction} client
   * @param {string} type
   *
   * @returns {object}
   */
  getFooter(client, type = "message") {
    try {
      if (!client) return {
        text: `${config.bot.name} | Bot by ${config.bot.author}`,
        iconURL: config.bot.icon,
      };

      if (type === "message") return {
        text: `Requested by ${client.author.username} | Bot by ${config.bot.author}`,
        iconURL: client.author.displayAvatarURL({
          dynamic: true,
          format: "png",
        }),
      };

      return {
        text: `Requested by ${client.user.username} | Bot by ${config.bot.author}`,
        iconURL: client.user.displayAvatarURL({
          dynamic: true,
          format: "png",
        }),
      };
    } catch (error) {
      print(error.message, "error");

      return {
        text: `${config.bot.name} | Bot by ${config.bot.author}`,
        iconURL: config.bot.icon,
      };
    }
  }

  /**
   * Send message to interaction
   *
   * @param {CommandInteraction} interaction
   * @param {object} data
   *
   * @returns {Promise<Message>}
   */
  async send(interaction, data) {
    try {
      if (interaction.deferred) {
        return await interaction.editReply({
          embeds: data.embeds,
          ephemeral: data.ephemeral,
          fetchReply: data.fetchReply
        });
      } else if (interaction.replied) {
        return await interaction.deferReply({
          embeds: data.embeds,
          ephemeral: data.ephemeral,
          fetchReply: data.fetchReply
        });
      } else {
        return await interaction.reply({
          embeds: data.embeds,
          ephemeral: data.ephemeral,
          fetchReply: data.fetchReply
        });
      }
    } catch (error) {
      print(error.message, "error");
      await interaction.deferReply().catch((e) => {});
    }
  }

  /**
   * Handle cooldown for commands
   *
   * @param {CommandInteraction} interaction
   * @param {String} command
   *
   * @returns {Boolean|Number}
   */
  cooldown(interaction, command) {
    if (!interaction || !command) return;

    let { client, member } = interaction;
    if (!client.cooldowns.has(command.name)) client.cooldowns.set(command.name, new Collection());

    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldownAmount = command.cooldown * 1000;

    if (timestamps.has(member.id)) {
      const expirationTime = timestamps.get(member.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return timeLeft;
      }

      timestamps.set(member.id, now);
      setTimeout(() => timestamps.delete(member.id), cooldownAmount);
      return false;
    }

    timestamps.set(member.id, now);
    setTimeout(() => timestamps.delete(member.id), cooldownAmount);
    return false;
  }

  /**
   * Set log status for console log
   *
   * @param {String} name
   * @param {Boolean} isLoaded
   * @param {String} type
   *
   * @returns {void}
   */
  logStatus(name, isLoaded, type) {
    const statusIcon = isLoaded ? "\x1b[32m✅\x1b[0m" : "\x1b[31m❌\x1b[0m";
    const statusText = isLoaded ? "Loaded" : "Not Loaded";

    print(`${type} : ${name} | Status: ${statusIcon} ${statusText}`, "info");
  }

  /**
   * Init chatbot
   *
   * @returns {Promise<void>}
   */
  async initChatbot() {
    const { characterAI, isAIAutehnticated } = this.chatbot;
    const charConfig = config.chatbot;

    if (isAIAutehnticated || !charConfig.charId) return;

    try {
      if (charConfig.token) await characterAI.authenticateWithToken(charConfig.token);
      else await characterAI.authenticateAsGuest();

      this.chatbot.AIChat = await characterAI.createOrContinueChat(charConfig.charId);
      this.chatbot.isAIAutehnticated = true;
    } catch (error) {
      print(error.message, "error");
    }
  }
}

/**
 * Load all handlers
 *
 * @param {Bot} client
 *
 * @returns {Promise<void>}
 */
async function loadHandlers(client) {
  const { list } = client.config.handler;

  list.forEach(async (file) => {
    let handler = await import(`#handlers/${file}.handler.js`).then((r) => r.default);
    await handler(client);
  });
}

// Path: server\bot.js
