const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Furaffinity = require('furaffinity-api');
const { Type, Page, Rating } = require('furaffinity-api');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'pat' command is loaded.")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pat')
        .setDescription('Pat a user.')
        .addUserOption(option => option.setName("user").setDescription("User to pat").setRequired(true)),
    execute: async (interaction, bot) => {
        const user = interaction.options.getUser("user")

        Furaffinity.Search('sfw pat', { Type, Rating, Page }).then(res => {

            const randomNumber = res.length;
            const randomImage = Math.floor(Math.random() * randomNumber);
            const imageSent = res[randomImage].thumb.large;

            const embed = new MessageEmbed()
                .setImage(imageSent)
                .setColor("2f3136")

            return interaction.reply({
                embeds: [embed],
                content: "<@" + user.id + ">, you got pat by <@" + interaction.user.id + ">"
            })
        });
    }
};