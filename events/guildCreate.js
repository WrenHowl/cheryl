const { Events } = require('discord.js');
const { logging, blacklist, ticket } = require('../preset/db');

const configPreset = require('../config/main.json');

module.exports = {
    name: Events.GuildCreate,
    once: false,
    execute: async (guild) => {
        let loggingData = await logging.findOne({ where: { guildId: guild.id } });
        let ticketData = await ticket.findOne({ where: { guildId: guild.id } });

        // Checking if the logging data or/and ticket data are missing
        if (!loggingData) {
            await logging.create({
                guildId: guild.id,
            });
        } else if (!ticketData) {
            await ticket.create({
                guildId: guild.id,
            });
        };

        let guildCreateChannel = guild.client.guilds.cache.get(configPreset.botInfo.supportServerId).channels.cache.get(configPreset.channelsId.botAdded);
        if (!guildCreateChannel) return;

        let owner = await guild.fetchOwner();
        let blacklistData = await blacklist.findOne({ where: { userId: owner.user.id } });

        // Checking if the owner is blacklisted
        blacklistData ? isBlacklisted = 'Yes' : isBlacklisted = 'No';

        // Making the embed and sending it
        let newguildEmbed = new EmbedBuilder()
            .setTitle('Bot Added')
            .addFields(
                { name: 'Server Name', value: '`' + guild.name.toString() + '`', inline: true },
                { name: 'Server ID', value: '`' + guild.id.toString() + '`', inline: true },
                { name: 'Members', value: '`' + guild.memberCount.toString() + '`', inline: false },
                { name: 'Owner Name', value: '`' + owner.user.tag.toString() + '`', inline: true },
                { name: 'Owner ID', value: '`' + owner.user.id.toString() + '`', inline: true },
                { name: 'blacklisted?', value: '`' + isBlacklisted + '`', inline: false },
            )
            .setColor('Green');

        return guildCreateChannel.send({
            embeds: [newguildEmbed]
        });
    }
};