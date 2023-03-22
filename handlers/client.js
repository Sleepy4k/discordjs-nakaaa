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
import {
  Client,
  Partials,
  Collection,
  EmbedBuilder,
  GatewayIntentBits,
} from "discord.js";
import config from "../config/index.js";
import { Player } from "discord-player";

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
          $browser: config.options.browser,
        },
      },
    });

    this.config = config;
    this.events = new Collection();
    this.scommands = new Collection();
    this.mcommands = new Collection();
    this.cooldowns = new Collection();
    this.prefix = config.options.prefix;

    this.player = new Player(this, {
      ytdlOptions: {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 27,
      },
    });
  }

  async build(token) {
    await loadHandlers(this);
    this.login(token).catch((e) => {
      console.log("The bot token is invalid!");
    });
  }

  async sendEmbed(interaction, data, ephemeral = false) {
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
    });
  }

  getFooter(client, type = "message") {
    if (!client) {
      return {
        text: `${config.options.name} | Bot by ${config.options.author}`,
        iconURL: config.options.icon,
      };
    }

    if (type === "message") {
      return {
        text: `Requested by ${client.author.username} | Bot by ${config.options.author}`,
        iconURL: client.author.displayAvatarURL({
          dynamic: true,
          format: "png",
        }),
      };
    } else {
      return {
        text: `Requested by ${client.user.username} | Bot by ${config.options.author}`,
        iconURL: client.user.displayAvatarURL({
          dynamic: true,
          format: "png",
        }),
      };
    }
  }

  /**
   * @type {import("../index.js").send}
   */
  async send(interaction, data) {
    try {
      if (interaction.replied || interaction.deferred) {
        return await interaction.editReply(data);
      } else {
        return await interaction.reply(data);
      }
    } catch (error) {
      console.log(error);
      await interaction.deferReply().catch((e) => {});
      return await interaction.editReply(data);
    }
  }
}

async function loadHandlers(client) {
  ["messageHandler", "slashHandler", "eventHandler"].forEach(async (file) => {
    let handler = await import(`./${file}.js`).then((r) => r.default);
    await handler(client);
  });
}

// Path: handlers\client.js
