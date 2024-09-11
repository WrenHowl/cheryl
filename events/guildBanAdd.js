const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildBanAdd,
    once: false,
    execute: async (bannedUser) => {
        await db.query(`SELECT joinedServerBan FROM blacklists WHERE userId=?`,
            [bannedUser.user.id])
            .then(async (response) => {
                response = response[0]
                if (response[0] == undefined) {
                    return;
                } else {
                    joinedServerBan = response['joinedServerBan'];

                    await db.query(`UPDATE blacklists SET joinedServerBan=? WHERE userId=?`,
                        [joinedServerBan++, bannedUser.user.id]
                    );
                }
            });
    }
};