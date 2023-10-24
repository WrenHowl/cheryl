const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const configPreset = require("../settings/config.json");
const profileInfo = require("../settings/profile.json");

const fr = require("../languages/fr.json");
const en = require("../languages/en.json");
const de = require("../languages/de.json");
const sp = require("../languages/sp.json");
const nl = require("../languages/nl.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName(en.action.default.name)
        .setNameLocalizations({
            "fr": fr.action.default.name,
            "de": de.action.default.name,
            "es-ES": sp.action.default.name,
            "nl": nl.action.default.name
        })
        .setDescription(en.action.default.description)
        .setDescriptionLocalizations({
            "fr": fr.action.default.description,
            "de": de.action.default.description,
            "es-ES": sp.action.default.description,
            "nl": nl.action.default.description
        })
        .addStringOption(option => option
            .setName(en.action.default.choice.name)
            .setNameLocalizations({
                "fr": fr.action.default.choice.name,
                "de": de.action.default.choice.name,
                "es-ES": sp.action.default.choice.name,
                "nl": nl.action.default.choice.name
            })
            .setDescription(en.action.default.choice.description)
            .setDescriptionLocalizations({
                "fr": fr.action.default.choice.description,
                "de": de.action.default.choice.description,
                "es-ES": sp.action.default.choice.description,
                "nl": nl.action.default.choice.description
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
                { name: "fuck (straight)", value: "fuckstraight" },
                { name: "fuck (gay)", value: "fuckgay" },
            ))
        .addStringOption(option => option
            .setName(en.action.default.suggest.name)
            .setNameLocalizations({
                "fr": fr.action.default.suggest.name,
                "de": de.action.default.suggest.name,
                "es-ES": sp.action.default.suggest.name,
                "nl": nl.action.default.suggest.name
            })
            .setDescription(en.action.default.suggest.description)
            .setDescriptionLocalizations({
                "fr": fr.action.default.suggest.description,
                "de": de.action.default.suggest.description,
                "es-ES": sp.action.default.suggest.description,
                "nl": nl.action.default.suggest.description
            })
            .setRequired(false))
        .addUserOption(option => option
            .setName(en.action.default.member.name)
            .setNameLocalizations({
                "fr": fr.action.default.member.name,
                "de": de.action.default.member.name,
                "es-ES": sp.action.default.member.name,
                "nl": nl.action.default.member.name
            })
            .setDescription(en.action.default.member.description)
            .setDescriptionLocalizations({
                "fr": fr.action.default.member.description,
                "de": de.action.default.member.description,
                "es-ES": sp.action.default.member.description,
                "nl": nl.action.default.member.description
            })
            .setRequired(false)),
    execute: async (interaction, bot, sequelize, Sequelize) => {
        try {
            const ActionImage = sequelize.define("ActionImage", {
                imageUrl: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                category: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                messageId: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                userTag: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                userId: {
                    type: Sequelize.STRING,
                    unique: false,
                },
            });
            const Logging = sequelize.define("Logging", {
                guildId: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                status_canActionMessage: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                status_canActionImage: {
                    type: Sequelize.STRING,
                    unique: false,
                }
            });
            const Profile = sequelize.define("Profile", {
                userTag: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                userId: {
                    type: Sequelize.STRING,
                    unique: false,
                },
                pronouns: {
                    type: Sequelize.STRING,
                    unique: false,
                },
            });

            let loggingData = await Logging.findOne({ where: { guildId: interaction.guild.id } });

            switch (loggingData.language) {
                case ("en"):
                    languageSet = en;
                    break;
                case ("fr"):
                    languageSet = fr;
                    break;
                case ("de"):
                    languageSet = de;
                    break;
                case ("sp"):
                    languageSet = sp;
                    break;
                case ("nl"):
                    languageSet = nl;
                    break;
                default:
                    languageSet = en;
                    break;
            }

            let choice = interaction.options.getString(en.action.default.choice.name);
            let suggestImage = interaction.options.getString(en.action.default.suggest.name);
            let user = interaction.options.getUser(en.action.default.member.name);

            let actionImageData = await ActionImage.findAll({ where: { category: choice }, order: sequelize.random(), limit: 1 });

            let nsfwChoice = [
                "fuckstraight",
                "fuckgay"
            ];

            if (suggestImage) {
                let fetchGuild = interaction.client.guilds.cache.get(configPreset.botInfo.guildIdguildId);

                // Check if the suggestion string is a URL

                try {
                    new URL(suggestImage);
                } catch (error) {
                    return interaction.reply({
                        content: languageSet.action.message.error.wrongUrl,
                        ephemeral: true,
                    });
                }

                // Check if image has already been suggested/added

                let imageData = await ActionImage.findOne({ where: { imageUrl: suggestImage } });

                if (imageData) {
                    return interaction.reply({
                        content: languageSet.action.message.error.alreadyExist,
                        ephemeral: true,
                    });
                };

                // Notify that the suggestion has been received

                await interaction.reply({
                    content: `${languageSet.action.message.success.suggested} *${bot.user.username}*`,
                    ephemeral: true
                })

                // Creating the embed and button

                let buttonSuggestion = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('AcceptSuggestion')
                            .setLabel("Accept")
                            .setStyle(ButtonStyle.Success),
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('DenySuggestion')
                            .setLabel("Deny")
                            .setStyle(ButtonStyle.Danger),
                    );

                let imageEmbed = new EmbedBuilder()
                    .addFields(
                        { name: "Category:", value: choice, inline: true },
                        { name: "Author:", value: interaction.user.tag + " *(" + interaction.user.id + ")*", inline: true }
                    )
                    .setImage(suggestImage)

                // Change the channel ID in function of the choice (sfw or nsfw)

                !choice === !nsfwChoice.includes(choice) ? ChannelToSend = configPreset.channelsId.nsfwSuggestion : ChannelToSend = configPreset.channelsId.sfwSuggestion;
                let suggestChannel = fetchGuild.channels.cache.get(ChannelToSend);

                if (interaction.user.id === configPreset.botInfo.ownerId) {
                    imageEmbed.setColor("Green")
                    imageEmbed.addFields(
                        { name: "Status:", value: "Accepted" }
                    )

                    return suggestChannel.send({
                        embeds: [imageEmbed],
                    });
                } else {
                    imageEmbed.setColor("Yellow")
                }

                return suggestChannel.send({
                    embeds: [imageEmbed],
                    components: [buttonSuggestion]
                }).then(async (sent) => {

                    // Adding the image to the database

                    await ActionImage.create({
                        messageId: sent.id,
                        category: choice,
                        imageUrl: suggestImage.url,
                        userTag: interaction.user.tag,
                        userId: interaction.user.id,
                    });
                });
            } else {
                let User1 = interaction.user.toString();
                let User2 = user ? user.toString() : bot.user.toString();
                let User3 = user ? user.id : bot.user.id;

                let ProfileData1 = await Profile.findOne({ where: { userId: interaction.user.id } });
                let ProfileData2 = await Profile.findOne({ where: { userId: User3 } });

                if (loggingData.status_canActionImage === "Disabled" && loggingData.status_canActionMessage === "Disabled") {
                    return interaction.reply({
                        content: languageSet.action.message.error.disable,
                        ephemeral: true,
                    });
                };

                if (!choice === !nsfwChoice.includes(choice)) {
                    if (!interaction.channel.nsfw) {
                        return interaction.reply({
                            content: languageSet.action.message.error.notNsfw,
                            ephemeral: true,
                        });
                    }
                }

                let pronouns = languageSet.profile.default.choice.pronouns.list;

                if (ProfileData1) {
                    switch (ProfileData1.Pronouns) {
                        case (profileInfo.pronouns.th):
                            Pronouns1 = pronouns.their;

                            break;
                        case (profileInfo.pronouns.he):
                            Pronouns1 = pronouns.him;

                            break;
                        case (profileInfo.pronouns.sh):
                            Pronouns1 = pronouns.her;

                            break;
                        default:
                            Pronouns1 = pronouns.their;

                            break;
                    }
                } else {
                    Pronouns1 = pronouns.their;
                };

                if (ProfileData2) {
                    switch (ProfileData2.Pronouns) {
                        case (profileInfo.pronouns.th):
                            Pronouns1 = pronouns.their;
                            Pronouns4 = pronouns.their;

                            break;
                        case (profileInfo.pronouns.he):
                            Pronouns1 = pronouns.him;
                            Pronouns4 = pronouns.his;

                            break;
                        case (profileInfo.pronouns.sh):
                            Pronouns2 = pronouns.her;
                            Pronouns4 = pronouns.her;

                            break;
                        default:
                            Pronouns2 = pronouns.them;
                            Pronouns4 = pronouns.their;

                            break;
                    }
                } else {
                    Pronouns2 = pronouns.them;
                    Pronouns4 = pronouns.their;
                };

                const hugSentence = [
                    User1 + " approaches " + User2 + " gently and hugs " + Pronouns2 + " from behind!~",
                    User1 + " wraps " + Pronouns1 + " arms around " + User2 + ", taking " + Pronouns2 + " into " + Pronouns1 + " warm embrace!~",
                    User1 + " jump on " + User2 + "'s back and hug " + Pronouns2 + " tightly!~"
                ];
                const kissSentence = [
                    User1 + " approches slowly " + User2 + "'s face and gently kiss " + Pronouns2 + "!~",
                    User1 + " gets close to " + User2 + " and kiss " + Pronouns2 + "!~"
                ];
                const boopSentence = [
                    User1 + " raises " + Pronouns1 + " paw and places it apon " + User2 + "'s snoot!~",
                ];
                const lickSentence = [
                    User1 + " gets really close to " + User2 + " face and lick " + Pronouns2 + "!~",
                ];
                const cuddleSentence = [
                    User1 + " approches " + User2 + " and pounces, cuddling the suprised floofer!~",
                    User1 + " join " + User2 + " and cuddle " + Pronouns2 + "!~",
                ];
                const yeetSentence = [
                    User1 + " yeeted " + User2 + " into the stratosphere!~",
                    User1 + " grabbed " + User2 + " and yeeted " + Pronouns2 + " 10 miles into the sky!",
                    User1 + " grabs " + User2 + " and throws " + Pronouns2 + " to Ohio!"
                ];
                const patSentence = [
                    User1 + " rub " + User2 + " on the head!~",
                    User1 + " mess " + User2 + " hair!~",
                    User1 + " strokes " + User2 + " head, messing with " + Pronouns4 + " hair!~"
                ];
                const biteSentence = [
                    User1 + " decided to bite " + User2 + " a little!~",
                    User1 + " bite " + User2 + " to taste " + Pronouns2 + "!~",
                ];
                const bonkSentence = [
                    User1 + " swing a baseball bat on " + User2 + "'s head. Bonking " + Pronouns2 + "!~"
                ];
                const fuckStraightSentence = [
                    User1 + " fuck " + User2 + " pussy really hard~",
                    User1 + " thrust into " + User2 + " back and forth into " + Pronouns4 + " pussy making " + Pronouns2 + " all wet~",
                ]
                const fuckGaySentence = [
                    User1 + " fuck " + User2 + " really hard into " + Pronouns4 + " ass~",
                    User1 + " thrust into " + User2 + " back and forth into " + Pronouns4 + " ass~",
                ]

                switch (choice) {
                    case ("hug"):
                        sentence = hugSentence;

                        break;
                    case ("kiss"):
                        sentence = kissSentence;

                        break;
                    case ("boop"):
                        sentence = boopSentence;

                        break;
                    case ("lick"):
                        sentence = lickSentence;

                        break;
                    case ("cuddle"):
                        sentence = cuddleSentence;

                        break;
                    case ("yeet"):
                        sentence = yeetSentence;

                        break;
                    case ("pat"):
                        sentence = patSentence;

                        break;
                    case ("bite"):
                        sentence = biteSentence;

                        break;
                    case ("bonk"):
                        sentence = bonkSentence;

                        break;
                    case ("fuckstraight"):
                        sentence = fuckStraightSentence;

                        break;
                    case ("fuckgay"):
                        sentence = fuckGaySentence;

                        break;
                }

                let randomAnswer = sentence[Math.floor(Math.random() * sentence.length)];
                let randomImage = actionImageData[Math.floor(Math.random() * actionImageData.length)];

                const supportDiscord = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel(languageSet.action.button.source)
                            .setURL(randomImage.imageUrl)
                            .setStyle(ButtonStyle.Link),
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel(languageSet.action.button.discord)
                            .setURL(configPreset.other.discordLink)
                            .setStyle(ButtonStyle.Link),
                    );

                const imageEmbed = new EmbedBuilder()
                    .setColor("Blue")
                    .setImage(randomImage.imageUrl)

                if (loggingData.status_canActionImage === "Disabled") {
                    return interaction.reply({
                        content: randomAnswer,
                        components: [supportDiscord],
                    });
                } else if (loggingData.status_canActionMessage === "Disabled") {
                    return interaction.reply({
                        embeds: [imageEmbed],
                        components: [supportDiscord],
                    });
                } else {
                    return interaction.reply({
                        content: randomAnswer,
                        embeds: [imageEmbed],
                        components: [supportDiscord],
                    });
                }
            };

        } catch (error) {
            let fetchguildId = bot.guilds.cache.get(configPreset.botInfo.guildId);
            let crashchannelId = fetchguildId.channels.cache.get(configPreset.channelsId.crash);
            console.log(error);

            return crashchannelId.send({ content: "**Error in the '" + en.action.default.name + "' event:** \n\n```javascript\n" + error + "```" });
        };
    }
};