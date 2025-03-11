const { Events } = require('discord.js');
const { db } = require('../server');

module.exports = {
    name: Events.GuildBanAdd,
    once: false,
    execute: async (bannedUser) => {
        const request = await db.getConnection();

        await request.query(
            `UPDATE blacklists SET server_ban=server_ban + 1 WHERE id=?`,
            [
                bannedUser.user.id
            ]
        );

        return db.releaseConnection(request);
    }
};