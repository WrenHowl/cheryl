const { Events } = require('discord.js');
const { db } = require('../server');
const { updateGuildDB } = require('./ready');

const configPreset = require('../config/main.json');

module.exports = {
    name: Events.GuildCreate,
    once: false,
    execute: async (guild) => {
        updateGuildDB(guild, 1);

        db.query(`SELECT guildId FROM loggings WHERE guildId=?`, [guild.id], (error, statement) => {
            if (!statement) {
                db.query(`INSERT INTO loggings (guildId) VALUES (?)`, [guild.id]);
            };
        });

        db.query(`SELECT guildId FROM tickets WHERE guildId=?`, [guild.id], (error, statement) => {
            if (!statement) {
                db.query(`INSERT INTO tickets (guildId) VALUES (?)`, [guild.id]);
            };
        });

        let guildCreateChannel = guild.client.guilds.cache.get(configPreset.botInfo.supportServerId).channels.cache.get(configPreset.channelsId.botAdded);
        if (!guildCreateChannel) return;

        let owner = await guild.fetchOwner();

        db.query(`SELECT userId FROM blacklists WHERE userId=?`, [owner.user.id], (error, statement) => {
            statement ? isBlacklisted = 'Yes' : isBlacklisted = 'No';
        });

        let newguildEmbed = new EmbedBuilder()
            .setTitle('Bot Added')
            .addFields(
                { name: 'Server Name', value: guild.name.toString(), inline: true },
                { name: 'Server ID', value: guild.id.toString(), inline: true },
                { name: 'Members', value: guild.memberCount.toString(), inline: false },
                { name: 'Owner Name', value: owner.user.tag.toString(), inline: true },
                { name: 'Owner ID', value: owner.user.id.toString(), inline: true },
                { name: 'blacklisted?', value: isBlacklisted.toString(), inline: false },
            )
            .setColor('Green');

        return guildCreateChannel.send({
            embeds: [newguildEmbed]
        });
    }
};