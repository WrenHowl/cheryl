const { Events } = require('discord.js');
const { db } = require('../../server');

module.exports = {
    name: Events.MessageDelete,
    once: false,
    execute: async (message) => {
        if (typeof message.author === 'object' || message.author.bot) return;

        const request = await db.getConnection();

        message.attachments.forEach(async (attachment) => {
            await request.query(
                `INSERT INTO log_deletedMessages (guild_id, user_id, message_id, message_content) VALUES (?, ?, ?, ?)`,
                [
                    message.guildId,
                    message.author.id,
                    message.id,
                    attachment.url
                ]
            );
        });

        if (message.content !== '') {
            await request.query(
                `INSERT INTO log_deletedMessages (guild_id, user_id, message_id, message_content) VALUES (?, ?, ?, ?)`,
                [
                    message.guildId,
                    message.author.id,
                    message.id,
                    message.content
                ]
            );
        }

        return db.releaseConnection(request);
    }
};