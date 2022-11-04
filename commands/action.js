const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Config = require("../config/config.json");
const Color = require("../config/color.json");
const Profile = require("../config/profile.json")
const LanguageFR = require("../languages/fr.json");
const LanguageEN = require("../languages/en.json");
const LanguageDE = require("../languages/de.json");
const LanguageSP = require("../languages/sp.json");
const LanguageNL = require("../languages/nl.json");

const fr = LanguageFR.action;
const en = LanguageEN.action;
const de = LanguageDE.action;
const sp = LanguageSP.action;
const nl = LanguageNL.action;

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The '" + en.Name + "' command is loaded.");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(en.Name)
        .setNameLocalizations({
            fr: fr.Name,
            de: de.Name,
            SpanishES: sp.Name,
            nl: nl.Name
        })
        .setDescription(en.Description)
        .setDescriptionLocalizations({
            fr: fr.Description,
            de: de.Description,
            SpanishES: sp.Description,
            nl: nl.Description
        })
        .addStringOption(option => option
            .setName(en.ChoiceName)
            .setNameLocalizations({
                fr: fr.ChoiceName,
                de: de.ChoiceName,
                SpanishES: sp.ChoiceName,
                nl: nl.ChoiceName
            })
            .setDescription(en.ChoiceDescription)
            .setDescriptionLocalizations({
                fr: fr.ChoiceDescription,
                de: de.ChoiceDescription,
                SpanishES: sp.ChoiceDescription,
                nl: nl.ChoiceDescription
            })
            .setRequired(true)
            .addChoices(
                { name: "hug", value: "hug" },
                { name: "kiss", value: "kiss" },
                { name: "boop", value: "boop" },
                { name: "lick", value: "lick" },
                { name: "cuddle", value: "cuddle" },
                { name: "yeet", value: "yeet" },
                { name: "pat", value: "pat" },
                { name: "bite", value: "bite" },
                { name: "bonk", value: "bonk" }
            ))
        .addAttachmentOption(option => option
            .setName(en.SuggestName)
            .setNameLocalizations({
                fr: fr.SuggestName,
                de: de.SuggestName,
                SpanishES: sp.SuggestName,
                nl: nl.SuggestName
            })
            .setDescription(en.SuggestDescription)
            .setDescriptionLocalizations({
                fr: fr.SuggestDescription,
                de: de.SuggestDescription,
                SpanishES: sp.SuggestDescription,
                nl: nl.SuggestDescription
            })
            .setRequired(false))
        .addUserOption(option => option
            .setName(en.MemberName)
            .setNameLocalizations({
                fr: fr.MemberName,
                de: de.MemberName,
                SpanishES: sp.MemberName,
                nl: nl.MemberName
            })
            .setDescription(en.MemberDescription)
            .setDescriptionLocalizations({
                fr: fr.MemberDescription,
                de: de.MemberDescription,
                SpanishES: sp.MemberDescription,
                nl: nl.MemberDescription
            })
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
        const ProfileData = sequelize.define("Profile", {
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

        const choice = interaction.options.getString(en.ChoiceName);
        let user = interaction.options.getUser(en.MemberName);
        let image = interaction.options.getAttachment(en.SuggestName);

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

        let ActionImageData = await ActionImage.findAll({ where: { Category: choice }, order: sequelize.random(), limit: 1 });
        let LoggingData = await Logging.findOne({ where: { GuildID: interaction.guild.id } })

        let ProfileCheck1 = await ProfileData.findOne({ where: { UserID: interaction.user.id } })
        let ProfileCheck2 = await ProfileData.findOne({ where: { UserID: User3 } })

        let Pronouns1 = "";

        if (ProfileCheck1) {
            if (!ProfileCheck1.Pronouns) {
                Pronouns1 = "their";
            }

            if (ProfileCheck1.Pronouns === Profile.pronouns.th) Pronouns1 = "their";
            if (ProfileCheck1.Pronouns === Profile.pronouns.he) Pronouns1 = "him";
            if (ProfileCheck1.Pronouns === Profile.pronouns.sh) Pronouns1 = "her";
        } else {
            Pronouns1 = "their";
        }

        let Pronouns2 = "";
        let Pronouns4 = "";

        if (ProfileCheck2) {
            if (!ProfileCheck2.Pronouns) {
                Pronouns2 = "them";
                Pronouns4 = "their";
            }

            if (ProfileCheck2.Pronouns === Profile.pronouns.th) Pronouns2 = "them";
            if (ProfileCheck2.Pronouns === Profile.pronouns.th) Pronouns4 = "their";
            if (ProfileCheck2.Pronouns === Profile.pronouns.he) Pronouns2 = "him";
            if (ProfileCheck2.Pronouns === Profile.pronouns.he) Pronouns4 = "his";
            if (ProfileCheck2.Pronouns === Profile.pronouns.sh) {
                Pronouns2 = "her";
                Pronouns4 = "her";
            }
        } else {
            Pronouns2 = "them";
            Pronouns4 = "their";
        }

        const HugSentence = [
            User1 + " approaches " + User2 + " gently and hugs " + Pronouns2 + " from behind!~",
            User1 + " wraps " + Pronouns1 + " arms around " + User2 + ", taking " + Pronouns2 + " into " + Pronouns1 + " warm embrace!~",
            User1 + " jump on " + User2 + "'s back and hug " + Pronouns2 + " thightly"
        ];
        const KissSentence = [
            User1 + " approches slowly " + User2 + "'s face and gently kiss " + Pronouns2 + " on the lips!~",
            User1 + " wraps " + Pronouns1 + " arms around " + User2 + ", place " + Pronouns1 + " lips to " + Pronouns2 + " lips and kiss " + Pronouns2 + " deeply!~"
        ];
        const BoopSentence = [
            User1 + " raises their paw and places it apon " + User2 + "'s snoot!~",
        ];
        const LickSentence = [
            User1 + " gets really close to " + User2 + " face and lick " + Pronouns2 + "!~",
            User1 + " licks " + User2 + " rapidly, and runs away!",
        ];
        const CuddleSentence = [
            User1 + " sneaks up behind " + User2 + " and pounces, cuddling the suprised floofer!~"
        ];
        const YeetSentence = [
            User1 + " yeeted " + User2 + " into the stratosphere!~",
            User1 + " grabbed " + User2 + " by the scruff and yeeted " + Pronouns2 + " 10 miles into the sky!",
            User1 + " grabs " + User2 + " by " + Pronouns4 + " tail and throws " + Pronouns2 + " to Ohio!"
        ];
        const PatSentence = [
            User1 + " rub " + User2 + " on the head!~",
            User1 + " mess " + User2 + " hair!~",
            User1 + " strokes " + User2 + " head, messing with " + Pronouns4 + " hair!~"
        ];
        const BiteSentence = [
            User1 + " decided to bite " + User2 + " a little!~",
        ];
        const BonkSentence = [
            User1 + " swing a baseball bat on " + User2 + "'s head. Bonking " + Pronouns2 + "!~"
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
            case ("pat"):
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

                const RandomPatSentence = PatSentence[Math.floor(Math.random() * PatSentence.length)];
                let RandomImage7 = ActionImageData[Math.floor(Math.random() * ActionImageData.length)];

                const imageEmbed7 = new MessageEmbed()
                    .setDescription(embedDescription)
                    .setImage(RandomImage7.ImageURL)
                    .setColor(Color.Green)

                if (LoggingData) {
                    if (LoggingData.SettingsActionImage === "Disabled" & LoggingData.SettingsActionMessage === "Disabled") {
                        return interaction.reply({
                            content: ["This command has been disabled in this server."],
                        });
                    }
                    if (LoggingData.SettingsActionImage === "Disabled") {
                        return interaction.reply({
                            content: RandomPatSentence,
                        });
                    }
                    if (LoggingData.SettingsActionMessage === "Disabled") {
                        return interaction.reply({
                            embeds: [imageEmbed7]
                        });
                    }
                }

                return interaction.reply({
                    content: RandomPatSentence,
                    embeds: [imageEmbed7]
                });
            case ("bite"):
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

                const RandomBiteSentence = BiteSentence[Math.floor(Math.random() * BiteSentence.length)];
                let RandomImage8 = ActionImageData[Math.floor(Math.random() * ActionImageData.length)];

                const imageEmbed8 = new MessageEmbed()
                    .setDescription(embedDescription)
                    .setImage(RandomImage8.ImageURL)
                    .setColor(Color.Green)

                if (LoggingData) {
                    if (LoggingData.SettingsActionImage === "Disabled" & LoggingData.SettingsActionMessage === "Disabled") {
                        return interaction.reply({
                            content: ["This command has been disabled in this server."],
                        });
                    }
                    if (LoggingData.SettingsActionImage === "Disabled") {
                        return interaction.reply({
                            content: RandomBiteSentence,
                        });
                    }
                    if (LoggingData.SettingsActionMessage === "Disabled") {
                        return interaction.reply({
                            embeds: [imageEmbed8]
                        });
                    }
                }

                return interaction.reply({
                    content: RandomBiteSentence,
                    embeds: [imageEmbed8]
                });
            case ("bonk"):
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

                const RandomBonkSentence = BonkSentence[Math.floor(Math.random() * BonkSentence.length)];
                let RandomImage9 = ActionImageData[Math.floor(Math.random() * ActionImageData.length)];

                const imageEmbed9 = new MessageEmbed()
                    .setDescription(embedDescription)
                    .setImage(RandomImage9.ImageURL)
                    .setColor(Color.Green)

                if (LoggingData) {
                    if (LoggingData.SettingsActionImage === "Disabled" & LoggingData.SettingsActionMessage === "Disabled") {
                        return interaction.reply({
                            content: ["This command has been disabled in this server."],
                        });
                    }
                    if (LoggingData.SettingsActionImage === "Disabled") {
                        return interaction.reply({
                            content: RandomBonkSentence,
                        });
                    }
                    if (LoggingData.SettingsActionMessage === "Disabled") {
                        return interaction.reply({
                            embeds: [imageEmbed9]
                        });
                    }
                }

                return interaction.reply({
                    content: RandomBonkSentence,
                    embeds: [imageEmbed9]
                });
        };
    }
};