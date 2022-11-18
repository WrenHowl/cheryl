const { Client, Intents, MessageEmbed, Collection, MessageActionRow, Modal, MessageButton, TextInputComponent, MessageSelectMenu, Message } = require("discord.js");
const fs = require("node:fs");
const path = require('node:path');
const Sequelize = require('sequelize');
const moment = require("moment");
const Config = require("./config/config.json");
const MessageConfig = require("./config/message.json");
const Color = require("./config/color.json");
const bot = new Client({
  allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
  intents: [Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS],
  partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
const { ImgurClient } = require('imgur');

const dateTime = new Date();
const client = new ImgurClient({ clientId: Config.ImgurID });

let prefix = Config.secondPrefix;

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
  Proof: {
    type: Sequelize.STRING,
    unique: false,
  },
  Risk: {
    type: Sequelize.STRING,
    unique: false,
  },
});
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
  ChannelIDWelcome: {
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
  ChannelIDUnban: {
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
  AutoBanStatus: {
    type: Sequelize.STRING,
    unique: false,
  },
  SettingsActionMessage: {
    type: Sequelize.STRING,
    unique: false,
  },
  SettingsActionImage: {
    type: Sequelize.STRING,
    unique: false,
  },
  AutoRole: {
    type: Sequelize.STRING,
    unique: false,
  },
  ChannelIDLeaving: {
    type: Sequelize.STRING,
    unique: false,
  },
});
const Permission = sequelize.define("Permission", {
  UserID: {
    type: Sequelize.STRING,
  }
});

const Warns = sequelize.define("Warns")
const Profile = sequelize.define("Profile")
const CommandFunction = sequelize.define("CommandFunction")

bot.once("ready", async () => {
  bot.user.setStatus("dnd")

  let counter = 0;

  setInterval(async function () {
    const MemberCount = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
    const AllServers = bot.guilds.cache.size;
    let Blacklisted = await Blacklist.findAll({ attributes: ['UserID'] });

    const Status = [
      MemberCount + " Members!",
      AllServers + " Servers!",
      Blacklisted.length + " Blacklisted Users!",
    ]

    if (counter === Status.length) counter = 0;
    const StatusChange = Status[counter];

    bot.user.setPresence({ activities: [{ type: "WATCHING", name: StatusChange }] });

    counter++;
  }, 5000)

  setInterval(function () {
    Verification_Count.sync();
    Verifier.sync();
    Verification.sync();
    Blacklist.sync();
    Warns.sync();
    Logging.sync();
    ActionImage.sync();
    Permission.sync();
    Profile.sync();
    CommandFunction.sync();
  }, 5000);

  bot.guilds.cache.forEach(async (guild) => {
    const LoggingData = await Logging.findOne({ where: { GuildID: guild.id } });

    if (!LoggingData) {
      await Logging.create({
        GuildID: guild.id,
      });
    };
  });

  return console.log(dateTime.toLocaleString() + " -> The bot is ready!");
});

bot.on("guildMemberAdd", async (NewMember) => {
  const LoggingData = await Logging.findOne({ where: { GuildID: NewMember.guild.id } });

  if (LoggingData) {
    if (LoggingData.ChannelIDWelcome) {
      if (NewMember.guild.members.guild.me.permissionsIn(LoggingData.ChannelIDWelcome).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) {
        const ChannelGuild = NewMember.guild.channels.cache.get(LoggingData.ChannelIDWelcome);
        const guild = bot.guilds.cache.get(NewMember.guild.id);
        var memberCount = guild.members.cache.filter(newMember => !newMember.user.bot).size;
        if (NewMember.user.bot) return;

        if (NewMember.guild.id === "821241527941726248") {
          await NewMember.roles.add("940140000916430848");
          await NewMember.roles.add("1000236020517834844");
          await NewMember.roles.add("1000236337900818533");
          await NewMember.roles.add("1001111992834211921");
        }

        const WelcomeMessage = new MessageEmbed()
          .setDescription("Welcome " + NewMember.toString() + "!")
          .addFields(
            { name: "Created At", value: "``" + moment(NewMember.user.createdAt).format("Do MMMM YYYY hh:ss:mm A") + "``" },
            { name: "Member Count", value: "``" + memberCount + "``" }
          )
          .setColor(Color.Green)
          .setThumbnail(NewMember.user.displayAvatarURL())
          .setFooter({
            text: "ID:" + NewMember.user.id
          })
          .setTimestamp()

        await ChannelGuild.send({
          embeds: [WelcomeMessage]
        });
      } else return;
    }
    if (LoggingData.AutoRole) {
      return NewMember.roles.add(LoggingData.AutoRole)
    }
  }

  const VerifBlacklist = await Blacklist.findOne({ where: { UserID: NewMember.user.id } })

  let MessageBlacklist = MessageConfig.Blacklist;

  if (VerifBlacklist) {
    if (LoggingData) {
      if (LoggingData.EnableDisableBlacklistLogger === "Enabled") {
        if (LoggingData.ChannelIDBlacklist) {
          if (NewMember.guild.members.guild.me.permissionsIn(LoggingData.ChannelIDBlacklist).has(['SEND_MESSAGES', 'VIEW_CHANNEL'])) {
            const ChannelToSendAt = await NewMember.guild.channels.fetch(LoggingData.ChannelIDBlacklist)

            if (VerifBlacklist.Risk === "Low") ColorEmbed = Color.RiskLow;
            if (VerifBlacklist.Risk === "Medium") ColorEmbed = Color.RiskMedium;
            if (VerifBlacklist.Risk === "High") ColorEmbed = Color.RiskHigh;

            const BlacklistedUserJoined = new MessageEmbed()
              .setTitle("<:BanHammer:997932635454197790> New Alert")
              .setDescription(MessageBlacklist.InstantBan)
              .addFields(
                { name: "User", value: NewMember.user.toString(), inline: true },
                { name: "Reason", value: "``" + VerifBlacklist.Reason + "``", inline: true },
                { name: "Evidence", value: VerifBlacklist.Proof + "** **", inline: true }
              )
              .setColor(ColorEmbed)
              .setFooter({
                text: "ID: " + NewMember.user.id
              })
              .setTimestamp()

            await ChannelToSendAt.send({ embeds: [BlacklistedUserJoined] })

            let AutoBanMessage = MessageBlacklist.AutoBanMessage;

            if (LoggingData.AutoBanStatus) {
              if (LoggingData.AutoBanStatus === "Disable") return;

              if (LoggingData.AutoBanStatus === "Low+") {
                if (VerifBlacklist.Risk === ["Low", "Medium", "High"]) {
                  return NewMember.guild.members.ban(VerifBlacklist.UserID, { reason: [VerifBlacklist.Reason + " | " + AutoBanMessage] });
                }
              } else if (LoggingData.AutoBanStatus === "Medium+") {
                if (VerifBlacklist.Risk === ["Medium", "High"]) {
                  return NewMember.guild.members.ban(VerifBlacklist.UserID, { reason: [VerifBlacklist.Reason + " | " + AutoBanMessage] });
                }
              } else if (LoggingData.AutoBanStatus === "High+") {
                if (VerifBlacklist.Risk === ["High"]) {
                  return NewMember.guild.members.ban(VerifBlacklist.UserID, { reason: [VerifBlacklist.Reason + " | " + AutoBanMessage] });
                }
              }
            };

            return;
          }
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
        .setDescription("Thank you " + NewMember.user.toString() + " for boosting **" + NewMember.guild.name + "** !")
        .setColor(Color.Pink)

      ChannelToSend.send({
        embeds: [NewBoost]
      })

      return NewMember.roles.add("1001111992834211921")
    }
    if (OldStatus && !NewStatus) {
      return NewMember.roles.remove("1001111992834211921")
    }
  }
});

bot.on("userUpdate", async (NewUser, OldUser) => {
  if (OldUser.username !== NewUser.username) {
    Verifier.update({ ModName: NewUser.tag }, { where: { ModID: NewUser.id } })
    Blacklist.update({ ModName: NewUser.tag }, { where: { ModID: NewUser.id } })
  }
  if (OldUser.discriminator !== NewUser.discriminator) {
    Verifier.update({ ModName: NewUser.tag }, { where: { ModID: NewUser.id } })
    Blacklist.update({ ModName: NewUser.tag }, { where: { ModID: NewUser.id } })
  }
});

bot.on("guildMemberRemove", async (LeavingMember) => {
  if (LeavingMember.guild.id === "821241527941726248") {
    const VerifierData = await Verifier.destroy({ where: { GuildID: LeavingMember.guild.id, VerifierID: LeavingMember.user.id } });
    const LoggingData = await Logging.findOne({ where: { GuildID: LeavingMember.guild.id } });
    const LogChannel = LeavingMember.guild.channels.cache.get("898366209827954718");

    VerifierData ? Status = "``Was Verified``" : Status = "``Wasn't Verified``";

    const LeavingMemberEmbed = new MessageEmbed()
      .setTitle("Member Left")
      .addFields(
        { name: "User", value: LeavingMember.user.tag },
        { name: "Created At", value: moment(LeavingMember.user.createdAt).format("Do MMMM YYYY hh:ss:mm A") },
        { name: "Joined At", value: moment(LeavingMember.joinedAt).format('Do MMMM YYYY hh:ss:mm A') },
      )
      .setColor(Color.Green)
      .setFooter(
        { text: LeavingMember.user.id }
      )
      .setThumbnail(LeavingMember.user.displayAvatarURL())

    if (LoggingData.ChannelIDVerify) {
      LeavingMemberEmbed.addFields(
        { name: "Status", value: Status }
      );
    };

    await LogChannel.send({
      embeds: [LeavingMemberEmbed]
    });
  }
  if (LeavingMember.guild.id === Config.guildId) {
    return Permission.destroy({ where: { UserID: LeavingMember.user.id } })
  }
});

bot.on("guildCreate", async (guild) => {
  const LoggingData = await Logging.findOne({ where: { GuildID: guild.id } });

  if (!LoggingData) {
    await Logging.create({
      GuildID: guild.id,
    });
  };

  const owner = await guild.fetchOwner();
  const BlacklistData = await Blacklist.findOne({ where: { UserID: owner.user.id } });

  BlacklistData ? Boo = "Yes" : Boo = "No";

  const NewGuild = new MessageEmbed()
    .setTitle("Bot Added")
    .addFields(
      { name: "Server Name", value: "``" + guild.name + "``", inline: true },
      { name: "Server ID", value: "``" + guild.id + "``", inline: true },
      { name: "Members", value: "``" + guild.memberCount + "``", inline: true },
      { name: "Owner Name", value: "``" + owner.user.tag + "``", inline: true },
      { name: "Owner ID", value: "``" + owner.user.id + "``", inline: true },
      { name: "Owner Blacklisted", value: "``" + Boo + "``", inline: true },
    )
    .setColor(Color.Green)

  let fetchGuild = guild.client.guilds.cache.get(Config.guildId);

  fetchGuild.channels.cache.get(Config.BotAdded).send({
    embeds: [NewGuild]
  });
});

bot.on("guildDelete", async (guild) => {
  const owner = await guild.fetchOwner();
  const BlacklistData = await Blacklist.findOne({ where: { UserID: owner.user.id } });

  BlacklistData ? Boo = "Yes" : Boo = "No";

  const NewGuild = new MessageEmbed()
    .setTitle("Bot Removed")
    .addFields(
      { name: "Server Name", value: "``" + guild.name + "``", inline: true },
      { name: "Server ID", value: "``" + guild.id + "``", inline: true },
      { name: "Members", value: "``" + guild.memberCount + "``", inline: true },
      { name: "Owner Name", value: "``" + owner.user.tag + "``", inline: true },
      { name: "Owner ID", value: "``" + owner.user.id + "``", inline: true },
      { name: "Owner Blacklisted", value: "``" + Boo + "``", inline: true },

    )
    .setColor(Color.RiskHigh)

  let fetchGuild = guild.client.guilds.cache.get(Config.guildId);

  fetchGuild.channels.cache.get(Config.BotRemoved).send({
    embeds: [NewGuild]
  });
});

bot.on("messageCreate", async (message) => {
  const LoggingData = await Logging.findOne({ where: { GuildID: message.guild.id } });

  if (LoggingData) {
    if (LoggingData.ChannelIDBump) {
      if (message.embeds.length >= 0) {
        let embed = message.embeds

        for (let i = 0; i < embed.length; i++) {
          if (embed[i].description === null) return;

          if (embed[i].description.toLowerCase().includes('Bump done!')) {
            return message.channel.send({
              content: "Thank you <@" + message.author.id + "> for bumping our server! We will remind you in 2 hours."
            })
          }
        }
      }
    }
  }

  if (message.author.bot || message.content.indexOf(prefix) !== 0) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  const fr = require("./languages/fr.json");
  const en = require("./languages/en.json");
  const de = require("./languages/de.json");
  const sp = require("./languages/sp.json");
  const nl = require("./languages/nl.json");

  switch (command) {
    case ("serverlist"):
      return bot.commands.get("serverlist").execute(bot, message, args, MessageEmbed);
    case ("cmd"):
      return bot.commands.get("cmd").execute(bot, message, args, MessageEmbed, sequelize, Sequelize);
    case (en.language.Name || fr.language.Name || de.language.Name || nl.language.Name || sp.language.Name):
      return bot.commands.get(en.language.Name).execute(bot, message, args, MessageEmbed, sequelize, Sequelize);
  }
});

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
  let LoggingData = await Logging.findOne({ where: { GuildID: interaction.guild.id } })

  if (interaction.isButton()) {
    let VerificationLog = await Verification.findOne({ where: { MessageID: interaction.message.id } });
    let ActionImageData = await ActionImage.findOne({ where: { MessageID: interaction.message.id } });
    let guild = bot.guilds.cache.get(interaction.guild.id);

    switch (interaction.customId) {
      case ("buttonToVerify"):
        if (!interaction.member.roles.cache.some(role => role.id === LoggingData.RoleToAddVerify)) {
          const ModalVerification = new Modal()
            .setCustomId('verificationModal')
            .setTitle('Verification');

          const ageOption = new TextInputComponent()
            .setCustomId('ageVerify')
            .setLabel("Age")
            .setStyle('SHORT')
            .setRequired();

          const howServerOption = new TextInputComponent()
            .setCustomId('howServer')
            .setLabel("How did you find our server?")
            .setPlaceholder("If it was a website, what website? If it was a friend, what friend?")
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
        };
      case ("buttonToAcceptVerify"):
        if (VerificationLog) {
          if (!guild.members.cache.find(m => m.id === VerificationLog.UserID)?.id) {
            interaction.channel.messages.fetch(interaction.message.id).then(async (UpdateMessage) => {
              const verificationEmbedAccepted = new MessageEmbed()
                .addFields(
                  { name: "Age", value: VerificationLog.AgeData },
                  { name: "How did you find our server?", value: VerificationLog.HowServerData },
                  { name: "Why are you joining us?", value: VerificationLog.JoiningData },
                  { name: "What do you think about the furry fandom?", value: VerificationLog.FurryFandomData },
                  { name: "Do you have any sona? Tell us about it.", value: VerificationLog.SonaData },
                )
                .setColor(Color.Gray)
                .setTimestamp()

              await interaction.update({
                content: "<@&" + LoggingData.StaffRoleVerify + "> | Verification from <@" + VerificationLog.UserID + "> canceled",
                embeds: [verificationEmbedAccepted],
                components: [],
              })

              return Verification.destroy({ where: { MessageID: interaction.message.id } });
            })
          } else {
            switch (!interaction.guild.me.permissions.has) {
              case ("MANAGE_ROLES"):
                return interaction.reply({
                  content: "Missing permission: MANAGE_ROLES",
                });
            };

            const member = interaction.guild.members.cache.get(VerificationLog.UserID)

            await Verification_Count.update({ ModName: interaction.user.tag }, { where: { ModID: interaction.user.id } })

            await member.roles.add(LoggingData.RoleToAddVerify);

            if (LoggingData.RoleToRemoveVerify) {
              await member.roles.remove(LoggingData.RoleToRemoveVerify);
            };

            const generalMessage = interaction.guild.channels.cache.get(LoggingData.ChannelIDVerify);

            interaction.channel.messages.fetch(interaction.message.id).then(async () => {
              const verificationEmbedAccepted = new MessageEmbed()
                .addFields(
                  { name: "Age", value: VerificationLog.AgeData },
                  { name: "How did you find our server?", value: VerificationLog.HowServerData },
                  { name: "Why are you joining us?", value: VerificationLog.JoiningData },
                  { name: "What do you think about the furry fandom?", value: VerificationLog.FurryFandomData },
                  { name: "Do you have any sona? Tell us about it.", value: VerificationLog.SonaData },
                )
                .setColor(Color.Green)
                .setTimestamp()

              await interaction.update({
                content: "<@&" + LoggingData.StaffRoleVerify + "> | Verification from <@" + VerificationLog.UserID + "> accepted by " + interaction.user.toString(),
                embeds: [verificationEmbedAccepted],
                components: [],
              });
            });

            await generalMessage.send({ content: "Welcome <@" + VerificationLog.UserID + "> to **" + interaction.guild.name + "**!" });

            const Verification_CountData = await Verification_Count.findOne({ where: { ModID: interaction.user.id, GuildID: interaction.guild.id } });

            if (Verification_CountData) {
              if (Verification_CountData.GuildID === interaction.guild.id) {
                await Verification_CountData.increment('Usage_Count');
              };
            } else {
              await Verification_Count.create({
                ModID: interaction.user.id,
                ModName: interaction.user.tag,
                GuildID: interaction.guild.id,
              });
            };

            await Verifier.create({
              VerifierName: VerificationLog.UserName,
              VerifierID: VerificationLog.UserID,
              ModName: interaction.user.tag,
              ModID: interaction.user.id,
              GuildID: interaction.guild.id,
            });

            return Verification.destroy({ where: { MessageID: interaction.message.id } });
          }
        };

        break;
      case ("buttonToDenyVerify"):
        if (VerificationLog) {
          if (!guild.members.cache.find(m => m.id === VerificationLog.UserID)?.id) {
            interaction.channel.messages.fetch(interaction.message.id).then(async () => {
              const verificationEmbedAccepted = new MessageEmbed()
                .addFields(
                  { name: "Age", value: VerificationLog.AgeData },
                  { name: "How did you find our server?", value: VerificationLog.HowServerData },
                  { name: "Why are you joining us?", value: VerificationLog.JoiningData },
                  { name: "What do you think about the furry fandom?", value: VerificationLog.FurryFandomData },
                  { name: "Do you have any sona? Tell us about it", value: VerificationLog.SonaData },
                )
                .setColor(Color.Gray)
                .setTimestamp()

              return interaction.update({
                content: "<@&" + LoggingData.StaffRoleVerify + "> | Verification from <@" + VerificationLog.UserID + "> canceled",
                embeds: [verificationEmbedAccepted],
                components: [],
              })
            })
          } else {
            interaction.channel.messages.fetch(interaction.message.id).then(async () => {
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
                      {
                        label: 'New Account',
                        value: 'new',
                      },
                      {
                        label: 'To Young',
                        value: 'young',
                      },
                    ),
                );

              const verificationEmbedDenied = new MessageEmbed()
                .addFields(
                  { name: "Age", value: VerificationLog.AgeData },
                  { name: "How did you find our server?", value: VerificationLog.HowServerData },
                  { name: "Why are you joining us?", value: VerificationLog.JoiningData },
                  { name: "What do you think about the furry fandom?", value: VerificationLog.FurryFandomData },
                  { name: "Do you have any sona? Tell us about it", value: VerificationLog.SonaData },
                )
                .setColor(Color.RiskHigh)
                .setTimestamp()

              return interaction.update({
                content: "<@&" + LoggingData.StaffRoleVerify + "> | Verification from <@" + VerificationLog.UserID + "> denied by " + interaction.user.toString(),
                embeds: [verificationEmbedDenied],
                components: [reasonDeny],
              })
            });
          }
        };

        break;
      case ("AcceptSuggestion"):
        if (ActionImageData) {
          if (!ActionImageData.MessageID) {
            return interaction.reply({
              content: MessageConfig.CannotFindDataOfMessage,
              ephemeral: true
            });
          };

          interaction.channel.messages.fetch(interaction.message.id).then(async () => {
            const ImageEmbed = new MessageEmbed()
              .addFields(
                { name: "Category:", value: ActionImageData.Category, inline: true },
                { name: "Author:", value: ActionImageData.UserName + " ``(" + ActionImageData.UserID + ")``", inline: true }
              )
              .setImage(ActionImageData.ImageURL)
              .setColor(Color.Green)

            return interaction.update({
              embeds: [ImageEmbed],
              components: []
            });
          });

          const response = await client.upload({
            image: ActionImageData.ImageURL,
          });

          return ActionImage.update({ ImageURL: response.data.link }, { where: { MessageID: interaction.message.id } });

        };

        break;
      case ("DenySuggestion"):
        if (ActionImageData) {
          if (!ActionImageData.MessageID) {
            return interaction.reply({
              content: MessageConfig.CannotFindDataOfMessage,
              ephemeral: true
            });
          };

          interaction.channel.messages.fetch(interaction.message.id).then(async () => {
            const ImageEmbed = new MessageEmbed()
              .addFields(
                { name: "Category:", value: ActionImageData.Category, inline: true },
                { name: "Author:", value: ActionImageData.UserName + " ``(" + ActionImageData.UserID + ")``", inline: true }
              )
              .setImage(ActionImageData.ImageURL)
              .setColor(Color.RiskHigh)

            return interaction.update({
              embeds: [ImageEmbed],
              components: []
            })
          })

          return ActionImage.destroy({ where: { MessageID: interaction.message.id } });
        };

        break;
    }
  }

  if (interaction.isModalSubmit()) {
    switch (interaction.customId) {
      case ("verificationModal"):
        let VerificationData = await Verification.findOne({ where: { UserID: interaction.user.id } });

        if (VerificationData) {
          return interaction.reply({
            content: MessageConfig.AlreadyWaitingVerification,
            ephemeral: true
          })
        }

        const channelForVerification = interaction.guild.channels.cache.get(LoggingData.ChannelIDReceiveVerification);

        let ageVerify = interaction.fields.getTextInputValue('ageVerify');
        let howServer = interaction.fields.getTextInputValue('howServer');
        let joining = interaction.fields.getTextInputValue('joining');
        let furryFandom = interaction.fields.getTextInputValue('furryFandom');
        let sona = interaction.fields.getTextInputValue('sona');

        if (!ageVerify) ageVerify = "N/A";
        if (!howServer) howServer = "N/A";
        if (!joining) joining = "N/A";
        if (!furryFandom) furryFandom = "N/A";
        if (!sona) sona = "N/A";

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

        const verificationEmbed = new MessageEmbed()
          .addFields(
            { name: "Age", value: ageVerify },
            { name: "How did you find our server?", value: howServer },
            { name: "Why are you joining us?", value: joining },
            { name: "What do you think about the furry fandom?", value: furryFandom },
            { name: "Do you have any sona? Tell us about it.", value: sona },
          )
          .setColor(Color.Transparent)
          .setTimestamp()

        await channelForVerification.send({
          content: "<@&" + LoggingData.StaffRoleVerify + "> | Verification from " + interaction.user.toString(),
          embeds: [verificationEmbed],
          components: [buttonVerify],
        }).then(async (sent) => {
          return Verification.create({
            MessageID: sent.id,
            UserID: interaction.user.id,
            UserName: interaction.user.tag,
            AgeData: ageVerify,
            HowServerData: howServer,
            JoiningData: joining,
            FurryFandomData: furryFandom,
            SonaData: sona,
            GuildID: interaction.guild.id,
          })
        })

        return interaction.reply({
          content: "We received your verification, please wait while we review your verification.!",
          ephemeral: true
        });
    }
  }

  if (interaction.isSelectMenu()) {
    let args = interaction.values[0]

    switch (interaction.customId) {
      case ("reasonDeny"):
        let VerificationLog = await Verification.findOne({ where: { MessageID: interaction.message.id } });

        const verificationEmbedDenied = new MessageEmbed()
          .addFields(
            { name: "Age", value: VerificationLog.AgeData },
            { name: "How did you find our server?", value: VerificationLog.HowServerData },
            { name: "Why are you joining us?", value: VerificationLog.JoiningData },
            { name: "What do you think about the furry fandom?", value: VerificationLog.FurryFandomData },
            { name: "Do you have any sona? Tell us about it", value: VerificationLog.SonaData },
          )
          .setColor(Color.RiskHigh)
          .setTimestamp()

        await Verification.destroy({ where: { MessageID: interaction.message.id } });

        interaction.channel.messages.fetch(interaction.message.id).then(async () => {
          await interaction.update({
            content: "<@&" + LoggingData.StaffRoleVerify + "> | Verification from <@" + VerificationLog.UserID + "> denied by " + interaction.user.toString(),
            embeds: [verificationEmbedDenied],
            components: [],
          })
        });

        let Reason = MessageConfig.Verification.ReasonToDeny;

        switch (args) {
          case ("noDetails"):
            return bot.users.cache.get(VerificationLog.UserID).send({
              content: Reason,
            }).catch(() => { return });
          case ("troll"):
            return bot.users.cache.get(VerificationLog.UserID).send({
              content: Reason.Troll,
            }).catch(() => { return });
          case ("new"):
            return bot.users.cache.get(VerificationLog.UserID).send({
              content: Reason.NewAccount,
            }).catch(() => { return });
          case ("young"):
            return bot.users.cache.get(VerificationLog.UserID).send({
              content: Reason.TooYoung,
            }).catch(() => { return });
        };
    }
  }
});

const Major = "900201076916105306";
const Minor = "900200948557824050";
const TheyThem = "940251105118523452";
const HeHim = "940251047174238218";
const SheHer = "940250894203764786";
const AnyPronouns = "1009521963825369098";
const OtherPronouns = "940251221292363806";
const Boy = "900149879089815604";
const Girl = "900149792930406400";
const GenderFluid = "900769520111734835";
const TransBoy = "940126702389039164";
const TransGirl = "1009511819737563197";
const Agender = "940130071249829969";
const NonBinary = "940130130225950720";
const OtherGender = "940240745821007922";
const Straight = "931040779277860954";
const Gay = "931040829961822218";
const Lesbian = "993914756232654868";
const Bisexual = "931040851973517332";
const Pansexual = "931041941003575306";
const Asexual = "931041656671711253";
const Aromantic = "940127204002648094";
const Polyamorous = "940128299173154826";
const OtherOrientation = "940128332740198410";
const Single = "940274055339192390";
const Taken = "940274020706844693";
const Looking = "940273816066732083";
const NotLooking = "940273975295111218";
const OpenDM = "940273578769801226";
const ImportantDM = "940273628669411348";
const CloseDM = "940273602983526481";
const Furry = "923054477735522304";
const NotAFurry = "940244795811594270";
const VRAccess = "922968520847945768";
const VRLFP = "984908404390776833";
const AllNotification = "940658136048603176";
const Announcement = "940658199411949600";
const Giveaway = "940664575659999284";
const Partnership = "943956163840577537";
const Bump = "940658171867959317";
const Events = "950406476365705227";
const DeadChat = "945731050888392716";
const NitroDrop = "956565030604771389";

const One = "1️⃣";
const Two = "2️⃣";
const Three = "3️⃣";
const Four = "4️⃣";
const Five = "5️⃣";
const Six = "6️⃣";
const Seven = "7️⃣";
const Eight = "8️⃣";
const Nine = "9️⃣";

const Message_1 = "1010245466400755732";
const Message_2 = "1010245467436761198";
const Message_3 = "1010245468309172254";
const Message_4 = "1010245469340979220";
const Message_5 = "1010245470389534801";
const Message_6 = "1010245490073415794";
const Message_7 = "1010245491491078208";
const Message_8 = "1010245492443205762";
const Message_9 = "1010245493479198740";

bot.on("messageReactionAdd", async (reaction, user) => {
  if (user.bot) return;

  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.error('Something went wrong when fetching the message:', error);
      return;
    }
  }

  const UserCheck = reaction.message.guild.members.cache.get(user.id);

  if (reaction.message.guild.id === "821241527941726248") {
    switch (reaction.message.id) {
      case (Message_1):
        switch (reaction.emoji.name) {
          case (One):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Two).users.remove(user.id)

            return UserCheck.roles.add(Minor);
          case (Two):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === One).users.remove(user.id)

            return UserCheck.roles.add(Major);
        }

        break;
      case (Message_2):
        switch (reaction.emoji.name) {
          case (One):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Eight).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Two).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Three).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Four).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Five).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Six).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Seven).users.remove(user.id)

            return UserCheck.roles.add(Boy);
          case (Two):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === One).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Eight).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Three).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Four).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Five).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Six).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Seven).users.remove(user.id)

            return UserCheck.roles.add(Girl);
          case (Three):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === One).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Two).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Eight).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Four).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Five).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Six).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Seven).users.remove(user.id)

            return UserCheck.roles.add(GenderFluid);
          case (Four):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === One).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Two).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Three).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Eight).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Five).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Six).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Seven).users.remove(user.id)

            return UserCheck.roles.add(TransBoy);
          case (Five):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === One).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Two).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Three).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Four).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Eight).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Six).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Seven).users.remove(user.id)

            return UserCheck.roles.add(TransGirl);
          case (Six):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === One).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Two).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Three).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Four).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Five).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Eight).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Seven).users.remove(user.id)

            return UserCheck.roles.add(Agender);
          case (Seven):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === One).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Two).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Three).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Four).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Five).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Six).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Eight).users.remove(user.id)

            return UserCheck.roles.add(NonBinary);
          case (Eight):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === One).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Two).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Three).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Four).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Five).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Six).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Seven).users.remove(user.id)

            return UserCheck.roles.add(OtherGender);
        };

        break;
      case (Message_3):
        switch (reaction.emoji.name) {
          case (One):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Two).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Three).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Four).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Five).users.remove(user.id)

            return UserCheck.roles.add(TheyThem)
          case (Two):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === One).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Three).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Four).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Five).users.remove(user.id)

            return UserCheck.roles.add(HeHim)
          case (Three):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === One).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Two).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Four).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Five).users.remove(user.id)

            return UserCheck.roles.add(SheHer)
          case (Four):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === One).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Two).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Three).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Five).users.remove(user.id)

            return UserCheck.roles.add(AnyPronouns)
          case (Five):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === One).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Two).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Three).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Four).users.remove(user.id)

            return UserCheck.roles.add(OtherPronouns)
        }

        break;
      case (Message_4):
        switch (reaction.emoji.name) {
          case (One):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Two).users.remove(user.id)

            return UserCheck.roles.add(Single)
          case (Two):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === One).users.remove(user.id)

            return UserCheck.roles.add(Taken)
          case (Three):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Four).users.remove(user.id)

            return UserCheck.roles.add(Looking)
          case (Four):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Three).users.remove(user.id)

            return UserCheck.roles.add(NotLooking)
        }

        break;
      case (Message_5):
        switch (reaction.emoji.name) {
          case (One):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Eight).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Two).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Three).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Four).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Five).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Six).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Seven).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Nine).users.remove(user.id)

            return UserCheck.roles.add(Straight);
          case (Two):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === One).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Eight).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Three).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Four).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Five).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Six).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Seven).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Nine).users.remove(user.id)

            return UserCheck.roles.add(Gay);
          case (Three):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === One).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Two).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Eight).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Four).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Five).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Six).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Seven).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Nine).users.remove(user.id)

            return UserCheck.roles.add(Lesbian);
          case (Four):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === One).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Two).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Three).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Eight).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Five).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Six).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Seven).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Nine).users.remove(user.id)

            return UserCheck.roles.add(Bisexual);
          case (Five):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === One).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Two).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Three).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Four).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Eight).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Six).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Seven).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Nine).users.remove(user.id)

            return UserCheck.roles.add(Pansexual);
          case (Six):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === One).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Two).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Three).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Four).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Five).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Eight).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Seven).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Nine).users.remove(user.id)

            return UserCheck.roles.add(Asexual);
          case (Seven):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === One).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Two).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Three).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Four).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Five).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Six).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Eight).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Nine).users.remove(user.id)

            return UserCheck.roles.add(Aromantic);
          case (Eight):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === One).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Two).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Three).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Four).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Five).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Six).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Seven).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Nine).users.remove(user.id)

            return UserCheck.roles.add(Polyamorous);
          case (Nine):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === One).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Two).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Three).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Four).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Five).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Six).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Seven).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Eight).users.remove(user.id)

            return UserCheck.roles.add(OtherOrientation);
        };


        break;
      case (Message_6):
        switch (reaction.emoji.name) {
          case (One):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Two).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Three).users.remove(user.id)

            return UserCheck.roles.add(OpenDM);
          case (Two):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === One).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Three).users.remove(user.id)

            return UserCheck.roles.add(ImportantDM);
          case (Three):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === One).users.remove(user.id) &
              reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Two).users.remove(user.id)

            return UserCheck.roles.add(CloseDM);
        };

        break;
      case (Message_7):
        switch (reaction.emoji.name) {
          case (One):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === Two).users.remove(user.id)

            return UserCheck.roles.add(Furry);
          case (Two):
            reaction.message.reactions.cache.find(reaction => reaction.emoji.name === One).users.remove(user.id)

            return UserCheck.roles.add(NotAFurry);
        };

        break;
      case (Message_8):
        switch (reaction.emoji.name) {
          case (One):
            return UserCheck.roles.add(VRAccess);
          case (Two):
            return UserCheck.roles.add(VRLFP);
        };

        break;
      case (Message_9):
        switch (reaction.emoji.name) {
          case (One):
            return UserCheck.roles.add(AllNotification);
          case (Two):
            return UserCheck.roles.add(Announcement);
          case (Three):
            return UserCheck.roles.add(Giveaway);
          case (Four):
            return UserCheck.roles.add(Partnership);
          case (Five):
            return UserCheck.roles.add(Bump);
          case (Six):
            return UserCheck.roles.add(Events);
          case (Seven):
            return UserCheck.roles.add(DeadChat);
          case (Eight):
            return UserCheck.roles.add(NitroDrop);
        };
        break;
      default:

        break;
    }
  }
});

bot.on("messageReactionRemove", async (reaction, user) => {
  if (user.bot) return;

  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.error('Something went wrong when fetching the message:', error);
      return;
    }
  }

  const UserCheck = reaction.message.guild.members.cache.get(user.id);

  if (reaction.message.guild.id === "821241527941726248") {
    switch (reaction.message.id) {
      case (Message_1):
        switch (reaction.emoji.name) {
          case (One):
            return UserCheck.roles.remove(Minor);
          case (Two):
            return UserCheck.roles.remove(Major);
        }

        break;
      case (Message_2):
        switch (reaction.emoji.name) {
          case (One):
            return UserCheck.roles.remove(Boy);
          case (Two):
            return UserCheck.roles.remove(Girl);
          case (Three):
            return UserCheck.roles.remove(GenderFluid);
          case (Four):
            return UserCheck.roles.remove(TransBoy);
          case (Five):
            return UserCheck.roles.remove(TransGirl);
          case (Six):
            return UserCheck.roles.remove(Agender);
          case (Seven):
            return UserCheck.roles.remove(NonBinary);
          case (Eight):
            return UserCheck.roles.remove(OtherGender);
        };

        break;
      case (Message_3):
        switch (reaction.emoji.name) {
          case (One):
            return UserCheck.roles.remove(TheyThem)
          case (Two):
            return UserCheck.roles.remove(HeHim)
          case (Three):
            return UserCheck.roles.remove(SheHer)
          case (Four):
            return UserCheck.roles.remove(AnyPronouns)
          case (Five):
            return UserCheck.roles.remove(OtherPronouns)
        }

        break;
      case (Message_4):
        switch (reaction.emoji.name) {
          case (One):
            return UserCheck.roles.remove(Single)
          case (Two):
            return UserCheck.roles.remove(Taken)
          case (Three):
            return UserCheck.roles.remove(Looking)
          case (Four):
            return UserCheck.roles.remove(NotLooking)
        }

        break;
      case (Message_5):
        switch (reaction.emoji.name) {
          case (One):
            return UserCheck.roles.remove(Straight);
          case (Two):
            return UserCheck.roles.remove(Gay);
          case (Three):
            return UserCheck.roles.remove(Lesbian);
          case (Four):
            return UserCheck.roles.remove(Bisexual);
          case (Five):
            return UserCheck.roles.remove(Pansexual);
          case (Six):
            return UserCheck.roles.remove(Asexual);
          case (Seven):
            return UserCheck.roles.remove(Aromantic);
          case (Eight):
            return UserCheck.roles.remove(Polyamorous);
          case (Nine):
            return UserCheck.roles.remove(OtherOrientation);
        };


        break;
      case (Message_6):
        switch (reaction.emoji.name) {
          case (One):
            return UserCheck.roles.remove(OpenDM);
          case (Two):
            return UserCheck.roles.remove(ImportantDM);
          case (Three):
            return UserCheck.roles.remove(CloseDM);
        };

        break;
      case (Message_7):
        switch (reaction.emoji.name) {
          case (One):
            return UserCheck.roles.remove(Furry);
          case (Two):
            return UserCheck.roles.remove(NotAFurry);
        };

        break;
      case (Message_8):
        switch (reaction.emoji.name) {
          case (One):
            return UserCheck.roles.remove(VRAccess);
          case (Two):
            return UserCheck.roles.remove(VRLFP);
        };

        break;
      case (Message_9):
        switch (reaction.emoji.name) {
          case (One):
            return UserCheck.roles.remove(AllNotification);
          case (Two):
            return UserCheck.roles.remove(Announcement);
          case (Three):
            return UserCheck.roles.remove(Giveaway);
          case (Four):
            return UserCheck.roles.remove(Partnership);
          case (Five):
            return UserCheck.roles.remove(Bump);
          case (Six):
            return UserCheck.roles.remove(Events);
          case (Seven):
            return UserCheck.roles.remove(DeadChat);
          case (Eight):
            return UserCheck.roles.remove(NitroDrop);
        };
        break;
      default:

        break;
    }
  }
});

bot.login(Config.token);