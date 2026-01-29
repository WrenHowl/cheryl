const { Events, EmbedBuilder } = require('discord.js');
const { db } = require('../../server.js');
const { en } = require('../../preset/language');

module.exports = {
    name: Events.MessageCreate,
    once: false,
    execute: async (message) => {
        if (message.author.bot) return;

        const request = await db.getConnection();

        const command = /^;work$/i;
        if (!command.test(message.content)) return;

        const userCooldown = await request.query(
            `SELECT cmd_work FROM user_cooldown WHERE user_id=? AND guild_id=?`,
            [
                message.author.id,
                message.guild.id
            ]
        );

        const currentTime = Math.floor(Date.now() / 1000);

        switch (true) {
            case typeof userCooldown[0][0] === "undefined":
                await request.query(
                    `INSERT INTO user_cooldown (user_id, guild_id, global, cmd_work) VALUES (?, ?, ?, ?)`,
                    [
                        message.author.id,
                        message.guild.id,
                        currentTime,
                        currentTime
                    ]
                );
            case currentTime > userCooldown[0][0]['cmd_work'] + 86400:
                const amountReceive = Math.floor(Math.random() * (350 - 150) + 150);

                const embed = new EmbedBuilder()
                    .setDescription(`You worked your shift at the pizzeria and received ${amountReceive} :moneybag:.\n\n-# You will be able to execute the command again in <t:${userCooldown[0][0]['cmd_work'] + 86400}:R>.`)
                    .setColor('Green');

                await message.channel.send({
                    embeds: [embed]
                })

                break;
        }

        return db.releaseConnection(request);
    }
};