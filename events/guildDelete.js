const { Events, EmbedBuilder } = require('discord.js');
const { blacklist } = require('../preset/db')

module.exports = {
    name: Events.GuildDelete,
    once: false,
    execute: async (guild) => {
        let owner = await guild.fetchOwner();
        let blacklistData = await blacklist.findOne({ where: { userId: owner.user.id } });

        let removeGuildChannel = fetchgguild.client.guilds.cache.get(configPreset.botInfo.supportServerId).guild.channels.cache.get(configPreset.channelsId.botRemoved);
        if (!removeGuildChannel) return;

        // Checking if the owner is blacklisted
        blacklistData ? isBlacklisted = 'Yes' : isBlacklisted = 'No';

        // Making the embed and sending it
        let removeguildEmbed = new EmbedBuilder()
            .setTitle('Bot Removed')
            .addFields(
                { name: 'Server Name', value: '`' + guild.name.toString() + '`', inline: true },
                { name: 'Server ID', value: '`' + guild.id.toString() + '`', inline: true },
                { name: 'Members', value: '`' + guild.memberCount.toString() + '`', inline: false },
                { name: 'Owner Name', value: '`' + owner.user.tag.toString() + '`', inline: true },
                { name: 'Owner ID', value: '`' + owner.user.id.toString() + '`', inline: true },
                { name: 'Blacklisted?', value: '`' + isBlacklisted + '`', inline: false },
            )
            .setColor('Red');

        return removeGuildChannel.send({
            embeds: [removeguildEmbed]
        });
    }
};