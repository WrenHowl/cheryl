const { bot } = require('../server');
const { en, language } = require('../preset/language');
const configPreset = require("../config/main.json");

module.exports = {
    name: en.ban.default.name,
    execute: async (message, EmbedBuilder, args) => {
        language(newMember, languageSet);

        if (!message.guild.members.me.permissionsIn(message.channelId).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) return;

        let botCanBan = message.guild.members.me.permissions.has("BanMembers");
        let memberCanBan = message.member.permissions.has("BanMembers");

        function refusedError() {
            return message.reply({
                content: refusingAction,
            });
        };

        if (!botCanBan | !memberCanBan) {
            !botCanBan ? refusingAction = languageSet.default.botPermission.ban : null;
            !memberCanBan ? refusingAction = languageSet.default.userPermission.ban : null;

            return refusedError();
        };

        const embed = new EmbedBuilder()

        function syntaxError() {
            embed.setTitle("Ban Syntax");
            embed.setDescription("**Utilisation:** ``" + configPreset.botInfo.messagePrefix + "ban <@user> <reason>``");
            embed.setColor("Blue");

            return message.reply({
                embeds: [embed],
            });
        };

        let user = args[1];

        // Check for user and reason mentionned, if not return error
        if (!args[0] | !/\d/.test(user) | !user.startsWith("<@")) return syntaxError();

        // Change user value if non-numeric user id 
        if (user.startsWith("<@")) user = args[1].replace(/\D/g, "")

        // Check if the user is already banned
        let banList = await message.guild.bans.fetch();
        let bannedUser = await banList.get(user);

        // Check if the user is either of these, if yes return error
        switch (user) {
            case (message.author.id):
                return message.reply({
                    content: languageSet.ban.message.onWho.isThemself,
                });
            case (bot.user.id):
                return message.reply({
                    content: languageSet.ban.message.onWho.isBot,
                });
            case (message.guild.ownerId):
                return message.reply({
                    content: languageSet.ban.message.onWho.isOwner,
                });
        };

        if (message.guild.members.cache.get(user).bannable) {
            return message.reply({
                content: languageSet.ban.message.onWho.isPunishable,
            });
        } else if (message.guild.members.cache.find(m => m.id === user)?.id) {
            if (member.roles.highest.position >= message.member.roles.highest.position) {
                return message.reply({
                    content: languageSet.ban.default.role,
                });
            };
        } else if (bannedUser) {
            return message.reply({
                content: languageSet.ban.default.punished,
            });
        };

        ////////////////////
        //  Ready to ban  //
        ////////////////////

        let mod = message.author.tag;

        if (loggingData.ChannelIDBan) {
            //if (!message.guild.members.guild.me.permissionsIn(loggingData.channeldId_Ban).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) return;

            const logChannel = message.guild.channels.cache.get(loggingData.channeldId_Ban);

            const logMessage = new EmbedBuilder()
                .setTitle(languageSet.ban.server.New)
                .addFields(
                    { name: languageSet.ban.server.user, value: "``" + user.tag + "``" },
                    { name: languageSet.ban.server.reason, value: "``" + reason + "``" },
                    { name: languageSet.ban.server.mod, value: "``" + mod + "``" },
                )
                .setFooter({
                    text: "ID: " + user.id
                })
                .setTimestamp()
                .setColor("Red");

            await logChannel.send({
                embeds: [logMessage],
            });
        };

        await message.guild.members.ban(user, { reason: [`${reason} ${mod}`] }).catch(() => {
            refusingAction = en.ban.message.failed;

            return refusedError();
        })

        await user.send({
            content: `${languageSet.ban.dm.you} *${message.guild.name}* ${languageSet.ban.dm.for} *${reason}* ${languageSet.ban.dm.by} *${mod}*`,
        }).catch(() => { return });

        return message.reply({
            content: `*<@${user}>* ${languageSet.ban.server.message}`
        });
    }
};