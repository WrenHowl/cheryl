const { SlashCommandBuilder } = require('@discordjs/builders');
const Color = require("../config/color.json")
const { MessageEmbed } = require('discord.js');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'blacklist' command is loaded.")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blacklist')
        .setDescription('Blacklist a member!')
        .addSubcommand(subcommand => subcommand
            .setName("add")
            .setDescription("Add someone to the blacklist")
            .addUserOption(option => option.setName("user").setDescription("User to blacklist").setRequired(true))
            .addStringOption(option => option.setName("reason").setDescription("Provide the reason").setRequired(true))
            .addStringOption(option => option
                .setName("risk")
                .setDescription("Provide the risk")
                .setRequired(true)
                .addChoices(
                    { name: 'low', value: 'Low' },
                    { name: 'medium', value: 'Medium' },
                    { name: 'high', value: 'High' },
                ))
            .addStringOption(option => option.setName("evidence").setDescription("Provide the evidence").setRequired(false)))
        .addSubcommand(subcommand => subcommand
            .setName("remove")
            .setDescription("Remove someone to the blacklist")
            .addUserOption(option => option.setName("user").setDescription("User to blacklist").setRequired(true)))
        .addSubcommand(subcommand => subcommand
            .setName("check")
            .setDescription("Check someone in blacklist")
            .addUserOption(option => option.setName("user").setDescription("User to blacklist").setRequired(false))),
    execute: async (interaction, bot, sequelize, Sequelize) => {
        const options = interaction.options.getSubcommand();
        const user = interaction.options.getUser("user");
        const reason = interaction.options.getString("reason");
        const addOptions = interaction.options.getString("options");
        const proof = interaction.options.getString("evidence");
        const risk = interaction.options.getString("risk");

        const Blacklist = sequelize.define("Blacklist", {
            UserName: {
                type: Sequelize.STRING,
                unique: true,
            },
            UserID: {
                type: Sequelize.STRING,
                unique: true,
            },
            ModName: {
                type: Sequelize.STRING,
                unique: false,
            },
            ModID: {
                type: Sequelize.STRING,
                unique: false,
            },
            Reason: {
                type: Sequelize.STRING,
                unique: false,
            },
            Proof: {
                type: Sequelize.STRING,
                unique: false,
            },
            Risk: {
                type: Sequelize.STRING,
                unique: false,
            },
        });

        if (user) CheckBlacklist = await Blacklist.findOne({ where: { UserID: user.id } });


        let fetchGuild = interaction.client.guilds.cache.get("821241527941726248")

        const staffMember = fetchGuild.members.cache.get(interaction.user.id)
        let staffCheck = staffMember ? staffMember.roles.cache.some(role => role.name === "Management") | staffMember.roles.cache.some(role => role.name === "Partner") : false

        if (!staffCheck) staffCheck = false;

        if (staffCheck) {
            if (interaction.commandName === "blacklist") {
                switch (options) {
                    case ("add"):
                        if (CheckBlacklist) {
                            return interaction.reply({
                                content: "This user is blacklisted already.",
                                ephemeral: true,
                            });
                        } else {
                            switch (user.id) {
                                case (!user):
                                    return interaction.reply({
                                        content: "I can't find this user!",
                                        ephemeral: true
                                    });
                                case (interaction.user.id):
                                    return interaction.reply({
                                        content: "You can't blacklist yourself!",
                                        ephemeral: true
                                    });
                                case (bot.user.id):
                                    return interaction.reply({
                                        content: "You can't blacklist me!",
                                        ephemeral: true
                                    });
                                default:
                                    const BlacklistData = await Blacklist.create({
                                        UserName: user.tag,
                                        UserID: user.id,
                                        ModName: interaction.user.tag,
                                        ModID: interaction.user.id,
                                        Reason: reason,
                                        Proof: proof,
                                        Risk: risk,
                                    });

                                    return interaction.reply({
                                        content: "The user has been successfully added of the blacklist.",
                                        ephemeral: true,
                                    });
                            }
                        }
                    case ("remove"):
                        if (!CheckBlacklist) {
                            return interaction.reply({
                                content: "This user isn't blacklisted.",
                                ephemeral: true,
                            });
                        } else {
                            switch (user.id) {
                                case (!user):
                                    return interaction.reply({
                                        content: "I can't find this user!",
                                        ephemeral: true
                                    });
                                case (interaction.user.id):
                                    return interaction.reply({
                                        content: "You can't blacklist yourself!",
                                        ephemeral: true
                                    });
                                case (bot.user.id):
                                    return interaction.reply({
                                        content: "You can't blacklist me!",
                                        ephemeral: true
                                    });
                                default:
                                    const unblacklistUser = Blacklist.destroy({ where: { UserID: user.id } });

                                    return interaction.reply({
                                        content: "The user has been successfully removed of the blacklist.",
                                        ephemeral: true,
                                    });
                            }
                        }
                    case ("check"):
                        if (user) {
                            if (CheckBlacklist) {
                                if (CheckBlacklist.Risk === "Low") ColorEmbed = Color.RiskLow;
                                if (CheckBlacklist.Risk === "Medium") ColorEmbed = Color.RiskMedium;
                                if (CheckBlacklist.Risk === "High") ColorEmbed = Color.RiskHigh;

                                const Name = "``" + CheckBlacklist.UserName + "``";
                                const ID = "``" + CheckBlacklist.UserID + "``";
                                const Reason = "``" + CheckBlacklist.Reason + "``";
                                const ModeratorName = "``" + CheckBlacklist.ModName + "``";
                                const ModeratorID = "``" + CheckBlacklist.ModID + "``";

                                if (CheckBlacklist.Proof) Evidence = CheckBlacklist.Proof;
                                if (!CheckBlacklist.Proof) Evidence = "``None``";

                                const InfoBlacklist = new MessageEmbed()
                                    .addFields(
                                        { name: "User", value: Name, inline: true },
                                        { name: "ID", value: ID, inline: true },
                                        { name: "Reason", value: Reason, inline: true },
                                        { name: "Moderator Name", value: ModeratorName, inline: true },
                                        { name: "Moderator ID", value: ModeratorID, inline: true },
                                        { name: "Evidence", value: Evidence, inline: true }
                                    )
                                    .setColor(ColorEmbed)

                                return interaction.reply({
                                    embeds: [InfoBlacklist],
                                });
                            } else {
                                return interaction.reply({
                                    content: "This user isn't blacklisted.",
                                });
                            }
                        } else {
                            let tagList = await Blacklist.findAll({ attributes: ['UserName', 'UserID', 'Reason'] });

                            const ServerListEmbed = new MessageEmbed()
                                .setDescription("All user blacklisted! There's currently **" + tagList.length + "** users blacklisted. If you need the evidence, moderator name or ID, please check the user case with ``/blacklist check user:``.")
                                .setColor("2f3136")

                            var i;

                            let addNumber = i = 1; i < tagList.length;[i++];

                            for (i = 0; i < tagList.length; [i++]) {
                                const result = (`${tagList[i].UserName}`)
                                const result2 = (`${tagList[i].UserID}`)
                                const result3 = (`${tagList[i].Reason}`)

                                ServerListEmbed.addFields({
                                    name: 'User [' + addNumber++ + ']:', value: "**Name:** ``" + result + "``\n**ID:** ``" + result2 + "``\n**Reason:** ``" + result3 + "``"
                                })
                            }

                            await interaction.reply({ embeds: [ServerListEmbed] });

                        }
                }
            }
        } else {
            return interaction.reply({
                content: "You cannot execute this command! Only the ``Managament Team`` & ``Partner`` of ``Over Control Furry`` are allowed to use it.",
                ephemeral: true
            })
        }
    }
};