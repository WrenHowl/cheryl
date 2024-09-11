const { Events, EmbedBuilder } = require('discord.js');
const { db, date, bot } = require('../server');
const { language } = require('../preset/language');
const configPreset = require('../config/main.json');

module.exports = {
    name: Events.MessageCreate,
    once: false,
    execute: async (message) => {
        /*language(message, languageSet);

        db.query(`SELECT name, value FROM commandfunctions WHERE name=?`,
            [message],
            async (error, statement) => {
                console.log(error)

                console.log(statement)
            });

        // Prefix setup
        prefix ? prefixSet = prefix : prefixSet = configPreset.botInfo.messagePrefix;

        // Not answering the message if it's a bot or not using the prefix
        if (message.author.bot || message.content.indexOf(prefixSet) !== 0) return;

        // Setting up the command
        let argsSlice = message.content.slice(prefixSet.length).trim().split(/ +/);
        let command = argsSlice.shift().toLowerCase();
        let statusCommand = await commandFunction.findOne({ where: { name: command } });
        let args = message.content.split(' ');

        db.query(`SELECT name, value FROM commandfunctions WHERE name=?`,
            [message],
            async (error, statement) => {
                console.log(error)
                console.log(statement)
                if (!statement) {
                    await commandFunction.create({
                        name: command,
                        value: true,
                    });
                }

                if (statusCommand.value === false | !message.guild) {
                    !message.guild ?
                        refusingAction = languageSet.default.serverOnly :
                        refusingAction = languageSet.default.commandDisabledGlobally;

                    return message.reply({
                        content: refusingAction,
                        ephemeral: true,
                    });
                };

                return bot.commands.get()
            });*/
    }
};