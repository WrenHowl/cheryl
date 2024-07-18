const { Events, EmbedBuilder } = require('discord.js');
const { logging, blacklist, ticket } = require('../preset/db')

const configPreset = require('../config/main.json');

module.exports = {
    name: Events.MessageCreate,
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

        // Making the embed and sending it
        let newguildEmbed = new EmbedBuilder()
            .setTitle('Bot Added')
            .addFields(
                { name: 'Server Name', value: '`' + guild.name + '`', inline: true },
                { name: 'Server ID', value: '`' + guild.id + '`', inline: true },
                { name: 'Members', value: '`' + guild.memberCount + '`', inline: false },
                { name: 'Owner ID', value: '`' + guild.ownerId + '`', inline: true },
            )
            .setColor('Green');

        return guildCreateChannel.send({
            embeds: [newguildEmbed]
        });
    }
};