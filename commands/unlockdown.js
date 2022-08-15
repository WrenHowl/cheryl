const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'unlockdown' command is loaded.")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlockdown')
        .setDescription('Unlock a channel.'),
    execute: async (interaction, bot) => {
        if (interaction.member.permissions.has("MANAGE_MESSAGES")) {
            const channel = interaction.channel;
            channel.permissionOverwrites.edit(interaction.channel.guild.roles.everyone, { SEND_MESSAGES: true })
            const unLockdownSuccess = new MessageEmbed()
                .setDescription("The channel has been successfully unlock.")
                .setColor("2f3136")

            await interaction.reply({ embeds: [unLockdownSuccess] });
        } else {
            await interaction.reply({
                content: "You cannot execute this command! You need the following permission ``MANAGE_MESSAGES``.",
                ephemeral: true
            })
        }
    }
};