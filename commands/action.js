const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { fr, en, de, sp, nl } = require('../preset/language')
const { bot, db } = require('../server');

const configPreset = require('../config/main.json');
const profileInfo = require('../config/profile.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName(en.action.default.name)
        .setNameLocalizations({
            'fr': fr.action.default.name,
            'de': de.action.default.name,
            'es-ES': sp.action.default.name,
            'nl': nl.action.default.name
        })
        .setDescription(en.action.default.description)
        .setDescriptionLocalizations({
            'fr': fr.action.default.description,
            'de': de.action.default.description,
            'es-ES': sp.action.default.description,
            'nl': nl.action.default.description
        })
        .addStringOption(option => option
            .setName(en.action.default.choice.name)
            .setNameLocalizations({
                'fr': fr.action.default.choice.name,
                'de': de.action.default.choice.name,
                'es-ES': sp.action.default.choice.name,
                'nl': nl.action.default.choice.name
            })
            .setDescription(en.action.default.choice.description)
            .setDescriptionLocalizations({
                'fr': fr.action.default.choice.description,
                'de': de.action.default.choice.description,
                'es-ES': sp.action.default.choice.description,
                'nl': nl.action.default.choice.description
            })
            .setRequired(true)
            .addChoices(
                { name: 'Hug', value: 'hug' },
                { name: 'Kiss', value: 'kiss' },
                { name: 'Boop', value: 'boop' },
                { name: 'Lick', value: 'lick' },
                { name: 'Cuddle', value: 'cuddle' },
                { name: 'Yeet', value: 'yeet' },
                { name: 'Pat', value: 'pat' },
                { name: 'Bite', value: 'bite' },
                { name: 'Bonk', value: 'bonk' },
                { name: 'Fuck → male/female', value: 'fuckstraight' },
                { name: 'Suck → male/female', value: 'suckstraight' },
                { name: 'Ride → male/female', value: 'ridestraight' },
                { name: 'Fill → male/female', value: 'fillstraight' },
                { name: 'Eat → male/female', value: 'eatstraight' },
                { name: 'Fuck → male/male', value: 'fuckgay' },
                { name: 'Suck → male/male', value: 'suckgay' },
                { name: 'Ride → male/male', value: 'ridegay' },
                { name: 'Fill → male/male', value: 'fillgay' },
                { name: 'Eat → male/male', value: 'eatgay' },
            ))
        .addStringOption(option => option
            .setName(en.action.default.suggest.name)
            .setNameLocalizations({
                'fr': fr.action.default.suggest.name,
                'de': de.action.default.suggest.name,
                'es-ES': sp.action.default.suggest.name,
                'nl': nl.action.default.suggest.name
            })
            .setDescription(en.action.default.suggest.description)
            .setDescriptionLocalizations({
                'fr': fr.action.default.suggest.description,
                'de': de.action.default.suggest.description,
                'es-ES': sp.action.default.suggest.description,
                'nl': nl.action.default.suggest.description
            })
            .setRequired(false))
        .addUserOption(option => option
            .setName(en.action.default.member.name)
            .setNameLocalizations({
                'fr': fr.action.default.member.name,
                'de': de.action.default.member.name,
                'es-ES': sp.action.default.member.name,
                'nl': nl.action.default.member.name
            })
            .setDescription(en.action.default.member.description)
            .setDescriptionLocalizations({
                'fr': fr.action.default.member.description,
                'de': de.action.default.member.description,
                'es-ES': sp.action.default.member.description,
                'nl': nl.action.default.member.description
            })
            .setRequired(false)),
    execute: async (interaction) => {
        // Offered options
        let optionChoice = interaction.options.getString(en.action.default.choice.name);
        let optionUser = interaction.options.getUser(en.action.default.member.name);
        let optionSuggest = interaction.options.getString(en.action.default.suggest.name);

        let nsfwChoice = [
            'fuckstraight',
            'fuckgay',
            'suckstraight',
            'suckgay',
            'ridestraight',
            'ridegay',
            'fillstraight',
            'fillgay',
            'eatstraight',
            'eatgay'
        ];

        if (optionSuggest) {
            // Check if the suggestion is an URL
            try {
                new URL(optionSuggest);
            } catch (error) {
                return interaction.reply({
                    content: languageSet.action.message.error.wrongURL,
                    ephemeral: true,
                });
            };

            // Check if the suggestion string is a valid format URL
            if (!['jpg', 'png', 'gif'].some(sm => optionSuggest.endsWith(sm))) {
                return interaction.reply({
                    content: languageSet.action.message.error.wrongFormat,
                    ephemeral: true,
                });
            };

            // Check if image has already been suggested/added
            await db.query(`SELECT imageUrl FROM actionimages WHERE imageUrl=?`, [optionSuggest], async (error, statement) => {
                if (statement) {
                    return interaction.reply({
                        content: languageSet.action.message.error.alreadyExist,
                        ephemeral: true,
                    });
                }
            });

            // Notify that the suggestion has been received
            interaction.reply({
                content: `${languageSet.action.message.success.suggested} *${bot.user.username}*`,
                ephemeral: true
            })

            // Creating the embed and button
            let buttonSuggestion = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('acceptSuggestionAction')
                        .setLabel('Accept')
                        .setStyle(ButtonStyle.Success),
                )
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('denySuggestionAction')
                        .setLabel('Deny')
                        .setStyle(ButtonStyle.Danger),
                );

            let imageEmbed = new EmbedBuilder()
                .addFields(
                    { name: 'Name', value: interaction.user.username, inline: true },
                    { name: 'ID', value: interaction.user.id, inline: true },
                    { name: '\u200b', value: '\u200b', inline: true },
                    { name: 'Category', value: optionChoice, inline: true },
                    { name: 'Image URL', value: `[Source](${optionSuggest})`, inline: true },
                    { name: '\u200b', value: '\u200b', inline: true },

                )
                .setImage(optionSuggest)
                .setColor('Yellow');

            async function suggestionData(msg) {
                await db.query('INSERT INTO actionimages (messageId, category, imageUrl, userTag, userId) VALUES (?, ?, ?, ?)',
                    [msg.id, optionChoice, optionSuggest, interaction.user.username, interaction.user.id]
                );
            };

            // Change the channel ID in function of the choice (sfw or nsfw)
            !optionChoice === !nsfwChoice.includes(optionChoice) ? channelSuggestId = configPreset.channelsId.nsfwSuggestion : channelSuggestId = configPreset.channelsId.sfwSuggestion;
            let channelSuggest = interaction.client.guilds.cache.get(configPreset.botInfo.supportServerId).channels.cache.get(channelSuggestId);

            // Check if the user that suggested is the bot owner
            if (interaction.user.id === configPreset.botInfo.ownerId) {
                imageEmbed.setColor('Green');

                return channelSuggest.send({
                    embeds: [imageEmbed],
                }).then(async (msg) => {
                    return suggestionData(msg);
                });
            } else {
                return channelSuggest.send({
                    embeds: [imageEmbed],
                    components: [buttonSuggestion]
                }).then(async (msg) => {
                    return suggestionData(msg);
                });
            };
        } else {
            db.query('SELECT category FROM actionimages WHERE category=? ORDER BY RAND() LIMIT 1',
                [optionChoice],
                (error, statement) => {
                    console.log(error)
                    if (!statement) {
                        return interaction.reply({
                            content: `There is no image in the database for the following category: ${optionChoice}\n\nThe developers have been alerted!`,
                            ephemeral: true,
                        });
                    } else {
                        console.log('BWAH')
                    }
                }
            );

            db.query('SELECT status_canActionImage, status_canActionMessage FROM loggings WHERE guildId=?',
                [interaction.guild.id],
                (error, statement) => {
                    const statString = JSON.stringify(statement);
                    const value = JSON.parse(statString);

                    const status_canActionImage = value[0]['status_canActionImage'];
                    const status_canActionMessage = value[0]['status_canActionMessage'];
                    if (status_canActionImage === 0 && status_canActionMessage === 0) {
                        return interaction.reply({
                            content: languageSet.action.message.error.disable,
                            ephemeral: true,
                        });
                    } else if (!optionChoice === !nsfwChoice.includes(optionChoice) && !interaction.channel.nsfw) {
                        return interaction.reply({
                            content: languageSet.action.message.error.notNsfw,
                            ephemeral: true,
                        });
                    };
                }
            );

            let userInteracter = interaction.user.toString();
            let userTarget = optionUser ? optionUser : bot.user;
            let pronounsLang = en.profile.default.choice.pronouns.list;

            db.query('SELECT userId, pronouns FROM profiles WHERE userId=?',
                [interaction.user.id],
                (error, statement) => {
                    let pronounsLang = en.profile.default.choice.pronouns.list;

                    const statString = JSON.stringify(statement);
                    const value = JSON.parse(statString);

                    const pronouns = value[0]['pronouns'];
                    if (statement) {
                        switch (pronouns) {
                            case (profileInfo.pronouns.th):
                                noun_interaction = pronounsLang.them;
                                adj_interaction = pronounsLang.their;
                                break;
                            case (profileInfo.pronouns.he):
                                noun_interaction = pronounsLang.him;
                                adj_interaction = pronounsLang.his;
                                break;
                            case (profileInfo.pronouns.sh):
                                noun_interaction = pronounsLang.she;
                                adj_interaction = pronounsLang.her;
                                break;
                            default:
                                noun_interaction = pronounsLang.them;
                                adj_interaction = pronounsLang.their;
                                break;
                        };
                    } else {
                        noun_interaction = pronounsLang.them;
                        adj_interaction = pronounsLang.their;
                    };
                }
            );

            if (optionUser) {
                db.query('SELECT userId, pronouns FROM profiles WHERE userId=?',
                    [userTarget.id],
                    (error, statement) => {
                        let pronounsLang = en.profile.default.choice.pronouns.list;

                        const statString = JSON.stringify(statement);
                        const value = JSON.parse(statString);

                        const pronouns = value[0]['pronouns'];
                        if (statement) {
                            switch (pronouns) {
                                case (profileInfo.pronouns.th):
                                    noun_target = pronounsLang.them;
                                    adj_target = pronounsLang.their;
                                    break;
                                case (profileInfo.pronouns.he):
                                    noun_target = pronounsLang.him;
                                    adj_target = pronounsLang.his;
                                    break;
                                case (profileInfo.pronouns.sh):
                                    noun_target = pronounsLang.her;
                                    adj_target = pronounsLang.her;
                                    break;
                                default:
                                    noun_target = pronounsLang.them;
                                    adj_target = pronounsLang.their;
                                    break;
                            };
                        };
                    }
                );
            } else {
                noun_target = pronounsLang.them;
                adj_target = pronounsLang.their;
            };

            switch (optionChoice) {
                case ('hug'):
                    const hugSentence = [
                        `${userInteracter} approaches ${userTarget} gently and hugs ${noun_target} from behind!~`,
                        `${userInteracter} wraps ${adj_interaction} arms around ${userTarget} taking ${noun_target} into ${adj_interaction} warm embrace!~`,
                        `${userInteracter} jump on ${userTarget}'s back and hug ${noun_target} tightly!~`
                    ];
                    sentence = hugSentence;
                    break;
                case ('kiss'):
                    const kissSentence = [
                        `${userInteracter} approches slowly ${userTarget}'s face and gently kiss ${noun_target}!~`,
                        `${userInteracter} gets close to ${userTarget} and kiss ${noun_target}!~'`
                    ];
                    sentence = kissSentence;
                    break;
                case ('boop'):
                    const boopSentence = [
                        `${userInteracter} raises ${adj_interaction} paw and places it apon ${userTarget}'s snoot!~`,
                    ];
                    sentence = boopSentence;
                    break;
                case ('lick'):
                    const lickSentence = [
                        `${userInteracter} gets really close to ${userTarget} face and lick ${noun_target}!~`,
                    ];
                    sentence = lickSentence;
                    break;
                case ('cuddle'):
                    const cuddleSentence = [
                        `${userInteracter} approches ${userTarget} and pounces, cuddling the suprised floofer!~`,
                        `${userInteracter} join ${userTarget} and cuddle ${noun_target}!~`,
                    ];
                    sentence = cuddleSentence;
                    break;
                case ('yeet'):
                    const yeetSentence = [
                        `${userInteracter} yeeted ${userTarget} into the stratosphere!`,
                        `${userInteracter} grabbed ${userTarget} and yeeted ${noun_target} 10 miles into the sky!`,
                        `${userInteracter} grabs ${userTarget} and throws ${noun_target} to Ohio!`
                    ];
                    sentence = yeetSentence;
                    break;
                case ('pat'):
                    const patSentence = [
                        `${userInteracter} rub ${userTarget} on the head!~`,
                        `${userInteracter} mess ${userTarget} hair!~`,
                        `${userInteracter} strokes ${userTarget} head, messing with ${adj_target} hair!~`
                    ];
                    sentence = patSentence;
                    break;
                case ('bite'):
                    const biteSentence = [
                        `${userInteracter} decided to bite ${userTarget} a little!~`,
                        `${userInteracter} bite ${userTarget} to taste ${noun_target}!~`,
                    ];
                    sentence = biteSentence;
                    break;
                case ('bonk'):
                    const bonkSentence = [
                        `${userInteracter} swing a baseball bat on ${userTarget}'s head.Bonking ${noun_target}!~`
                    ];
                    sentence = bonkSentence;
                    break;
                case ('fuckstraight'):
                    const fuckStraightSentence = [
                        `${userInteracter} fuck ${userTarget} pussy really hard~`,
                        `${userInteracter} thrust into ${userTarget} back and forth into ${adj_target} pussy making ${noun_target} all wet~`,
                    ];
                    sentence = fuckStraightSentence;
                    break;
                case ('fuckgay'):
                    const fuckGaySentence = [
                        `${userInteracter} fuck ${userTarget} really hard into ${adj_target} ass~`,
                        `${userInteracter} thrust into ${userTarget} back and forth into ${adj_target} ass~`,
                    ];
                    sentence = fuckGaySentence;
                    break;
                case ('suckstraight'):
                    const suckStraightSentence = [
                        `${userInteracter} sucked ${userTarget}'s dick~`,
                        `${userInteracter} enjoys ${userTarget}'s dick while sucking it~`,
                    ];
                    sentence = suckStraightSentence;
                    break;
                case ('eatstraight'):
                    const eatStraightSentence = [
                        `${userInteracter} eat ${userTarget}'s ass~'`,
                    ];
                    sentence = eatStraightSentence;
                    break;
                case ('suckgay'):
                    const suckGaySentence = [
                        `${userInteracter} sucked ${userTarget}'s dick~`,
                        `${userInteracter} enjoys ${userTarget}'s dick while sucking it~`,
                    ];
                    sentence = suckGaySentence;
                    break;
                case ('ridestraight'):
                    const rideStraightSentence = [
                        `${userInteracter} ride ${userTarget}'s dick~'`,
                        `${userInteracter} enjoys ${userTarget}'s dick while riding it~`,
                    ];
                    sentence = rideStraightSentence;
                    break;
                case ('ridegay'):
                    const rideGaySentence = [
                        `${userInteracter} ride ${userTarget}'s dick~'`,
                        `${userInteracter} enjoys ${userTarget}'s dick while riding it~`,
                    ];
                    sentence = rideGaySentence;
                    break;
                case ('fillstraight'):
                    const fillStraightSentence = [
                        `${userInteracter} fills up ${userTarget}'s ass with ${adj_interaction} seed~`,
                        `${userInteracter} pushes ${adj_target} dick deep inside ${userTarget}'s ass, filling it up with ${adj_interaction} juicy cum~`,
                    ];
                    sentence = fillStraightSentence;
                    break;
                case ('fillgay'):
                    const fillGaySentence = [
                        `${userInteracter} fills up ${userTarget}'s ass with ${adj_interaction} seed~`,
                        `${userInteracter} pushes ${adj_target} dick deep inside ${userTarget}'s ass, filling it up with ${adj_interaction} juicy cum~`,
                    ];
                    sentence = fillGaySentence;
                    break;
                case ('eatgay'):
                    const eatGaySentence = [
                        `${userInteracter} eat ${userTarget}'s ass~`,
                    ];
                    sentence = eatGaySentence;
                    break;
            };

            let randomAnswer = await Sentence[Math.floor(Math.random() * sentence.length)];
            let randomImage = await actionImageAllData[Math.floor(Math.random() * actionImageAllData.length)];

            if (loggingData.status_canActionImage === 'Disabled') {
                return interaction.reply({
                    content: randomAnswer,
                });
            } else if (loggingData.status_canActionMessage === 'Disabled') {
                return interaction.reply({
                    content: `[Source](${randomImage.imageUrl})`,
                });
            } else {
                return interaction.reply({
                    content: `${randomAnswer}\n\n[Source](${randomImage.imageUrl})`,
                });
            };
        };
    }
};