const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const configPreset = require('../config/main.json');
const profileInfo = require('../config/profile.json');

const fr = require('../languages/fr.json');
const en = require('../languages/en.json');
const de = require('../languages/de.json');
const sp = require('../languages/sp.json');
const nl = require('../languages/nl.json');

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
    execute: async (interaction, bot, sequelize, Sequelize) => {
        const Logging = sequelize.define('Logging', {
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

        let logging_data = await Logging.findOne({ where: { guildId: interaction.guild.id } });

        switch (logging_data.language) {
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

        try {
            const ActionImage = sequelize.define('ActionImage', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    unique: false,
                    autoIncrement: true
                },
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
            const Profile = sequelize.define('Profile', {
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

            // Offered options
            let option_choice = interaction.options.getString(en.action.default.choice.name);
            let option_user = interaction.options.getUser(en.action.default.member.name);
            let option_suggest = interaction.options.getString(en.action.default.suggest.name);

            let action_image_data = await ActionImage.findAll({ where: { category: option_choice }, order: sequelize.random(), limit: 1 });

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

            if (option_suggest) {
                let fetchGuild = interaction.client.guilds.cache.get(configPreset.botInfo.supportServerId);

                // Check if the suggestion is an URL
                try {
                    new URL(option_suggest);
                } catch (error) {
                    return interaction.reply({
                        content: languageSet.action.message.error.wrongURL,
                        ephemeral: true,
                    });
                };

                // Check if the suggestion string is a valid format URL
                if (!['jpg', 'png', 'gif'].some(sm => option_suggest.endsWith(sm))) {
                    return interaction.reply({
                        content: languageSet.action.message.error.wrongFormat,
                        ephemeral: true,
                    });
                };

                // Check if image has already been suggested/added
                let imageData = await ActionImage.findOne({ where: { imageUrl: option_suggest } });
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

                // Change the channel ID in function of the choice (sfw or nsfw)
                !option_choice === !nsfwChoice.includes(option_choice) ? channel_suggest_id = configPreset.channelsId.nsfwSuggestion : channel_suggest_id = configPreset.channelsId.sfwSuggestion;
                let channel_suggest = fetchGuild.channels.cache.get(channel_suggest_id);

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
                        { name: 'Category', value: option_choice, inline: true },
                        { name: 'Name', value: interaction.user.username, inline: true },
                        { name: 'ID', value: interaction.user.id, inline: true },
                        { name: 'Image URL', value: `[URL](${option_suggest})`, inline: true }
                    )
                    .setImage(option_suggest)
                    .setColor('Yellow');

                if (interaction.user.id === configPreset.botInfo.ownerId) {
                    imageEmbed.setColor('Green');
                    imageEmbed.addFields(
                        { name: 'Status:', value: 'Accepted', inline: true }
                    );

                    return channel_suggest.send({
                        embeds: [imageEmbed],
                    }).then(async (sent) => {
                        await ActionImage.create({
                            messageId: sent.id,
                            category: option_choice,
                            imageUrl: option_suggest,
                            userTag: interaction.user.tag,
                            userId: interaction.user.id,
                        });
                    });
                };

                return channel_suggest.send({
                    embeds: [imageEmbed],
                    components: [buttonSuggestion]
                }).then(async (sent) => {
                    await ActionImage.create({
                        messageId: sent.id,
                        category: option_choice,
                        imageUrl: option_suggest,
                        userTag: interaction.user.tag,
                        userId: interaction.user.id,
                    });
                });
            } else {
                if (!action_image_data) {
                    const noImage = `There is no image in the database for the following: ${option_choice}`
                    await interaction.reply({
                        content: `${noImage}\n\nThe developers have been alerted!`,
                        ephemeral: true,
                    })
                    return console.log(noImage)
                };

                let user_interaction = interaction.user.toString();
                let user_target = option_user ? option_user : bot.user;

                let profile_member_data = await Profile.findOne({ where: { userId: interaction.user.id } });
                let profile_target_data = await Profile.findOne({ where: { userId: user_target.id } });

                user_target = user_target.toString();

                if (logging_data.status_canActionImage === 'Disabled' && logging_data.status_canActionMessage === 'Disabled') {
                    return interaction.reply({
                        content: languageSet.action.message.error.disable,
                        ephemeral: true,
                    });
                } else if (!option_choice === !nsfwChoice.includes(option_choice)) {
                    if (!interaction.channel.nsfw) {
                        return interaction.reply({
                            content: languageSet.action.message.error.notNsfw,
                            ephemeral: true,
                        });
                    };
                };

                let pronouns = languageSet.profile.default.choice.pronouns.list;

                if (profile_member_data) {
                    switch (profile_member_data.pronouns) {
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

                if (profile_target_data) {
                    switch (profile_target_data.pronouns) {
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

                switch (option_choice) {
                    case ('hug'):
                        const hugSentence = [
                            `${user_interaction} approaches ${user_target} gently and hugs ${noun_target} from behind!~`,
                            `${user_interaction} wraps ${adj_interaction} arms around ${user_target} taking ${noun_target} into ${adj_interaction} warm embrace!~`,
                            `${user_interaction} jump on ${user_target}'s back and hug ${noun_target} tightly!~`
                        ];
                        sentence = hugSentence;
                        break;
                    case ('kiss'):
                        const kissSentence = [
                            `${user_interaction} approches slowly ${user_target}'s face and gently kiss ${noun_target}!~`,
                            `${user_interaction} gets close to ${user_target} and kiss ${noun_target}!~'`
                        ];
                        sentence = kissSentence;
                        break;
                    case ('boop'):
                        const boopSentence = [
                            `${user_interaction} raises ${adj_interaction} paw and places it apon ${user_target}'s snoot!~`,
                        ];
                        sentence = boopSentence;
                        break;
                    case ('lick'):
                        const lickSentence = [
                            `${user_interaction} gets really close to ${user_target} face and lick ${noun_target}!~`,
                        ];
                        sentence = lickSentence;
                        break;
                    case ('cuddle'):
                        const cuddleSentence = [
                            `${user_interaction} approches ${user_target} and pounces, cuddling the suprised floofer!~`,
                            `${user_interaction} join ${user_target} and cuddle ${noun_target}!~`,
                        ];
                        sentence = cuddleSentence;
                        break;
                    case ('yeet'):
                        const yeetSentence = [
                            `${user_interaction} yeeted ${user_target} into the stratosphere!`,
                            `${user_interaction} grabbed ${user_target} and yeeted ${noun_target} 10 miles into the sky!`,
                            `${user_interaction} grabs ${user_target} and throws ${noun_target} to Ohio!`
                        ];
                        sentence = yeetSentence;
                        break;
                    case ('pat'):
                        const patSentence = [
                            `${user_interaction} rub ${user_target} on the head!~`,
                            `${user_interaction} mess ${user_target} hair!~`,
                            `${user_interaction} strokes ${user_target} head, messing with ${adj_target} hair!~`
                        ];
                        sentence = patSentence;
                        break;
                    case ('bite'):
                        const biteSentence = [
                            `${user_interaction} decided to bite ${user_target} a little!~`,
                            `${user_interaction} bite ${user_target} to taste ${noun_target}!~`,
                        ];
                        sentence = biteSentence;
                        break;
                    case ('bonk'):
                        const bonkSentence = [
                            `${user_interaction} swing a baseball bat on ${user_target}'s head.Bonking ${noun_target}!~`
                        ];
                        sentence = bonkSentence;
                        break;
                    case ('fuckstraight'):
                        const fuckStraightSentence = [
                            `${user_interaction} fuck ${user_target} pussy really hard~`,
                            `${user_interaction} thrust into ${user_target} back and forth into ${adj_target} pussy making ${noun_target} all wet~`,
                        ];
                        sentence = fuckStraightSentence;
                        break;
                    case ('fuckgay'):
                        const fuckGaySentence = [
                            `${user_interaction} fuck ${user_target} really hard into ${adj_target} ass~`,
                            `${user_interaction} thrust into ${user_target} back and forth into ${adj_target} ass~`,
                        ];
                        sentence = fuckGaySentence;
                        break;
                    case ('suckstraight'):
                        const suckStraightSentence = [
                            `${user_interaction} sucked ${user_target}'s dick~`,
                            `${user_interaction} enjoys ${user_target}'s dick while sucking it~`,
                        ];
                        sentence = suckStraightSentence;
                        break;
                    case ('eatstraight'):
                        const eatStraightSentence = [
                            `${user_interaction} eat ${user_target}'s ass~'`,
                        ];
                        sentence = eatStraightSentence;
                        break;
                    case ('suckgay'):
                        const suckGaySentence = [
                            `${user_interaction} sucked ${user_target}'s dick~`,
                            `${user_interaction} enjoys ${user_target}'s dick while sucking it~`,
                        ];
                        sentence = suckGaySentence;
                        break;
                    case ('ridestraight'):
                        const rideStraightSentence = [
                            `${user_interaction} ride ${user_target}'s dick~'`,
                            `${user_interaction} enjoys ${user_target}'s dick while riding it~`,
                        ];
                        sentence = rideStraightSentence;
                        break;
                    case ('ridegay'):
                        const rideGaySentence = [
                            `${user_interaction} ride ${user_target}'s dick~'`,
                            `${user_interaction} enjoys ${user_target}'s dick while riding it~`,
                        ];
                        sentence = rideGaySentence;
                        break;
                    case ('fillstraight'):
                        const fillStraightSentence = [
                            `${user_interaction} fills up ${user_target}'s ass with ${adj_interaction} seed~`,
                            `${user_interaction} pushes ${adj_target} dick deep inside ${user_target}'s ass, filling it up with ${adj_interaction} juicy cum~`,
                        ];
                        sentence = fillStraightSentence;
                        break;
                    case ('fillgay'):
                        const fillGaySentence = [
                            `${user_interaction} fills up ${user_target}'s ass with ${adj_interaction} seed~`,
                            `${user_interaction} pushes ${adj_target} dick deep inside ${user_target}'s ass, filling it up with ${adj_interaction} juicy cum~`,
                        ];
                        sentence = fillGaySentence;
                        break;
                    case ('eatgay'):
                        const eatGaySentence = [
                            `${user_interaction} eat ${user_target}'s ass~`,
                        ];
                        sentence = eatGaySentence;
                        break;
                };

                let randomAnswer = await sentence[Math.floor(Math.random() * sentence.length)];
                let randomImage = await action_image_data[Math.floor(Math.random() * action_image_data.length)];

                if (logging_data.status_canActionImage === 'Disabled') {
                    return interaction.reply({
                        content: randomAnswer,
                    });
                } else if (logging_data.status_canActionMessage === 'Disabled') {
                    return interaction.reply({
                        content: `[Image URL](${randomImage.imageUrl})`,
                    });
                } else {
                    return interaction.reply({
                        content: `${randomAnswer}\n\n[Image URL](${randomImage.imageUrl})`,
                    });
                };
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

            return crashchannelId.send({ content: '**Error in the ' + en.action.default.name + ' event:** \n\n```javascript\n' + error + '```' });
        };
    }
};