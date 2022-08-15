const { MessageActionRow, MessageSelectMenu, MessageEmbed, Modal, MessageButton, TextInputComponent } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'whitelist' command is loaded.")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('whitelist')
        .setDescription('Whitelist a user.')
        .addUserOption(option => option.setName("user").setDescription("User to whitelist").setRequired(true))
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
                    { name: 'Verified Artist', value: 'artist' },
                    { name: 'Verified VRC Creator', value: 'vrcCreator' },
                    { name: 'Verified Content Creator', value: 'contentCreator' },
                )),
    execute: async (interaction, bot) => {
        if (interaction.guild.id === "821241527941726248") {
            if (interaction.member.roles.cache.some(role => role.name === "Staff")) {
                const user = interaction.options.getUser("user");
                const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => { })

                switch (member.id) {
                    case (!member):
                        return interaction.reply({
                            content: "I can't find this user!",
                            ephemeral: true
                        })
                    case (interaction.member.id):
                        return interaction.reply({
                            content: "You can't whitelist yourself!",
                            ephemeral: true
                        })
                    case (bot.user.id):
                        return interaction.reply({
                            content: "You can't whitelist me!",
                            ephemeral: true
                        })
                    case (member.roles.highest.position >= interaction.member.roles.highest.position):
                        return interaction.reply({
                            content: "You can't whitelist this user, because he's higher than you!",
                            ephemeral: true
                        })
                    default:
                        const options = interaction.options.getString("options");
                        const addOptions = interaction.options.getString("role");

                        switch (options) {
                            case ("addOptions"):
                                switch (addOptions) {
                                    case ("artist"):
                                        if (!member.roles.cache.some(role => role.id === "996838730566484050")) {
                                            member.roles.add("996838730566484050")
                                        }

                                        member.roles.add("940310066643480578")
                                        member.roles.add("1001111992834211921")

                                        console.log(interaction.user.tag + " added someone to the artist role.")
                                        return interaction.reply({
                                            content: "The user has been successfully added to the role ``Verified Artist``.",
                                            ephemeral: true,
                                        })

                                    case ("vrcCreator"):
                                        if (!member.roles.cache.some(role => role.id === "996838730566484050")) {
                                            member.roles.add("996838730566484050")
                                        }

                                        member.roles.add("996838634118467634")
                                        member.roles.add("1001111992834211921")

                                        console.log(interaction.user.tag + " added someone to the vrcCreator role.")
                                        return interaction.reply({
                                            content: "The user has been successfully added to the role ``Verified VRC Creator``.",
                                            ephemeral: true,
                                        })
                                    case ("contentCreator"):
                                        if (!member.roles.cache.some(role => role.id === "996838730566484050")) {
                                            member.roles.add("996838730566484050")
                                        }

                                        member.roles.add("996839283941982318")
                                        member.roles.add("1001111992834211921")

                                        console.log(interaction.user.tag + " added someone to the contentCreator role.")
                                        return interaction.reply({
                                            content: "The user has been successfully added to the role ``Verified Content Creator``.",
                                            ephemeral: true,
                                        })
                                }
                            case ("removeOptions"):
                                switch (addOptions) {
                                    case ("artist"):
                                        member.roles.remove("940310066643480578")
                                        member.roles.remove("996838730566484050")
                                        member.roles.remove("1001111992834211921")

                                        return interaction.reply({
                                            content: "The user has been successfully removed of the role ``Verified Artist``.",
                                            ephemeral: true,
                                        })
                                    case ("vrcCreator"):
                                        member.roles.remove("996838634118467634")
                                        member.roles.remove("996838730566484050")
                                        member.roles.remove("1001111992834211921")

                                        return interaction.reply({
                                            content: "The user has been successfully removed of the role ``Verified VRC Creator``.",
                                            ephemeral: true,
                                        })
                                    case ("contentCreator"):
                                        member.roles.remove("996839283941982318")
                                        member.roles.remove("996838730566484050")
                                        member.roles.remove("1001111992834211921")

                                        return interaction.reply({
                                            content: "The user has been successfully removed of the role ``Verified Content Creator``.",
                                            ephemeral: true,
                                        })
                                }
                        }
                }
            } else {
                await interaction.reply({
                    content: "You cannot execute this command! You need the following role ``STAFF``.",
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