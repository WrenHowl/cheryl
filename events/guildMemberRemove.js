const { Events } = require('discord.js');
const { bot } = require('../server');
const { fr, en, de, sp, nl } = require('../preset/language')
const { logging, verifier, permission } = require('../preset/db')

module.exports = {
    name: Events.GuildMemberRemove,
    once: false,
    execute: async (leavingMember) => {
        let logging_data = await logging.findOne({ where: { guildId: guild.id } });

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

        let lgLeaving = languageSet.leavingMessage.message.embed.logs;

        if (logging_data.channelId_Leaving) {
            // Check if channel still exist
            let leavingChannel = leavingMember.guild.channels.cache.get(logging_data.channelId_Leaving);
            if (!leavingChannel) {
                return logging.update({ channelId_Leaving: null }, { where: { guildId: leavingMember.guild.id } });
            };

            // Checking if the bot can send message in the channel
            let botPermission = leavingMember.guild.members.me.permissionsIn(logging_data.channelId_Leaving).has(['SendMessages', 'ViewChannel']);
            if (!botPermission | leavingMember.user.bot) return;

            // Get the member count of the server
            let memberCount = leavingMember.guild.members.cache.filter(leavingMember => !leavingMember.user.bot).size;

            // Creation of the message to send
            let leavingMemberEmbed = new EmbedBuilder()
                .setDescription(`${lgLeaving.description} ${leavingMember.toString()}!`)
                .addFields(
                    { name: lgLeaving.fields.createdAt, value: moment(leavingMember.user.createdAt).format('Do MMMM YYYY hh:ss:mm A') },
                    { name: lgLeaving.fields.joinedAt, value: moment(leavingMember.joinedAt).format('Do MMMM YYYY hh:ss:mm A') },
                    { name: lgLeaving.fields.memberCount, value: memberCount }
                )
                .setColor('Green')
                .setFooter({
                    text: leavingMember.user.id
                })
                .setThumbnail(leavingMember.user.displayAvatarURL());

            // Check if the verification is enable
            let verifierData = await verifier.findOne({ where: { guildId: leavingMember.guild.id, userId: leavingMember.user.id } });
            verifierData ? statusVerification = en.leavingMessage.verificationEnable.isVerified : statusVerification = en.leavingMessage.verificationEnable.isVerified;

            if (logging_data.channelId_Verify) {
                leavingMemberEmbed.addFields(
                    { name: lgLeaving.fields.statusVerification, value: statusVerification }
                );
            };

            return Channelguild.send({
                embeds: [leavingMemberEmbed]
            });
        };

        let ticketData = await ticket.findOne({ where: { guildId: leavingMember.guild.id, userId: leavingMember.user.id } });

        if (ticketData) {
            let ticketCountData = await ticketCount.findOne({ where: { guildId: leavingMember.guild.id } });

            // Check if the ticket channel still exist
            let ticket_channel = leavingMember.guild.channels.cache.get(ticketData.channelId);
            if (ticket_channel & ticket_channel !== logging_data.channelId_ticketReceive) {
                await ticket_channel.delete('ticket Canceled: Member left the server');
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