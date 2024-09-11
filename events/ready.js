const { Events, ActivityType } = require('discord.js');
const { db, localDate, bot } = require('../server');
const configPreset = require('../config/main.json');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute() {
        db.getConnection();

        bot.user.setStatus('dnd');

        let counter = 0;

        setInterval(async () => {
            await db.query(`SELECT userId, userTag FROM blacklists`)
                .then((response) => {
                    response = response[0];

                    let status = [
                        `${bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Members!`,
                        `${bot.guilds.cache.size} Servers!`,
                        `${response.length.toString()} Blacklisted Users!`,
                        `Version ${configPreset.botInfo.version}`,
                    ];

                    if (counter == status.length) counter = 0;
                    bot.user.setActivity(status[counter], { type: ActivityType.Watching });

                    counter++;
                });
        }, 10000);

        async function updateGuildDB(guild, botIn) {
            await db.query(`SELECT guildId FROM guilds WHERE guildId=?`,
                [guild.id])
                .then(async (response) => {
                    if (response[0][0] == undefined) {
                        await db.query(
                            `INSERT INTO guilds (guildName, guildId, guildIcon, botIn) VALUES (?, ?, ?, ?)`,
                            [guild.name, guild.id, guild.icon, botIn]
                        )
                    } else {
                        await db.query(
                            `UPDATE guilds SET guildName=?, guildIcon=?, botIn=? WHERE guildId=?`,
                            [guild.name, guild.icon, botIn, guild.id]
                        )
                    }
                });

            await db.query(`SELECT guildId FROM loggings WHERE guildId=?`,
                [guild.id])
                .then(async (response) => {
                    if (response[0][0] == undefined) {
                        await db.query(
                            `INSERT INTO loggings (guildId) VALUES (?)`,
                            [guild.id]
                        )
                    }
                });
        };

        bot.guilds.cache.forEach((guild) => {
            updateGuildDB(guild, 1);
        });

        console.log(`${localDate} The bot is ready!`);

        db.releaseConnection();

        return module.exports = { updateGuildDB };
    },
};