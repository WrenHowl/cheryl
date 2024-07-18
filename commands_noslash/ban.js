const configPreset = require("../config/main.json");

const fr = require("../languages/fr.json");
const en = require("../languages/en.json");
const de = require("../languages/de.json");
const sp = require("../languages/sp.json");
const nl = require("../languages/nl.json");

module.exports = {
    name: en.ban.default.name,
    execute: async (bot, message, EmbedBuilder, sequelize, Sequelize) => {
        eventName = "ban";

        const Logging = sequelize.define("Logging", {
            guildId: {
                type: Sequelize.STRING,
            },
            language: {
                type: Sequelize.STRING,
            },
            channelId_Ban: {
                type: Sequelize.STRING,
            },
        });

        let loggingData = await Logging.findOne({ where: { guildId: message.guild.id } });

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

        let guild = await bot.guilds.cache.get(message.guild.id);

        const embed = new EmbedBuilder()

        function syntaxError() {
            embed.setTitle("Ban Syntax");
            embed.setDescription("**Utilisation:** ``" + configPreset.botInfo.messagePrefix + "ban <@user> <reason>``");
            embed.setColor("Blue");

            return message.reply({
                embeds: [embed],
            });
        };

        let args = message.content.split(' ');
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
        } else if (guild.members.cache.find(m => m.id === user)?.id) {
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