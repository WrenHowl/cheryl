const { Events } = require('discord.js');
const { blacklist } = require('../preset/db');

module.exports = {
    name: Events.GuildBanAdd,
    once: false,
    execute: async (bannedUser) => {
        let blacklistData = await blacklist.findOne({ where: { userId: bannedUser.user.id } });

        if (blacklistData) {
            blacklistData.increment('joinedServerBan', { by: 1 });
        };
    }
};