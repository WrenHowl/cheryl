const { Events } = require('discord.js');
const { bot } = require('../server');
const { fr, en, de, sp, nl } = require('../preset/language')
const { logging, commandFunction } = require('../preset/db')

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    execute: async (interaction) => {
        let loggingData = await logging.findOne({ where: { guildId: interaction.guild.id } });
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

        // Checking if it's an existing interaction command
        if (!interaction.isCommand()) return;

        let command = bot.commands.get(interaction.commandName);
        let statusCommand = await commandFunction.findOne({ where: { name: interaction.commandName } });

        if (!statusCommand) {
            await commandFunction.create({
                name: interaction.commandName,
                value: true,
            });
        } else {
            if (statusCommand.value === false | !interaction.guild) {
                refusingAction = languageSet.default.commandDisabledGlobally;
                !interaction.guild ? refusingAction = languageSet.default.serverOnly : false;

                return interaction.reply({
                    content: refusingAction,
                    ephemeral: true,
                });
            };
        };

        // Execute the command
        return command.execute(interaction);
    },
};