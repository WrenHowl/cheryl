const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require("../config/config.json");

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'promote' command is loaded.")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('promote')
        .setDescription('Promote a member!')
        .addUserOption(option => option.setName("user").setDescription("User to promote").setRequired(true))
        .addStringOption(option =>
            option.setName('options')
                .setDescription('Choose options')
                .setRequired(true)
                .addChoices(
                    { name: 'add', value: 'addOptions' },
                    { name: 'remove', value: 'removeOptions' },
                ))
        .addStringOption(option =>
            option.setName('role')
                .setDescription('Choose role')
                .setRequired(true)
                .addChoices(
                    { name: 'Administrator', value: 'admin' },
                    { name: 'Manager', value: 'manager' },
                    { name: 'Senior Moderator', value: 'sm' },
                    { name: 'Moderator', value: 'mod' },
                    { name: 'Helper', value: 'helper' },
                    { name: 'Event Organizer', value: 'eo' },
                    { name: 'Gate Keeper', value: 'gk' },
                )),
    execute: async (interaction, bot, sequelize, Sequelize) => {
        if (interaction.guild.id === "821241527941726248") {
            if (interaction.member.roles.cache.some(role => role.name === "Management")) {
                let user = interaction.options.getUser("user")
                let member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => { })

                switch (user.id) {
                    case (!user):
                        return interaction.reply({
                            content: "I can't find this user!",
                            ephemeral: true
                        });
                    case (interaction.member.id):
                        return interaction.reply({
                            content: "You can't whitelist yourself!",
                            ephemeral: true
                        });
                    case (bot.user.id):
                        return interaction.reply({
                            content: "You can't whitelist me!",
                            ephemeral: true
                        });
                    case (member.roles.highest.position >= interaction.member.roles.highest.position):
                        return interaction.reply({
                            content: "You can't whitelist this user, because he's higher than you!",
                            ephemeral: true
                        });
                    default:
                        const options = interaction.options.getString("options");
                        const addOptions = interaction.options.getString("role");

                        const staffRole = "931038287114678334";
                        const communityRole = "991768688267100184";
                        const gateKeeperRole = "975749680774402088";
                        const eoRole = "973621263098605618";
                        const moderationRole = "991769189796823202";
                        const helperRole = "991781727292891147";
                        const moderatorRole = "900184624494428170";
                        const seniorRole = "930517273540702218";
                        const managementRole = "991769060956192799";
                        const managerRole = "981249822315118632";
                        const adminRole = "898352526154416138";

                        switch (options) {
                            case ("addOptions"):
                                let nickNameCheck = member.nickname;
                                if (nickNameCheck === null) nickNameCheck = member.user.username;

                                switch (addOptions) {
                                    case ("admin"):
                                        if (!member.roles.cache.some(role => role.name === "Manager")) {
                                            return interaction.reply({
                                                content: "Cannot promote this user that high. He must be a ``Manager`` first.",
                                                ephemeral: true,
                                            })
                                        }

                                        await member.roles.add(adminRole);
                                        await member.roles.add(managementRole);
                                        await member.roles.remove(managerRole);

                                        await member.setNickname(member.user.username + " | Admin");

                                        await interaction.reply("<@" + member.user.id + "> is now promoted to ``Administrator`` by ``" + interaction.user.tag + "``");

                                        const promoteAdmin = new MessageEmbed()
                                            .setTitle(":tada: Congratulations :tada:")
                                            .setDescription("You got promoted to ``Administrator``, here's all the command you can do!")
                                            .addFields(
                                                { name: "Anything", value: "You can now see/do everything.", inline: true },
                                            )
                                            .setColor("2f3136")

                                        return member.send({ embeds: [promoteAdmin] });
                                    case ("manager"):
                                        if (!member.roles.cache.some(role => role.name === "Senior Moderator")) {
                                            return interaction.reply({
                                                content: "Cannot promote this user that high. He must be a ``Senior Moderator`` first.",
                                                ephemeral: true,
                                            })
                                        }

                                        await member.roles.add(managerRole)
                                        await member.roles.add(managementRole)
                                        await member.roles.remove(seniorRole)

                                        await member.setNickname(member.user.username + " | Manager")

                                        await interaction.reply("<@" + member.user.id + "> is now promoted to ``Manager`` by ``" + interaction.user.tag + "``")

                                        const promoteManager = new MessageEmbed()
                                            .setTitle(":tada: Congratulations :tada:")
                                            .setDescription("You got promoted to ``Manager``, here's all the command you can do!")
                                            .addFields(
                                                { name: "Unmute", value: "You can now unmute a user with ``!unmute <@user> <reason>``.", inline: true },
                                                { name: "Unban", value: "You can now unban a user with ``/unban``.", inline: true },
                                                { name: "Promote", value: "You can now promote a user with ``" + config.prefix + "promote <@user>``.", inline: true },
                                            )
                                            .setColor("2f3136")

                                        return member.send({ embeds: [promoteManager] })
                                    case ("sm"):
                                        if (!member.roles.cache.some(role => role.name === "Moderator")) {
                                            return interaction.reply({
                                                content: "Cannot promote this user that high. He must be a ``Moderator`` first.",
                                                ephemeral: true,
                                            })
                                        }

                                        await member.roles.add(seniorRole)
                                        await member.roles.remove(moderatorRole)

                                        await member.setNickname(member.user.username + " | S-Mod")

                                        await interaction.reply("<@" + member.user.id + "> is now promoted to ``Senior Moderator`` by ``" + interaction.user.tag + "``")

                                        const promoteSeniorModerator = new MessageEmbed()
                                            .setTitle(":tada: Congratulations :tada:")
                                            .setDescription("You got promoted to ``Senior Moderator``, here's all the command you can do!")
                                            .addFields(
                                                { name: "Create Events", value: "You can now create events and manage them with the ``Lead Event Manager`` permission.", inline: true },
                                                { name: "Remove Warn", value: "You can now remove a warn to a user.", inline: true },
                                            )
                                            .setColor("2f3136")

                                        return member.send({ embeds: [promoteSeniorModerator] })
                                    case ("mod"):
                                        if (!member.roles.cache.some(role => role.name === "Helper")) {
                                            return interaction.reply({
                                                content: "Cannot promote this user that high. He must be a ``Helper`` first.",
                                                ephemeral: true,
                                            })
                                        }

                                        await member.roles.add(moderatorRole)
                                        await member.roles.remove(helperRole)

                                        await member.setNickname(member.user.username + " | Mod")

                                        await interaction.reply("<@" + member.user.id + "> is now promoted to ``Moderator`` by ``" + interaction.user.tag + "``")

                                        const promoteModerator = new MessageEmbed()
                                            .setTitle(":tada: Congratulations :tada:")
                                            .setDescription("You got promoted to ``Moderator``, here's all the command you can do!")
                                            .addFields(
                                                { name: "Ban", value: "You know have the power to ban people with ``" + config.prefix + "ban``.", inline: true },
                                                { name: "Kick", value: "You know have the power to kick people with ``" + config.prefix + "kick``.", inline: true },
                                                { name: "Manage Threads", value: "You can now delete/lock/archive threads when needed.", inline: true },
                                                { name: "Manage Voice Channel", value: "You can now mute, deafen, move and disconnect people from a VC.", inline: true },
                                            )
                                            .setColor("2f3136")

                                        return member.send({ embeds: [promoteModerator] })
                                    case ("helper"):
                                        if (!member.roles.cache.some(role => role.name === "Event Organizer") && !member.roles.cache.some(role => role.name === "Gate Keeper")) {
                                            return interaction.reply({
                                                content: "Cannot promote this user that high. He must be a ``Event Organizer`` or ``Gate Keeper`` first.",
                                                ephemeral: true,
                                            })
                                        }

                                        await member.roles.add(helperRole);
                                        await member.roles.add(moderationRole);

                                        await member.roles.remove(eoRole);
                                        await member.roles.remove(gateKeeperRole);
                                        await member.roles.remove(communityRole);

                                        await member.setNickname(member.user.username + " | Helper")

                                        await interaction.reply("<@" + member.user.id + "> is now promoted to ``Helper`` by ``" + interaction.user.tag + "``")

                                        const promoteHelper = new MessageEmbed()
                                            .setTitle(":tada: Congratulations :tada:")
                                            .setDescription("You got promoted to ``Helper``, here's all the command you can do!")
                                            .addFields(
                                                { name: "Mute", value: "You know have the power to mute people in chat with ``!mute <@user> <time> <reason>``.", inline: true },
                                                { name: "Warn", value: "You know have the power to warn people with ``" + config.prefix + "warn``.", inline: true },
                                                { name: "Lockdown", value: "You know have the power to lock certain channel with ``" + config.prefix + "lockdown``, and unlock with ``" + config.prefix + "unlockdown``", inline: true },
                                            )
                                            .setColor("2f3136")

                                        return member.send({ embeds: [promoteHelper] })
                                    case ("eo"):
                                        if (!member.roles.cache.some(role => role.name === "New Member")) {
                                            return interaction.reply({
                                                content: "Cannot promote this user that high. He must be a ``Member`` first.",
                                                ephemeral: true,
                                            })
                                        }

                                        await member.roles.add(eoRole);
                                        await member.roles.add(communityRole);
                                        await member.roles.add(staffRole);
                                        await member.roles.add("1000236412727218196");

                                        member.setNickname(nickNameCheck + " | E.O")

                                        await interaction.reply("<@" + member.user.id + "> is now promoted to ``Event Organizer`` by ``" + interaction.user.tag + "``")

                                        const promoteEo = new MessageEmbed()
                                            .setTitle(":tada: Congratulations :tada:")
                                            .setDescription("You got promoted to ``Event Organizer``, here's all the command you can do!")
                                            .addFields(
                                                { name: "Create Events", value: "You can now create events and manage them with Administrator permission.", inline: true },
                                                { name: "Verify Artist", value: "You can now add/remove artist from their role. It's part of your job to verify artist.", inline: true }
                                            )
                                            .setColor("2f3136")

                                        return member.send({ embeds: [promoteEo] })
                                    case ("gk"):
                                        if (!member.roles.cache.some(role => role.name === "New Member")) {
                                            return interaction.reply({
                                                content: "Cannot promote this user that high. He must be a ``Member`` first.",
                                                ephemeral: true,
                                            })
                                        }

                                        await member.roles.add(gateKeeperRole);
                                        await member.roles.add(communityRole);
                                        await member.roles.add(staffRole);
                                        await member.roles.add("1000236412727218196");

                                        member.setNickname(nickNameCheck + " | G.K.")

                                        await interaction.reply("<@" + member.user.id + "> is now promoted to ``Gate Keeper`` by ``" + interaction.user.tag + "``")

                                        const promoteGateKeeper = new MessageEmbed()
                                            .setTitle(":tada: Congratulations :tada:")
                                            .setDescription("You got promoted to ``Gate Keeper``, here's all the command you can do!")
                                            .addFields(
                                                { name: "Verification", value: "You can know verify people with ``" + config.prefix + "verify <@user> <newUsername>``. **Replaced with <#993350217535602688>!**.", inline: true },
                                                { name: "Verify Artist", value: "You can now add/remove artist from their role. It's part of your job to verify artist.", inline: true }
                                            )
                                            .setColor("2f3136")

                                        return member.send({ embeds: [promoteGateKeeper] })
                                }
                            case ("removeOptions"):
                                switch (addOptions) {
                                    case ("admin"):
                                        if (!member.roles.cache.some(role => role.name === "Administrator")) {
                                            return interaction.reply({
                                                content: "This user isn't an ``Administrator``.",
                                                ephemeral: true,
                                            })
                                        }

                                        await member.roles.remove(adminRole);
                                        await member.roles.remove(managementRole);
                                        await member.roles.remove(staffRole);
                                        await member.roles.remove("1000236412727218196");

                                        member.setNickname(member.user.username)

                                        return interaction.reply("``" + member.user.tag + "`` is now demoted to ``Member`` by ``" + interaction.user.tag + "``")
                                    case ("manager"):
                                        if (!member.roles.cache.some(role => role.name === "Manager")) {
                                            return interaction.reply({
                                                content: "This user isn't an ``Manager``.",
                                                ephemeral: true,
                                            })
                                        };

                                        await member.roles.remove(managerRole);
                                        await member.roles.remove(managementRole);
                                        await member.roles.remove(staffRole);
                                        await member.roles.remove("1000236412727218196");

                                        await member.setNickname(member.user.username);

                                        return interaction.reply("``" + member.user.tag + "`` is now demoted to ``Member`` by ``" + interaction.user.tag + "``")
                                    case ("sm"):
                                        if (!member.roles.cache.some(role => role.name === "Senior Moderator")) {
                                            return interaction.reply({
                                                content: "This user isn't an ``Senior Mdoerator``.",
                                                ephemeral: true,
                                            })
                                        }

                                        await member.roles.remove(seniorRole);
                                        await member.roles.remove(moderationRole);
                                        await member.roles.remove(staffRole);
                                        await member.roles.remove("1000236412727218196");

                                        await member.setNickname(member.user.username)

                                        return interaction.reply("``" + member.user.tag + "`` is now demoted to ``Member`` by ``" + interaction.user.tag + "``")

                                    case ("mod"):
                                        if (!member.roles.cache.some(role => role.name === "Moderator")) {
                                            return interaction.reply({
                                                content: "This user isn't an ``Moderator``.",
                                                ephemeral: true,
                                            })
                                        }

                                        await member.roles.remove(moderatorRole)
                                        await member.roles.remove(moderationRole)
                                        await member.roles.remove(staffRole)
                                        await member.roles.remove("1000236412727218196");

                                        await member.setNickname(member.user.username)

                                        return interaction.reply("``" + member.user.tag + "`` is now demoted to ``Member`` by ``" + interaction.user.tag + "``")
                                    case ("helper"):
                                        if (!member.roles.cache.some(role => role.name === "Helper")) {
                                            return interaction.reply({
                                                content: "This user isn't an ``Helper``.",
                                                ephemeral: true,
                                            })
                                        }

                                        await member.roles.remove(helperRole)
                                        await member.roles.remove(moderationRole)
                                        await member.roles.remove(staffRole)
                                        await member.roles.remove("1000236412727218196");

                                        await member.setNickname(member.user.username)

                                        return interaction.reply("``" + member.user.tag + "`` is now demoted to ``Member`` by ``" + interaction.user.tag + "``")
                                    case ("eo"):
                                        if (!member.roles.cache.some(role => role.name === "Event Organizer")) {
                                            return interaction.reply({
                                                content: "This user isn't an ``Event Organizer``.",
                                                ephemeral: true,
                                            })
                                        }

                                        await member.roles.remove(eoRole)
                                        await member.roles.remove(communityRole)
                                        await member.roles.remove(staffRole)
                                        await member.roles.remove("1000236412727218196");

                                        await member.setNickname(member.user.username)

                                        return interaction.reply("``" + member.user.tag + "`` is now demoted to ``Member`` by ``" + interaction.user.tag + "``")
                                    case ("gk"):
                                        if (!member.roles.cache.some(role => role.name === "Gate Keeper")) {
                                            return interaction.reply({
                                                content: "This user isn't an ``Gate Keeper``.",
                                                ephemeral: true,
                                            })
                                        }

                                        await member.roles.remove(gateKeeperRole)
                                        await member.roles.remove(communityRole)
                                        await member.roles.remove(staffRole)
                                        await member.roles.remove("1000236412727218196");

                                        await member.setNickname(member.user.username)

                                        return interaction.reply("``" + member.user.tag + "`` is now demoted to ``Member`` by ``" + interaction.user.tag + "``")
                                }
                        }
                }
            } else {
                return interaction.reply({
                    content: "You cannot execute this command! You need the following roles ``Management``.",
                    ephemeral: true
                })
            }
        } else {
            return interaction.reply({
                content: "This command can only be used on ``Over Control Furry``!",
                ephemeral: true
            })
        }
    }
};