const { Events } = require('discord.js');
const { db } = require('../server');

module.exports = {
    name: Events.GuildBanAdd,
    once: false,
    execute: async (bannedUser) => {
        const request = await db.getConnection()

        let blacklistFind = await request.query(
            'SELECT userId FROM blacklists WHERE userId=?',
            [bannedUser.user.id]
        )

        if (blacklistFind[0][0] != undefined) {
            await db.query(
                `UPDATE blacklists SET joinedServerBan=? WHERE userId=?`,
                [blacklistFind[0]['joinedServerBan'] + 1, bannedUser.user.id]
            );
        }

        return db.releaseConnection(request);
    }
};