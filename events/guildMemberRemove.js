const { Events } = require('discord.js');
const { bot } = require('../server');
const { language } = require('../preset/language')

const configPreset = require('../config/main.json');

module.exports = {
    name: Events.GuildMemberRemove,
    once: false,
    execute: async (leavingMember) => {
        db.query(`SELECT channelId_Leaving FROM blacklists WHERE guildId=?`, [leavingMember.guild.id], async (error, statement) => {
            language(newMember, languageSet);

            const statString = JSON.stringify(statement);
            const value = JSON.parse(statString);

            const channelId_Leaving = value[0]['channelId_Leaving'];
            if (channelId_Leaving) {
                let leavingChannel = leavingMember.guild.channels.cache.get(channelId_Leaving);
                if (!leavingChannel) {
                    return await db.query(`UPDATE loggings SET channelId_Leaving=?`, [null])
                };

                if (!leavingMember.guild.members.me.permissionsIn(channelId_Leaving).has(['SendMessages', 'ViewChannel']) | leavingMember.user.bot) return;

                return leavingChannel.send({
                    content: [`${leavingMember.user.toString()} left the server.`]
                });
            };
        });
    }
};