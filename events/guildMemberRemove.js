const { Events } = require('discord.js');
const { bot } = require('../server');
const { fr, en, de, sp, nl } = require('../preset/language')
const { logging, verifier, permission, ticket } = require('../preset/db')

const configPreset = require('../config/main.json');

module.exports = {
    name: Events.GuildMemberRemove,
    once: false,
    execute: async (leavingMember) => {
        let logging_data = await logging.findOne({ where: { guildId: leavingMember.guild.id } });

        switch (logging_data.language) {
            case ('en'):
                languageSet = en;
                break;
            case ('fr'):
                languageSet = fr;
                break;
            case ('de'):
                languageSet = de;
                break;
            case ('sp'):
                languageSet = sp;
                break;
            case ('nl'):
                languageSet = nl;
                break;
            default:
                languageSet = en;
                break;
        };

        // Checking if they left the support discord and had permission
        if (leavingMember.guild.id === configPreset.botInfo.supportServerId) {
            return permission.destroy({ where: { userId: leavingMember.user.id } });
        };

        if (logging_data.channelId_Leaving) {
            // Check if channel still exist
            let leavingChannel = leavingMember.guild.channels.cache.get(logging_data.channelId_Leaving);
            if (!leavingChannel) {
                return logging.update({ channelId_Leaving: null }, { where: { guildId: leavingMember.guild.id } });
            };

            // Checking if the bot can send message in the channel
            let botPermission = leavingMember.guild.members.me.permissionsIn(logging_data.channelId_Leaving).has(['SendMessages', 'ViewChannel']);
            if (!botPermission | leavingMember.user.bot) return;

            /*// Check if the verification is enable
            let verifierData = await verifier.findOne({ where: { guildId: leavingMember.guild.id, userId: leavingMember.user.id } });
            verifierData ? statusVerification = en.leavingMessage.verificationEnable.isVerified : statusVerification = en.leavingMessage.verificationEnable.isVerified;

            if (logging_data.channelId_Verify) {
                leavingMemberEmbed.addFields(
                    { name: lgLeaving.fields.statusVerification, value: statusVerification }
                );
            };*/

            return leavingChannel.send({
                content: [`${leavingMember.user.toString()} left the server.`]
            });
        };

        let ticketData = await ticket.findOne({ where: { guildId: leavingMember.guild.id, userId: leavingMember.user.id } });

        if (ticketData) {
            let ticketCountData = await ticketCount.findOne({ where: { guildId: leavingMember.guild.id } });

            // Check if the ticket channel still exist
            let ticket_channel = leavingMember.guild.channels.cache.get(ticketData.channelId);
            if (ticket_channel & ticket_channel !== logging_data.channelId_ticketReceive) {
                await ticket_channel.delete('Ticket Canceled: Member left the server');
            };

            // Delete ticket message
            await bot.guilds.cache.get(leavingMember.guild.id).channels.cache.get(logging_data.channelId_ticketReceive).messages.fetch(ticketData.messageId).then((message) => {
                message.delete();
            }).catch((error) => { });

            try {
                // Delete the data in the database
                await ticket.destroy({ where: { guildId: leavingMember.guild.id, userId: leavingMember.user.id } });

                // Decrement the ticket counter
                return ticketCountData.decrement('count', { by: 1 });
            } catch (error) { };
        };
    }
};