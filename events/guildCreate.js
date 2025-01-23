const { Events, EmbedBuilder } = require('discord.js');
const { db } = require('../server');
const { botInfo, channelsId } = require('../config/main.json');

module.exports = {
    name: Events.GuildCreate,
    once: false,
    execute: async (guild) => {
        const request = await db.getConnection()

        //
        // Find the guild data in the database
        const guildFind = await request.query(
            `SELECT * FROM guilds WHERE id=?`,
            [guild.id]
        )

        if (guildFind[0][0] == undefined) {
            await request.query(
                `INSERT INTO guilds (name, id, avatar, bot_in, members) VALUES (?, ?, ?, ?, ?)`,
                [guild.name, guild.id, guild.icon, 1, guild.memberCount]
            )
        } else {
            await request.query(
                `UPDATE guilds SET name=?, avatar=?, bot_in=?, members=? WHERE id=?`,
                [guild.name, guild.icon, 1, guild.memberCount, guild.id]
            )
        }

        //
        // Find logging data in database
        const loggingFind = await request.query(
            `SELECT * FROM guild_settings WHERE id=?`,
            [guild.id]
        )

        if (loggingFind[0][0] == undefined) {
            await request.query(
                `INSERT INTO guild_settings (id) VALUES (?)`,
                [guild.id]
            )
        }

        let owner = await guild.fetchOwner();

        // Lookup if the owner of the server is blacklisted
        const blacklistFind = await request.query(
            `SELECT * FROM blacklists WHERE id=?`,
            [owner.user.id]
        )

        isBlacklisted = blacklistFind[0][0] == undefined ?
            'No' :
            'Yes';

        let newGuildEmbed = new EmbedBuilder()
            .setTitle('Bot Added')
            .addFields(
                { name: 'Server Name', value: '`' + guild.name + '`', inline: true },
                { name: 'Server Id', value: '`' + guild.id + '`', inline: true },
                { name: 'Members', value: '`' + guild.memberCount.toString() + '`', inline: true },
                { name: '\u200b', value: '\u200b', inline: false },
                { name: 'Owner Name', value: '`' + owner.user.tag + '`', inline: true },
                { name: 'Owner Id', value: '`' + owner.user.id + '`', inline: true },
                { name: 'Blacklisted', value: '`' + isBlacklisted.toString() + '`', inline: true },
            )
            .setColor('Green');

        const guildCreateChannel = guild.client.guilds.cache.get(botInfo.supportServerId).channels.cache.get(channelsId.botAdded)
        await guildCreateChannel.send({
            embeds: [newGuildEmbed]
        });

        return db.releaseConnection(request);
    }
};