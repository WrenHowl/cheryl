const { Events, ActivityType } = require('discord.js');
const { date } = require('../server');
const { blacklist } = require('../preset/db')

const configPreset = require('../config/main.json');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute: async (bot) => {
        bot.user.setStatus('dnd');

        let counter = 0;

        setInterval(async function () {
            let blacklistAllData = await blacklist.findAll({ attributes: ['userId'] });

            let status = [
                `${bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Members!`,
                `${bot.guilds.cache.size} Servers!`,
                `${blacklistAllData.length} Blacklisted Users!`,
                `Version ${configPreset.botInfo.version}`,
            ];

            if (counter === status.length) counter = 0;
            bot.user.setActivity(status[counter], { type: ActivityType.Watching });

            counter++;
        }, 5000)

        return console.log(`${date.toLocaleString()} -> The bot is ready!`);
    },
};