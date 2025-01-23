const { Events } = require('discord.js');
const { db } = require('../server');

module.exports = {
    name: Events.GuildBanAdd,
    once: false,
    execute: async (bannedUser) => {
        const request = await db.getConnection()

        let blacklistFind = await request.query(
            'SELECT * FROM blacklists WHERE id=?',
            [bannedUser.user.id]
        )

        if (blacklistFind[0][0] != undefined) {
            await db.query(
                `UPDATE blacklists SET server_ban=? WHERE id=?`,
                [blacklistFind[0]['joinedServerBan'] + 1, bannedUser.user.id]
            );
        }

        return db.releaseConnection(request);
    }
};