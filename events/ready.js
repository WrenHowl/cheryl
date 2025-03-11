const { Events, ActivityType } = require('discord.js');
const { db, bot } = require('../server');
const fs = require('node:fs');
const colors = require('colors');
const configPreset = require('../config/main.json');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute() {
        bot.user.setStatus('dnd');

        const request = await db.getConnection();

        setInterval(async () => {
            const blacklistFind = await request.query(
                `SELECT COUNT(*) FROM blacklists`
            )

            const blacklistAmount = blacklistFind ?
                blacklistFind[0][0]['COUNT(*)'] :
                0;
            let counter = 0;
            counter = counter === 3 ?
                0 :
                counter++;

            const status = [
                `${bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Members!`,
                `${bot.guilds.cache.size} Servers!`,
                `${blacklistAmount} Blacklisted Users!`,
                `Version ${configPreset.botInfo.version}`,
            ];

            bot.user.setActivity(status[counter], { type: ActivityType.Watching });
        }, 10000);

        bot.guilds.cache.forEach(async (guild) => {
            await request.query(
                `INSERT INTO guilds (name, id, avatar, bot_in, members) VALUES (?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE name=VALUES(name), avatar=VALUES(avatar), bot_in=VALUES(bot_in), members=VALUES(members)`,
                [
                    guild.name,
                    guild.id,
                    guild.icon,
                    1,
                    guild.memberCount
                ]
            );

            await request.query(
                `INSERT INTO guild_settings (id) VALUES (?)
                ON DUPLICATE KEY UPDATE id=VALUES(id)`,
                [
                    guild.id
                ]
            );
        });
        console.log(`${new Date().toLocaleString()} → The bot is ready!`.green);

        fs.writeFile(`./logs/log-${new Date().toLocaleDateString()}.txt`, `${new Date().toLocaleString()} → The bot is ready!\n\n`, { flag: 'a+' }, callback => { });

        return db.releaseConnection(request);
    },
};