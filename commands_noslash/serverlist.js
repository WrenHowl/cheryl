const { channel } = require('diagnostics_channel');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'serverlist' command is loaded.")

module.exports = {
    name: "serverlist",
    execute: async (bot, message, args, MessageEmbed) => {
        if (!message.author.id === "291262778730217472") return;

        bot.guilds.cache.forEach(guild => {
            const serverList = new MessageEmbed()
                .setDescription("**Name:** " + guild.name + " | **ID:** " + guild.id + " | **OwnerID:** " + guild.ownerId)
                .setColor("2f3136")

            message.channel.send({ embeds: [serverList] });
        })
    }
};