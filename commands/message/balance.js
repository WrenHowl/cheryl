const { Events, EmbedBuilder } = require('discord.js');
const { bot, db } = require('../../server.js');
const { en } = require('../../preset/language');

// Check the user balance
// Type of cooldown = 1

module.exports = {
    name: Events.MessageCreate,
    once: false,
    execute: async (message) => {
        if (message.author.bot) return;

        const request = await db.getConnection();

        // Command to see your balance
        if (message.content.startsWith(";bal") || message.content.startsWith(";balance")) {
            const content = message.content.split(" ");

            let userTarget = /^\d+/.test(content[1]) ?
                content[1] :
                message.author.id;

            await bot.users.fetch(userTarget)
                .catch(error => {
                    db.releaseConnection(request);
                    return message.reply("Error while trying to retrieve this user information.")
                });

            const userEconomy = await request.query(
                `SELECT * FROM user_economy WHERE user_id=? AND guild_id=?`,
                [
                    userTarget,
                    message.guild.id
                ]
            );

            const embed = new EmbedBuilder()
                .addFields(
                    { name: "Cash", value: `:moneybag: ${userEconomy[0][0]['cash']}`, inline: true },
                    { name: "\u200b", value: "\u200b", inline: true },
                    { name: "Bank", value: `:moneybag: ${userEconomy[0][0]['bank']}`, inline: true },
                    { name: "Total", value: `:moneybag: ${parseInt(userEconomy[0][0]['cash']) + parseInt(userEconomy[0][0]['bank'])}` },
                )
                .setColor('Blue')

            await message.reply({
                embeds: [embed]
            })
        }

        return db.releaseConnection(request);
    }
};