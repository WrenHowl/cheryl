const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Furaffinity = require('furaffinity-api');
const { Type, Page, Rating } = require('furaffinity-api');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'nsfw' command is loaded.")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nsfw')
        .setDescription('Show nsfw!')
        .addStringOption(option => option
            .setName("type")
            .setDescription("What content you would like to get?")
            .setRequired(true)),
    execute: async (interaction, bot) => {
        const typeOptions = interaction.options.getString("type")

        if (!interaction.channel.nsfw) {
            return interaction.reply({
                content: "This channel must be ``NSFW`` to use this command here!",
                ephemeral: true,
            });
        };

        Furaffinity.Search(typeOptions, { Type, Rating, Page }).then(res => {

            const randomNumber = res.length;
            const randomImage = Math.floor(Math.random() * randomNumber);
            const imageSent = res[randomImage].thumb.large;

            const embed = new MessageEmbed()
                .setImage(imageSent)
                .setColor("2f3136")

            return interaction.reply({
                embeds: [embed],
            });
        });
    }
}