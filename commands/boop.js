const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'boop' command is loaded.")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('boop')
        .setDescription('Boop a member!')
        .addUserOption(option => option.setName("user").setDescription("User to boop").setRequired(true)),
    execute: async (interaction, bot) => {
        const user = interaction.options.getUser("user")
        const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => { })

        if (!member) {
            return interaction.reply({
                content: "I can't find this user!",
                ephemeral: true
            })
        }

        const boopEmbed = new MessageEmbed()
            .setImage("https://tenor.com/bNZnN.gif")
            .setColor("2f3136")
        await interaction.reply({
            embeds: [boopEmbed],
            content: "<@" + member.id + ">, you got boop by <@" + interaction.member.id + ">"
        })
    }
};