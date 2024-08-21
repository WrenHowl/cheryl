const { Events, ActivityType } = require('discord.js');
const { db, date, bot } = require('../server');
const configPreset = require('../config/main.json');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute: async () => {
        bot.user.setStatus('dnd');

        let counter = 0;

        setInterval(async function () {
            db.query(`SELECT userId, userTag FROM blacklists`, (error, statement) => {
                const stringCounter = JSON.stringify(statement);
                const jsonCounter = JSON.parse(stringCounter);

                let status = [
                    `${bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Members!`,
                    `${bot.guilds.cache.size} Servers!`,
                    `${jsonCounter.length.toString()} Blacklisted Users!`,
                    `Version ${configPreset.botInfo.version}`,
                ];

                if (counter === status.length) counter = 0;
                bot.user.setActivity(status[counter], { type: ActivityType.Watching });

                counter++;
            });
        }, 10000);

        function updateGuildDB(guild, botIn) {
            db.query(`SELECT guildId FROM guilds WHERE guildId=?`,
                [guild.id],
                (error, statement) => {
                    if (!statement) {
                        db.query(
                            `INSERT INTO guilds (guildId, guildName, guildIcon, botIn) VALUES (?, ?, ?, ?)`,
                            [guild.id, guild.name, guild.icon, 1]
                        )
                    } else {
                        db.query(
                            `UPDATE guilds SET guildName=?, guildIcon=?, botIn=? WHERE guildId=?`,
                            [guild.name, guild.icon, botIn, guild.id]
                        )
                    };
                });
        };

        bot.guilds.cache.forEach((guild) => {
            updateGuildDB(guild, 1);
        });

        module.exports = { updateGuildDB };

        return console.log(`${date.toLocaleString()} -> The bot is ready!`);
    },
};