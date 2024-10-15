const { Events } = require('discord.js');
const { en } = require('../preset/language')
const { db } = require('../server');

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        db.getConnection();

        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) {
            return console.error(`No command matching ${interaction.commandName} was found.`);
        }

        const commandFind = await db.query(`SELECT name, isOn FROM commandfunctions WHERE name=?`,
            [interaction.commandName]
        )

        if (commandFind[0][0] == undefined) {
            await db.query(
                `INSERT INTO commandfunctions (name, isOn) VALUES (?, ?)`,
                [interaction.commandName, 1]
            )
        }

        if (commandFind[0]['isOn'] == 0 || !interaction.guild) {
            !interaction.guild ? refusingAction = en.default.serverOnly : refusingAction = en.default.commandDisabledGlobally;

            return interaction.reply({
                content: refusingAction,
                ephemeral: true,
            });
        };

        // Execute the command
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(`${interaction.user.tag} (${interaction.user.id}) executed ${interaction.commandName}`, error)
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }

        db.releaseConnection();
    },
};