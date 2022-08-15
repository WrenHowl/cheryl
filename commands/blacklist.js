const { SlashCommandBuilder } = require('@discordjs/builders');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'blacklist' command is loaded.")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('blacklist')
        .setDescription('Blacklist a member!')
        .addUserOption(option => option.setName("user").setDescription("User to blacklist").setRequired(true))
        .addStringOption(option =>
            option.setName('options')
                .setDescription('Choose options')
                .setRequired(true)
                .addChoices(
                    { name: 'add', value: 'addOptions' },
                    { name: 'remove', value: 'removeOptions' },
                ))
        .addStringOption(option => option.setName("reason").setDescription("Provide the reason").setRequired(true)),
    execute: async (interaction, bot, sequelize, Sequelize) => {
        let fetchGuild = interaction.client.guilds.cache.get("821241527941726248")

        const staffMember = fetchGuild.members.cache.get(interaction.user.id)
        let staffCheck = staffMember ? staffMember.roles.cache.some(role => role.name === "Management") : false

        if (!staffCheck) staffCheck = false;

        if (staffCheck) {
            const user = interaction.options.getUser("user");
            const member = interaction.guild.members.cache.get(user.id) || await interaction.guild.members.fetch(user.id).catch(err => { })

            const reason = interaction.options.getString("reason");
            const addOptions = interaction.options.getString("options");

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
            });
            const CheckBlacklist = await Blacklist.findOne({ where: { UserID: member.user.id } });

            switch (addOptions) {
                case ("addOptions"):
                    switch (member.id) {
                        case (!member):
                            return interaction.reply({
                                content: "I can't find this user!",
                                ephemeral: true
                            });
                        case (interaction.member.id):
                            return interaction.reply({
                                content: "You can't blacklist yourself!",
                                ephemeral: true
                            });
                        case (bot.user.id):
                            return interaction.reply({
                                content: "You can't blacklist me!",
                                ephemeral: true
                            });
                        case (member.roles.highest.position >= interaction.member.roles.highest.position):
                            return interaction.reply({
                                content: "You can't blacklist this user, because he's higher than you!",
                                ephemeral: true
                            });
                        default:

                            if (CheckBlacklist) {
                                return interaction.reply({
                                    content: "This user is blacklisted already.",
                                    ephemeral: true,
                                });
                            };

                            const BlacklistData = await Blacklist.create({
                                UserName: member.user.tag,
                                UserID: member.user.id,
                                ModName: interaction.user.tag,
                                ModID: interaction.user.id,
                                Reason: reason,
                            })

                            return interaction.reply({
                                content: "The user has been successfully added of the blacklist.",
                                ephemeral: true,
                            })
                    }
                case ("removeOptions"):
                    switch (member.id) {
                        case (!member):
                            return interaction.reply({
                                content: "I can't find this user!",
                                ephemeral: true
                            });
                        case (interaction.member.id):
                            return interaction.reply({
                                content: "You can't unblacklist yourself!",
                                ephemeral: true
                            });
                        case (bot.user.id):
                            return interaction.reply({
                                content: "You can't unblacklist me!",
                                ephemeral: true
                            });
                        case (member.roles.highest.position >= interaction.member.roles.highest.position):
                            return interaction.reply({
                                content: "You can't unblacklist this user, because he's higher than you!",
                                ephemeral: true
                            });
                        default:
                            if (CheckBlacklist) {
                                const unblacklistUser = Blacklist.destroy({ where: { UserID: member.user.id } })

                                return interaction.reply({
                                    content: "The user has been successfully removed of the blacklist.",
                                    ephemeral: true,
                                })
                            }

                            return interaction.reply({
                                content: "This user isn't blacklisted.",
                                ephemeral: true,
                            })
                    }
            }
        } else {
            return interaction.reply({
                content: "You cannot execute this command! Only the ``Managament Team`` of ``Over Control Furry`` are allowed to use it.",
                ephemeral: true
            })
        }
    }
};