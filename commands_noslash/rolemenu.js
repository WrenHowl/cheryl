const { MessageActionRow, MessageSelectMenu } = require('discord.js');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'rolemenu' command is loaded.")

module.exports = {
    name: "rolemenu",
    execute: async (bot, message, args, MessageEmbed) => {
        if (!message.author.id === "291262778730217472") return;

        const roleMenu1 = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('roleMenu1')
                    .setPlaceholder('Select your age')
                    .addOptions([
                        {
                            label: 'Major (18+)',
                            value: 'Major (18+)',
                            emoji: {
                                id: "993925227744608486",
                            },
                        },
                        {
                            label: 'Minor (17-)',
                            value: 'Minor (17-)',
                            emoji: {
                                id: "993925556229914825",
                            },
                        },
                    ]),
            );

        const roleMenu2 = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('roleMenu2')
                    .setPlaceholder('Select your gender')
                    .addOptions([
                        {
                            label: 'Boy',
                            value: 'Boy',
                            emoji: {
                                id: "986656486589628446",
                            },
                        },
                        {
                            label: 'Girl',
                            value: 'Girl',
                            emoji: {
                                id: "986656721554509884",
                            },
                        },
                        {
                            label: 'Gender Fluid',
                            value: 'Gender Fluid',
                            emoji: {
                                id: "993932329431085118",
                            },
                        },
                        {
                            label: 'Trans',
                            value: 'Trans',
                            emoji: {
                                id: "993918718595837972",
                            },
                        },
                        {
                            label: 'Agender',
                            value: 'Agender',
                            emoji: {
                                id: "993932330844553246",
                            },
                        },
                        {
                            label: 'Non-Binary',
                            value: 'Non-Binary',
                            emoji: {
                                id: "993917780028031086",
                            },
                        },
                        {
                            label: 'Cisgender',
                            value: 'Cisgender',
                            emoji: {
                                id: "993932327367495781",
                            },
                        },
                        {
                            label: 'Other Gender',
                            value: 'Other Gender',
                            emoji: {
                                id: "993922591188332675",
                            },
                        },
                    ]),
            );

        const roleMenu3 = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('roleMenu3')
                    .setPlaceholder('Select your pronouns')
                    .addOptions([
                        {
                            label: 'They/Them',
                            value: 'They/Them',
                            emoji: {
                                id: "986661755688218685",
                            },
                        },
                        {
                            label: 'He/Him',
                            value: 'He/Him',
                            emoji: {
                                id: "993921707519791124",
                            },
                        },
                        {
                            label: 'She/Her',
                            value: 'She/Her',
                            emoji: {
                                id: "993921608228016228",
                            },
                        },
                        {
                            label: 'Other Pronouns',
                            value: 'Other Pronouns',
                            emoji: {
                                id: "986661757399470170",
                            },
                        },
                    ]),
            );

        const roleMenu4 = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('roleMenu4')
                    .setPlaceholder('Select your relationship status')
                    .setMaxValues(2)
                    .addOptions([
                        {
                            label: 'Single',
                            value: 'Single',
                            emoji: {
                                id: "993926986701488299",
                            },
                        },
                        {
                            label: 'Taken',
                            value: 'Taken',
                            emoji: {
                                id: "993926985766162463",
                            },
                        },
                        {
                            label: 'Looking',
                            value: 'Looking',
                            emoji: {
                                id: "993926503580573848",
                            },
                        },
                        {
                            label: 'Not Looking',
                            value: 'Not Looking',
                            emoji: {
                                id: "993926504545263858",
                            },
                        },
                    ]),
            );

        const roleMenu5 = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('roleMenu5')
                    .setPlaceholder('Select your sexual orientation')
                    .setMaxValues(2)
                    .addOptions([
                        {
                            label: 'Straight',
                            value: 'Straight',
                            emoji: {
                                id: "993918196929273968",
                            },
                        },
                        {
                            label: 'Gay',
                            value: 'Gay',
                            emoji: {
                                id: "993920441867567124",
                            },
                        },
                        {
                            label: 'Lesbian',
                            value: 'Lesbian',
                            emoji: {
                                id: "993920443100712990",
                            },
                        },
                        {
                            label: 'Bisexual',
                            value: 'Bisexual',
                            emoji: {
                                id: "993920440844165140",
                            },
                        },
                        {
                            label: 'Pansexual',
                            value: 'Pansexual',
                            emoji: {
                                id: "993917776253169876",
                            },
                        },
                        {
                            label: 'Asexual',
                            value: 'Asexual',
                            emoji: {
                                id: "993917782116814980",
                            },
                        },
                        {
                            label: 'Aromantic',
                            value: 'Aromantic',
                            emoji: {
                                name: "AromanticHeart",
                                id: "993919126747746384",
                            },
                        },
                        {
                            label: 'Polyamorous',
                            value: 'Polyamorous',
                            emoji: {
                                id: "993918550639128656",
                            },
                        },
                        {
                            label: 'Other Orientation',
                            value: 'Other Orientation',
                            emoji: {
                                id: "993922591188332675",
                            },
                        },
                    ]),
            );

        const roleMenu6 = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('roleMenu6')
                    .setPlaceholder('Select your DM status')
                    .setMaxValues(1)
                    .addOptions([
                        {
                            label: 'Open DM',
                            value: 'Open DM',
                            emoji: {
                                id: "993927935113318531",
                            },
                        },
                        {
                            label: 'Important DM Only',
                            value: 'Important DM Only',
                            emoji: {
                                id: "993928295307559072",
                            },
                        },
                        {
                            label: 'Close DM',
                            value: 'Close DM',
                            emoji: {
                                id: "993927936430317568",
                            },
                        },
                    ]),
            );

        const roleMenu7 = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('roleMenu7')
                    .setPlaceholder('Select your satus in the fandom')
                    .setMaxValues(1)
                    .addOptions([
                        {
                            label: 'Furry',
                            value: 'Furry',
                            emoji: {
                                name: "1️⃣",
                            },
                        },
                        {
                            label: 'Not a Furry',
                            value: 'Not a Furry',
                            emoji: {
                                name: "2️⃣",
                            },
                        },
                    ]),
            );

        const roleMenu8 = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('roleMenu8')
                    .setPlaceholder('Select your access')
                    .setMaxValues(3)
                    .addOptions([
                        {
                            label: 'VR Access',
                            value: 'VR Access',
                            emoji: {
                                name: "1️⃣",
                            },
                        },
                        {
                            label: 'VR LFP',
                            value: 'VR LFP',
                            emoji: {
                                name: "2️⃣",
                            },
                        },
                        {
                            label: 'None',
                            value: 'None',
                            emoji: {
                                name: "❌",
                            },
                        },
                    ]),
            );

        const roleMenu9 = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId('roleMenu9')
                    .setPlaceholder('Select your notification')
                    .setMinValues(1)
                    .setMaxValues(8)
                    .addOptions([
                        {
                            label: 'All',
                            value: 'All',
                            emoji: {
                                name: "1️⃣",
                            },
                        },
                        {
                            label: 'Announcement',
                            value: 'Announcement',
                            emoji: {
                                name: "2️⃣",
                            },
                        },
                        {
                            label: 'Giveaway',
                            value: 'Giveaway',
                            emoji: {
                                name: "3️⃣",
                            },
                        },
                        {
                            label: 'Partnership',
                            value: 'Partnership',
                            emoji: {
                                name: "4️⃣",
                            },
                        },
                        {
                            label: 'Bump',
                            value: 'Bump',
                            emoji: {
                                name: "5️⃣",
                            },
                        },
                        {
                            label: 'Events',
                            value: 'Events',
                            emoji: {
                                name: "6️⃣",
                            },
                        },
                        {
                            label: 'Dead Chat',
                            value: 'Dead Chat',
                            emoji: {
                                name: "7️⃣",
                            },
                        },
                        {
                            label: 'Nitro Drop',
                            value: 'Nitro Drop',
                            emoji: {
                                name: "8️⃣",
                            },
                        },
                        {
                            label: 'None',
                            value: 'None',
                            emoji: {
                                name: "❌",
                            },
                        },
                    ]),
            );

        const newRoleMenu1 = new MessageEmbed()
            .addField("**__Age__**", "- <@&900200948557824050>\n- <@&900201076916105306>")
            .setColor("2f3136")

        const newRoleMenu2 = new MessageEmbed()
            .addField("**__Gender__**", "- <@&900149879089815604>\n- <@&900149792930406400>\n- <@&900769520111734835>\n- <@&940126702389039164>\n- <@&940130071249829969>\n- <@&940130130225950720>\n- <@&940130181014761513>\n- <@&940240745821007922>")
            .setColor("2f3136")

        const newRoleMenu3 = new MessageEmbed()
            .addField("**__Pronouns__**", "- <@&940251105118523452>\n- <@&940251047174238218>\n- <@&940250894203764786>\n- <@&940251221292363806>")
            .setColor("2f3136")

        const newRoleMenu4 = new MessageEmbed()
            .addField("**__Relationship Status__**", "- <@&940274055339192390>\n- <@&940274020706844693>\n- <@&940273816066732083>\n- <@&940273975295111218>")
            .setColor("2f3136")

        const newRoleMenu5 = new MessageEmbed()
            .addField("**__Sexual Orientation__**", "- <@&931040779277860954>\n- <@&931040829961822218>\n- <@&993914756232654868>\n- <@&931040851973517332>\n- <@&931041941003575306>\n- <@&931041656671711253>\n- <@&940127204002648094>\n- <@&940128299173154826>\n- <@&940128332740198410>")
            .setColor("2f3136")

        const newRoleMenu6 = new MessageEmbed()
            .addField("**__DM Status__**", "- <@&940273578769801226>\n- <@&940273628669411348>\n- <@&940273602983526481>")
            .setColor("2f3136")

        const newRoleMenu7 = new MessageEmbed()
            .addField("**__Fandom Status__**", "- <@&923054477735522304>\n- <@&940244795811594270>")
            .setColor("2f3136")

        const newRoleMenu8 = new MessageEmbed()
            .addField("**__Access__**", "- <@&922968520847945768>\n- <@&984908404390776833>")
            .setColor("2f3136")

        const newRoleMenu9 = new MessageEmbed()
            .addField("**__Notification__**", "- <@&940658136048603176>\n- <@&940658199411949600>\n- <@&940664575659999284>\n- <@&943956163840577537>\n- <@&940658171867959317>\n- <@&950406476365705227>\n- <@&945731050888392716>\n- <@&956565030604771389>")
            .setColor("2f3136")

        const roleChannel = message.guild.channels.cache.get("898360376654188557")

        await roleChannel.send({
            embeds: [newRoleMenu1],
            components: [roleMenu1],
        })

        await roleChannel.send({
            embeds: [newRoleMenu2],
            components: [roleMenu2],
        })

        await roleChannel.send({
            embeds: [newRoleMenu3],
            components: [roleMenu3],
        })

        await roleChannel.send({
            embeds: [newRoleMenu4],
            components: [roleMenu4],
        })

        await roleChannel.send({
            embeds: [newRoleMenu5],
            components: [roleMenu5],
        })

        await roleChannel.send({
            embeds: [newRoleMenu6],
            components: [roleMenu6],
        })

        await roleChannel.send({
            embeds: [newRoleMenu7],
            components: [roleMenu7],
        })

        await roleChannel.send({
            embeds: [newRoleMenu8],
            components: [roleMenu8],
        })

        await roleChannel.send({
            embeds: [newRoleMenu9],
            components: [roleMenu9],
        })
    }
};