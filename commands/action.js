const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { bot } = require('../server');
const { fr, en, de, sp, nl } = require('../preset/language')
const { sequelize, logging, actionImage, profile } = require('../preset/db')

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
        let loggingData = await logging.findOne({ where: { guildId: interaction.guild.id } });

        switch (loggingData.language) {
            case ('en'):
                languageSet = en;
                break;
            case ('fr'):
                languageSet = fr;
                break;
            case ('de'):
                languageSet = de;
                break;
            case ('sp'):
                languageSet = sp;
                break;
            case ('nl'):
                languageSet = nl;
                break;
            default:
                languageSet = en;
                break;
        };

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
            let actionImageData = await actionImage.findOne({ where: { imageUrl: optionSuggest } });
            if (actionImageData) {
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

            // Change the channel ID in function of the choice (sfw or nsfw)
            !optionChoice === !nsfwChoice.includes(optionChoice) ? channelSuggestId = configPreset.channelsId.nsfwSuggestion : channelSuggestId = configPreset.channelsId.sfwSuggestion;
            let channelSuggest = interaction.client.guilds.cache.get(configPreset.botInfo.supportServerId).channels.cache.get(channelSuggestId);

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
                await actionImage.create({
                    messageId: msg.id,
                    category: optionChoice,
                    imageUrl: optionSuggest,
                    userTag: interaction.user.username,
                    userId: interaction.user.id,
                });
            };

            if (interaction.user.id === configPreset.botInfo.ownerId) {
                imageEmbed.setColor('Green');

                return channelSuggest.send({
                    embeds: [imageEmbed],
                }).then(async (msg) => {
                    return suggestionData(msg)
                });
            } else {
                return channelSuggest.send({
                    embeds: [imageEmbed],
                    components: [buttonSuggestion]
                }).then(async (msg) => {
                    return suggestionData(msg)
                });
            };
        } else {
            let actionImageAllData = await actionImage.findAll({ where: { category: optionChoice }, order: sequelize.random(), limit: 1 });

            if (!actionImageAllData) {
                const noImage = `There is no image in the database for the following: ${optionChoice}`
                await interaction.reply({
                    content: `${noImage}\n\nThe developers have been alerted!`,
                    ephemeral: true,
                })
                return console.log(noImage)
            };

            let userInteracter = interaction.user.toString();
            let userTarget = optionUser ? optionUser : bot.user;

            let profileMemberData = await profile.findOne({ where: { userId: interaction.user.id } });
            let profileTargetData = await profile.findOne({ where: { userId: userTarget.id } });

            userTarget = userTarget.toString();

            if (loggingData.status_canActionImage === 'Disabled' && loggingData.status_canActionMessage === 'Disabled') {
                return interaction.reply({
                    content: languageSet.action.message.error.disable,
                    ephemeral: true,
                });
            } else if (!optionChoice === !nsfwChoice.includes(optionChoice)) {
                if (!interaction.channel.nsfw) {
                    return interaction.reply({
                        content: languageSet.action.message.error.notNsfw,
                        ephemeral: true,
                    });
                };
            };

            let pronouns = languageSet.profile.default.choice.pronouns.list;

            if (profileMemberData) {
                switch (profileMemberData.pronouns) {
                    case (profileInfo.pronouns.th):
                        noun_interaction = pronouns.them;
                        adj_interaction = pronouns.their;
                        break;
                    case (profileInfo.pronouns.he):
                        noun_interaction = pronouns.him;
                        adj_interaction = pronouns.his;
                        break;
                    case (profileInfo.pronouns.sh):
                        noun_interaction = pronouns.she;
                        adj_interaction = pronouns.her;
                        break;
                    default:
                        noun_interaction = pronouns.them;
                        adj_interaction = pronouns.their;
                        break;
                };
            } else {
                noun_interaction = pronouns.them;
                adj_interaction = pronouns.their;
            };

            if (profileTargetData) {
                switch (profileTargetData.pronouns) {
                    case (profileInfo.pronouns.th):
                        noun_target = pronouns.them;
                        adj_target = pronouns.their;
                        break;
                    case (profileInfo.pronouns.he):
                        noun_target = pronouns.him;
                        adj_target = pronouns.his;
                        break;
                    case (profileInfo.pronouns.sh):
                        noun_target = pronouns.her;
                        adj_target = pronouns.her;
                        break;
                    default:
                        noun_target = pronouns.them;
                        adj_target = pronouns.their;
                        break;
                }
            } else {
                noun_target = pronouns.them;
                adj_target = pronouns.their;
            };

            switch (optionChoice) {
                case ('hug'):
                    const hugmsgence = [
                        `${userInteracter} approaches ${userTarget} gently and hugs ${noun_target} from behind!~`,
                        `${userInteracter} wraps ${adj_interaction} arms around ${userTarget} taking ${noun_target} into ${adj_interaction} warm embrace!~`,
                        `${userInteracter} jump on ${userTarget}'s back and hug ${noun_target} tightly!~`
                    ];
                    msgence = hugmsgence;
                    break;
                case ('kiss'):
                    const kissmsgence = [
                        `${userInteracter} approches slowly ${userTarget}'s face and gently kiss ${noun_target}!~`,
                        `${userInteracter} gets close to ${userTarget} and kiss ${noun_target}!~'`
                    ];
                    msgence = kissmsgence;
                    break;
                case ('boop'):
                    const boopmsgence = [
                        `${userInteracter} raises ${adj_interaction} paw and places it apon ${userTarget}'s snoot!~`,
                    ];
                    msgence = boopmsgence;
                    break;
                case ('lick'):
                    const lickmsgence = [
                        `${userInteracter} gets really close to ${userTarget} face and lick ${noun_target}!~`,
                    ];
                    msgence = lickmsgence;
                    break;
                case ('cuddle'):
                    const cuddlemsgence = [
                        `${userInteracter} approches ${userTarget} and pounces, cuddling the suprised floofer!~`,
                        `${userInteracter} join ${userTarget} and cuddle ${noun_target}!~`,
                    ];
                    msgence = cuddlemsgence;
                    break;
                case ('yeet'):
                    const yeetmsgence = [
                        `${userInteracter} yeeted ${userTarget} into the stratosphere!`,
                        `${userInteracter} grabbed ${userTarget} and yeeted ${noun_target} 10 miles into the sky!`,
                        `${userInteracter} grabs ${userTarget} and throws ${noun_target} to Ohio!`
                    ];
                    msgence = yeetmsgence;
                    break;
                case ('pat'):
                    const patmsgence = [
                        `${userInteracter} rub ${userTarget} on the head!~`,
                        `${userInteracter} mess ${userTarget} hair!~`,
                        `${userInteracter} strokes ${userTarget} head, messing with ${adj_target} hair!~`
                    ];
                    msgence = patmsgence;
                    break;
                case ('bite'):
                    const bitemsgence = [
                        `${userInteracter} decided to bite ${userTarget} a little!~`,
                        `${userInteracter} bite ${userTarget} to taste ${noun_target}!~`,
                    ];
                    msgence = bitemsgence;
                    break;
                case ('bonk'):
                    const bonkmsgence = [
                        `${userInteracter} swing a baseball bat on ${userTarget}'s head.Bonking ${noun_target}!~`
                    ];
                    msgence = bonkmsgence;
                    break;
                case ('fuckstraight'):
                    const fuckStraightmsgence = [
                        `${userInteracter} fuck ${userTarget} pussy really hard~`,
                        `${userInteracter} thrust into ${userTarget} back and forth into ${adj_target} pussy making ${noun_target} all wet~`,
                    ];
                    msgence = fuckStraightmsgence;
                    break;
                case ('fuckgay'):
                    const fuckGaymsgence = [
                        `${userInteracter} fuck ${userTarget} really hard into ${adj_target} ass~`,
                        `${userInteracter} thrust into ${userTarget} back and forth into ${adj_target} ass~`,
                    ];
                    msgence = fuckGaymsgence;
                    break;
                case ('suckstraight'):
                    const suckStraightmsgence = [
                        `${userInteracter} sucked ${userTarget}'s dick~`,
                        `${userInteracter} enjoys ${userTarget}'s dick while sucking it~`,
                    ];
                    msgence = suckStraightmsgence;
                    break;
                case ('eatstraight'):
                    const eatStraightmsgence = [
                        `${userInteracter} eat ${userTarget}'s ass~'`,
                    ];
                    msgence = eatStraightmsgence;
                    break;
                case ('suckgay'):
                    const suckGaymsgence = [
                        `${userInteracter} sucked ${userTarget}'s dick~`,
                        `${userInteracter} enjoys ${userTarget}'s dick while sucking it~`,
                    ];
                    msgence = suckGaymsgence;
                    break;
                case ('ridestraight'):
                    const rideStraightmsgence = [
                        `${userInteracter} ride ${userTarget}'s dick~'`,
                        `${userInteracter} enjoys ${userTarget}'s dick while riding it~`,
                    ];
                    msgence = rideStraightmsgence;
                    break;
                case ('ridegay'):
                    const rideGaymsgence = [
                        `${userInteracter} ride ${userTarget}'s dick~'`,
                        `${userInteracter} enjoys ${userTarget}'s dick while riding it~`,
                    ];
                    msgence = rideGaymsgence;
                    break;
                case ('fillstraight'):
                    const fillStraightmsgence = [
                        `${userInteracter} fills up ${userTarget}'s ass with ${adj_interaction} seed~`,
                        `${userInteracter} pushes ${adj_target} dick deep inside ${userTarget}'s ass, filling it up with ${adj_interaction} juicy cum~`,
                    ];
                    msgence = fillStraightmsgence;
                    break;
                case ('fillgay'):
                    const fillGaymsgence = [
                        `${userInteracter} fills up ${userTarget}'s ass with ${adj_interaction} seed~`,
                        `${userInteracter} pushes ${adj_target} dick deep inside ${userTarget}'s ass, filling it up with ${adj_interaction} juicy cum~`,
                    ];
                    msgence = fillGaymsgence;
                    break;
                case ('eatgay'):
                    const eatGaymsgence = [
                        `${userInteracter} eat ${userTarget}'s ass~`,
                    ];
                    msgence = eatGaymsgence;
                    break;
            };

            let randomAnswer = await msgence[Math.floor(Math.random() * msgence.length)];
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