const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const configPreset = require("../config/main.json");
const profileInfo = require("../config/profile.json");

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
                { name: "Hug", value: "hug" },
                { name: "Kiss", value: "kiss" },
                { name: "Boop", value: "boop" },
                { name: "Lick", value: "lick" },
                { name: "Cuddle", value: "cuddle" },
                { name: "Yeet", value: "yeet" },
                { name: "Pat", value: "pat" },
                { name: "Bite", value: "bite" },
                { name: "Bonk", value: "bonk" },
                { name: "Fuck → male/female", value: "fuckstraight" },
                { name: "Suck → male/female", value: "suckstraight" },
                { name: "Ride → male/female", value: "ridestraight" },
                { name: "Fill → male/female", value: "fillstraight" },
                { name: "Eat → male/female", value: "eatstraight" },
                { name: "Fuck → male/male", value: "fuckgay" },
                { name: "Suck → male/male", value: "suckgay" },
                { name: "Ride → male/male", value: "ridegay" },
                { name: "Fill → male/male", value: "fillgay" },
                { name: "Eat → male/male", value: "eatgay" },
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
        const Logging = sequelize.define("Logging", {
            guildId: {
                type: Sequelize.STRING,
            },
            language: {
                type: Sequelize.STRING,
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

            let choice = interaction.options.getString(en.action.default.choice.name);
            let suggestImage = interaction.options.getString(en.action.default.suggest.name);
            let user = interaction.options.getUser(en.action.default.member.name);
            let actionImageData = await ActionImage.findAll({ where: { category: choice }, order: sequelize.random(), limit: 1 });

            let nsfwChoice = [
                "fuckstraight",
                "fuckgay",
                "suckstraight",
                "suckgay",
                "ridestraight",
                "ridegay",
                "fillstraight",
                "fillgay",
                "eatstraight",
                "eatgay"
            ];

            if (suggestImage) {
                let fetchGuild = interaction.client.guilds.cache.get(configPreset.botInfo.supportServerId);

                // Check if the suggestion string is a URL
                try {
                    new URL(suggestImage);
                    !suggestImage.endsWith("gif")
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
                            .setCustomId('acceptSuggestionAction')
                            .setLabel("Accept")
                            .setStyle(ButtonStyle.Success),
                    )
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('denySuggestionAction')
                            .setLabel("Deny")
                            .setStyle(ButtonStyle.Danger),
                    );

                let imageEmbed = new EmbedBuilder()
                    .addFields(
                        { name: "Category:", value: choice, inline: true },
                        { name: "Author:", value: interaction.user.tag + " *(" + interaction.user.id + ")*", inline: true }
                    )
                    .setImage(suggestImage)
                    .setColor("Yellow");

                // Change the channel ID in function of the choice (sfw or nsfw)
                !choice === !nsfwChoice.includes(choice) ? channelSuggestionId = configPreset.channelsId.nsfwSuggestion : channelSuggestionId = configPreset.channelsId.sfwSuggestion;
                let suggestChannel = fetchGuild.channels.cache.get(channelSuggestionId);

                if (interaction.user.id === configPreset.botInfo.ownerId) {
                    imageEmbed.setColor("Green");
                    imageEmbed.addFields(
                        { name: "Status:", value: "Accepted" }
                    );

                    return suggestChannel.send({
                        embeds: [imageEmbed],
                    }).then(async (sent) => {
                        await ActionImage.create({
                            messageId: sent.id,
                            category: choice,
                            imageUrl: suggestImage,
                            userTag: interaction.user.tag,
                            userId: interaction.user.id,
                        });
                    });
                };

                return suggestChannel.send({
                    embeds: [imageEmbed],
                    components: [buttonSuggestion]
                }).then(async (sent) => {
                    // Adding the image to the database
                    await ActionImage.create({
                        messageId: sent.id,
                        category: choice,
                        imageUrl: suggestImage,
                        userTag: interaction.user.tag,
                        userId: interaction.user.id,
                    });
                });
            } else {
                let userOne = interaction.user.toString();
                let userTwo = user ? user.toString() : bot.user.toString();
                let userThree = user ? user.id : bot.user.id;

                let profileInteractionData = await Profile.findOne({ where: { userId: interaction.user.id } });
                let profileTargetData = await Profile.findOne({ where: { userId: userThree } });

                if (loggingData.status_canActionImage === "Disabled" && loggingData.status_canActionMessage === "Disabled") {
                    return interaction.reply({
                        content: languageSet.action.message.error.disable,
                        ephemeral: true,
                    });
                } else if (!choice === !nsfwChoice.includes(choice)) {
                    if (!interaction.channel.nsfw) {
                        return interaction.reply({
                            content: languageSet.action.message.error.notNsfw,
                            ephemeral: true,
                        });
                    };
                };

                let pronouns = languageSet.profile.default.choice.pronouns.list;

                if (profileInteractionData) {
                    switch (profileInteractionData.pronouns) {
                        case (profileInfo.pronouns.th):
                            pronounsOne = pronouns.them;
                            pronounsTwo = pronouns.their;
                            break;
                        case (profileInfo.pronouns.he):
                            pronounsOne = pronouns.him;
                            pronounsTwo = pronouns.his;
                            break;
                        case (profileInfo.pronouns.sh):
                            pronounsOne = pronouns.she;
                            pronounsTwo = pronouns.her;
                            break;
                        default:
                            pronounsOne = pronouns.them;
                            pronounsTwo = pronouns.their;
                            break;
                    }
                } else {
                    pronounsOne = pronouns.them;
                    pronounsTwo = pronouns.their;
                };

                if (profileTargetData) {
                    switch (profileTargetData.pronouns) {
                        case (profileInfo.pronouns.th):
                            pronounsThree = pronouns.them;
                            pronounsFour = pronouns.their;
                            break;
                        case (profileInfo.pronouns.he):
                            pronounsThree = pronouns.him;
                            pronounsFour = pronouns.his;
                            break;
                        case (profileInfo.pronouns.sh):
                            pronounsThree = pronouns.her;
                            pronounsFour = pronouns.her;
                            break;
                        default:
                            pronounsThree = pronouns.them;
                            pronounsFour = pronouns.their;
                            break;
                    }
                } else {
                    pronounsThree = pronouns.them;
                    pronounsFour = pronouns.their;
                };

                switch (choice) {
                    case ("hug"):
                        const hugSentence = [
                            userOne + " approaches " + userTwo + " gently and hugs " + pronounsThree + " from behind!~",
                            userOne + " wraps " + pronounsTwo + " arms around " + userTwo + ", taking " + pronounsThree + " into " + pronounsTwo + " warm embrace!~",
                            userOne + " jump on " + userTwo + "'s back and hug " + pronounsThree + " tightly!~"
                        ];
                        sentence = hugSentence;
                        break;
                    case ("kiss"):
                        const kissSentence = [
                            userOne + " approches slowly " + userTwo + "'s face and gently kiss " + pronounsThree + "!~",
                            userOne + " gets close to " + userTwo + " and kiss " + pronounsThree + "!~"
                        ];
                        sentence = kissSentence;
                        break;
                    case ("boop"):
                        const boopSentence = [
                            userOne + " raises " + pronounsTwo + " paw and places it apon " + userTwo + "'s snoot!~",
                        ];
                        sentence = boopSentence;
                        break;
                    case ("lick"):
                        const lickSentence = [
                            userOne + " gets really close to " + userTwo + " face and lick " + pronounsThree + "!~",
                        ];
                        sentence = lickSentence;
                        break;
                    case ("cuddle"):
                        const cuddleSentence = [
                            userOne + " approches " + userTwo + " and pounces, cuddling the suprised floofer!~",
                            userOne + " join " + userTwo + " and cuddle " + pronounsThree + "!~",
                        ];
                        sentence = cuddleSentence;
                        break;
                    case ("yeet"):
                        const yeetSentence = [
                            userOne + " yeeted " + userTwo + " into the stratosphere!~",
                            userOne + " grabbed " + userTwo + " and yeeted " + pronounsThree + " 10 miles into the sky!",
                            userOne + " grabs " + userTwo + " and throws " + pronounsThree + " to Ohio!"
                        ];
                        sentence = yeetSentence;
                        break;
                    case ("pat"):
                        const patSentence = [
                            userOne + " rub " + userTwo + " on the head!~",
                            userOne + " mess " + userTwo + " hair!~",
                            userOne + " strokes " + userTwo + " head, messing with " + pronounsFour + " hair!~"
                        ];
                        sentence = patSentence;
                        break;
                    case ("bite"):
                        const biteSentence = [
                            userOne + " decided to bite " + userTwo + " a little!~",
                            userOne + " bite " + userTwo + " to taste " + pronounsThree + "!~",
                        ];
                        sentence = biteSentence;
                        break;
                    case ("bonk"):
                        const bonkSentence = [
                            userOne + " swing a baseball bat on " + userTwo + "'s head. Bonking " + pronounsThree + "!~"
                        ];
                        sentence = bonkSentence;
                        break;
                    case ("fuckstraight"):
                        const fuckStraightSentence = [
                            userOne + " fuck " + userTwo + " pussy really hard~",
                            userOne + " thrust into " + userTwo + " back and forth into " + pronounsFour + " pussy making " + pronounsThree + " all wet~",
                        ];
                        sentence = fuckStraightSentence;
                        break;
                    case ("fuckgay"):
                        const fuckGaySentence = [
                            userOne + " fuck " + userTwo + " really hard into " + pronounsFour + " ass~",
                            userOne + " thrust into " + userTwo + " back and forth into " + pronounsFour + " ass~",
                        ];
                        sentence = fuckGaySentence;
                        break;
                    case ("suckstraight"):
                        const suckStraightSentence = [
                            userOne + " suck " + userTwo + "'s dick~",
                            userOne + " enjoys " + userTwo + "'s dick while sucking it~",
                        ];
                        sentence = suckStraightSentence;
                        break;
                    case ("eatstraight"):
                        const eatStraightSentence = [
                            userOne + " eat " + userTwo + "'s ass~",
                        ];
                        sentence = eatStraightSentence;
                        break;
                    case ("suckgay"):
                        const suckGaySentence = [
                            userOne + " suck " + userTwo + "'s dick~",
                            userOne + " enjoys " + userTwo + "'s dick while sucking it~",
                        ];
                        sentence = suckGaySentence;
                        break;
                    case ("ridestraight"):
                        const rideStraightSentence = [
                            userOne + " ride " + userTwo + "'s dick~",
                            userOne + " enjoys " + userTwo + "'s dick while riding it~",
                        ];
                        sentence = rideStraightSentence;
                        break;
                    case ("ridegay"):
                        const rideGaySentence = [
                            userOne + " ride " + userTwo + "'s dick~",
                            userOne + " enjoys " + userTwo + "'s dick while riding it~",
                        ];
                        sentence = rideGaySentence;
                        break;
                    case ("fillstraight"):
                        const fillStraightSentence = [
                            userOne + " fills up " + userTwo + "'s ass with " + pronounsTwo + " seed~",
                            userOne + " pushes " + pronounsFour + " dick deep inside " + userTwo + "'s ass, filling it up with " + pronounsTwo + " juicy cum~",
                        ];
                        sentence = fillStraightSentence;
                        break;
                    case ("fillgay"):
                        const fillGaySentence = [
                            userOne + " fills up " + userTwo + "'s ass with " + pronounsTwo + " seed~",
                            userOne + " pushes " + pronounsFour + " dick deep inside " + userTwo + "'s ass, filling it up with " + pronounsTwo + " juicy cum~",
                        ];
                        sentence = fillGaySentence;
                        break;
                    case ("eatgay"):
                        const eatGaySentence = [
                            userOne + " eat " + userTwo + "'s ass~",
                        ];
                        sentence = eatGaySentence;
                        break;
                }

                let randomAnswer = await sentence[Math.floor(Math.random() * sentence.length)];
                let randomImage = await actionImageData[Math.floor(Math.random() * actionImageData.length)];

                if (loggingData.status_canActionImage === "Disabled") {
                    return interaction.reply({
                        content: randomAnswer + "\n\n" + randomImage.imageUrl,
                    });
                } else if (loggingData.status_canActionMessage === "Disabled") {
                    return interaction.reply({
                        content: randomImage.imageUrl,
                    });
                } else {
                    return interaction.reply({
                        content: randomAnswer + "\n\n" + randomImage.imageUrl,
                    });
                }
            };
        } catch (error) {
            let fetchguildId = bot.guilds.cache.get(configPreset.botInfo.supportServerId);
            let crashchannelId = fetchguildId.channels.cache.get(configPreset.channelsId.crash);
            console.log(`${interaction.user.id} -> ${interaction.user.username}`);
            console.log(error);

            await interaction.reply({
                content: languageSet.default.errorOccured,
                ephemeral: true,
            });

            return crashchannelId.send({ content: "**Error in the '" + en.action.default.name + "' event:** \n\n```javascript\n" + error + "```" });
        };
    }
};