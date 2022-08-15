const { Client, Intents, MessageEmbed, Collection, MessageActionRow, Modal, MessageButton, TextInputComponent, MessageSelectMenu, GuildBan } = require("discord.js");
const fs = require("node:fs");
const path = require('node:path');
const Sequelize = require('sequelize');
const moment = require("moment");
const wait = require("timers/promises").setTimeout;
const { token } = require("./config/config.json");
const MessageConfig = require("./config/message.json");
const bot = new Client({ allowedMentions: { parse: ['users', 'roles'], repliedUser: true }, intents: [Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

const dateTime = new Date();

let prefix = ".";

bot.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
const commandsPath2 = path.join(__dirname, 'commands_noslash');
const commandFiles2 = fs.readdirSync(commandsPath2).filter(file2 => file2.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  bot.commands.set(command.data.name, command);
}

for (const file2 of commandFiles2) {
  const filePath2 = path.join(commandsPath2, file2);
  const command2 = require(filePath2);
  bot.commands.set(command2.name, command2);
}

const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

const Verification_Count = sequelize.define("Verification_Count", {
  ModName: {
    type: Sequelize.STRING,
    unique: false,
  },
  ModID: {
    type: Sequelize.STRING,
    unique: false,
  },
  Usage_Count: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
  GuildID: {
    type: Sequelize.STRING,
    unique: false,
  },
});
const Verifier = sequelize.define("Verifier", {
  VerifierName: {
    type: Sequelize.STRING,
    unique: false,
  },
  VerifierID: {
    type: Sequelize.STRING,
    unique: false,
  },
  ModName: {
    type: Sequelize.STRING,
    unique: false,
  },
  ModID: {
    type: Sequelize.STRING,
    unique: false,
  },
  GuildID: {
    type: Sequelize.STRING,
    unique: false,
  },
});
const Staff_Application = sequelize.define("Staff_Application", {
  MessageID: {
    type: Sequelize.STRING,
    unique: true,
  },
  UserID: {
    type: Sequelize.STRING,
    unique: true
  },
  AgeData: {
    type: Sequelize.STRING,
    unique: false,
  },
  TimeZoneData: {
    type: Sequelize.STRING,
    unique: false
  },
  BeenOnServerData: {
    type: Sequelize.STRING,
    unique: false,
  },
  ExperienceData: {
    type: Sequelize.STRING,
    unique: false
  },
  WhyDoYouWantStaffData: {
    type: Sequelize.STRING,
    unique: false
  },
});
const Verification = sequelize.define("Verification", {
  MessageID: {
    type: Sequelize.STRING,
    unique: true,
  },
  UserID: {
    type: Sequelize.STRING,
    unique: true
  },
  UserName: {
    type: Sequelize.STRING,
    unique: true
  },
  AgeData: {
    type: Sequelize.STRING,
    unique: false,
  },
  HowServerData: {
    type: Sequelize.STRING,
    unique: false,
  },
  JoiningData: {
    type: Sequelize.STRING,
    unique: false
  },
  FurryFandomData: {
    type: Sequelize.STRING,
    unique: false,
  },
  SonaData: {
    type: Sequelize.STRING,
    unique: false
  },
  GuildID: {
    type: Sequelize.STRING,
    unique: false,
  }
});
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
const Warns = sequelize.define("Warns", {
  UserName: {
    type: Sequelize.STRING,
    unique: false,
  },
  UserID: {
    type: Sequelize.STRING,
    unique: false,
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
  GuildID: {
    type: Sequelize.STRING,
    unique: false,
  },
});
const Logging = sequelize.define("Logging", {
  GuildID: {
    type: Sequelize.STRING,
    unique: false,
  },
  ChannelIDReport: {
    type: Sequelize.STRING,
    unique: false,
  },
  ChannelIDBan: {
    type: Sequelize.STRING,
    unique: false,
  },
  ChannelIDVerify: {
    type: Sequelize.STRING,
    unique: false,
  },
  ChannelIDEnterServer: {
    type: Sequelize.STRING,
    unique: false,
  },
  StaffRoleReport: {
    type: Sequelize.STRING,
    unique: false,
  },
  StaffRoleVerify: {
    type: Sequelize.STRING,
    unique: false,
  },
  RoleToAddVerify: {
    type: Sequelize.STRING,
    unique: false,
  },
  RoleToRemoveVerify: {
    type: Sequelize.STRING,
    unique: false,
  },
  EnableDisableBlacklistLogger: {
    type: Sequelize.STRING,
    unique: false,
  },
  ChannelIDBlacklist: {
    type: Sequelize.STRING,
    unique: false,
  },
  ChannelIDWarn: {
    type: Sequelize.STRING,
    unique: false,
  },
  BanByPassRole: {
    type: Sequelize.STRING,
    unique: false,
  },
  ChannelIDKick: {
    type: Sequelize.STRING,
    unique: false,
  },
  ChannelIDReceiveVerification: {
    type: Sequelize.STRING,
    unique: false,
  },
});

bot.once("ready", async () => {
  await wait(1000);

  const Guild = bot.guilds.cache.get("821241527941726248");
  const MemberCount = Guild.members.cache.filter(member => !member.user.bot).size;
  const AllServers = bot.guilds.cache.size;

  const Status = [
    "/help | Furries: " + MemberCount,
    "/help | Servers: " + AllServers,
    "/help | Furries: " + MemberCount,
    "/help | Servers: " + AllServers,
  ]

  bot.user.setStatus("dnd")

  setInterval(async function () {
    const randomIndex = Math.floor(Math.random() * (Status.length - 1) + 0);
    const NewStatus = Status[randomIndex];

    bot.user.setPresence({ activities: [{ type: "WATCHING", name: NewStatus }] });
  }, 15000)

  setInterval(function () {
    Verification_Count.sync();
    Verifier.sync();
    Staff_Application.sync();
    Verification.sync();
    Blacklist.sync();
    Warns.sync();
    Logging.sync();
  }, 5000);

  console.log(dateTime.toLocaleString() + " -> The bot is ready!");

  setTimeout(function () {
    bot.guilds.cache.forEach(guild => {
      console.log(dateTime.toLocaleString() + " -> [SERVER] -> " + guild.name + " | " + guild.id);
    })
  }, 5000)
});

bot.on("guildMemberAdd", async (NewMember) => {
  const LoggingData = await Logging.findOne({ where: { GuildID: NewMember.guild.id } });

  if (NewMember.guild.id === "821241527941726248") {
    if (NewMember.user.bot) return;

    const ChannelGuild = NewMember.guild.channels.cache.get("898360451296010251");

    const MemberCount = NewMember.guild.members.cache.filter(member => !member.user.bot).size;

    await NewMember.roles.add("940140000916430848");
    await NewMember.roles.add("1000236020517834844");
    await NewMember.roles.add("1000236337900818533");
    await NewMember.roles.add("1001111992834211921");

    const WelcomeMessage = new MessageEmbed()
      .setDescription("Welcome to <@" + NewMember.id + "> ``(" + NewMember.user.tag + ")``!\n\n> __**Account Creation:**__ ``" + moment(NewMember.user.createdAt).format("Do MMMM YYYY hh:ss:mm A") + "``\n> **__Joined At:__** ``" + moment(NewMember.joinedAt).format('Do MMMM YYYY hh:ss:mm A') + "``\n> __**Furries Count:**__ ``" + MemberCount + "``")
      .setColor("2f3136")
      .setFooter({
        text: "ID: " + NewMember.id
      })
      .setThumbnail(NewMember.user.displayAvatarURL())

    if (NewMember.user.id === "610309745714135040") return;

    return ChannelGuild.send({
      embeds: [WelcomeMessage]
    });
  }

  const VerifBlacklist = await Blacklist.findOne({ where: { UserID: NewMember.user.id } })

  if (VerifBlacklist) {
    if (LoggingData) {
      if (LoggingData.EnableDisableBlacklistLogger === "Enabled") {
        if (LoggingData.ChannelIDBlacklist) {
          const ChannelToSendAt = await NewMember.guild.channels.fetch(LoggingData.ChannelIDBlacklist)

          const BlacklistedUserJoined = new MessageEmbed()
            .setDescription("<:BanHammer:997932635454197790>  User <@" + VerifBlacklist.UserID + "> is blacklisted for ``" + VerifBlacklist.Reason + "``\n\nWe suggest you to be careful with that user!")
            .setColor("2f3136")
            .setFooter({
              text: "ID: " + VerifBlacklist.UserID
            })
            .setTimestamp()

          ChannelToSendAt.send({ embeds: [BlacklistedUserJoined] })
        }
      }
    }
  }
});

bot.on("guildMemberUpdate", async (OldMember, NewMember) => {
  const OldStatus = OldMember.premiumSince;
  const NewStatus = NewMember.premiumSince;

  if (NewMember.guild.id === "821241527941726248") {
    if (!OldStatus && NewStatus) {
      const ChannelToSend = bot.channels.cache.get("898361230010482688")

      const NewBoost = new MessageEmbed()
        .setTitle("New Boost")
        .setDescription("Thank you <@" + NewMember.user.id + "> for Boosting our server!\n\n Perks:\n- Participate to private events\n- A beautiful role\n- Get 10% Booster in Levels\n- Role income of 750$")
        .setColor("f47fff")

      ChannelToSend.send({
        embeds: [NewBoost]
      })
      NewMember.roles.add("1001111992834211921")
    }
    if (OldStatus && !NewStatus) {
      NewMember.roles.remove("1001111992834211921")
    }
  }
});

bot.on("userUpdate", async (NewUser, oldUser) => {
  if (oldUser.userModName !== NewUser.userModName) {
    const UpdateThisOne = Verifier.update({ ModName: NewUser.tag }, { where: { ModID: NewUser.id } })
    const UpdateThisOneToo = Blacklist.update({ ModName: NewUser.tag }, { where: { ModID: NewUser.id } })

  }
  if (oldUser.discriminator !== NewUser.discriminator) {
    const UpdateThisOne = Verifier.update({ ModName: NewUser.tag }, { where: { ModID: NewUser.id } })
    const UpdateThisOneToo = Blacklist.update({ ModName: NewUser.tag }, { where: { ModID: NewUser.id } })

  }
});

bot.on("guildMemberRemove", async (LeavingMember) => {

  if (LeavingMember.guild.id === "821241527941726248") {
    const FirstRowToDelete = await Verifier.destroy({ where: { VerifierID: LeavingMember.user.id } })
    const SecondFirstRowToDelete = await Verification.destroy({ where: { UserID: LeavingMember.user.id } })
    const ThirdRowToDelete = await Verification_Count.destroy({ where: { ModID: LeavingMember.user.id } })
    const FourthRowToDelete = await Staff_Application.destroy({ where: { UserID: LeavingMember.user.id } })
    const LogChannel = LeavingMember.guild.channels.cache.get("898366209827954718");

    if (FirstRowToDelete | SecondFirstRowToDelete | ThirdRowToDelete | FourthRowToDelete) {

      const LeavingMemberEmbedData = new MessageEmbed()
        .setTitle("Member Left")
        .setDescription("**__User:__** ``" + LeavingMember.user.tag + "``.\n__**Account Creation:**__ ``" + moment(LeavingMember.user.createdAt).format("Do MMMM YYYY hh:ss:mm A") + "``\n**__Joined At:__** ``" + moment(LeavingMember.joinedAt).format('Do MMMM YYYY hh:ss:mm A') + "``\n**__Data:__** ``Deleted``")
        .setColor("2f3136")
        .setFooter({
          text: "ID: " + LeavingMember.id
        })
        .setThumbnail(LeavingMember.user.displayAvatarURL())

      LogChannel.send({
        embeds: [LeavingMemberEmbedData]
      });
    } else {
      const LeavingMemberEmbedData2 = new MessageEmbed()
        .setTitle("Member Left")
        .setDescription("**__User:__** ``" + LeavingMember.user.tag + "``.\n__**Account Creation:**__ ``" + moment(LeavingMember.user.createdAt).format("Do MMMM YYYY hh:ss:mm A") + "``\n**__Joined At:__** ``" + moment(LeavingMember.joinedAt).format('Do MMMM YYYY hh:ss:mm A') + "``\n**__Data:__** ``Not Found``")
        .setColor("2f3136")
        .setFooter({
          text: "ID: " + LeavingMember.id
        })
        .setThumbnail(LeavingMember.user.displayAvatarURL())

      LogChannel.send({
        embeds: [LeavingMemberEmbedData2]
      });
    }
  }
});

bot.on("messageCreate", async (message) => {
  const SuggestionChannel = "940372261477679184";
  const SuggestionBot = bot.channels.cache.get(SuggestionChannel)

  if (SuggestionChannel.includes(message.channel.id)) {
    if (message.author.bot) return message.delete()
    if (message.author.bot | message.member.roles.cache.some(role => role.name === 'Administrator') | message.member.roles.cache.some(role => role.name === 'Owner')) {
      return;
    } else {
      await message.delete()

      const SuggestionMessage = new MessageEmbed()
        .setDescription("**__New Suggestion__**\n\n" + message.content)
        .setFooter({ text: "Suggested by " + message.author.tag })
        .setColor("2f3136")
        .setTimestamp()

      await SuggestionBot.send({
        embeds: [SuggestionMessage],
      }).then((message) => {
        message.react("<:check_ocf:962115470549458954>")
        message.react("<:cross_ocf:962115493253222420>")
      });
    }
  }
});

bot.on("messageCreate", async (message) => {
  if (message.author.bot || message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "rolemenu") {
    bot.commands.get("rolemenu").execute(bot, message, args, MessageEmbed);
  }
  if (command === "application") {
    bot.commands.get("application").execute(bot, message, args, MessageEmbed);
  }
  if (command === "welcomemessage") {
    bot.commands.get("welcomemessage").execute(bot, message, args, MessageEmbed, sequelize, Sequelize);
  }
  if (command === "serverlist") {
    bot.commands.get("serverlist").execute(bot, message, args, MessageEmbed);
  }
});

bot.on("voiceStateUpdate", async (oldState, newState) => {
  const Guild = bot.guilds.cache.get("821241527941726248")

  if (newState.channelId === "1005901578852642906") {
    const voiceChannel = await Guild.channels.create(newState.member.user.username + " | Room", {
      type: "GUILD_VOICE",
      parent: newState.channel.parent,
      permissionOverwrites: [
        {
          id: newState.Guild.id,
          deny: ["VIEW_CHANNEL"],
        },
        {
          id: "940140000916430848",
          deny: ["VIEW_CHANNEL"],
        },
        {
          id: "898354377503432734",
          deny: ["CONNECT"],
          allow: ["VIEW_CHANNEL"],
        },
        {
          id: newState.member.user.id,
          allow: ["VIEW_CHANNEL", "CONNECT", "DEAFEN_MEMBERS", "MUTE_MEMBERS", "MOVE_MEMBERS"],
        },
      ],
    });
    const voiceChannelWaiting = await Guild.channels.create(newState.member.user.username + " | Waiting", {
      type: "GUILD_VOICE",
      parent: newState.channel.parent,
      permissionOverwrites: [
        {
          id: newState.Guild.id,
          deny: ["VIEW_CHANNEL"],
        },
        {
          id: "940140000916430848",
          deny: ["VIEW_CHANNEL"],
        },
        {
          id: "898354377503432734",
          allow: ["CONNECT", "VIEW_CHANNEL"],
        },
        {
          id: newState.member.user.id,
          allow: ["VIEW_CHANNEL", "CONNECT", "DEAFEN_MEMBERS", "MUTE_MEMBERS", "MOVE_MEMBERS"],
        },
      ],
    });

    return setTimeout(() => newState.member.voice.setChannel(voiceChannel))
  }
})

bot.on('interactionCreate', async (interaction) => {

  if (!interaction.isCommand()) return;

  const command = bot.commands.get(interaction.commandName);

  try {
    await command.execute(interaction, bot, sequelize, Sequelize);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

bot.on('interactionCreate', async (interaction) => {
  if (interaction.isButton()) {
    let ApplicationLog = await Staff_Application.findOne({ where: { MessageID: interaction.message.id } });
    let VerificationLog = await Verification.findOne({ where: { MessageID: interaction.message.id } });

    switch (interaction.customId) {
      case ("applyForStaff"):
        if (!interaction.member.roles.cache.some(role => role.name === MessageConfig.StaffRoleApplication)) {
          const modalStaff = new Modal()
            .setCustomId('modalStaff')
            .setTitle('Staff Application');

          const ageOption = new TextInputComponent()
            .setCustomId('Age')
            .setLabel("Age")
            .setStyle('SHORT')
            .setRequired();

          const timezoneOption = new TextInputComponent()
            .setCustomId('Timezone')
            .setLabel("Timezone")
            .setStyle('SHORT')
            .setRequired();

          const beenOnOption = new TextInputComponent()
            .setCustomId('beenOnServer')
            .setLabel("How long have you been on the server?")
            .setStyle('SHORT')
            .setRequired();

          const experienceOption = new TextInputComponent()
            .setCustomId('experience')
            .setLabel("Do you have any experience?")
            .setStyle('PARAGRAPH')
            .setRequired();

          const whyDoYouWantOption = new TextInputComponent()
            .setCustomId('whydoYou')
            .setLabel("Why do you want to be staff?")
            .setStyle('PARAGRAPH')
            .setRequired();

          const ageRow = new MessageActionRow().addComponents(ageOption);
          const timezoneRow = new MessageActionRow().addComponents(timezoneOption);
          const beenOnRow = new MessageActionRow().addComponents(beenOnOption);
          const experienceRow = new MessageActionRow().addComponents(experienceOption);
          const whyDoYouWantRow = new MessageActionRow().addComponents(whyDoYouWantOption);

          modalStaff.addComponents(ageRow, timezoneRow, beenOnRow, experienceRow, whyDoYouWantRow);

          return interaction.showModal(modalStaff)
        } else {
          return interaction.reply({
            content: MessageConfig.AlreadyAppliedStaffApplicationError,
            ephemeral: true,
          })
        };
      case ("buttonToAcceptApplication"):
        if (ApplicationLog) {
          if (!ApplicationLog.MessageID) {
            return interaction.reply({
              content: MessageConfig.CannotFindDataOfMessage,
              ephemeral: true,
            })
          }
        }

        interaction.channel.messages.fetch(ApplicationLog.MessageID).then(async (UpdateMessage) => {
          const staffApplicationEmbed2 = new MessageEmbed()
            .addField("**__Age__**", ApplicationLog.AgeData)
            .addField("**__Timezone__**", ApplicationLog.TimeZoneData)
            .addField("**__How long have you been on the server?__**", ApplicationLog.BeenOnServerData)
            .addField("**__Do you have any experience?__**", ApplicationLog.ExperienceData)
            .addField("**__Why do you want to be staff?__**", ApplicationLog.WhyDoYouWantStaffData)
            .setColor("00FF00")
            .setTimestamp()

          await interaction.update({
            content: "Application from <@" + ApplicationLog.UserID + "> accepted by <@" + interaction.user.id + ">",
            embeds: [staffApplicationEmbed2],
            components: [],
          })

          await bot.users.cache.get(ApplicationLog.UserID).send({
            content: MessageConfig.StaffApplicationAccepted,
          }).catch(() => { return })

          const ApplicationDeleteLog = await Staff_Application.destroy({ where: { MessageID: interaction.message.id } });
        });

        break;
      case ("buttonToDenyApplication"):
        if (ApplicationLog) {
          if (!ApplicationLog.MessageID) {
            return interaction.reply({
              content: MessageConfig.CannotFindDataOfMessage,
              ephemeral: true,
            })
          }
        }

        interaction.channel.messages.fetch(ApplicationLog.MessageID).then(async (UpdateMessage) => {

          const staffApplicationEmbed2 = new MessageEmbed()
            .addField("**__Age__**", ApplicationLog.AgeData)
            .addField("**__Timezone__**", ApplicationLog.TimeZoneData)
            .addField("**__How long have you been on the server?__**", ApplicationLog.BeenOnServerData)
            .addField("**__Do you have any experience?__**", ApplicationLog.ExperienceData)
            .addField("**__Why do you want to be staff?__**", ApplicationLog.WhyDoYouWantStaffData)
            .setColor("FF0000")
            .setTimestamp()


          await interaction.update({
            content: "Application from <@" + ApplicationLog.UserID + "> denied by <@" + interaction.user.id + ">",
            embeds: [staffApplicationEmbed2],
            components: [],
          });

          await bot.users.cache.get(ApplicationLog.UserID).send({
            content: MessageConfig.StaffApplicationDenied,
          }).catch(() => { return });
        })

        const ApplicationDeleteLog = await Staff_Application.destroy({ where: { MessageID: interaction.message.id } });

        break;
      case ("buttonToVerify"):
        if (interaction.guild.id === "821241527941726248") {
          if (!interaction.member.roles.cache.some(role => role.name === "New Member")) {
            const ModalVerification = new Modal()
              .setCustomId('verificationModal')
              .setTitle('Verification');

            const ageOption = new TextInputComponent()
              .setCustomId('age')
              .setLabel("Age")
              .setStyle('SHORT')
              .setRequired();

            const howServerOption = new TextInputComponent()
              .setCustomId('howServer')
              .setLabel("How did you find our server?")
              .setStyle('SHORT')
              .setRequired();

            const joiningOption = new TextInputComponent()
              .setCustomId('joining')
              .setLabel("Why are you joining us?")
              .setStyle('PARAGRAPH')
              .setRequired();

            const furryFandomOption = new TextInputComponent()
              .setCustomId('furryFandom')
              .setLabel("What do you think about the furry fandom?")
              .setStyle('PARAGRAPH')
              .setRequired();

            const sonaOption = new TextInputComponent()
              .setCustomId('sona')
              .setLabel("Do you have any sona? Tell us about it")
              .setStyle('PARAGRAPH')
              .setRequired();

            const ageRow = new MessageActionRow().addComponents(ageOption);
            const howServerRow = new MessageActionRow().addComponents(howServerOption);
            const joiningRow = new MessageActionRow().addComponents(joiningOption);
            const furryFandomRow = new MessageActionRow().addComponents(furryFandomOption);
            const sonaRow = new MessageActionRow().addComponents(sonaOption);

            ModalVerification.addComponents(ageRow, howServerRow, joiningRow, furryFandomRow, sonaRow);

            return interaction.showModal(ModalVerification)
          } else {
            return interaction.reply({
              content: "You cannot verify yourself, because you're already verified.",
              ephemeral: true,
            })
          }
        };
        if (interaction.guild.id === "815422069234860073") {
          if (interaction.member.roles.cache.some(role => role.id === "817245431296950282")) {
            const ModalVerification = new Modal()
              .setCustomId('verificationModal2')
              .setTitle('Verification');

            const howServerOption = new TextInputComponent()
              .setCustomId('howServer2')
              .setLabel("How did you find our server?")
              .setStyle('SHORT')
              .setRequired();

            const joiningOption = new TextInputComponent()
              .setCustomId('joining2')
              .setLabel("Why are you joining us?")
              .setStyle('PARAGRAPH')
              .setRequired();

            const furryFandomOption = new TextInputComponent()
              .setCustomId('furryFandom2')
              .setLabel("What do you think about the furry fandom?")
              .setStyle('PARAGRAPH')
              .setRequired();

            const howServerRow = new MessageActionRow().addComponents(howServerOption);
            const joiningRow = new MessageActionRow().addComponents(joiningOption);
            const furryFandomRow = new MessageActionRow().addComponents(furryFandomOption);

            ModalVerification.addComponents(howServerRow, joiningRow, furryFandomRow);

            return interaction.showModal(ModalVerification)
          } else {
            return interaction.reply({
              content: "You cannot verify yourself, because you're already verified.",
              ephemeral: true,
            })
          }
        };
      case ("buttonToAcceptVerify"):
        if (!VerificationLog) {
          return interaction.reply({
            content: "Cannot find the data of this message!",
            ephemeral: true,
          })
        }

        const member = interaction.guild.members.cache.get(VerificationLog.UserID)

        const RowToUpdate = await Verification_Count.update({ ModName: interaction.user.tag }, { where: { ModID: interaction.user.id } })

        if (interaction.guild.id === "821241527941726248") {
          await member.roles.add("898354377503432734")
          await member.roles.remove("940140000916430848")

          const generalMessage = interaction.guild.channels.cache.get("898361230010482688")

          const AdsInGeneral = new MessageEmbed()
            .setDescription("__**Read the rules:**__ <#898360656175198249>\n__**Get your roles:**__ <#898360376654188557>\n__**Join an event:**__ <#898360298552037426>")
            .setColor("2f3136")

          await generalMessage.send({ embeds: [AdsInGeneral], content: "<@" + VerificationLog.UserID + ">" })

          interaction.channel.messages.fetch(VerificationLog.MessageID).then(async (UpdateMessage) => {

            const verificationEmbedAccepted = new MessageEmbed()
              .addField("**__Age__**", VerificationLog.AgeData)
              .addField("**__How did you find our server?__**", VerificationLog.HowServerData)
              .addField("**__Why are you joining us?__**", VerificationLog.JoiningData)
              .addField("**__What do you think about the furry fandom?__**", VerificationLog.FurryFandomData)
              .addField("**__Do you have any sona? Tell us about it__**", VerificationLog.SonaData)
              .setColor("00FF00")
              .setTimestamp()

            await interaction.update({
              content: "<@&931038287114678334> | Verification from <@" + VerificationLog.UserID + "> accepted by <@" + interaction.user.id + ">",
              embeds: [verificationEmbedAccepted],
              components: [],
            })
          })

          const Verification_CountData = await Verification_Count.findOne({ where: { ModID: interaction.user.id, GuildID: interaction.guild.id } });

          if (Verification_CountData) {
            if (Verification_CountData.GuildID === interaction.guild.id) {
              await Verification_CountData.increment('Usage_Count');
            };
          } else {
            const Verification_CountCreate = await Verification_Count.create({
              ModID: interaction.user.id,
              ModName: interaction.user.tag,
              GuildID: interaction.guild.id,
            });
          };
        }

        if (interaction.guild.id === "815422069234860073") {
          await member.roles.add("829845328223404053")
          await member.roles.remove("817245431296950282")

          const generalMessage = interaction.guild.channels.cache.get("815422070053273681")

          const AdsInGeneral = new MessageEmbed()
            .setDescription("Go get roles in\n\n" +
              "> Grab some role in: <#839049304060067850>\n" +
              "> Get some new color in: <#815422069557952551>\n" +
              "> Introduce yourself in: <#815819177008955402>\n\n" +
              "Pleasure to have you here! :flag_ca:")
            .setColor("2f3136")

          await generalMessage.send({ embeds: [AdsInGeneral], content: "Welcome <@" + VerificationLog.UserID + ">!" })

          interaction.channel.messages.fetch(VerificationLog.MessageID).then(async (UpdateMessage) => {

            const verificationEmbedAccepted = new MessageEmbed()
              .addField("**__How did you find our server?__**", VerificationLog.HowServerData)
              .addField("**__Why are you joining us?__**", VerificationLog.JoiningData)
              .addField("**__What do you think about the furry fandom?__**", VerificationLog.FurryFandomData)
              .setColor("00FF00")
              .setTimestamp()

            await interaction.update({
              content: "<@&852950515389169714> | Verification from <@" + VerificationLog.UserID + "> accepted by <@" + interaction.user.id + ">",
              embeds: [verificationEmbedAccepted],
              components: [],
            })
          })

          const Verification_CountData = await Verification_Count.findOne({ where: { ModID: interaction.user.id, GuildID: interaction.guild.id } });

          if (Verification_CountData) {
            if (Verification_CountData.GuildID === interaction.guild.id) {
              await Verification_CountData.increment('Usage_Count');
            };
          } else {
            const Verification_CountCreate = await Verification_Count.create({
              ModID: interaction.user.id,
              ModName: interaction.user.tag,
              GuildID: interaction.guild.id,
            });
          };
        }

        const VerifierCreateData = await Verifier.create({
          VerifierName: VerificationLog.UserName,
          VerifierID: VerificationLog.UserID,
          ModName: interaction.user.tag,
          ModID: interaction.user.id,
          GuildID: interaction.guild.id,
        })

        const verificationDeleteLog = await Verification.destroy({ where: { MessageID: interaction.message.id } });
      case ("buttonToDenyVerify"):
        if (!VerificationLog) {
          return interaction.reply({
            content: "Cannot find the data of this message!",
            ephemeral: true,
          })
        }

        if (interaction.guild.id === "821241527941726248") {
          interaction.channel.messages.fetch(VerificationLog.MessageID).then(async (UpdateMessage) => {
            const reasonDeny = new MessageActionRow()
              .addComponents(
                new MessageSelectMenu()
                  .setCustomId('reasonDeny')
                  .setPlaceholder('Please select a reason')
                  .addOptions(
                    {
                      label: 'Not Enough Details',
                      value: 'noDetails',
                    },
                    {
                      label: 'Troll',
                      value: 'troll',
                    },
                  ),
              );

            const verificationEmbedDenied = new MessageEmbed()
              .addField("**__Age__**", VerificationLog.AgeData)
              .addField("**__How did you find our server?__**", VerificationLog.HowServerData)
              .addField("**__Why are you joining us?__**", VerificationLog.JoiningData)
              .addField("**__What do you think about the furry fandom?__**", VerificationLog.FurryFandomData)
              .addField("**__Do you have any sona? Tell us about it__**", VerificationLog.SonaData)
              .setColor("FF0000")
              .setTimestamp()

            await interaction.update({
              content: "<@&931038287114678334> | Verification from <@" + VerificationLog.UserID + "> denied by <@" + interaction.user.id + ">",
              embeds: [verificationEmbedDenied],
              components: [reasonDeny],
            })
          })
        }
        if (interaction.guild.id === "815422069234860073") {
          interaction.channel.messages.fetch(VerificationLog.MessageID).then(async (UpdateMessage) => {
            const reasonDeny = new MessageActionRow()
              .addComponents(
                new MessageSelectMenu()
                  .setCustomId('reasonDeny')
                  .setPlaceholder('Please select a reason')
                  .addOptions(
                    {
                      label: 'Not Enough Details',
                      value: 'noDetails',
                    },
                    {
                      label: 'Troll',
                      value: 'troll',
                    },
                  ),
              );

            const verificationEmbedDenied = new MessageEmbed()
              .addField("**__How did you find our server?__**", VerificationLog.HowServerData)
              .addField("**__Why are you joining us?__**", VerificationLog.JoiningData)
              .addField("**__What do you think about the furry fandom?__**", VerificationLog.FurryFandomData)
              .setColor("FF0000")
              .setTimestamp()

            await interaction.update({
              content: "<@&852950515389169714> | Verification from <@" + VerificationLog.UserID + "> denied by <@" + interaction.user.id + ">",
              embeds: [verificationEmbedDenied],
              components: [reasonDeny],
            })
          })
        };
    }
  }
  if (interaction.isModalSubmit()) {
    switch (interaction.customId) {
      case ("modalStaff"):
        const button = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId('buttonToAcceptApplication')
              .setLabel('Accept')
              .setStyle('SUCCESS'),
          )
          .addComponents(
            new MessageButton()
              .setCustomId('buttonToDenyApplication')
              .setLabel('Deny')
              .setStyle('DANGER'),
          );

        const ChannelForApplication = interaction.guild.channels.cache.get("993999178042712174");

        let age = interaction.fields.getTextInputValue('Age');
        let timezone = interaction.fields.getTextInputValue('Timezone');
        let beenOnServer = interaction.fields.getTextInputValue('beenOnServer');
        let experience = interaction.fields.getTextInputValue('experience');
        let whyDoYouWant = interaction.fields.getTextInputValue('whydoYou');

        if (!age) age = "N/A";
        if (!timezone) timezone = "N/A";
        if (!beenOnServer) beenOnServer = "N/A";
        if (!experience) experience = "N/A";
        if (!whyDoYouWant) whyDoYouWant = "N/A";

        const staffApplicationEmbed = new MessageEmbed()
          .addField("**__Age__**", age)
          .addField("**__Timezone__**", timezone)
          .addField("**__How long have you been on the server?__**", beenOnServer)
          .addField("**__Do you have any experience?__**", experience)
          .addField("**__Why do you want to be staff?__**", whyDoYouWant)
          .setColor("2f3136")
          .setTimestamp()

        let AlreadySent = await Staff_Application.findOne({ where: { UserID: interaction.user.id } });

        if (AlreadySent) return interaction.reply({
          content: "You have sent a staff application already.",
          ephemeral: true
        })

        await ChannelForApplication.send({
          content: "<@&991769060956192799> | Application from <@" + interaction.user.id + ">",
          embeds: [staffApplicationEmbed],
          components: [button],
        }).then(async sent => {
          let MessageID = sent.id

          const Staff_ApplicationCreateData = await Staff_Application.create({
            MessageID: MessageID,
            UserID: interaction.user.id,
            UserName: interaction.user.tag,
            AgeData: age,
            TimeZoneData: timezone,
            BeenOnServerData: beenOnServer,
            ExperienceData: experience,
            WhyDoYouWantStaffData: whyDoYouWant,
          })

        })
        await interaction.reply({
          content: "We received your application, you will receive a response soon!",
          ephemeral: true
        });
      case ("verificationModal"):
        if (interaction.guild.id === "821241527941726248") {

          const buttonVerify = new MessageActionRow()
            .addComponents(
              new MessageButton()
                .setCustomId('buttonToAcceptVerify')
                .setLabel('Accept')
                .setStyle('SUCCESS'),
            )
            .addComponents(
              new MessageButton()
                .setCustomId('buttonToDenyVerify')
                .setLabel('Deny')
                .setStyle('DANGER'),
            );

          const channelForVerification = interaction.guild.channels.cache.get("993350217535602688");

          let age = interaction.fields.getTextInputValue('age');
          let howServer = interaction.fields.getTextInputValue('howServer');
          let joining = interaction.fields.getTextInputValue('joining');
          let furryFandom = interaction.fields.getTextInputValue('furryFandom');
          let sona = interaction.fields.getTextInputValue('sona');

          if (!age) age = "N/A";
          if (!howServer) howServer = "N/A";
          if (!joining) joining = "N/A";
          if (!furryFandom) furryFandom = "N/A";
          if (!sona) sona = "N/A";

          const verificationEmbed = new MessageEmbed()
            .addField("**__Age__**", age)
            .addField("**__How did you find our server?__**", howServer)
            .addField("**__Why are you joining us?__**", joining)
            .addField("**__What do you think about the furry fandom?__**", furryFandom)
            .addField("**__Do you have any sona? Tell us about it__**", sona)
            .setColor("2f3136")
            .setTimestamp()

          try {

            let idExist = await Verification.findOne({ where: { UserID: interaction.user.id } });

            if (idExist) return interaction.reply({
              content: "You're already waiting to be verified, please be patient while our staff look at your verification.",
              ephemeral: true
            })

            await channelForVerification.send({
              content: "<@&931038287114678334> | Verification from <@" + interaction.user.id + ">",
              embeds: [verificationEmbed],
              components: [buttonVerify],
            }).then(async sent => {
              let MessageID = sent.id

              const VerificationCreate = await Verification.create({
                MessageID: MessageID,
                UserID: interaction.user.id,
                UserName: interaction.user.tag,
                AgeData: age,
                HowServerData: howServer,
                JoiningData: joining,
                FurryFandomData: furryFandom,
                SonaData: sona,
              })
            })

            await interaction.reply({
              content: "We received your verification, you will be verified soon!",
              ephemeral: true
            });

          } catch (error) {
            console.log(error)
          }
        };
      case ("verificationModal2"):
        if (interaction.guild.id === "815422069234860073") {

          const buttonVerify = new MessageActionRow()
            .addComponents(
              new MessageButton()
                .setCustomId('buttonToAcceptVerify')
                .setLabel('Accept')
                .setStyle('SUCCESS'),
            )
            .addComponents(
              new MessageButton()
                .setCustomId('buttonToDenyVerify')
                .setLabel('Deny')
                .setStyle('DANGER'),
            );

          const channelForVerification = interaction.guild.channels.cache.get("1008225810404089886");

          let howServer = interaction.fields.getTextInputValue('howServer2');
          let joining = interaction.fields.getTextInputValue('joining2');
          let furryFandom = interaction.fields.getTextInputValue('furryFandom2');

          if (!howServer) howServer = "N/A";
          if (!joining) joining = "N/A";
          if (!furryFandom) furryFandom = "N/A";

          const verificationEmbed = new MessageEmbed()
            .setDescription("*Account Age: " + moment(interaction.member.joinedAt).format('Do MMMM YYYY hh:ss:mm A') + "*")
            .addFields(
              { name: "**__How did you find our server?__**", value: howServer },
              { name: "**__Why are you joining us?__**", value: joining },
              { name: "**__What do you think about the furry fandom?__**", value: furryFandom }
            )
            .setColor("2f3136")
            .setTimestamp()

          let VerificationData = await Verification.findOne({ where: { GuildID: interaction.guild.id } });

          if (VerificationData) {
            if (VerificationData.UserID) {
              return interaction.reply({
                content: "You're already waiting to be verified, please be patient while our staff look at your verification.",
                ephemeral: true
              })
            }
          }

          await channelForVerification.send({
            content: "<@&852950515389169714> | Verification from <@" + interaction.user.id + ">",
            embeds: [verificationEmbed],
            components: [buttonVerify],
          }).then(async sent => {
            let MessageID = sent.id

            const VerificationCreate = await Verification.create({
              MessageID: MessageID,
              UserID: interaction.user.id,
              UserName: interaction.user.tag,
              HowServerData: howServer,
              JoiningData: joining,
              FurryFandomData: furryFandom,
              GuildID: interaction.guild.id,
            })
          })

          return interaction.reply({
            content: "We received your verification, you will be verified soon!",
            ephemeral: true
          });
        };
    }
  }
  if (interaction.isSelectMenu()) {
    let args = interaction.values[0]
    await interaction.deferUpdate();

    switch (interaction.customId) {
      case ("roleMenu1"):
        switch (args) {
          case ("Major (18+)"):
            if (interaction.member.roles.cache.some(role => role.name === "Major (18+)")) {
              interaction.member.roles.remove("900200948557824050")
            }

            interaction.member.roles.add("900201076916105306");
          case ("Minor (17-)"):
            if (interaction.member.roles.cache.some(role => role.name === "Major (18+)")) {
              interaction.member.roles.remove("900201076916105306")
            }

            interaction.member.roles.add("900200948557824050");
        }

        break;
      case ("roleMenu2"):
        switch (args) {
          case ("Boy"):
            if (interaction.member.roles.cache.some(role => role.name === "Girl")) {
              interaction.member.roles.remove("900149792930406400")
            } else if (interaction.member.roles.cache.some(role => role.name === "Gender Fluid")) {
              interaction.member.roles.remove("900769520111734835")
            } else if (interaction.member.roles.cache.some(role => role.name === "Trans")) {
              interaction.member.roles.remove("940126702389039164")
            } else if (interaction.member.roles.cache.some(role => role.name === "Agender")) {
              interaction.member.roles.remove("940130071249829969")
            } else if (interaction.member.roles.cache.some(role => role.name === "Non-Binary")) {
              interaction.member.roles.remove("940130130225950720")
            } else if (interaction.member.roles.cache.some(role => role.name === "Cisgender")) {
              interaction.member.roles.remove("940130181014761513")
            } else if (interaction.member.roles.cache.some(role => role.name === "Other Gender")) {
              interaction.member.roles.remove("940240745821007922")
            }

            interaction.member.roles.add("900149879089815604");
          case ("Girl"):
            if (interaction.member.roles.cache.some(role => role.name === "Boy")) {
              interaction.member.roles.remove("900149879089815604")
            } else if (interaction.member.roles.cache.some(role => role.name === "Gender Fluid")) {
              interaction.member.roles.remove("900769520111734835")
            } else if (interaction.member.roles.cache.some(role => role.name === "Trans")) {
              interaction.member.roles.remove("940126702389039164")
            } else if (interaction.member.roles.cache.some(role => role.name === "Agender")) {
              interaction.member.roles.remove("940130071249829969")
            } else if (interaction.member.roles.cache.some(role => role.name === "Non-Binary")) {
              interaction.member.roles.remove("940130130225950720")
            } else if (interaction.member.roles.cache.some(role => role.name === "Cisgender")) {
              interaction.member.roles.remove("940130181014761513")
            } else if (interaction.member.roles.cache.some(role => role.name === "Other Gender")) {
              interaction.member.roles.remove("940240745821007922")
            }

            interaction.member.roles.add("900149792930406400");
          case ("Gender Fluid"):
            if (interaction.member.roles.cache.some(role => role.name === "Boy")) {
              interaction.member.roles.remove("900149879089815604")
            } else if (interaction.member.roles.cache.some(role => role.name === "Girl")) {
              interaction.member.roles.remove("900149792930406400")
            } else if (interaction.member.roles.cache.some(role => role.name === "Trans")) {
              interaction.member.roles.remove("940126702389039164")
            } else if (interaction.member.roles.cache.some(role => role.name === "Agender")) {
              interaction.member.roles.remove("940130071249829969")
            } else if (interaction.member.roles.cache.some(role => role.name === "Non-Binary")) {
              interaction.member.roles.remove("940130130225950720")
            } else if (interaction.member.roles.cache.some(role => role.name === "Cisgender")) {
              interaction.member.roles.remove("940130181014761513")
            } else if (interaction.member.roles.cache.some(role => role.name === "Other Gender")) {
              interaction.member.roles.remove("940240745821007922")
            }

            interaction.member.roles.add("900769520111734835");
          case ("Trans"):
            if (interaction.member.roles.cache.some(role => role.name === "Boy")) {
              interaction.member.roles.remove("900149879089815604")
            } else if (interaction.member.roles.cache.some(role => role.name === "Girl")) {
              interaction.member.roles.remove("900149792930406400")
            } else if (interaction.member.roles.cache.some(role => role.name === "Gender Fluid")) {
              interaction.member.roles.remove("900769520111734835")
            } else if (interaction.member.roles.cache.some(role => role.name === "Agender")) {
              interaction.member.roles.remove("940130071249829969")
            } else if (interaction.member.roles.cache.some(role => role.name === "Non-Binary")) {
              interaction.member.roles.remove("940130130225950720")
            } else if (interaction.member.roles.cache.some(role => role.name === "Cisgender")) {
              interaction.member.roles.remove("940130181014761513")
            } else if (interaction.member.roles.cache.some(role => role.name === "Other Gender")) {
              interaction.member.roles.remove("940240745821007922")
            }

            interaction.member.roles.add("940126702389039164");
          case ("Agender"):
            if (interaction.member.roles.cache.some(role => role.name === "Boy")) {
              interaction.member.roles.remove("900149879089815604")
            } else if (interaction.member.roles.cache.some(role => role.name === "Girl")) {
              interaction.member.roles.remove("900149792930406400")
            } else if (interaction.member.roles.cache.some(role => role.name === "Trans")) {
              interaction.member.roles.remove("940126702389039164")
            } else if (interaction.member.roles.cache.some(role => role.name === "Gender Fluid")) {
              interaction.member.roles.remove("900769520111734835")
            } else if (interaction.member.roles.cache.some(role => role.name === "Non-Binary")) {
              interaction.member.roles.remove("940130130225950720")
            } else if (interaction.member.roles.cache.some(role => role.name === "Cisgender")) {
              interaction.member.roles.remove("940130181014761513")
            } else if (interaction.member.roles.cache.some(role => role.name === "Other Gender")) {
              interaction.member.roles.remove("940240745821007922")
            }

            interaction.member.roles.add("940130071249829969");
          case ("Non-Binary"):
            if (interaction.member.roles.cache.some(role => role.name === "Boy")) {
              interaction.member.roles.remove("900149879089815604")
            } else if (interaction.member.roles.cache.some(role => role.name === "Girl")) {
              interaction.member.roles.remove("900149792930406400")
            } else if (interaction.member.roles.cache.some(role => role.name === "Trans")) {
              interaction.member.roles.remove("940126702389039164")
            } else if (interaction.member.roles.cache.some(role => role.name === "Agender")) {
              interaction.member.roles.remove("940130071249829969")
            } else if (interaction.member.roles.cache.some(role => role.name === "Gender Fluid")) {
              interaction.member.roles.remove("900769520111734835")
            } else if (interaction.member.roles.cache.some(role => role.name === "Cisgender")) {
              interaction.member.roles.remove("940130181014761513")
            } else if (interaction.member.roles.cache.some(role => role.name === "Other Gender")) {
              interaction.member.roles.remove("940240745821007922")
            }

            interaction.member.roles.add("940130130225950720");
          case ("Cisgender"):
            if (interaction.member.roles.cache.some(role => role.name === "Boy")) {
              interaction.member.roles.remove("900149879089815604")
            } else if (interaction.member.roles.cache.some(role => role.name === "Girl")) {
              interaction.member.roles.remove("900149792930406400")
            } else if (interaction.member.roles.cache.some(role => role.name === "Trans")) {
              interaction.member.roles.remove("940126702389039164")
            } else if (interaction.member.roles.cache.some(role => role.name === "Agender")) {
              interaction.member.roles.remove("940130071249829969")
            } else if (interaction.member.roles.cache.some(role => role.name === "Non-Binary")) {
              interaction.member.roles.remove("940130130225950720")
            } else if (interaction.member.roles.cache.some(role => role.name === "Gender Fluid")) {
              interaction.member.roles.remove("900769520111734835")
            } else if (interaction.member.roles.cache.some(role => role.name === "Other Gender")) {
              interaction.member.roles.remove("940240745821007922")
            }

            interaction.member.roles.add("940130181014761513");
          case ("Other Gender"):
            if (interaction.member.roles.cache.some(role => role.name === "Boy")) {
              interaction.member.roles.remove("900149879089815604")
            } else if (interaction.member.roles.cache.some(role => role.name === "Girl")) {
              interaction.member.roles.remove("900149792930406400")
            } else if (interaction.member.roles.cache.some(role => role.name === "Trans")) {
              interaction.member.roles.remove("940126702389039164")
            } else if (interaction.member.roles.cache.some(role => role.name === "Agender")) {
              interaction.member.roles.remove("940130071249829969")
            } else if (interaction.member.roles.cache.some(role => role.name === "Non-Binary")) {
              interaction.member.roles.remove("940130130225950720")
            } else if (interaction.member.roles.cache.some(role => role.name === "Cisgender")) {
              interaction.member.roles.remove("940130181014761513")
            } else if (interaction.member.roles.cache.some(role => role.name === "Gender Fluid")) {
              interaction.member.roles.remove("900769520111734835")
            }

            interaction.member.roles.add("940240745821007922");
        };

        break;
      case ("roleMenu3"):
        await interaction.deferUpdate();

        if (args == "They/Them") {
          if (interaction.member.roles.cache.some(role => role.name === "He/Him")) {
            interaction.member.roles.remove("940251047174238218")
          } else if (interaction.member.roles.cache.some(role => role.name === "She/Her")) {
            interaction.member.roles.remove("940250894203764786")
          } else if (interaction.member.roles.cache.some(role => role.name === "Other Pronouns")) {
            interaction.member.roles.remove("940251221292363806")
          }

          interaction.member.roles.add("940251105118523452")
        } else if (args == "He/Him") {
          if (interaction.member.roles.cache.some(role => role.name === "They/Them")) {
            interaction.member.roles.remove("940251105118523452")
          } else if (interaction.member.roles.cache.some(role => role.name === "She/Her")) {
            interaction.member.roles.remove("940250894203764786")
          } else if (interaction.member.roles.cache.some(role => role.name === "Other Pronouns")) {
            interaction.member.roles.remove("940251221292363806")
          }

          interaction.member.roles.add("940251047174238218")
        } else if (args == "She/Her") {
          if (interaction.member.roles.cache.some(role => role.name === "He/Him")) {
            interaction.member.roles.remove("940251047174238218")
          } else if (interaction.member.roles.cache.some(role => role.name === "They/Them")) {
            interaction.member.roles.remove("940251105118523452")
          } else if (interaction.member.roles.cache.some(role => role.name === "Other Pronouns")) {
            interaction.member.roles.remove("940251221292363806")
          }

          interaction.member.roles.add("940250894203764786")
        } else if (args == "Other Pronouns") {
          if (interaction.member.roles.cache.some(role => role.name === "He/Him")) {
            interaction.member.roles.remove("940251047174238218")
          } else if (interaction.member.roles.cache.some(role => role.name === "She/Her")) {
            interaction.member.roles.remove("940250894203764786")
          } else if (interaction.member.roles.cache.some(role => role.name === "They/Them")) {
            interaction.member.roles.remove("940251105118523452")
          }

          interaction.member.roles.add("940251221292363806")
        }

        break;
      case ("roleMenu4"):
        await interaction.deferUpdate();

        if (args == "Single") {
          if (interaction.member.roles.cache.some(role => role.name === "Taken")) {
            interaction.member.roles.remove("940274020706844693")
          }

          return interaction.member.roles.add("940274055339192390")
        } else if (args == "Taken") {
          if (interaction.member.roles.cache.some(role => role.name === "Single")) {
            interaction.member.roles.remove("940274055339192390")
          }

          return interaction.member.roles.add("940274020706844693")
        } else if (args == "Looking") {
          if (interaction.member.roles.cache.some(role => role.name === "Not Looking")) {
            interaction.member.roles.remove("940273975295111218")
          }

          return interaction.member.roles.add("940273816066732083")
        } else if (args == "Not Looking") {
          if (interaction.member.roles.cache.some(role => role.name === "Looking")) {
            interaction.member.roles.remove("940273816066732083")
          }

          return interaction.member.roles.add("940273975295111218")
        }

        break;
      case ("roleMenu5"):
        await interaction.deferUpdate();

        if (args == "Straight") {
          if (interaction.member.roles.cache.some(role => role.name === "Gay")) {
            interaction.member.roles.remove("931040829961822218")
          } else if (interaction.member.roles.cache.some(role => role.name === "Lesbian")) {
            interaction.member.roles.remove("993914756232654868")
          } else if (interaction.member.roles.cache.some(role => role.name === "Bisexual")) {
            interaction.member.roles.remove("931040851973517332")
          } else if (interaction.member.roles.cache.some(role => role.name === "Pansexual")) {
            interaction.member.roles.remove("931041941003575306")
          } else if (interaction.member.roles.cache.some(role => role.name === "Asexual")) {
            interaction.member.roles.remove("931041656671711253")
          } else if (interaction.member.roles.cache.some(role => role.name === "Aromantic")) {
            interaction.member.roles.remove("940127204002648094")
          } else if (interaction.member.roles.cache.some(role => role.name === "Other Orientation")) {
            interaction.member.roles.remove("940128332740198410")
          }

          interaction.member.roles.add("931040779277860954")
        } else if (args == "Gay") {
          if (interaction.member.roles.cache.some(role => role.name === "Straight")) {
            interaction.member.roles.remove("931040779277860954")
          } else if (interaction.member.roles.cache.some(role => role.name === "Lesbian")) {
            interaction.member.roles.remove("993914756232654868")
          } else if (interaction.member.roles.cache.some(role => role.name === "Bisexual")) {
            interaction.member.roles.remove("931040851973517332")
          } else if (interaction.member.roles.cache.some(role => role.name === "Pansexual")) {
            interaction.member.roles.remove("931041941003575306")
          } else if (interaction.member.roles.cache.some(role => role.name === "Asexual")) {
            interaction.member.roles.remove("931041656671711253")
          } else if (interaction.member.roles.cache.some(role => role.name === "Aromantic")) {
            interaction.member.roles.remove("940127204002648094")
          } else if (interaction.member.roles.cache.some(role => role.name === "Other Orientation")) {
            interaction.member.roles.remove("940128332740198410")
          }

          interaction.member.roles.add("931040829961822218")
        } else if (args == "Lesbian") {
          if (interaction.member.roles.cache.some(role => role.name === "Straight")) {
            interaction.member.roles.remove("931040779277860954")
          } else if (interaction.member.roles.cache.some(role => role.name === "Gay")) {
            interaction.member.roles.remove("931040829961822218")
          } else if (interaction.member.roles.cache.some(role => role.name === "Bisexual")) {
            interaction.member.roles.remove("931040851973517332")
          } else if (interaction.member.roles.cache.some(role => role.name === "Pansexual")) {
            interaction.member.roles.remove("931041941003575306")
          } else if (interaction.member.roles.cache.some(role => role.name === "Asexual")) {
            interaction.member.roles.remove("931041656671711253")
          } else if (interaction.member.roles.cache.some(role => role.name === "Aromantic")) {
            interaction.member.roles.remove("940127204002648094")
          } else if (interaction.member.roles.cache.some(role => role.name === "Other Orientation")) {
            interaction.member.roles.remove("940128332740198410")
          }

          interaction.member.roles.add("993914756232654868")
        } else if (args == "Bisexual") {
          if (interaction.member.roles.cache.some(role => role.name === "Straight")) {
            interaction.member.roles.remove("931040779277860954")
          } else if (interaction.member.roles.cache.some(role => role.name === "Gay")) {
            interaction.member.roles.remove("931040829961822218")
          } else if (interaction.member.roles.cache.some(role => role.name === "Lesbian")) {
            interaction.member.roles.remove("993914756232654868")
          } else if (interaction.member.roles.cache.some(role => role.name === "Pansexual")) {
            interaction.member.roles.remove("931041941003575306")
          } else if (interaction.member.roles.cache.some(role => role.name === "Asexual")) {
            interaction.member.roles.remove("931041656671711253")
          } else if (interaction.member.roles.cache.some(role => role.name === "Aromantic")) {
            interaction.member.roles.remove("940127204002648094")
          } else if (interaction.member.roles.cache.some(role => role.name === "Other Orientation")) {
            interaction.member.roles.remove("940128332740198410")
          }

          interaction.member.roles.add("931040851973517332")
        } else if (args == "Pansexual") {
          if (interaction.member.roles.cache.some(role => role.name === "Straight")) {
            interaction.member.roles.remove("931040779277860954")
          } else if (interaction.member.roles.cache.some(role => role.name === "Gay")) {
            interaction.member.roles.remove("931040829961822218")
          } else if (interaction.member.roles.cache.some(role => role.name === "Lesbian")) {
            interaction.member.roles.remove("993914756232654868")
          } else if (interaction.member.roles.cache.some(role => role.name === "Bisexual")) {
            interaction.member.roles.remove("931040851973517332")
          } else if (interaction.member.roles.cache.some(role => role.name === "Asexual")) {
            interaction.member.roles.remove("931041656671711253")
          } else if (interaction.member.roles.cache.some(role => role.name === "Aromantic")) {
            interaction.member.roles.remove("940127204002648094")
          } else if (interaction.member.roles.cache.some(role => role.name === "Other Orientation")) {
            interaction.member.roles.remove("940128332740198410")
          }

          interaction.member.roles.add("931041941003575306")
        } else if (args == "Asexual") {
          if (interaction.member.roles.cache.some(role => role.name === "Straight")) {
            interaction.member.roles.remove("931040779277860954")
          } else if (interaction.member.roles.cache.some(role => role.name === "Gay")) {
            interaction.member.roles.remove("931040829961822218")
          } else if (interaction.member.roles.cache.some(role => role.name === "Lesbian")) {
            interaction.member.roles.remove("993914756232654868")
          } else if (interaction.member.roles.cache.some(role => role.name === "Bisexual")) {
            interaction.member.roles.remove("931040851973517332")
          } else if (interaction.member.roles.cache.some(role => role.name === "Pansexual")) {
            interaction.member.roles.remove("931041941003575306")
          } else if (interaction.member.roles.cache.some(role => role.name === "Aromantic")) {
            interaction.member.roles.remove("940127204002648094")
          } else if (interaction.member.roles.cache.some(role => role.name === "Other Orientation")) {
            interaction.member.roles.remove("940128332740198410")
          }

          interaction.member.roles.add("931041656671711253")
        } else if (args == "Aromantic") {
          if (interaction.member.roles.cache.some(role => role.name === "Straight")) {
            interaction.member.roles.remove("931040779277860954")
          } else if (interaction.member.roles.cache.some(role => role.name === "Gay")) {
            interaction.member.roles.remove("931040829961822218")
          } else if (interaction.member.roles.cache.some(role => role.name === "Lesbian")) {
            interaction.member.roles.remove("993914756232654868")
          } else if (interaction.member.roles.cache.some(role => role.name === "Bisexual")) {
            interaction.member.roles.remove("931040851973517332")
          } else if (interaction.member.roles.cache.some(role => role.name === "Pansexual")) {
            interaction.member.roles.remove("931041941003575306")
          } else if (interaction.member.roles.cache.some(role => role.name === "Asexual")) {
            interaction.member.roles.remove("931041656671711253")
          } else if (interaction.member.roles.cache.some(role => role.name === "Other Orientation")) {
            interaction.member.roles.remove("940128332740198410")
          }

          interaction.member.roles.add("940127204002648094")
        } else if (args == "Polyamorous") {
          interaction.member.roles.add("940128299173154826")
        } else if (args == "Other Orientation") {
          if (interaction.member.roles.cache.some(role => role.name === "Straight")) {
            interaction.member.roles.remove("931040779277860954")
          } else if (interaction.member.roles.cache.some(role => role.name === "Gay")) {
            interaction.member.roles.remove("931040829961822218")
          } else if (interaction.member.roles.cache.some(role => role.name === "Lesbian")) {
            interaction.member.roles.remove("993914756232654868")
          } else if (interaction.member.roles.cache.some(role => role.name === "Bisexual")) {
            interaction.member.roles.remove("931040851973517332")
          } else if (interaction.member.roles.cache.some(role => role.name === "Pansexual")) {
            interaction.member.roles.remove("931041941003575306")
          } else if (interaction.member.roles.cache.some(role => role.name === "Asexual")) {
            interaction.member.roles.remove("931041656671711253")
          } else if (interaction.member.roles.cache.some(role => role.name === "Aromantic")) {
            interaction.member.roles.remove("940127204002648094")
          }

          interaction.member.roles.add("940128332740198410")
        }

        break;
      case ("roleMenu6"):
        await interaction.deferUpdate();

        if (args == "Open DM") {
          if (interaction.member.roles.cache.some(role => role.name === "Important DM Only")) {
            interaction.member.roles.remove("940273628669411348")
          } else if (interaction.member.roles.cache.some(role => role.name === "Closed DM")) {
            interaction.member.roles.remove("940273602983526481")
          }

          interaction.member.roles.add("940273578769801226")
        } else if (args == "Important DM Only") {
          if (interaction.member.roles.cache.some(role => role.name === "Open DM")) {
            interaction.member.roles.remove("940273578769801226")
          } else if (interaction.member.roles.cache.some(role => role.name === "Closed DM")) {
            interaction.member.roles.remove("940273602983526481")
          }

          interaction.member.roles.add("940273628669411348")
        } else if (args == "Closed DM") {
          if (interaction.member.roles.cache.some(role => role.name === "Open DM")) {
            interaction.member.roles.remove("940273578769801226")
          } else if (interaction.member.roles.cache.some(role => role.name === "Important DM Only")) {
            interaction.member.roles.remove("940273628669411348")
          }

          interaction.member.roles.add("940273602983526481")
        }

        break;
      case ("roleMenu7"):
        await interaction.deferUpdate();

        if (args == "Furry") {
          if (interaction.member.roles.cache.some(role => role.name === "Not a Furry")) {
            interaction.member.roles.remove("940244795811594270")
          }

          interaction.member.roles.add("923054477735522304")
        } else if (args == "Not a Furry") {
          if (interaction.member.roles.cache.some(role => role.name === "Furry")) {
            interaction.member.roles.remove("923054477735522304")
          }

          interaction.member.roles.add("940244795811594270")
        }

        break;
      case ("roleMenu8"):
        await interaction.deferUpdate();

        if (args == "VRChat Access") {
          interaction.member.roles.add("922968520847945768")
        } else if (args == "VRChat LFP") {
          interaction.member.roles.add("984908404390776833")
        } else if (args == "Minecraft Access") {
          interaction.member.roles.add("979570914108801035")
        }

        break;
      case ("roleMenu9"):
        await interaction.deferUpdate();

        if (args == "All") {
          if (interaction.member.roles.cache.some(role => role.name === "All")) {
            return interaction.member.roles.remove('940658136048603176')
          } else {
            return interaction.member.roles.add("940658136048603176")
          }
        } else if (args == "Announcement") {
          if (interaction.member.roles.cache.some(role => role.name === "Announcement")) {
            return interaction.member.roles.remove('940658199411949600')
          } else {
            return interaction.member.roles.add("940658199411949600")
          }
        } else if (args == "Giveaway") {
          if (interaction.member.roles.cache.some(role => role.name === "Giveaway")) {
            return interaction.member.roles.remove('940664575659999284')
          } else {
            return interaction.member.roles.add("940664575659999284")
          }
        } else if (args === "Partnership") {
          if (interaction.member.roles.cache.some(role => role.name === "Partnership")) {
            return interaction.member.roles.remove('943956163840577537')
          } else {
            return interaction.member.roles.add("943956163840577537")
          }
        } else if (args === "Bump") {
          if (interaction.member.roles.cache.some(role => role.name === "Bump")) {
            return interaction.member.roles.remove('940658171867959317')
          } else {
            return interaction.member.roles.add("940658171867959317")
          }
        } else if (args === "Events") {
          if (interaction.member.roles.cache.some(role => role.name === "Events")) {
            return interaction.member.roles.remove('950406476365705227')
          } else {
            return interaction.member.roles.add("950406476365705227")
          }
        } else if (args === "Dead Chat") {
          if (interaction.member.roles.cache.some(role => role.name === "Dead Chat")) {
            return interaction.member.roles.remove('945731050888392716')
          } else {
            return interaction.member.roles.add("945731050888392716")
          }
        } else if (args === "Nitro Drop") {
          if (interaction.member.roles.cache.some(role => role.name === "Nitro Drop")) {
            return interaction.member.roles.remove('956565030604771389')
          } else {
            return interaction.member.roles.add("956565030604771389")
          }
        }

        break;
      case ("reasonDeny"):
        let VerificationLog = await Verification.findOne({ where: { MessageID: interaction.message.id } });
        const MessageToUpdate = VerificationLog.MessageID;

        if (interaction.guild.id === "815422069234860073") {

          const verificationEmbedDenied = new MessageEmbed()
            .addField("**__How did you find our server?__**", VerificationLog.HowServerData)
            .addField("**__Why are you joining us?__**", VerificationLog.JoiningData)
            .addField("**__What do you think about the furry fandom?__**", VerificationLog.FurryFandomData)
            .setColor("FF0000")
            .setTimestamp()

          let verificationDeleteLog = await Verification.destroy({ where: { MessageID: interaction.message.id } });

          switch (args) {
            case ("noDetails"):
              interaction.channel.messages.fetch(MessageToUpdate).then(async (UpdateMessage) => {
                await interaction.update({
                  content: "<@&852950515389169714> | Verification from <@" + VerificationLog.UserID + "> denied by <@" + interaction.user.id + ">",
                  embeds: [verificationEmbedDenied],
                  components: [],
                })
              });

              return bot.users.cache.get(VerificationLog.UserID).send({
                content: "Your verification has been denied.\n\n*Reason: You did not put enough details.*",
              });
            case ("troll"):
              interaction.channel.messages.fetch(MessageToUpdate).then(async (UpdateMessage) => {
                await interaction.update({
                  content: "<@&852950515389169714> | Verification from <@" + VerificationLog.UserID + "> denied by <@" + interaction.user.id + ">",
                  embeds: [verificationEmbedDenied],
                  components: [],
                })
              });

              return bot.users.cache.get(VerificationLog.UserID).send({
                content: "Your verification has been denied.\n\n*Reason: You've been flagged for trolling.*",
              }).catch(() => {
                return;
              });
          }

        } else {
          const verificationEmbedDenied = new MessageEmbed()
            .addField("**__Age__**", VerificationLog.AgeData)
            .addField("**__How did you find our server?__**", VerificationLog.HowServerData)
            .addField("**__Why are you joining us?__**", VerificationLog.JoiningData)
            .addField("**__What do you think about the furry fandom?__**", VerificationLog.FurryFandomData)
            .addField("**__Do you have any sona? Tell us about it__**", VerificationLog.SonaData)
            .setColor("FF0000")
            .setTimestamp()

          const args = interaction.values[0]
          let verificationDeleteLog = await Verification.destroy({ where: { MessageID: interaction.message.id } });

          switch (args) {
            case ("noDetails"):
              interaction.channel.messages.fetch(MessageToUpdate).then(async (UpdateMessage) => {
                await interaction.update({
                  content: "<@&931038287114678334> | Verification from <@" + VerificationLog.UserID + "> denied by <@" + interaction.user.id + ">",
                  embeds: [verificationEmbedDenied],
                  components: [],
                })
              });

              return bot.users.cache.get(VerificationLog.UserID).send({
                content: "Your verification has been denied.\n\n*Reason: You did not put enough details.*",
              });
            case ("troll"):
              interaction.channel.messages.fetch(MessageToUpdate).then(async (UpdateMessage) => {
                await interaction.update({
                  content: "<@&931038287114678334> | Verification from <@" + VerificationLog.UserID + "> denied by <@" + interaction.user.id + ">",
                  embeds: [verificationEmbedDenied],
                  components: [],
                })
              });

              return bot.users.cache.get(VerificationLog.UserID).send({
                content: "Your verification has been denied.\n\n*Reason: You've been flagged for trolling.*",
              }).catch(() => {
                return;
              });
          }
        };
    }
  }
});

bot.login(token);