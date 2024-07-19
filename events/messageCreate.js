const fs = require('node:fs');
const path = require('node:path');
const { Events, EmbedBuilder } = require('discord.js');
const { bot } = require('../server');
const { fr, en, de, sp, nl } = require('../preset/language');
const { logging, commandFunction, sequelize, Sequelize } = require('../preset/db');

const configPreset = require('../config/main.json');

module.exports = {
    name: Events.MessageCreate,
    once: false,
    execute: async (message) => {
        let loggingData = await logging.findOne({ where: { guildId: message.guild.id } });

        switch (loggingData.language) {
            case ('en'):
                languageSet = en;
                break;
            case ('fr'):
                languageSet = fr;
                break;
            case ('de'):
                languageSet = de;
                break;
            case ('sp'):
                languageSet = sp;
                break;
            case ('nl'):
                languageSet = nl;
                break;
            default:
                languageSet = en;
                break;
        };

        // File Path
        let commandsPath = path.join(__dirname, '../commands_noslash');
        let commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (let file of commandFiles) {
            let filePath = path.join(commandsPath, file);
            let command = require(filePath);
            bot.commands.set(command.name, command);
        };

        // Prefix setup
        loggingData.prefix ? prefixSet = loggingData.prefix : prefixSet = configPreset.botInfo.messagePrefix;

        // Not answering the message if it's a bot or not using the prefix
        if (message.author.bot || message.content.indexOf(prefixSet) !== 0) return;

        // Setting up the command
        let args = message.content.slice(prefixSet.length).trim().split(/ +/);
        let command = args.shift().toLowerCase();
        let statusCommand = await commandFunction.findOne({ where: { name: command } });

        if (!statusCommand) {
            await commandFunction.create({
                name: command,
                value: true,
            });
        } else {
            if (statusCommand.value === false | !message.guild) {
                !message.guild ?
                    refusingAction = languageSet.default.serverOnly :
                    refusingAction = languageSet.default.commandDisabledGlobally;

                return message.reply({
                    content: refusingAction,
                    ephemeral: true,
                });
            };
        };

        switch (command) {
            case (en.cmd.default.name):
                return bot.commands.get(en.cmd.default.name).execute(bot, message, sequelize, Sequelize);
            case (en.language.default.name):
                return bot.commands.get(en.language.default.name).execute(bot, message, sequelize, Sequelize);
            case (en.data.default.name):
                return bot.commands.get(en.data.default.name).execute(bot, message, sequelize, Sequelize);
            case (en.ban.default.name):
                return bot.commands.get(en.ban.default.name).execute(bot, message, EmbedBuilder, sequelize, Sequelize);
            case (en.unban.default.name):
                return bot.commands.get(en.unban.default.name).execute(bot, message, EmbedBuilder, sequelize, Sequelize);
            case (en.ticket.default.name):
                return bot.commands.get(en.ticket.default.name).execute(bot, message, EmbedBuilder, sequelize, Sequelize);
        };
    }
};