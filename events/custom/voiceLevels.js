const { Events, AttachmentBuilder } = require('discord.js');
const { db } = require('../../server');
const Canvas = require('@napi-rs/canvas');

module.exports = {
    name: Events.VoiceStateUpdate,
    once: false,
    execute: async (member, state) => {
        return;
        // Will return if the message is coming from a bot.
        if (member.author.bot) return;

        const request = await db.getConnection()
        const xpPerMessage = 5;
        let levelStatus = 0;

        const userFind = await request.query(
            `SELECT user_settings.data_messageContent, levels.xp, user_settings.level_rankup FROM users
            LEFT JOIN user_settings ON users.id = user_settings.id
            LEFT JOIN levels ON users.id = levels.user_id AND levels.guild_id = ?
            WHERE users.id=?`,
            [
                message.guild.id,
                message.author.id
            ]
        )

        // Create user information in the database if there isn't any found
        await request.query(
            `INSERT INTO users (id, name, avatar, global_name) VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE name=VALUES(name), avatar=VALUES(avatar), global_name=VALUES(global_name)`,
            [
                message.author.id,
                message.author.username,
                message.author.avatar,
                message.author.globalName
            ]
        )

        // Get the guild settings
        const guildFind = await request.query(
            `SELECT level_status, level_rankup FROM guild_settings WHERE id=?`,
            [
                message.guild.id
            ]
        );

        // Lookup for user and server settings if they do not want level to be used
        if (typeof userFind[0][0] === "undefined" || userFind[0][0]['data_messageContent'] === 0 || (typeof guildFind[0][0] !== "undefined" && guildFind[0][0]['level_status'] === 0)) {
            return db.releaseConnection(request);
        }

        // Check if the user has data already in the server.
        if (typeof userFind[0][0]['xp'] !== "object" && typeof userFind[0][0]['xp'] !== "undefined") {
            // Check if the amount of XP gained is enough for a level up
            const levelXpFind = await request.query(
                `SELECT level_xp.level, level_xp.xp, level_perks.guild_id, level_perks.role_id FROM level_xp
                LEFT JOIN level_perks ON level_perks.level <= level_xp.level AND level_perks.guild_id = ?
                WHERE level_xp.xp > ? LIMIT 1`,
                [
                    message.guild.id,
                    userFind[0][0]['xp']
                ]
            );

            // Manually set a cap of XP that is obtainable.
            levelStatus = userFind[0][0]['xp'] > 3150200 ?
                250 :
                levelXpFind[0][0]['level'] - 1;

            if (typeof levelXpFind[0][0] !== "undefined" && userFind[0][0]['xp'] + xpPerMessage === levelXpFind[0][0]['xp']) {
                levelStatus = levelXpFind[0][0]['level'];

                if (typeof levelXpFind[0][0]['role_id'] !== "object") {
                    await message.member.roles.add(levelXpFind[0][0]['role_id']);
                }

                if ((typeof guildFind[0][0] !== "undefined" && guildFind[0][0]['level_rankup'] === 1) && (typeof userFind[0][0] !== "undefined" && userFind[0][0]['level_rankup'] === 1)) {
                    // Create the levelup picture
                    const canvas = Canvas.createCanvas(700, 250);
                    const context = canvas.getContext('2d');

                    // Profile picture
                    const avatar = await Canvas.loadImage(message.author.displayAvatarURL({ extension: 'png' }));

                    Canvas.GlobalFonts.registerFromPath('./ressources/font/Poppins-SemiBold.ttf', 'Poppins')

                    context.font = '60px Poppins';
                    context.fillStyle = '#ffffff';
                    context.fillText(`Level ${levelXpFind[0][0]['level'] - 1}`, canvas.width / 2.5, canvas.height / 1.8);

                    context.beginPath();
                    context.arc(125, 125, 100, 0, Math.PI * 2, true);
                    context.closePath();
                    context.clip();

                    // Drawing profile picture
                    context.drawImage(avatar, 25, 25, 200, 200);

                    const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'leveling.png' });

                    message.channel.send({
                        content: `Congrats ${message.author.toString()}, you leveled up! :partying_face:`,
                        files: [
                            attachment
                        ]
                    })
                }
            }
        }

        // Update the level of the user to the current one
        await request.query(
            `INSERT INTO levels (guild_id, user_id, xp, level) VALUES (?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE level=VALUES(level), xp=xp + VALUES(xp)`,
            [
                message.guild.id,
                message.author.id,
                xpPerMessage,
                levelStatus,
            ]
        )

        return db.releaseConnection(request);
    }
}