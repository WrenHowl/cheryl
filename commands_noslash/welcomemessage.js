const { MessageActionRow, MessageButton } = require('discord.js');
const internal = require('stream');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'welcomemessage' command is loaded.")

module.exports = {
    name: "welcomemessage",
    execute: async (bot, message, args, MessageEmbed, sequelize, Sequelize) => {
        const Logging = sequelize.define("Logging", {
            GuildID: {
                type: Sequelize.STRING,
                unique: false,
            },
            ChannelIDReport: {
                type: Sequelize.STRING,
                unique: false,
            },
            ChannelIDBan: {
                type: Sequelize.STRING,
                unique: false,
            },
            ChannelIDVerify: {
                type: Sequelize.STRING,
                unique: false,
            },
            ChannelIDEnterServer: {
                type: Sequelize.STRING,
                unique: false,
            },
            StaffRoleReport: {
                type: Sequelize.STRING,
                unique: false,
            },
            StaffRoleVerify: {
                type: Sequelize.STRING,
                unique: false,
            },
            RoleToAddVerify: {
                type: Sequelize.STRING,
                unique: false,
            },
            RoleToRemoveVerify: {
                type: Sequelize.STRING,
                unique: false,
            },
            EnableDisableBlacklistLogger: {
                type: Sequelize.STRING,
                unique: false,
            },
            ChannelIDBlacklist: {
                type: Sequelize.STRING,
                unique: false,
            },
            ChannelIDWarn: {
                type: Sequelize.STRING,
                unique: false,
            },
            BanByPassRole: {
                type: Sequelize.STRING,
                unique: false,
            },
            ChannelIDKick: {
                type: Sequelize.STRING,
                unique: false,
            },
            ChannelIDReceiveVerification: {
                type: Sequelize.STRING,
                unique: false,
            },
        });

        const LoggingData = await Logging.findOne({ where: { GuildID: message.guild.id } });

        if (!LoggingData) {
            return message.reply({
                content: "There's some setting that aren't setup on that server for that command. Please use ``/settings`` to start setting it up.",
                ephemeral: true,
            });
        } else if (!LoggingData.ChannelIDReceiveVerification | !LoggingData.ChannelIDVerify | !LoggingData.RoleToAddVerify | !LoggingData.RoleToRemoveVerify | !LoggingData.StaffRoleVerify) {
            return message.reply({
                content: "There's some setting that aren't setup on that server for that command. Please use ``/settings`` to start setting it up.",
                ephemeral: true,
            });
        }

        if (message.member.permissions.has("MANAGE_GUILD") | message.author.id === '291262778730217472') {
            const channelToSend = message.guild.channels.cache.get(LoggingData.ChannelIDEnterServer);

            const buttonToVerify = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId('buttonToVerify')
                        .setLabel('✅ Verify')
                        .setStyle('SUCCESS'),
                );

            if (message.guild.id === "815422069234860073") {
                const secondMessage = new MessageEmbed()
                    .setTitle("Verification")
                    .setDescription(
                        `Welcome to **` + message.guild.name + `**, to gain access to the server, please click on the button below to start your verification.\n` +
                        `\nWhen you're doing your verification, please add details and take your time. There's chance you don't get accepted if you don't put any "efforts" on it.\n` +
                        `\n*When clicking on the button 'Verify' you accept the <#862025672578695178> or <#862025851902492743> and it's consequences if you're breaking them.*`
                    )
                    .setColor("2f3136")

                return channelToSend.send({
                    embeds: [secondMessage],
                    components: [buttonToVerify],
                });
            }

            const secondMessage = new MessageEmbed()
                .setTitle("Verification")
                .setDescription(
                    `Welcome to **` + message.guild.name + `**, to gain access to the server, please click on the button below to start your verification.\n` +
                    `\nWhen you're doing your verification, please add details and take your time. There's chance you don't get accepted if you don't put any "efforts" on it.\n` +
                    `\n> **__Verification time:__** 　 1-20 minutes\n` +
                    `\n*When clicking on the button 'Verify' you accept the <#898360656175198249> and it's consequences if you're breaking them.*`
                )
                .setColor("2f3136")

            return channelToSend.send({
                embeds: [secondMessage],
                components: [buttonToVerify],
            });
        }
    }
};