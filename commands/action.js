const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Config = require("../config/config.json");
const Color = require("../config/color.json");

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
            .setName("image")
            .setDescription("Image to suggest addition.")
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

        const choice = interaction.options.getString("choice");
        let user = interaction.options.getUser("member");
        let image = interaction.options.getAttachment("image");

        const User1 = interaction.user.toString();
        let User2 = "";

        if (user) User2 = user.toString();
        if (!user) User2 = bot.user.toString();

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

                const ActionImageData = await ActionImage.findAll({ where: { category: "hug" }, order: sequelize.random(), limit: 1 });

                const HugSentence = [
                    User1 + " approaches " + User2 + " gently and hugs them from behind. How cute!",
                    User1 + " wraps their arms around " + User2 + ", taking them into their warm embrace!"
                ];

                const RandomHugAnswer = HugSentence[Math.floor(Math.random() * HugSentence.length)];
                const RandomHugImage = ActionImageData[Math.floor(Math.random() * ActionImageData.length)];

                console.log(RandomHugImage.ImageURL)

                const imageEmbed = new MessageEmbed()
                    .setDescription("()[]")
                    .setImage(RandomHugImage.ImageURL)
                    .setColor(Color.Green)

                return interaction.reply({
                    content: RandomHugAnswer,
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

                const KissSentence = [
                    User1 + " approches slowly " + User2 + "'s face and gently kiss them on the lips!~",
                    User1 + " wraps their arms around " + User2 + ", place their lips to them and kiss them deeply!~"
                ]

                const RandomKissSentence = KissSentence[Math.floor(Math.random() * KissSentence.length)];

                return interaction.reply({
                    content: RandomKissSentence,
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

                const BoopSentence = [
                    User1 + " raises their paw and places it apon " + User2 + "'s snoot!",
                ]

                const RandomBoopSentence = BoopSentence[Math.floor(Math.random() * BoopSentence.length)];

                return interaction.reply({
                    content: RandomBoopSentence,
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

                const LickSentence = [
                    User1 + " get really close to " + User2 + " face and lick them!",
                    User1 + " lick rapidly " + User2 + " and run away!",
                ]

                const RandomLickSentence = LickSentence[Math.floor(Math.random() * LickSentence.length)];

                return interaction.reply({
                    content: RandomLickSentence,
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

                const CuddleSentence = [
                    User1 + " sneaks up behind " + User2 + " and pounces, cuddling the suprised floofer!"
                ]

                const RandomCuddleSentence = CuddleSentence[Math.floor(Math.random() * CuddleSentence.length)];

                return interaction.reply({
                    content: RandomCuddleSentence,
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

                const YeetSentence = [
                    User1 + " yeeted " + User2 + " into the stratosphere!",
                    User1 + " grabbed " + User2 + " by the scruff and yeeted them 10 miles into the sky!",
                ]

                const RandomYeetSentence = YeetSentence[Math.floor(Math.random() * YeetSentence.length)];

                return interaction.reply({
                    content: RandomYeetSentence,
                });
        };
    }
};