const { Client, Partials, GatewayIntentBits, Collection } = require('discord.js')
const { config: dotenvConfig } = require('dotenv')
const fs = require('fs')
const path = require('path')

class Kaiser extends Client {
    constructor(options) {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.GuildPresences,
            ],
            partials: [
                Partials.Message,
                Partials.Channel,
                Partials.Reaction,
                Partials.User,
                Partials.GuildMember,
            ],
            presence: { status: "dnd" },
            activity: { name: "Kaiser", type: "Playing" },
            disableEveryone: true,
            shards: "auto",
            fetchAllMembers: false,
            ...options,
        })
        this.commands = new Collection();
        this.aliases = new Collection();
        this.slashCommands = new Collection();
        this.logger = console;
    }
}

module.exports = Kaiser;