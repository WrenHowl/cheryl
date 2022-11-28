const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Config = require("../config/config.json");
const Color = require("../config/color.json");
const ProfileInfo = require("../config/profile.json")
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
                { name: "bonk", value: "bonk" },
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
        try {
            const CommandFunction = sequelize.define("CommandFunction", {
                name: {
                    type: Sequelize.STRING,
                },
                value: {
                    type: Sequelize.STRING,
                },
            });

            const FindCommand = await CommandFunction.findOne({ where: { name: en.Name } });

            const MessageReason = require("../config/message.json");

            if (FindCommand) {
                if (FindCommand.value === "Disable") {
                    return interaction.reply({
                        content: MessageReason.CommandDisabled,
                        ephemeral: true,
                    });
                };
            };

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
            });

            const choice = interaction.options.getString(en.ChoiceName);
            let user = interaction.options.getUser(en.MemberName);
            let image = interaction.options.getAttachment(en.SuggestName);

            const User1 = interaction.user.toString();

            let User2 = user ? user.toString() : bot.user.toString();

            let User3 = user ? user.id : bot.user.id;

            let ActionImageData = await ActionImage.findAll({ where: { Category: choice }, order: sequelize.random(), limit: 1 });
            let LoggingData = await Logging.findOne({ where: { GuildID: interaction.guild.id } });

            let ProfileData1 = await Profile.findOne({ where: { UserID: interaction.user.id } });
            let ProfileData2 = await Profile.findOne({ where: { UserID: User3 } });

            if (ProfileData1) {
                if (!ProfileData1.Pronouns) {
                    Pronouns1 = "their";
                };

                if (ProfileData1.Pronouns === ProfileInfo.pronouns.th) Pronouns1 = "their";
                if (ProfileData1.Pronouns === ProfileInfo.pronouns.he) Pronouns1 = "him";
                if (ProfileData1.Pronouns === ProfileInfo.pronouns.sh) Pronouns1 = "her";
            } else {
                Pronouns1 = "their";
            };

            if (ProfileData2) {
                if (!ProfileData2.Pronouns) {
                    Pronouns2 = "them";
                    Pronouns4 = "their";
                };

                if (ProfileData2.Pronouns === ProfileInfo.pronouns.th) Pronouns2 = "them";
                if (ProfileData2.Pronouns === ProfileInfo.pronouns.th) Pronouns4 = "their";
                if (ProfileData2.Pronouns === ProfileInfo.pronouns.he) Pronouns2 = "him";
                if (ProfileData2.Pronouns === ProfileInfo.pronouns.he) Pronouns4 = "his";
                if (ProfileData2.Pronouns === ProfileInfo.pronouns.sh) {
                    Pronouns2 = "her";
                    Pronouns4 = "her";
                };
            } else {
                Pronouns2 = "them";
                Pronouns4 = "their";
            };

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

            if (image) {
                let fetchGuild = interaction.client.guilds.cache.get(Config.guildId);
                let suggestChannel = fetchGuild.channels.cache.get(Config.SuggestImage);

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
                }).then(async (sent) => {
                    await ActionImage.create({
                        MessageID: sent.id,
                        Category: choice,
                        ImageURL: image.url,
                        UserName: interaction.user.tag,
                        UserID: interaction.user.id,
                    });
                });
            } else {
                const HugSentence = [
                    User1 + " approaches " + User2 + " gently and hugs " + Pronouns2 + " from behind!~",
                    User1 + " wraps " + Pronouns1 + " arms around " + User2 + ", taking " + Pronouns2 + " into " + Pronouns1 + " warm embrace!~",
                    User1 + " jump on " + User2 + "'s back and hug " + Pronouns2 + " thightly!~"
                ];
                const KissSentence = [
                    User1 + " approches slowly " + User2 + "'s face and gently kiss " + Pronouns2 + "!~",
                    User1 + " gets close to " + User2 + " and kiss " + Pronouns2 + "!~"
                ];
                const BoopSentence = [
                    User1 + " raises their paw and places it apon " + User2 + "'s snoot!~",
                ];
                const LickSentence = [
                    User1 + " gets really close to " + User2 + " face and lick " + Pronouns2 + "!~",
                ];
                const CuddleSentence = [
                    User1 + " approches " + User2 + " and pounces, cuddling the suprised floofer!~",
                    User1 + " join " + User2 + " and cuddle " + Pronouns2 + "!~",
                ];
                const YeetSentence = [
                    User1 + " yeeted " + User2 + " into the stratosphere!~",
                    User1 + " grabbed " + User2 + " and yeeted " + Pronouns2 + " 10 miles into the sky!",
                    User1 + " grabs " + User2 + " and throws " + Pronouns2 + " to Ohio!"
                ];
                const PatSentence = [
                    User1 + " rub " + User2 + " on the head!~",
                    User1 + " mess " + User2 + " hair!~",
                    User1 + " strokes " + User2 + " head, messing with " + Pronouns4 + " hair!~"
                ];
                const BiteSentence = [
                    User1 + " decided to bite " + User2 + " a little!~",
                    User1 + " bite " + User2 + " to taste " + Pronouns2 + "!~",
                ];
                const BonkSentence = [
                    User1 + " swing a baseball bat on " + User2 + "'s head. Bonking " + Pronouns2 + "!~"
                ];

                if (LoggingData.SettingsActionImage === "Disabled" && LoggingData.SettingsActionMessage === "Disabled") {
                    return interaction.reply({
                        content: "This command has been disabled in this server.",
                        ephemeral: true,
                    });
                };

                const SupportDiscord = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setLabel('Support Server')
                            .setURL(Config.SupportDiscord)
                            .setStyle('LINK'),
                    );

                if (choice === "hug") Sentence = HugSentence;
                if (choice === "kiss") Sentence = KissSentence;
                if (choice === "boop") Sentence = BoopSentence;
                if (choice === "lick") Sentence = LickSentence;
                if (choice === "cuddle") Sentence = CuddleSentence;
                if (choice === "yeet") Sentence = YeetSentence;
                if (choice === "pat") Sentence = PatSentence;
                if (choice === "bite") Sentence = BiteSentence;
                if (choice === "bonk") Sentence = BonkSentence;

                let RandomAnswer = Sentence[Math.floor(Math.random() * Sentence.length)];
                let RandomImage = ActionImageData[Math.floor(Math.random() * ActionImageData.length)];

                const imageEmbed = new MessageEmbed()
                    .setImage(RandomImage.ImageURL)
                    .setColor(Color.Blue)

                if (LoggingData.SettingsActionImage === "Disabled") {
                    return interaction.reply({
                        content: RandomAnswer,
                        components: [SupportDiscord],
                    });
                };

                if (LoggingData.SettingsActionMessage === "Disabled") {
                    return interaction.reply({
                        embeds: [imageEmbed],
                        components: [SupportDiscord],
                    });
                };

                return interaction.reply({
                    content: RandomAnswer,
                    embeds: [imageEmbed],
                    components: [SupportDiscord],
                });
            };
        } catch (error) {
            let fetchGuild = interaction.client.guilds.cache.get(Config.guildId);
            let CrashChannel = fetchGuild.channels.cache.get(Config.CrashChannel);

            return CrashChannel.send({ content: "**Error in the '" + en.Name + "' Command:** \n\n```javascript\n" + error + "```" });
        };
    }
};