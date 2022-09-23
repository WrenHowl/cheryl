const { channel } = require('diagnostics_channel');
const { MessageActionRow, MessageSelectMenu, } = require('discord.js');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'serverlist' command is loaded.")

module.exports = {
    name: "serverlist",
    execute: async (bot, message, args, MessageEmbed) => {
        if (!message.author.id === "291262778730217472") return;

        let serverlist = "";

        for (const [id, guild] of bot.guilds.cache) {
            const owner = await guild.fetchOwner();
            serverlist = serverlist.concat("**" + guild.name + "**\nID: ``" + guild.id + "`` | Owner: ``" + owner.user.tag + "``\n\n");
        }

        const ServerListEmbed = new MessageEmbed()
            .setDescription(serverlist)
            .setColor("2f3136")

        message.channel.send({ embeds: [ServerListEmbed] });

        bot.guilds.cache.forEach(guild => {
            guild.channels.cache.filter(c => c.type === "GUILD_TEXT").random().createInvite().then(invite =>
                console.log(invite.url)
            );
        })
    }
};