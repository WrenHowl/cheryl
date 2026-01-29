const { MessageFlags } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { en, fr, de, sp, nl } = require('../../preset/language.js');
const { db } = require('../../server.js');

// Start a coin flip for some XP.

module.exports = {
    data: new SlashCommandBuilder()
        .setName(en.commands.coinflip.setup.name)
        .setNameLocalizations({
            "fr": fr.commands.coinflip.setup.name,
            "de": de.commands.coinflip.setup.name,
            "es-ES": sp.commands.coinflip.setup.name,
            "nl": nl.commands.coinflip.setup.name
        })
        .setDescription(en.commands.coinflip.setup.description)
        .setDescriptionLocalizations({
            "fr": fr.commands.coinflip.setup.description,
            "de": de.commands.coinflip.setup.description,
            "es-ES": sp.commands.coinflip.setup.description,
            "nl": nl.commands.coinflip.setup.description
        })
        .addIntegerOption(option => option
            .setName(en.commands.coinflip.setup.amount.name)
            .setNameLocalizations({
                'fr': fr.commands.coinflip.setup.amount.name,
                'de': de.commands.coinflip.setup.amount.name,
                'es-ES': sp.commands.coinflip.setup.amount.name,
                'nl': nl.commands.coinflip.setup.amount.name
            })
            .setDescription(en.commands.coinflip.setup.amount.description)
            .setDescriptionLocalizations({
                'fr': fr.commands.coinflip.setup.amount.description,
                'de': de.commands.coinflip.setup.amount.description,
                'es-ES': sp.commands.coinflip.setup.amount.description,
                'nl': nl.commands.coinflip.setup.amount.description
            })
            .setRequired(true))
        .addUserOption(option => option
            .setName(en.commands.coinflip.setup.user.name)
            .setNameLocalizations({
                'fr': fr.commands.coinflip.setup.user.name,
                'de': de.commands.coinflip.setup.user.name,
                'es-ES': sp.commands.coinflip.setup.user.name,
                'nl': nl.commands.coinflip.setup.user.name
            })
            .setDescription(en.commands.coinflip.setup.user.description)
            .setDescriptionLocalizations({
                'fr': fr.commands.coinflip.setup.user.description,
                'de': de.commands.coinflip.setup.user.description,
                'es-ES': sp.commands.coinflip.setup.user.description,
                'nl': nl.commands.coinflip.setup.user.description
            })
            .setRequired(false)),
    execute: async (interaction) => {
        const optionInt = interaction.options.getInteger(en.commands.coinflip.setup.amount.name);
        const optionUser = interaction.options.getUser(en.commands.coinflip.setup.user.name);

        const request = await db.getConnection();

        const userFind = await request.query(
            `SELECT xp FROM levels WHERE user_id=? AND guild_id=?`,
            [
                interaction.user.id,
                interaction.guild.id
            ]
        )

        switch (true) {
            case typeof userFind[0][0] === "undefined" || (typeof userFind[0][0] !== "undefined" && userFind[0][0]['xp'] < 250):
                await interaction.reply({
                    content: 'You do not have enough XP to do a **Coin Flip**. You need a **minimum of 250 XP**.',
                    flags: [MessageFlags.Ephemeral]
                });

                return db.releaseConnection(request);
            case optionInt % 10 !== 0 && optionInt % 10 !== 5:
                await interaction.reply({
                    content: 'The number you are entering needs to end with **5** or **0**.',
                    flags: [MessageFlags.Ephemeral]
                });

                return db.releaseConnection(request);
            case optionInt > userFind[0][0]['xp']:
                await interaction.reply({
                    content: `You are trying to enter an amount of XP that you do not have. You currently have ${userFind[0][0]['xp']} XP.`,
                    flags: [MessageFlags.Ephemeral]
                });

                return db.releaseConnection(request);
            case optionUser !== null:
                await interaction.reply({
                    content: 'This feature is currently disabled.',
                    flags: [MessageFlags.Ephemeral]
                });

                return db.releaseConnection(request);
        }

        await interaction.reply({
            content: `Flipping the coin in **5**!`,
        });

        let i = 5;

        const flippingCoin = setInterval(async () => {
            i--;

            await interaction.editReply({
                content: `Flipping the coin in **${i}**!`,
            });

            if (!i <= 0) {
                return db.releaseConnection(request);
            }

            clearInterval(flippingCoin);

            if (Math.floor(Math.random() * 10) + 1 <= Math.floor(10 / 2)) {
                result = `**won** __${optionInt * 2}__ XP`;
                statusLevel = `+`;
            } else {
                result = `**lost** __${optionInt}__ XP`;
                statusLevel = `-`;
            }

            await interaction.editReply({
                content: `You flipped the coin and ${result}.`,
            })

            await request.query(
                `UPDATE levels SET xp = xp ${statusLevel} ? WHERE user_id=?`,
                [
                    optionInt,
                    interaction.user.id
                ]
            )
        }, 1000);

        return db.releaseConnection(request);
    }
};