const { Events, AttachmentBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas');
const { db } = require('../server');

module.exports = {
    name: Events.MessageCreate,
    once: false,
    execute: async (message) => {
        if (message.author.bot) return;

        const request = await db.getConnection()
        const xpPerMessage = 5;

        // Create user information in the database
        await request.query(
            'INSERT INTO users (`id`, `name`, `avatar`, `global_name`) VALUES (?, ?, ?, ?)',
            [
                message.author.id,
                message.author.username,
                message.author.avatar,
                message.author.globalName
            ]
        ).catch(async () => {
            await request.query(
                'UPDATE users SET `name`=?, `global_name`=?, `avatar`=? WHERE id=?',
                [
                    message.author.username,
                    message.author.globalName,
                    message.author.avatar,
                    message.author.id
                ]
            );
        })


        // Get the user and guild settings
        const userSettingFind = await request.query(
            `SELECT * FROM user_settings WHERE id=?`,
            [
                message.author.id
            ]
        );
        const guildSettingFind = await request.query(
            `SELECT * FROM guild_settings WHERE id=?`,
            [
                message.guild.id
            ]
        );

        // Lookup for user and server settings.
        if ((typeof userSettingFind[0][0] !== "undefined" && userSettingFind[0][0]['data_messageContent'] === 0) || (typeof guildSettingFind[0][0] !== "undefined" && guildSettingFind[0][0]['level_status'] === 0)) {
            return db.releaseConnection(request);
        }

        const levelFind = await request.query(
            'SELECT * FROM levels WHERE user_id=? AND guild_id=?',
            [
                message.author.id,
                message.guild.id
            ]
        )

        // Check if the user has data already in the server.
        if (typeof levelFind[0][0] === "undefined") {
            await request.query(
                'INSERT INTO levels (`guild_id`, `user_id`, `xp`) VALUES (?, ?, ?)',
                [
                    message.guild.id,
                    message.author.id,
                    xpPerMessage
                ]
            )

            return db.releaseConnection(request);
        }

        const xpIncrease = levelFind[0][0]['xp'] + xpPerMessage;

        await request.query(
            'UPDATE levels SET `xp`=? WHERE guild_id=? AND user_id=?',
            [
                xpIncrease,
                message.guild.id,
                message.author.id
            ]
        )

        const levelXpFind = await request.query(
            `SELECT * FROM level_xp WHERE xp=?`,
            [
                xpIncrease
            ]
        );

        if (typeof levelXpFind[0][0] !== "undefined") {
            await request.query(
                'UPDATE levels SET level=level + 1 WHERE guild_id=? AND user_id=?',
                [
                    message.guild.id,
                    message.author.id
                ]
            )
        }

        const perksFind = await request.query(
            'SELECT * FROM level_perks WHERE guild_id=? AND level=?',
            [
                message.guild.id,
                levelFind[0][0]['level']
            ]
        )

        if (typeof perksFind[0][0] !== "undefined" && !message.member.roles.cache.some(role => role.id === perksFind[0][0]['role_id'])) {
            await message.member.roles.add(perksFind[0][0]['role_id'])


            if ((typeof guildSettingFind[0][0] !== "undefined" && guildSettingFind[0][0]['level_rankup'] === 1) && (typeof userSettingFind[0][0] !== "undefined" && userSettingFind[0][0]['level_rankup'] === 1)) {
                // Create the levelup picture
                const canvas = Canvas.createCanvas(700, 250);
                const context = canvas.getContext('2d');

                // Profile picture
                const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ extension: 'png' }));

                Canvas.GlobalFonts.registerFromPath('./ressources/font/Poppins-SemiBold.ttf', 'Poppins')

                context.font = '60px Poppins';
                context.fillStyle = '#ffffff';
                context.fillText(`Level ${levelFind[0][0]['level'] + 1}`, canvas.width / 2.5, canvas.height / 1.8);

                context.beginPath();
                context.arc(125, 125, 100, 0, Math.PI * 2, true);
                context.closePath();
                context.clip();

                // Drawing profile picture
                context.drawImage(avatar, 25, 25, 200, 200);

                const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'leveling.png' });

                message.channel.send({
                    content: `Congrats ${message.author.toString()}, you leveled up! :partying_face:\n\n-# You do not want to receive this message when you level up? You can disable it on the website : https://cheryl-bot.ca/settings`,
                    files: [
                        attachment
                    ]
                })
            }
        }

        return db.releaseConnection(request);
    }
}