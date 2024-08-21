const { Events } = require('discord.js');
const { fr, en, de, sp, nl } = require('../preset/language')
const { bot, db } = require('../server');

const languageSet = en;

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    execute: async (interaction) => {
        if (!interaction.isCommand()) return;

        let command = bot.commands.get(interaction.commandName);
        db.query(`SELECT name, isOn FROM commandfunctions WHERE name=?`,
            [interaction.commandName],
            async (error, statement) => {
                const statString = JSON.stringify(statement);
                const value = JSON.parse(statString);

                const commandState = value[0]['value'];
                if (!statement) {
                    db.query(
                        `INSERT INTO commandfunctions (name, value) VALUES (?, ?)`,
                        [interaction.commandName, 1]
                    );
                };

                if (commandState === 0 || !interaction.guild) {
                    !interaction.guild ? refusingAction = languageSet.default.serverOnly : refusingAction = languageSet.default.commandDisabledGlobally;

                    return interaction.reply({
                        content: refusingAction,
                        ephemeral: true,
                    });
                };

                // Execute the command
                return command.execute(interaction);
            });
    },
};