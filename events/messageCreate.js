const { Events } = require('discord.js');
const { db } = require('../server');

let count = 0;

module.exports = {
    name: Events.MessageCreate,
    once: false,
    execute: async (message) => {
        if (message.guild.id !== '1082103667181764659') return;
        if (message.author.bot) return;

        const request = await db.getConnection()

        let levelFind = await request.query(
            'SELECT xp, level FROM level WHERE userId=? AND guildId=?',
            [message.author.id, message.guild.id]
        )

        if (levelFind[0][0] == undefined) {
            await db.query(
                'INSERT INTO level (`guildId`, `userId`, `xp`) VALUES (?, ?, ?)',
                [message.guild.id, message.author.id, 5]
            )
        } else {
            await db.query(
                'UPDATE level SET `xp`=? WHERE guildId=? AND userId=?',
                [levelFind[0][0]['xp'] + 5, message.guild.id, message.author.id]
            )

            let announceLevelUp = false;
            let reply = `Congrats ${message.author.toString()}, you leveled up! You are now level **${levelFind[0][0]['level']++}**.`;

            for (let xp = 0; levelFind[0][0]['xp'] >= 750; xp += 750) {
                if (levelFind[0][0]['xp'] == xp) {
                    await db.query(
                        'UPDATE level SET `level`=? WHERE guildId=? AND userId=?',
                        [levelFind[0][0]['level']++, message.guild.id, message.author.id]
                    )

                    announceLevelUp = true;

                    break;
                }
            }

            for (let level = 0; levelFind[0][0]['level'] >= 0; level++) {
                if (levelFind[0][0]['level'] == level) {
                    let perksFind = await db.query(
                        'SELECT * FROM level_perks WHERE guildId=? AND level=?',
                        [message.guild.id, levelFind['level']]
                    )

                    if (perksFind[0][0] == undefined) break;
                    if (message.member.roles.cache.some(role => role.id === perksFind[0][0]['roleId'])) break;

                    message.member.roles.add(perksFind[0][0]['roleId'])

                    reply = `${reply}\n\nYou now have access to <@$${perksFind[0][0]['roleId']}>.`

                    break;
                }
            }

            if (announceLevelUp == true) {
                message.channel.send({
                    content: reply
                })
            }
        }

        return db.releaseConnection(request);
    }
}