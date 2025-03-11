const { Events } = require('discord.js');
const { en } = require('../../preset/language')
const { db } = require('../../server');

module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if (!interaction.guild || !interaction.isCommand()) return;

        const request = await db.getConnection();

        await request.query(
            `INSERT INTO commands (name, status) VALUES (?, ?)
            ON DUPLICATE KEY UPDATE name=VALUES(name)`,
            [
                interaction.commandName,
                1
            ]
        );

        let option = interaction.options._hoistedOptions[0] ?? 'None';
        if (option !== 'None') {
            option = /\d/.test(option['value']) ?
                'None' :
                option['value'];
        }

        await request.query(
            `INSERT INTO command_stats (name, extra_option, usage_count) VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE usage_count = usage_count + 1`,
            [
                interaction.commandName,
                option,
                1
            ]
        )

        const commandFind = await request.query(
            `SELECT status FROM commands WHERE name=?`,
            [
                interaction.commandName
            ]
        );

        if (commandFind[0][0]['status'] === 0) {
            await interaction.reply({
                content: !interaction.guild ?
                    en.global.serverOnly :
                    en.global.commandDisabledGlobally,
                ephemeral: true,
            });
        } else {
            // Execute the command
            try {
                const command = interaction.client.commands.get(interaction.commandName);
                await command.execute(interaction);
            } catch (error) {
                console.error(
                    `${new Date().toLocaleString()} → ${interaction.user.tag} (${interaction.user.id}) executed ${interaction.commandName}\n\n`,
                    error
                )
            }
        }

        return db.releaseConnection(request);
    },
};