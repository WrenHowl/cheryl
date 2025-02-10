const { Events } = require('discord.js');
const { en } = require('../preset/language')
const { db, consoleDate } = require('../server');

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if (!interaction.guild || !interaction.isCommand()) return;

        const request = await db.getConnection();

        await request.query(
            `INSERT INTO commands (name, status) VALUES (?, ?)`,
            [
                interaction.commandName,
                1
            ]
        ).catch(() => { });


        const commandFind = await request.query(
            `SELECT * FROM commands WHERE name=?`,
            [
                interaction.commandName
            ]
        );

        let option = interaction.options._hoistedOptions[0] ?? 'None';
        if (option !== 'None') {
            option = /\d/.test(option['value']) ?
                'None' :
                option['value'];
        }

        const commandStatFind = await request.query(
            `SELECT * FROM command_stats WHERE name=? AND extra_option=?`,
            [
                interaction.commandName,
                option
            ]
        );

        if (commandStatFind[0][0] === undefined) {
            await request.query(
                `INSERT INTO command_stats (name, extra_option, usage_count) VALUES (?, ?, ?)`,
                [
                    interaction.commandName,
                    option,
                    1
                ]
            )
        } else {
            await request.query(
                `UPDATE command_stats SET usage_count = usage_count + 1 WHERE name=? AND extra_option=?`,
                [
                    interaction.commandName,
                    option
                ]
            );
        }

        if (commandFind[0]['status'] === 0 || !interaction.guild) {
            let refusingAction = !interaction.guild ?
                en.global.serverOnly :
                en.global.commandDisabledGlobally;

            await interaction.reply({
                content: refusingAction,
                ephemeral: true,
            });
        } else {
            //
            // Execute the command
            try {
                const command = interaction.client.commands.get(interaction.commandName);
                await command.execute(interaction);
            } catch (error) {
                console.error(
                    `${consoleDate} ${interaction.user.tag} (${interaction.user.id}) executed ${interaction.commandName}\n\n`,
                    error
                )
            }
        }

        return db.releaseConnection(request);
    },
};