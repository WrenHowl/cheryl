const { MessageActionRow, MessageButton } = require('discord.js');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'application' command is loaded.")

module.exports = {
    name: "application",
    execute: async (bot, message, args, MessageEmbed) => {
        if (!message.author.id === "291262778730217472") return;

        const channelToSend = message.guild.channels.cache.get("988481291198537768");

        const buttonToApply = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('applyForStaff')
                    .setLabel('📩 Apply')
                    .setStyle('SUCCESS'),
            );

        const messageInChannel = new MessageEmbed()
            .setTitle("Staff Application")
            .setDescription("You want to apply for staff? Well go on, click on 'apply' down below and try your chance!")
            .setColor("2f3136")

        await channelToSend.send({
            embeds: [messageInChannel],
            components: [buttonToApply],
        })
    }
};