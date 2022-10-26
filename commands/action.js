const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Config = require("../config/config.json");
const Color = require("../config/color.json");
const pronouns = require("../config/pronouns.json")

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'action' command is loaded.");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('action')
        .setDescription('Do an action (or suggest an image for an action.) on a member.')
        .addStringOption(option => option
            .setName("choice")
            .setDescription("What action would you like to do?")
            .setRequired(true)
            .addChoices(
                { name: "Hug", value: "hug" },
                { name: "Kiss", value: "kiss" },
                { name: "Boop", value: "boop" },
                { name: "Lick", value: "lick" },
                { name: "Cuddle", value: "cuddle" },
                { name: "Yeet", value: "yeet" },
            ))
        .addAttachmentOption(option => option
            .setName("suggest")
            .setDescription("Suggest an image for addition.")
            .setRequired(false))
        .addUserOption(option => option
            .setName("member")
            .setDescription("Member to do the action on.")
            .setRequired(false)),
    execute: async (interaction, bot, sequelize, Sequelize) => {
        const ActionImage = sequelize.define("ActionImage", {
            ImageURL: {
                type: Sequelize.STRING,
                unique: false,
            },
            Category: {
                type: Sequelize.STRING,
                unique: false,
            },
            MessageID: {
                type: Sequelize.STRING,
                unique: false,
            },
            UserName: {
                type: Sequelize.STRING,
                unique: false,
            },
            UserID: {
                type: Sequelize.STRING,
                unique: false,
            },
        });
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
            ChannelIDWelcome: {
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
            ChannelIDUnban: {
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
            AutoBanStatus: {
                type: Sequelize.STRING,
                unique: false,
            },
            SettingsActionMessage: {
                type: Sequelize.STRING,
                unique: false,
            },
            SettingsActionImage: {
                type: Sequelize.STRING,
                unique: false,
            }
        });
        const Profile = sequelize.define("Profile", {
            UserName: {
                type: Sequelize.STRING,
                unique: false,
            },
            UserID: {
                type: Sequelize.STRING,
                unique: false,
            },
            Pronouns: {
                type: Sequelize.STRING,
                unique: false,
            },
        })

        const choice = interaction.options.getString("choice");
        let user = interaction.options.getUser("member");
        let image = interaction.options.getAttachment("suggest");

        const User1 = interaction.user.toString();
        let User2 = "";

        if (user) User2 = user.toString();
        if (!user) User2 = bot.user.toString();

        let User3 = "";

        if (user) User3 = user.id;
        if (!user) User3 = bot.user.id;

        const embedDescription = "**[COPYRIGHT CLAIM](" + Config.SupportDiscord + ")**";

        const buttonToAcceptSuggestion = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('AcceptSuggestion')
                    .setLabel('Accept')
                    .setStyle('SUCCESS'),
            )
            .addComponents(
                new MessageButton()
                    .setCustomId('DenySuggestion')
                    .setLabel('Deny')
                    .setStyle('DANGER'),
            );

        let ActionImageData = await ActionImage.findAll({ where: { category: choice }, order: sequelize.random(), limit: 1 });
        let LoggingData = await Logging.findOne({ where: { GuildID: interaction.guild.id } })

        let ProfileCheck = await Profile.findOne({ where: { UserID: User3 } })

        let Pronouns = "";
        let Pronouns2 = "";

        if (ProfileCheck) {
            if (ProfileCheck.Pronouns === pronouns.th) Pronouns = "them";
            if (ProfileCheck.Pronouns === pronouns.he) Pronouns = "him";
            if (ProfileCheck.Pronouns === pronouns.sh) Pronouns = "her";
            if (ProfileCheck.Pronouns === pronouns.th) Pronouns2 = "their";
            if (ProfileCheck.Pronouns === pronouns.he) Pronouns2 = "him";
            if (ProfileCheck.Pronouns === pronouns.sh) Pronouns2 = "her";
        } else {
            Pronouns = "them";
            Pronouns2 = "their";
        }

        const HugSentence = [
            User1 + " approaches " + User2 + " gently and hugs " + Pronouns + " from behind. How cute!",
            User1 + " wraps " + Pronouns2 + " arms around " + User2 + ", taking " + Pronouns + " into " + Pronouns2 + " warm embrace!"
        ];
        const KissSentence = [
            User1 + " approches slowly " + User2 + "'s face and gently kiss " + Pronouns + " on the lips!~",
            User1 + " wraps their arms around " + User2 + ", place " + Pronouns2 + " lips to " + Pronouns + " and kiss " + Pronouns + " deeply!~"
        ];
        const BoopSentence = [
            User1 + " raises their paw and places it apon " + User2 + "'s snoot!",
        ];
        const LickSentence = [
            User1 + " get really close to " + User2 + " face and lick " + Pronouns + "!",
            User1 + " lick rapidly " + User2 + " and run away!",
        ];
        const CuddleSentence = [
            User1 + " sneaks up behind " + User2 + " and pounces, cuddling the suprised floofer!"
        ];
        const YeetSentence = [
            User1 + " yeeted " + User2 + " into the stratosphere!",
            User1 + " grabbed " + User2 + " by the scruff and yeeted them 10 miles into the sky!",
        ];

        switch (choice) {
            case ("hug"):
                if (image) {
                    let fetchGuild = interaction.client.guilds.cache.get(Config.guildId)
                    const suggestChannel = fetchGuild.channels.cache.get(Config.SuggestImage)

                    await interaction.reply({
                        content: "Your image has been successfully sent to the staff of ``Cheryl``!",
                        ephemeral: true
                    })

                    const ImageEmbed = new MessageEmbed()
                        .addFields(
                            { name: "Category:", value: choice, inline: true },
                            { name: "Author:", value: interaction.user.tag + " ``(" + interaction.user.id + ")``", inline: true }
                        )
                        .setImage(image.url)
                        .setColor(Color.RiskLow)

                    return suggestChannel.send({
                        embeds: [ImageEmbed],
                        components: [buttonToAcceptSuggestion]
                    }).then(async sent => {
                        let MessageID = sent.id
                        const ActionImageCreate = await ActionImage.create({
                            MessageID: MessageID,
                            Category: choice,
                            ImageURL: image.url,
                            UserName: interaction.user.tag,
                            UserID: interaction.user.id,
                        });
                    });
                };

                let RandomAnswer = HugSentence[Math.floor(Math.random() * HugSentence.length)];
                let RandomImage = ActionImageData[Math.floor(Math.random() * ActionImageData.length)];

                const imageEmbed = new MessageEmbed()
                    .setDescription(embedDescription)
                    .setImage(RandomImage.ImageURL)
                    .setColor(Color.Green)

                if (LoggingData) {
                    if (LoggingData.SettingsActionImage === "Disabled" && LoggingData.SettingsActionMessage === "Disabled") {
                        return interaction.reply({
                            content: "This command has been disabled in this server.",
                            ephemeral: true,
                        });
                    }
                    if (LoggingData.SettingsActionImage === "Disabled") {
                        return interaction.reply({
                            content: RandomAnswer,
                        });
                    }
                    if (LoggingData.SettingsActionMessage === "Disabled") {
                        return interaction.reply({
                            embeds: [imageEmbed]
                        });
                    }
                }

                return interaction.reply({
                    content: RandomAnswer,
                    embeds: [imageEmbed]
                });
            case ("kiss"):
                if (image) {
                    let fetchGuild = interaction.client.guilds.cache.get(Config.guildId)
                    const suggestChannel = fetchGuild.channels.cache.get(Config.SuggestImage)

                    const ImageEmbed = new MessageEmbed()
                        .addFields(
                            { name: "Category:", value: choice, inline: true },
                            { name: "Author:", value: interaction.user.tag + " ``(" + interaction.user.id + ")``", inline: true }
                        )
                        .setImage(image.url)
                        .setColor(Color.RiskLow)

                    await interaction.reply({
                        content: "Your image has been successfully sent to the staff of ``Cheryl``!",
                        ephemeral: true
                    })

                    return suggestChannel.send({
                        embeds: [ImageEmbed],
                        components: [buttonToAcceptSuggestion]
                    }).then(async sent => {
                        let MessageID = sent.id
                        const ActionImageCreate = await ActionImage.create({
                            MessageID: MessageID,
                            Category: choice,
                            ImageURL: image.url,
                            UserName: interaction.user.tag,
                            UserID: interaction.user.id,
                        });
                    });
                }

                const RandomKissSentence = KissSentence[Math.floor(Math.random() * KissSentence.length)];
                let RandomImage2 = ActionImageData[Math.floor(Math.random() * ActionImageData.length)];

                const imageEmbed2 = new MessageEmbed()
                    .setDescription(embedDescription)
                    .setImage(RandomImage2.ImageURL)
                    .setColor(Color.Green)

                if (LoggingData) {
                    if (LoggingData.SettingsActionImage === "Disabled" & LoggingData.SettingsActionMessage === "Disabled") {
                        return interaction.reply({
                            content: ["This command has been disabled in this server."],
                        });
                    }
                    if (LoggingData.SettingsActionImage === "Disabled") {
                        return interaction.reply({
                            content: RandomKissSentence,
                        });
                    }
                    if (LoggingData.SettingsActionMessage === "Disabled") {
                        return interaction.reply({
                            embeds: [imageEmbed2]
                        });
                    }
                }

                return interaction.reply({
                    content: RandomKissSentence,
                    embeds: [imageEmbed2]
                });
            case ("boop"):
                if (image) {
                    let fetchGuild = interaction.client.guilds.cache.get(Config.guildId)
                    const suggestChannel = fetchGuild.channels.cache.get(Config.SuggestImage)

                    const ImageEmbed = new MessageEmbed()
                        .addFields(
                            { name: "Category:", value: choice, inline: true },
                            { name: "Author:", value: interaction.user.tag + " ``(" + interaction.user.id + ")``", inline: true }
                        )
                        .setImage(image.url)
                        .setColor(Color.RiskLow)

                    await interaction.reply({
                        content: "Your image has been successfully sent to the staff of ``Cheryl``!",
                        ephemeral: true
                    })

                    return suggestChannel.send({
                        embeds: [ImageEmbed],
                        components: [buttonToAcceptSuggestion]
                    }).then(async sent => {
                        let MessageID = sent.id
                        const ActionImageCreate = await ActionImage.create({
                            MessageID: MessageID,
                            Category: choice,
                            ImageURL: image.url,
                            UserName: interaction.user.tag,
                            UserID: interaction.user.id,
                        });
                    });
                }

                const RandomBoopSentence = BoopSentence[Math.floor(Math.random() * BoopSentence.length)];
                let RandomImage3 = ActionImageData[Math.floor(Math.random() * ActionImageData.length)];

                const imageEmbed3 = new MessageEmbed()
                    .setDescription(embedDescription)
                    .setImage(RandomImage3.ImageURL)
                    .setColor(Color.Green)

                if (LoggingData) {
                    if (LoggingData.SettingsActionImage === "Disabled" & LoggingData.SettingsActionMessage === "Disabled") {
                        return interaction.reply({
                            content: ["This command has been disabled in this server."],
                        });
                    }
                    if (LoggingData.SettingsActionImage === "Disabled") {
                        return interaction.reply({
                            content: RandomBoopSentence,
                        });
                    }
                    if (LoggingData.SettingsActionMessage === "Disabled") {
                        return interaction.reply({
                            embeds: [imageEmbed3]
                        });
                    }
                }

                return interaction.reply({
                    content: RandomBoopSentence,
                    embeds: [imageEmbed3]
                });
            case ("lick"):
                if (image) {
                    let fetchGuild = interaction.client.guilds.cache.get(Config.guildId)
                    const suggestChannel = fetchGuild.channels.cache.get(Config.SuggestImage)

                    const ImageEmbed = new MessageEmbed()
                        .addFields(
                            { name: "Category:", value: choice, inline: true },
                            { name: "Author:", value: interaction.user.tag + " ``(" + interaction.user.id + ")``", inline: true }
                        )
                        .setImage(image.url)
                        .setColor(Color.RiskLow)

                    await interaction.reply({
                        content: "Your image has been successfully sent to the staff of ``Cheryl``!",
                        ephemeral: true
                    })

                    return suggestChannel.send({
                        embeds: [ImageEmbed],
                        components: [buttonToAcceptSuggestion]
                    }).then(async sent => {
                        let MessageID = sent.id
                        const ActionImageCreate = await ActionImage.create({
                            MessageID: MessageID,
                            Category: choice,
                            ImageURL: image.url,
                            UserName: interaction.user.tag,
                            UserID: interaction.user.id,
                        });
                    });
                }

                const RandomLickSentence = LickSentence[Math.floor(Math.random() * LickSentence.length)];
                let RandomImage4 = ActionImageData[Math.floor(Math.random() * ActionImageData.length)];

                const imageEmbed4 = new MessageEmbed()
                    .setDescription(embedDescription)
                    .setImage(RandomImage4.ImageURL)
                    .setColor(Color.Green)

                if (LoggingData) {
                    if (LoggingData.SettingsActionImage === "Disabled" & LoggingData.SettingsActionMessage === "Disabled") {
                        return interaction.reply({
                            content: ["This command has been disabled in this server."],
                        });
                    }
                    if (LoggingData.SettingsActionImage === "Disabled") {
                        return interaction.reply({
                            content: RandomLickSentence,
                        });
                    }
                    if (LoggingData.SettingsActionMessage === "Disabled") {
                        return interaction.reply({
                            embeds: [imageEmbed4]
                        });
                    }
                }

                return interaction.reply({
                    content: RandomLickSentence,
                    embeds: [imageEmbed4]
                });
            case ("cuddle"):
                if (image) {
                    let fetchGuild = interaction.client.guilds.cache.get(Config.guildId)
                    const suggestChannel = fetchGuild.channels.cache.get(Config.SuggestImage)

                    const ImageEmbed = new MessageEmbed()
                        .addFields(
                            { name: "Category:", value: choice, inline: true },
                            { name: "Author:", value: interaction.user.tag + " ``(" + interaction.user.id + ")``", inline: true }
                        )
                        .setImage(image.url)
                        .setColor(Color.RiskLow)

                    await interaction.reply({
                        content: "Your image has been successfully sent to the staff of ``Cheryl``!",
                        ephemeral: true
                    })

                    return suggestChannel.send({
                        embeds: [ImageEmbed],
                        components: [buttonToAcceptSuggestion]
                    }).then(async sent => {
                        let MessageID = sent.id
                        const ActionImageCreate = await ActionImage.create({
                            MessageID: MessageID,
                            Category: choice,
                            ImageURL: image.url,
                            UserName: interaction.user.tag,
                            UserID: interaction.user.id,
                        });
                    });
                }

                const RandomCuddleSentence = CuddleSentence[Math.floor(Math.random() * CuddleSentence.length)];
                let RandomImage5 = ActionImageData[Math.floor(Math.random() * ActionImageData.length)];

                const imageEmbed5 = new MessageEmbed()
                    .setDescription(embedDescription)
                    .setImage(RandomImage5.ImageURL)
                    .setColor(Color.Green)

                if (LoggingData) {
                    if (LoggingData.SettingsActionImage === "Disabled" & LoggingData.SettingsActionMessage === "Disabled") {
                        return interaction.reply({
                            content: ["This command has been disabled in this server."],
                        });
                    }
                    if (LoggingData.SettingsActionImage === "Disabled") {
                        return interaction.reply({
                            content: RandomCuddleSentence,
                        });
                    }
                    if (LoggingData.SettingsActionMessage === "Disabled") {
                        return interaction.reply({
                            embeds: [imageEmbed5]
                        });
                    }
                }

                return interaction.reply({
                    content: RandomCuddleSentence,
                    embeds: [imageEmbed5]
                });
            case ("yeet"):
                if (image) {
                    let fetchGuild = interaction.client.guilds.cache.get(Config.guildId)
                    const suggestChannel = fetchGuild.channels.cache.get(Config.SuggestImage)

                    const ImageEmbed = new MessageEmbed()
                        .addFields(
                            { name: "Category:", value: choice, inline: true },
                            { name: "Author:", value: interaction.user.tag + " ``(" + interaction.user.id + ")``", inline: true }
                        )
                        .setImage(image.url)
                        .setColor(Color.RiskLow)

                    await interaction.reply({
                        content: "Your image has been successfully sent to the staff of ``Cheryl``!",
                        ephemeral: true
                    })

                    return suggestChannel.send({
                        embeds: [ImageEmbed],
                        components: [buttonToAcceptSuggestion]
                    }).then(async sent => {
                        let MessageID = sent.id
                        const ActionImageCreate = await ActionImage.create({
                            MessageID: MessageID,
                            Category: choice,
                            ImageURL: image.url,
                            UserName: interaction.user.tag,
                            UserID: interaction.user.id,
                        });
                    });
                }

                const RandomYeetSentence = YeetSentence[Math.floor(Math.random() * YeetSentence.length)];
                let RandomImage6 = ActionImageData[Math.floor(Math.random() * ActionImageData.length)];

                const imageEmbed6 = new MessageEmbed()
                    .setDescription(embedDescription)
                    .setImage(RandomImage6.ImageURL)
                    .setColor(Color.Green)

                if (LoggingData) {
                    if (LoggingData.SettingsActionImage === "Disabled" & LoggingData.SettingsActionMessage === "Disabled") {
                        return interaction.reply({
                            content: ["This command has been disabled in this server."],
                        });
                    }
                    if (LoggingData.SettingsActionImage === "Disabled") {
                        return interaction.reply({
                            content: RandomYeetSentence,
                        });
                    }
                    if (LoggingData.SettingsActionMessage === "Disabled") {
                        return interaction.reply({
                            embeds: [imageEmbed6]
                        });
                    }
                }

                return interaction.reply({
                    content: RandomYeetSentence,
                    embeds: [imageEmbed6]
                });
        };
    }
};