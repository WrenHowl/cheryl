const { Events } = require('discord.js');

module.exports = {
    name: Events.GuildBanAdd,
    once: false,
    execute: async (bannedUser) => {
        db.query(`UPDATE blacklists SET joinedServerBan + 1 WHERE userId=?`, [bannedUser.user.id]);
    }
};