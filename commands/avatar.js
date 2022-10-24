const { MessageEmbed, Message } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Color = require("../config/color.json");

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'avatar' command is loaded.");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Get the avatar of a user.')
        .addUserOption(option => option
            .setName("user")
            .setDescription("User to get the avatar.")
            .setRequired(false)),
    execute: async (interaction, bot) => {
        const user = interaction.options.getUser("user");

        let MemberData = "";

        if (user) MemberData = user;
        if (!user) MemberData = interaction.user;

        const AvatarShown = new MessageEmbed()
            .setTitle("Avatar of " + MemberData.tag)
            .setImage(MemberData.displayAvatarURL({ dynamic: true, size: 512 }))
            .setColor(Color.Green)

        return interaction.reply({
            embeds: [AvatarShown]
        });
    }
};