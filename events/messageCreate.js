const { Events, AttachmentBuilder } = require('discord.js');
const Canvas = require('@napi-rs/canvas');
const { db } = require('../server');

module.exports = {
    name: Events.MessageCreate,
    once: false,
    execute: async (message) => {
        if (message.guild.id !== '1082103667181764659') return;
        if (message.author.bot) return;

        const request = await db.getConnection()

        const levelFind = await request.query(
            'SELECT xp, xpNext, level FROM level WHERE userId=? AND guildId=?',
            [message.author.id, message.guild.id]
        )

        if (levelFind[0][0] == undefined) {
            await db.query(
                'INSERT INTO level (`guildId`, `userId`, `xp`) VALUES (?, ?, ?)',
                [message.guild.id, message.author.id, 5]
            )
        } else {
            const xpIncrease = levelFind[0][0]['xp'] + 5;

            await db.query(
                'UPDATE level SET `xp`=? WHERE guildId=? AND userId=?',
                [xpIncrease, message.guild.id, message.author.id]
            )

            if (xpIncrease >= levelFind[0][0]['xpNext']) {
                const xpCurrent = levelFind[0][0]['xp'];
                const newXpNext = Math.floor(
                    xpCurrent + (xpCurrent * 0.5)
                );
                const levelCurrent = levelFind[0][0]['level'] + 1;

                const canvas = Canvas.createCanvas(700, 250);
                const context = canvas.getContext('2d');

                // Profile picture
                const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ extension: 'png' }));

                Canvas.GlobalFonts.registerFromPath('./ressources/font/Poppins-SemiBold.ttf', 'Poppins')

                context.font = '60px Poppins';
                context.fillStyle = '#ffffff';
                context.fillText(`Level ${levelCurrent}`, canvas.width / 2.5, canvas.height / 1.8);

                context.beginPath();
                context.arc(125, 125, 100, 0, Math.PI * 2, true);
                context.closePath();
                context.clip();

                // Drawing profile picture
                context.drawImage(avatar, 25, 25, 200, 200);

                const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'leveling.png' });

                await db.query(
                    'UPDATE level SET `xpNext`=?, `level`=? WHERE guildId=? AND userId=?',
                    [newXpNext, levelCurrent, message.guild.id, message.author.id]
                )

                const perksFind = await db.query(
                    'SELECT * FROM level_perks WHERE guildId=? AND level=?',
                    [message.guild.id, levelCurrent]
                )

                if (perksFind[0][0] != undefined) {
                    if (!message.member.roles.cache.some(role => role.id === perksFind[0][0]['roleId'])) {
                        await message.member.roles.add(perksFind[0][0]['roleId'])
                    }
                }

                message.channel.send({
                    content: `Congrats ${message.author.toString()}, you leveled up! :partying_face:`,
                    files: [attachment]
                })
            }
        }

        return db.releaseConnection(request);
    }
}