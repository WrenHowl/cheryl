const { Events } = require('discord.js');
const { verifier, blacklist } = require('../preset/db')

module.exports = {
    name: Events.UserUpdate,
    once: false,
    execute: async (oldUpdate, newUpdate) => {
        // Check if the user has changed his username
        if (newUpdate.username !== oldUpdate.username) {
            await verifier.update({ userTag: newUpdate.username }, { where: { userId: oldUpdate.id } });
            await verifier.update({ staffTag: newUpdate.username }, { where: { staffId: oldUpdate.id } });
            await blacklist.update({ userTag: newUpdate.username }, { where: { userId: oldUpdate.id } });
            return blacklist.update({ staffTag: newUpdate.username }, { where: { staffId: oldUpdate.id } });
        };
    }
};