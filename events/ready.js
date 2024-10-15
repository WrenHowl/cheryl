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
            const blacklistFind = await db.query(
                `SELECT userId FROM blacklists`
            )

            let status = [
                `${bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Members!`,
                `${bot.guilds.cache.size} Servers!`,
                `${blacklistFind.length.toString()} Blacklisted Users!`,
                `Version ${configPreset.botInfo.version}`,
            ];

            if (counter == status.length) counter = 0;
            bot.user.setActivity(status[counter], { type: ActivityType.Watching });

            counter++;
        }, 10000);

        bot.guilds.cache.forEach(async (guild) => {
            await db.query(
                `INSERT INTO guilds (guildName, guildId, guildIcon, botIn) VALUES (?, ?, ?, ?)`,
                [guild.name, guild.id, guild.icon, 1]
            ).catch(async (error) => {
                if (error.code === 'ER_DUP_ENTRY') {
                    await db.query(
                        `UPDATE guilds SET guildName=?, guildIcon=?, botIn=? WHERE guildId=?`,
                        [guild.name, guild.icon, 1, guild.id]
                    )
                }
            })

            await db.query(
                `INSERT INTO loggings (guildId) VALUES (?)`,
                [guild.id]
            ).catch(async (error) => { })
        });

        console.log(`${localDate} The bot is ready!`);

        return db.releaseConnection();
    },
};