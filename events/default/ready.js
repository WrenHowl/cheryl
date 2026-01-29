const { Events, ActivityType } = require('discord.js');
const { db, bot } = require('../../server');
const fs = require('node:fs');
const colors = require('colors');
const configPreset = require('../../config/main.json');

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute() {
        const request = await db.getConnection();

        let counter = 0;

        setInterval(async () => {
            const status = [
                `${bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} Members!`,
                `${bot.guilds.cache.size} Servers!`,
                `Version ${configPreset.botInfo.version}`,
            ];

            counter >= 2 ?
                counter = 0 :
                counter++;

            bot.user.setActivity(status[counter], { type: ActivityType.Watching });

            await request.query(
                `INSERT INTO status (id) VALUES (?)
                ON DUPLICATE KEY UPDATE timestamp=CURRENT_TIMESTAMP`,
                [
                    configPreset.botPrivateInfo.botId
                ]
            );
        }, 10000);

        bot.guilds.cache.forEach(async (guild) => {
            await request.query(
                `INSERT INTO guilds (name, id, avatar, bot_in, members) VALUES (?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE name=name, avatar=avatar, bot_in=bot_in, members=members`,
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