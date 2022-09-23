const { MessageActionRow, MessageSelectMenu } = require('discord.js');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'role' command is loaded.")

module.exports = {
    name: "role",
    execute: async (bot, message, args, MessageEmbed, sequelize, Sequelize) => {
        if (!message.author.id === "291262778730217472") return;

        const ReactionRole = sequelize.define("ReactionRole", {
            GuildID: {
                type: Sequelize.STRING,
                unique: false,
            },
            MessageID_1: {
                type: Sequelize.STRING,
                unique: false,
            },
            MessageID_2: {
                type: Sequelize.STRING,
                unique: false,
            },
            MessageID_3: {
                type: Sequelize.STRING,
                unique: false,
            },
            MessageID_4: {
                type: Sequelize.STRING,
                unique: false,
            },
            MessageID_5: {
                type: Sequelize.STRING,
                unique: false,
            },
            MessageID_6: {
                type: Sequelize.STRING,
                unique: false,
            },
            MessageID_7: {
                type: Sequelize.STRING,
                unique: false,
            },
            MessageID_8: {
                type: Sequelize.STRING,
                unique: false,
            },
            MessageID_9: {
                type: Sequelize.STRING,
                unique: false,
            },
        });

        const roleChannel = message.guild.channels.cache.get("898360376654188557")

        const newRoleMenu1 = new MessageEmbed()
            .addField("**__Age__**", "- <@&900200948557824050>\n- <@&900201076916105306>")
            .setColor("2f3136")

        const newRoleMenu2 = new MessageEmbed()
            .addField("**__Gender__**", "- <@&900149879089815604>\n- <@&900149792930406400>\n- <@&900769520111734835>\n- <@&940126702389039164>\n- <@&1009511819737563197>\n- <@&940130071249829969>\n- <@&940130130225950720>\n- <@&940240745821007922>")
            .setColor("2f3136")

        const newRoleMenu3 = new MessageEmbed()
            .addField("**__Pronouns__**", "- <@&940251105118523452>\n- <@&940251047174238218>\n- <@&940250894203764786>\n- <@&1009521963825369098>\n- <@&940251221292363806>")
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

        roleChannel.send({ embeds: [newRoleMenu1] }).then((sent) => {
            sent.react("1️⃣")
            sent.react("2️⃣")

            const reactionRoleDataCreate = ReactionRole.create({
                GuildID: message.guild.id,
                MessageID_1: sent.id,
            })
        });

        await roleChannel.send({
            embeds: [newRoleMenu2],
        }).then((sent) => {
            sent.react("1️⃣")
            sent.react("2️⃣")
            sent.react("3️⃣")
            sent.react("4️⃣")
            sent.react("5️⃣")
            sent.react("6️⃣")
            sent.react("7️⃣")
            sent.react("8️⃣")

            const reactionRoleDataCreate = ReactionRole.update({ MessageID_2: sent.id }, { where: { GuildID: message.guild.id } })
        });

        await roleChannel.send({
            embeds: [newRoleMenu3],
        }).then((sent) => {
            sent.react("1️⃣")
            sent.react("2️⃣")
            sent.react("3️⃣")
            sent.react("4️⃣")
            sent.react("5️⃣")

            const reactionRoleDataCreate = ReactionRole.update({ MessageID_3: sent.id }, { where: { GuildID: message.guild.id } })
        });

        await roleChannel.send({
            embeds: [newRoleMenu4],
        }).then((sent) => {
            sent.react("1️⃣")
            sent.react("2️⃣")
            sent.react("3️⃣")
            sent.react("4️⃣")

            const reactionRoleDataCreate = ReactionRole.update({ MessageID_4: sent.id }, { where: { GuildID: message.guild.id } })
        });

        await roleChannel.send({
            embeds: [newRoleMenu5],
        }).then((sent) => {
            sent.react("1️⃣")
            sent.react("2️⃣")
            sent.react("3️⃣")
            sent.react("4️⃣")
            sent.react("5️⃣")
            sent.react("6️⃣")
            sent.react("7️⃣")
            sent.react("8️⃣")
            sent.react("9️⃣")

            const reactionRoleDataCreate = ReactionRole.update({ MessageID_5: sent.id }, { where: { GuildID: message.guild.id } })
        });

        await roleChannel.send({
            embeds: [newRoleMenu6],
        }).then((sent) => {
            sent.react("1️⃣")
            sent.react("2️⃣")
            sent.react("3️⃣")

            const reactionRoleDataCreate = ReactionRole.update({ MessageID_6: sent.id }, { where: { GuildID: message.guild.id } })
        });

        await roleChannel.send({
            embeds: [newRoleMenu7],
        }).then((sent) => {
            sent.react("1️⃣")
            sent.react("2️⃣")

            const reactionRoleDataCreate = ReactionRole.update({ MessageID_7: sent.id }, { where: { GuildID: message.guild.id } })
        });

        await roleChannel.send({
            embeds: [newRoleMenu8],
        }).then((sent) => {
            sent.react("1️⃣")
            sent.react("2️⃣")

            const reactionRoleDataCreate = ReactionRole.update({ MessageID_8: sent.id }, { where: { GuildID: message.guild.id } })
        });

        await roleChannel.send({
            embeds: [newRoleMenu9],
        }).then((sent) => {
            sent.react("1️⃣")
            sent.react("2️⃣")
            sent.react("3️⃣")
            sent.react("4️⃣")
            sent.react("5️⃣")
            sent.react("6️⃣")
            sent.react("7️⃣")
            sent.react("8️⃣")

            const reactionRoleDataCreate = ReactionRole.update({ MessageID_9: sent.id }, { where: { GuildID: message.guild.id } })
        });
    }
}