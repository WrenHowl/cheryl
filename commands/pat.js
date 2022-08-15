const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'pat' command is loaded.")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pat')
        .setDescription('Pat a user.')
        .addUserOption(option => option.setName("user").setDescription("User to pat").setRequired(true)),
    execute: async (interaction, bot) => {
        const user = interaction.options.getUser("user")
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => { })

        if (!member) {
            return interaction.reply({
                content: "I can't find this user!",
                ephemeral: true
            })
        }

        const patEmbed = new MessageEmbed()
            .setImage("https://tenor.com/bP2IV.gif")
            .setColor("2f3136")

        await interaction.reply({
            embeds: [patEmbed],
            content: "<@" + member.id + ">, you got boop by <@" + interaction.member.id + ">"
        })
    }
};