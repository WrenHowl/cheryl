const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'afk' command is loaded.")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('afk')
        .setDescription('Set yourself AFK.')
        .addStringOption(option => option
            .setName("reason")
            .setDescription("Provide the reason.")
            .setRequired(false)),
    execute: async (interaction, bot, sequelize, Sequelize) => {
        let GetReason = interaction.options.getString("reason")

        if (!GetReason) GetReason = "N/A"

        const replyAFK = new MessageEmbed()
            .setDescription("You're now ``AFK`` for ``" + GetReason + "``")

        await interaction.reply({
            embeds: [replyAFK],
            ephemeral: false,
        });

        const AFK = sequelize.define("AFK", {
            UserID: {
                type: Sequelize.STRING,
                unique: false,
            },
            EnableDisable: {
                type: Sequelize.STRING,
                unique: false,
            },
            Reason: {
                type: Sequelize.STRING,
                unique: true,
            },
        });

        const SetAFK = await AFK.findOne({ where: { UserID: interaction.user.id } })

        if (!SetAFK) {
            const CreateUserAFK = await AFK.create({
                UserID: interaction.user.id,
                EnableDisable: true,
                Reason: GetReason,
            })
        } else {
            const SetAFK = await AFK.update({ EnableDisable: true, Reason: GetReason }, { where: { UserID: interaction.user.id } })
        }
    }
}