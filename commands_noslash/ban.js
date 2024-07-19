const { bot } = require('../server');
const { fr, en, de, sp, nl } = require('../preset/language')
const { logging } = require('../preset/db')

const configPreset = require("../config/main.json");

module.exports = {
    name: en.ban.default.name,
    execute: async (message, EmbedBuilder, args) => {
        let loggingData = await logging.findOne({ where: { guildId: message.guild.id } });

        switch (loggingData.language) {
            case ("en"):
                languagePreset = en;
                break;
            case ("fr"):
                languagePreset = fr;
                break;
            case ("de"):
                languagePreset = de;
                break;
            case ("sp"):
                languagePreset = sp;
                break;
            case ("nl"):
                languagePreset = nl;
                break;
            default:
                languagePreset = en;
                break;
        };

        if (!message.guild.members.me.permissionsIn(message.channelId).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) return;

        let botCanBan = message.guild.members.me.permissions.has("BanMembers");
        let memberCanBan = message.member.permissions.has("BanMembers");

        function refusedError() {
            return message.reply({
                content: refusingAction,
            });
        };

        if (!botCanBan | !memberCanBan) {
            !botCanBan ? refusingAction = languageSet.ban.permission.bot : refusingAction = languageSet.default.errorOccured;
            !memberCanBan ? refusingAction = languageSet.ban.permission.bot : refusingAction = languageSet.default.errorOccured;

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
                    content: languagePreset.ban.default.role,
                });
            };
        } else if (bannedUser) {
            return message.reply({
                content: languagePreset.ban.default.punished,
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
                .setTitle(languagePreset.ban.server.New)
                .addFields(
                    { name: languagePreset.ban.server.user, value: "``" + user.tag + "``" },
                    { name: languagePreset.ban.server.reason, value: "``" + reason + "``" },
                    { name: languagePreset.ban.server.mod, value: "``" + mod + "``" },
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
            content: `${languagePreset.ban.dm.you} *${message.guild.name}* ${languagePreset.ban.dm.for} *${reason}* ${languagePreset.ban.dm.by} *${mod}*`,
        }).catch(() => { return });

        return message.reply({
            content: `*<@${user}>* ${languagePreset.ban.server.message}`
        });
    }
};