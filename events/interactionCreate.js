const { Events } = require('discord.js');
const { en } = require('../preset/language')
const { bot, db } = require('../server');

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if (!interaction.isCommand()) return;

        const command = bot.commands.get(interaction.commandName);

        await db.query(`SELECT name, isOn FROM commandfunctions WHERE name=?`,
            [interaction.commandName])
            .then(async (response) => {
                if (response[0][0] == undefined) {
                    await db.query(
                        `INSERT INTO commandfunctions (name, isOn) VALUES (?, ?)`,
                        [interaction.commandName, 1]
                    );
                }

                response = response[0];

                if (response['isOn'] == 0 || !interaction.guild) {
                    !interaction.guild ? refusingAction = en.default.serverOnly : refusingAction = en.default.commandDisabledGlobally;

                    return interaction.reply({
                        content: refusingAction,
                        ephemeral: true,
                    });
                };

                // Execute the command
                return command.execute(interaction);
            })
    },
};