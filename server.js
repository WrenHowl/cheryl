const { TextInputStyle, ActionRowBuilder, StringSelectMenuBuilder, ButtonStyle, ButtonBuilder, Partials, ActivityType, Client, GatewayIntentBits, EmbedBuilder, Collection, ModalBuilder, TextInputBuilder, roleMention, IntentsBitField } = require("discord.js");
const fs = require("node:fs");
const path = require('node:path');
const Sequelize = require('sequelize');
const moment = require("moment");
const Config = require("./config/config.json");
const MessageConfig = require("./config/message.json");
const Color = require("./config/color.json");
const bot = new Client({
  allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
  intents: [
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});
const { ImgurClient } = require('imgur');

const dateTime = new Date();
const client = new ImgurClient({ clientId: Config.ImgurID });

bot.commands = new Collection();

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
  JoinedServer: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
  JoinedServerBan: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
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
  ChannelIDParentTicket: {
    type: Sequelize.STRING,
    unique: false,
  },
  ChannelIDReceiveTicket: {
    type: Sequelize.STRING,
    unique: false,
  },
});
const Permission = sequelize.define("Permission", {
  UserID: {
    type: Sequelize.STRING,
  }
});
const Ticket = sequelize.define("Ticket", {
  GuildID: {
    type: Sequelize.STRING,
  },
  Reason: {
    type: Sequelize.STRING,
  },
  MessageID: {
    type: Sequelize.STRING,
  },
  ChannelID: {
    type: Sequelize.STRING,
  },
  Author: {
    type: Sequelize.STRING,
  },
  AuthorUsername: {
    type: Sequelize.STRING,
  },
  ClaimedBy: {
    type: Sequelize.STRING,
  },
  TicketCount: {
    type: Sequelize.STRING,
  }
})
const TicketCount = sequelize.define("TicketCount", {
  GuildID: {
    type: Sequelize.STRING,
  },
  Count: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});
const Warns = sequelize.define("Warns")
const Profile = sequelize.define("Profile", {
  UserName: {
    type: Sequelize.STRING,
    unique: false,
  },
  UserID: {
    type: Sequelize.STRING,
    unique: false,
  },
  Age: {
    type: Sequelize.STRING,
    unique: false,
  },
  Pronouns: {
    type: Sequelize.STRING,
    unique: false,
  },
  Gender: {
    type: Sequelize.STRING,
    unique: false,
  },
  Verified18: {
    type: Sequelize.STRING,
    unique: false,
  },
});

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

    bot.user.setActivity(StatusChange, { type: ActivityType.Watching });

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
    Ticket.sync();
    TicketCount.sync();
  }, 5000);

  bot.guilds.cache.forEach(async (guild) => {
    let LoggingData = await Logging.findOne({ where: { GuildID: guild.id } });
    let TicketData = await Ticket.findOne({ where: { GuildID: guild.id } });

    if (!LoggingData) {
      await Logging.create({
        GuildID: guild.id,
      });
    } else if (!TicketData) {
      await Ticket.create({
        GuildID: guild.id,
      });
    };
  });

  return console.log(dateTime.toLocaleString() + " -> The bot is ready!");
});

bot.on("guildMemberAdd", async (NewMember) => {
  try {
    let LoggingData = await Logging.findOne({ where: { GuildID: NewMember.guild.id } });

    let VRCharadise = "1137603416818987028";

    if (NewMember.guild.id === VRCharadise) {
      let VerificationLog = await Verification.findOne({ where: { UserID: NewMember.user.id } })
      if (VerificationLog) {
        await NewMember.roles.add("1164684660127830046", "Verification System: Verified by " + interaction.user.tag)
      }
    }

    if (LoggingData.ChannelIDWelcome) {
      if (NewMember.guild.channels.cache.get(LoggingData.ChannelIDWelcome)) {
        if (NewMember.guild.members.me.permissionsIn(LoggingData.ChannelIDWelcome).has(['SendMessages', 'ViewChannel'])) {
          if (NewMember.user.bot) return;

          const ChannelGuild = NewMember.guild.channels.cache.get(LoggingData.ChannelIDWelcome);
          const guild = bot.guilds.cache.get(NewMember.guild.id);
          const memberCount = guild.members.cache.filter(newMember => !newMember.user.bot).size;

          const WelcomeMessage = new EmbedBuilder()
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
          }).catch(error => {
            console.log(error)
          });
        };
      } else {
        Logging.update({ ChannelIDWelcome: null }, { where: { GuildID: NewMember.guild.id } });
      };
    };
    if (LoggingData.AutoRole) {
      return NewMember.roles.add(LoggingData.AutoRole)
    };

    let VerifierData = await Verifier.findOne({ where: { VerifierID: NewMember.user.id } });

    if (VerifierData) {
      if (LoggingData.RoleToAddVerify || LoggingData.RoleToRemoveVerify) {
        await NewMember.roles.add(LoggingData.RoleToAddVerify);
        await NewMember.roles.remove(LoggingData.RoleToRemoveVerify);
      };
    };

    let BlacklistData = await Blacklist.findOne({ where: { UserID: NewMember.user.id } });
    let MessageBlacklist = MessageConfig.Blacklist;

    if (BlacklistData) {
      if (LoggingData.EnableDisableBlacklistLogger === "Enabled") {
        if (LoggingData.ChannelIDBlacklist) {
          if (NewMember.guild.members.me.permissionsIn(LoggingData.ChannelIDBlacklist).has(['SendMessages', 'ViewChannel'])) {
            const ChannelToSendAt = await NewMember.guild.channels.fetch(LoggingData.ChannelIDBlacklist)

            if (BlacklistData.Risk === "Low") ColorEmbed = Color.RiskLow;
            if (BlacklistData.Risk === "Medium") ColorEmbed = Color.RiskMedium;
            if (BlacklistData.Risk === "High") ColorEmbed = Color.RiskHigh;

            const BlacklistedUserJoined = new EmbedBuilder()
              .setTitle("<:BanHammer:997932635454197790> New Alert")
              .setDescription(MessageBlacklist.InstantBan)
              .addFields(
                { name: "User", value: NewMember.user.toString(), inline: true },
                { name: "Reason", value: "``" + BlacklistData.Reason + "``", inline: true },
                { name: "Evidence", value: BlacklistData.Proof, inline: true }
              )
              .setColor(ColorEmbed)
              .setFooter({
                text: "ID: " + NewMember.user.id
              })
              .setTimestamp()

            await ChannelToSendAt.send({ embeds: [BlacklistedUserJoined] });

            await BlacklistData.increment("JoinedServer");

            let AutoBanMessage = MessageBlacklist.AutoBanMessage;

            if (LoggingData.AutoBanStatus) {
              if (LoggingData.AutoBanStatus === "Disable") return;

              if (LoggingData.AutoBanStatus === "Low+") {
                if (BlacklistData.Risk === "Low" | BlacklistData.Risk === "Medium" | BlacklistData.Risk === "High") {
                  await BlacklistData.increment("JoinedServerBan");

                  return NewMember.guild.members.ban(BlacklistData.UserID, { reason: [BlacklistData.Reason + " | " + AutoBanMessage] });
                }
              } else if (LoggingData.AutoBanStatus === "Medium+") {
                if (BlacklistData.Risk === "Medium" | BlacklistData.Risk === "High") {
                  await BlacklistData.increment("JoinedServerBan");

                  return NewMember.guild.members.ban(BlacklistData.UserID, { reason: [BlacklistData.Reason + " | " + AutoBanMessage] });
                }
              } else if (LoggingData.AutoBanStatus === "High+") {
                if (BlacklistData.Risk === "High") {
                  await BlacklistData.increment("JoinedServerBan");

                  return NewMember.guild.members.ban(BlacklistData.UserID, { reason: [BlacklistData.Reason + " | " + AutoBanMessage] });
                }
              }
            };

            return;
          }
        }
      }
    };
  } catch (error) {
    let fetchGuild = NewMember.client.guilds.cache.get(Config.guildId)
    let CrashChannel = fetchGuild.channels.cache.get(Config.CrashChannel)
    console.log(error);

    return CrashChannel.send({ content: "**Error in 'guildMemberAdd' Event:** \n\n```javascript\n" + error + "```" });
  };
});

bot.on("guildMemberRemove", async (LeavingMember) => {
  try {
    let LoggingData = await Logging.findOne({ where: { GuildID: LeavingMember.guild.id } });

    if (LeavingMember.guild.id === Config.guildId) {
      return Permission.destroy({ where: { UserID: LeavingMember.user.id } });
    };

    if (LoggingData.ChannelIDLeaving) {
      if (LeavingMember.guild.channels.cache.get(LoggingData.ChannelIDWelcome)) {
        if (LeavingMember.guild.members.me.permissionsIn(LoggingData.ChannelIDLeaving).has(['SendMessages', 'ViewChannel'])) {
          if (LeavingMember.user.bot) return;

          const VerifierData = await Verifier.findOne({ where: { GuildID: LeavingMember.guild.id, VerifierID: LeavingMember.user.id } });
          const ChannelGuild = LeavingMember.guild.channels.cache.get(LoggingData.ChannelIDLeaving);

          VerifierData ? Status = "``Was Verified``" : Status = "``Wasn't Verified``";

          const LeavingMemberEmbed = new EmbedBuilder()
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
            .setThumbnail(LeavingMember.user.displayAvatarURL());

          if (LoggingData.ChannelIDVerify) {
            LeavingMemberEmbed.addFields(
              { name: "Status", value: Status }
            );
          };

          return ChannelGuild.send({
            embeds: [LeavingMemberEmbed]
          });
        };
      } else {
        Logging.update({ ChannelIDWelcome: null }, { where: { GuildID: NewMember.guild.id } });
      };
    };

    let Ticket = await TicketCount.findOne({ where: { GuildID: LeavingMember.guild.id } });

    if (Ticket) {
      if (Ticket.Author) {
        let guild = LeavingMember.client.guilds.cache.get(Ticket.GuildID);
        let channel = guild.channels.cache.get(Ticket.ChannelID);

        channel.send({ content: MessageConfig.Ticket.Delete }).then(async () => {
          setTimeout(() => { channel.delete("User left the server") }, 3000);
        });
      };
    };

  } catch (error) {
    let fetchGuild = LeavingMember.client.guilds.cache.get(Config.guildId);
    let CrashChannel = fetchGuild.channels.cache.get(Config.CrashChannel);
    console.log(error);

    return CrashChannel.send({ content: "**Error in 'guildMemberRemove' Event:** \n\n```javascript\n" + error + "```" });
  };
});

bot.on("userUpdate", async (NewUser, OldUser) => {
  try {
    if (OldUser.username !== NewUser.username || OldUser.discriminator !== NewUser.discriminator) {
      await Verifier.update({ ModName: NewUser.tag }, { where: { ModID: NewUser.id } });
      return Blacklist.update({ ModName: NewUser.tag }, { where: { ModID: NewUser.id } });
    };
  } catch (error) {
    let fetchGuild = NewUser.client.guilds.cache.get(Config.guildId);
    let CrashChannel = fetchGuild.channels.cache.get(Config.CrashChannel);
    console.log(error);

    return CrashChannel.send({ content: "**Error in 'userUpdate' Event:** \n\n```javascript\n" + error + "```" });
  };
});

bot.on("guildCreate", async (guild) => {
  try {
    let LoggingData = await Logging.findOne({ where: { GuildID: guild.id } });
    let TicketData = await Ticket.findOne({ where: { GuildID: guild.id } });

    if (!LoggingData) {
      await Logging.create({
        GuildID: guild.id,
      });
    };
    if (!TicketData) {
      await Ticket.create({
        GuildID: guild.id,
      });
    }

    const owner = await guild.fetchOwner();
    const BlacklistData = await Blacklist.findOne({ where: { UserID: owner.user.id } });

    BlacklistData ? Boo = "Yes" : Boo = "No";

    const NewGuild = new EmbedBuilder()
      .setTitle("Bot Added")
      .addFields(
        { name: "Server Name", value: "``" + guild.name + "``", inline: true },
        { name: "Server ID", value: "``" + guild.id + "``", inline: true },
        { name: "Members", value: "``" + guild.memberCount + "``", inline: true },
        { name: "Owner Name", value: "``" + owner.user.tag + "``", inline: true },
        { name: "Owner ID", value: "``" + owner.user.id + "``", inline: true },
        { name: "Owner Blacklisted", value: "``" + Boo + "``", inline: true },
      )
      .setColor(Color.Green);

    let fetchGuild = guild.client.guilds.cache.get(Config.guildId);
    let ChannelAddition = fetchGuild.channels.cache.get(Config.BotAdded);

    return ChannelAddition.send({
      embeds: [NewGuild]
    });
  } catch (error) {
    let fetchGuild = guild.client.guilds.cache.get(Config.guildId);
    let CrashChannel = fetchGuild.channels.cache.get(Config.CrashChannel);
    console.log(error);

    return CrashChannel.send({ content: "**Error in 'guildCreate' Event:** \n\n```javascript\n" + error + "```" });
  };
});

bot.on("guildDelete", async (guild) => {
  try {
    const owner = await guild.fetchOwner();
    const BlacklistData = await Blacklist.findOne({ where: { UserID: owner.user.id } });

    BlacklistData ? Boo = "Yes" : Boo = "No";

    const NewGuild = new EmbedBuilder()
      .setTitle("Bot Removed")
      .addFields(
        { name: "Server Name", value: "``" + guild.name + "``", inline: true },
        { name: "Server ID", value: "``" + guild.id + "``", inline: true },
        { name: "Members", value: "``" + guild.memberCount + "``", inline: true },
        { name: "Owner Name", value: "``" + owner.user.tag + "``", inline: true },
        { name: "Owner ID", value: "``" + owner.user.id + "``", inline: true },
        { name: "Owner Blacklisted", value: "``" + Boo + "``", inline: true },

      )
      .setColor(Color.RiskHigh);

    let fetchGuild = guild.client.guilds.cache.get(Config.guildId);
    let BotRemoval = fetchGuild.channels.cache.get(Config.BotRemoved);

    return BotRemoval.send({
      embeds: [NewGuild]
    });
  } catch (error) {
    let fetchGuild = guild.client.guilds.cache.get(Config.guildId);
    let CrashChannel = fetchGuild.channels.cache.get(Config.CrashChannel);
    console.log(error);

    return CrashChannel.send({ content: "**Error in 'guildDelete' Event:** \n\n```javascript\n" + error + "```" });
  };
});

bot.on("messageCreate", async (message) => {
  try {
    const commandsPath2 = path.join(__dirname, 'commands_noslash');
    const commandFiles2 = fs.readdirSync(commandsPath2).filter(file2 => file2.endsWith('.js'));

    for (const file2 of commandFiles2) {
      const filePath2 = path.join(commandsPath2, file2);
      const command2 = require(filePath2);
      bot.commands.set(command2.name, command2);
    }

    const LoggingData = await Logging.findOne({ where: { GuildID: message.guild.id } });

    LoggingData.Prefix ? Prefix = LoggingData.Prefix : Prefix = Config.Prefix;

    if (message.author.bot || message.content.indexOf(Prefix) !== 0) return;
    const args = message.content.slice(Prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    const en = require("./languages/en.json");

    switch (command) {
      case (en.cmd.Name):
        return bot.commands.get(en.cmd.Name).execute(bot, message, args, sequelize, Sequelize);
      case (en.language.Name):
        return bot.commands.get(en.language.Name).execute(bot, message, args, sequelize, Sequelize);
      case (en.cop.Name):
        return bot.commands.get(en.cop.Name).execute(bot, message, args, sequelize, Sequelize);
      case (en.ban.Name):
        return bot.commands.get(en.ban.Name).execute(bot, message, args, EmbedBuilder, sequelize, Sequelize);
      case (en.unban.Name):
        return bot.commands.get(en.unban.Name).execute(bot, message, args, EmbedBuilder, sequelize, Sequelize);
      case (en.ticket.Name):
        return bot.commands.get(en.ticket.Name).execute(bot, message, args, EmbedBuilder, sequelize, Sequelize);
    };
  } catch (error) {
    let fetchGuild = message.client.guilds.cache.get(Config.guildId);
    let CrashChannel = fetchGuild.channels.cache.get(Config.CrashChannel);
    console.log(error);

    return CrashChannel.send({ content: "**Error in the 'messageCreate' Event:** \n\n```javascript\n" + error + "```" });
  };
});

bot.on("messageCreate", async (message) => {
  try {
    let member = message.interaction.user.id;

    if (message.embeds[0].description.startsWith('Bump')) {

      await message.channel.send({
        content: "Thank you for bumping the server! I will remind <@" + member + "> in 2 hours to bump it again."
      });

      return setTimeout(async () => {
        let bumpTime = new EmbedBuilder()
          .setTitle("Bump Time")
          .setURL("https://disboard.org/server/" + message.guild.id)
          .setDescription("It's been 2 hours already and it's now time to bump the server!\n" +
            "* Use the command `/bump` from Disboard")
          .setColor(Color.Blue)

        return message.channel.send({
          content: "<@" + member + ">",
          embeds: [bumpTime]
        });
      }, 7200000);
    };
  } catch (error) {
    return;
  }
});

bot.on('interactionCreate', async (interaction) => {
  try {
    const commandsPath = path.join(__dirname, 'commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);
      bot.commands.set(command.data.name, command);
    }

    if (!interaction.isCommand()) return;

    const command = bot.commands.get(interaction.commandName);

    return command.execute(interaction, bot, sequelize, Sequelize);
  } catch (error) {
    let fetchGuild = interaction.client.guilds.cache.get(Config.guildId);
    let CrashChannel = fetchGuild.channels.cache.get(Config.CrashChannel);
    console.log(error);

    await CrashChannel.send({ content: "**Error in 'interactionCreate' Event:** \n\n```javascript\n" + error + "```" });

    return interaction.reply({
      content: MessageConfig.Crash,
      ephemeral: true
    });
  }
});

bot.on('interactionCreate', async (interaction) => {
  try {
    let LoggingData = await Logging.findOne({ where: { GuildID: interaction.guild.id } });
    let guild = bot.guilds.cache.get(interaction.guild.id);

    if (!interaction.guild) return;

    /*
      Verification System
    */

    let verificationId = [
      "buttonToVerify",
      "buttonToAcceptVerify",
      "buttonToDenyVerify",
      "verificationModal",
      "reasonDeny"
    ];

    if (verificationId.includes(interaction.customId)) {
      if (interaction.isButton()) {
        let VerificationLog = await Verification.findOne({ where: { MessageID: interaction.message.id } });

        switch (interaction.customId) {
          case ("buttonToVerify"):
            if (!interaction.member.roles.cache.some(role => role.id === LoggingData.RoleToAddVerify)) {
              const ModalVerification = new ModalBuilder()
                .setCustomId('verificationModal')
                .setTitle('Verification');

              const ageOption = new TextInputBuilder()
                .setCustomId('ageVerify')
                .setLabel("Age")
                .setPlaceholder("Provide YOUR age.")
                .setStyle(TextInputStyle.Short)
                .setRequired();

              const howServerOption = new TextInputBuilder()
                .setCustomId('howServer')
                .setLabel("How did you find our server?")
                .setPlaceholder("Please specify the website/friend.")
                .setStyle(TextInputStyle.Short)
                .setRequired();

              const joiningOption = new TextInputBuilder()
                .setCustomId('joining')
                .setLabel("Why are you joining us?")
                .setPlaceholder("Be precise and do not lie.")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired();

              const furryFandomOption = new TextInputBuilder()
                .setCustomId('furryFandom')
                .setLabel("What do you think about the furry fandom?")
                .setPlaceholder("Be serious and do not lie.")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired();

              const sonaOption = new TextInputBuilder()
                .setCustomId('sona')
                .setLabel("Do you have any sona? Tell us about it")
                .setPlaceholder("Provide a short detailed paragraph of your sona.")
                .setStyle(TextInputStyle.Paragraph)
                .setRequired();

              const ageRow = new ActionRowBuilder().addComponents(ageOption);
              const howServerRow = new ActionRowBuilder().addComponents(howServerOption);
              const joiningRow = new ActionRowBuilder().addComponents(joiningOption);
              const furryFandomRow = new ActionRowBuilder().addComponents(furryFandomOption);
              const sonaRow = new ActionRowBuilder().addComponents(sonaOption);

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
                interaction.channel.messages.fetch(interaction.message.id).then(async () => {
                  const verificationEmbedAccepted = new EmbedBuilder()
                    .addFields(
                      { name: "Age", value: "• " + VerificationLog.AgeData },
                      { name: "How did you find our server?", value: "• " + VerificationLog.HowServerData },
                      { name: "Why are you joining us?", value: "• " + VerificationLog.JoiningData },
                      { name: "What do you think about the furry fandom?", value: "• " + VerificationLog.FurryFandomData },
                      { name: "Do you have any sona? Tell us about it.", value: "• " + VerificationLog.SonaData },
                    )
                    .setColor(Color.Gray)
                    .setTimestamp()
                    .setFooter({
                      text: "ID: " + VerificationLog.UserID
                    })

                  await interaction.update({
                    content: "<@&" + LoggingData.StaffRoleVerify + "> | Verification from <@" + VerificationLog.UserID + "> canceled",
                    embeds: [verificationEmbedAccepted],
                    components: [],
                  })

                  return Verification.destroy({ where: { MessageID: interaction.message.id } });
                })
              } else {
                if (interaction.guild.members.me.permissions.has("ManageRoles")) {
                  const member = interaction.guild.members.cache.get(VerificationLog.UserID);

                  await Verification_Count.update({ ModName: interaction.user.tag }, { where: { ModID: interaction.user.id } });
                  await member.roles.add(LoggingData.RoleToAddVerify, "Verification System: Verified by " + interaction.user.tag);

                  if (LoggingData.RoleToRemoveVerify) {
                    await member.roles.remove(LoggingData.RoleToRemoveVerify);
                  };

                  if (interaction.guild.id("1137603416818987028").members.cache.find(m => m.id === member.id)) {
                    await member.roles.add("1164684660127830046", "Verification System: Verified by " + interaction.user.tag)
                  }

                  const generalMessage = interaction.guild.channels.cache.get(LoggingData.ChannelIDVerify);

                  interaction.channel.messages.fetch(interaction.message.id).then(async () => {
                    const verificationEmbedAccepted = new EmbedBuilder()
                      .addFields(
                        { name: "Age", value: "• " + VerificationLog.AgeData },
                        { name: "How did you find our server?", value: "• " + VerificationLog.HowServerData },
                        { name: "Why are you joining us?", value: "• " + VerificationLog.JoiningData },
                        { name: "What do you think about the furry fandom?", value: "• " + VerificationLog.FurryFandomData },
                        { name: "Do you have any sona? Tell us about it.", value: "• " + VerificationLog.SonaData },
                      )
                      .setColor(Color.Green)
                      .setTimestamp()
                      .setFooter({
                        text: "ID: " + VerificationLog.UserID
                      })

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
                return interaction.reply({
                  content: "Missing permission: ManageRoles",
                });
              }
            };

            break;
          case ("buttonToDenyVerify"):
            if (VerificationLog) {
              if (!guild.members.cache.find(m => m.id === VerificationLog.UserID)?.id) {
                interaction.channel.messages.fetch(interaction.message.id).then(async () => {
                  const verificationEmbedAccepted = new EmbedBuilder()
                    .addFields(
                      { name: "Age", value: "• " + VerificationLog.AgeData },
                      { name: "How did you find our server?", value: "• " + VerificationLog.HowServerData },
                      { name: "Why are you joining us?", value: "• " + VerificationLog.JoiningData },
                      { name: "What do you think about the furry fandom?", value: "• " + VerificationLog.FurryFandomData },
                      { name: "Do you have any sona? Tell us about it.", value: "• " + VerificationLog.SonaData },
                    )
                    .setColor(Color.Gray)
                    .setTimestamp()
                    .setFooter({
                      text: "ID: " + VerificationLog.UserID
                    })

                  return interaction.update({
                    content: "<@&" + LoggingData.StaffRoleVerify + "> | Verification from <@" + VerificationLog.UserID + "> canceled",
                    embeds: [verificationEmbedAccepted],
                    components: [],
                  })
                })
              } else {
                interaction.channel.messages.fetch(interaction.message.id).then(async () => {
                  const reasonDeny = new ActionRowBuilder()
                    .addComponents(
                      new StringSelectMenuBuilder()
                        .setCustomId('reasonDeny')
                        .setPlaceholder('Please select a reason')
                        .addOptions(
                          {
                            label: 'Not Enough Details - Contains barely one line of text',
                            value: 'noDetails',
                          },
                          {
                            label: 'Troll - Ridiculous Age, etc.',
                            value: 'troll',
                          },
                          {
                            label: 'New Account - Less than 2 weeks old',
                            value: 'new',
                          },
                          {
                            label: 'Too Young - 13- Years Old',
                            value: 'young',
                          },
                          {
                            label: 'Missing Information - How the user joined the server',
                            value: 'website',
                          },
                        ),
                    );

                  const verificationEmbedDenied = new EmbedBuilder()
                    .addFields(
                      { name: "Age", value: "• " + VerificationLog.AgeData },
                      { name: "How did you find our server?", value: "• " + VerificationLog.HowServerData },
                      { name: "Why are you joining us?", value: "• " + VerificationLog.JoiningData },
                      { name: "What do you think about the furry fandom?", value: "• " + VerificationLog.FurryFandomData },
                      { name: "Do you have any sona? Tell us about it.", value: "• " + VerificationLog.SonaData },
                    )
                    .setColor(Color.RiskHigh)
                    .setTimestamp()
                    .setFooter({
                      text: "ID: " + VerificationLog.UserID
                    })

                  return interaction.update({
                    content: "<@&" + LoggingData.StaffRoleVerify + "> | Verification from <@" + VerificationLog.UserID + "> denied by " + interaction.user.toString(),
                    embeds: [verificationEmbedDenied],
                    components: [reasonDeny],
                  })
                });
              }
            };

            break;
        };
      };

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

            const buttonVerify = new ActionRowBuilder()
              .addComponents(
                new ButtonBuilder()
                  .setCustomId('buttonToAcceptVerify')
                  .setLabel('Accept')
                  .setStyle(ButtonStyle.Success),
              )
              .addComponents(
                new ButtonBuilder()
                  .setCustomId('buttonToDenyVerify')
                  .setLabel('Deny')
                  .setStyle(ButtonStyle.Danger),
              );

            const verificationEmbed = new EmbedBuilder()
              .addFields(
                { name: "Age", value: "• " + ageVerify },
                { name: "How did you find our server?", value: "• " + howServer },
                { name: "Why are you joining us?", value: "• " + joining },
                { name: "What do you think about the furry fandom?", value: "• " + furryFandom },
                { name: "Do you have any sona? Tell us about it.", value: "• " + sona },
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
              content: "We received your verification, please wait while we review your verification.",
              ephemeral: true
            });
        };
      };

      if (interaction.isStringSelectMenu()) {
        let args = interaction.values[0];

        switch (interaction.customId) {
          case ("reasonDeny"):
            let VerificationLog = await Verification.findOne({ where: { MessageID: interaction.message.id } });

            const verificationEmbedDenied = new EmbedBuilder()
              .addFields(
                { name: "Age", value: VerificationLog.AgeData + "** **" },
                { name: "How did you find our server?", value: VerificationLog.HowServerData + "** **" },
                { name: "Why are you joining us?", value: VerificationLog.JoiningData + "** **" },
                { name: "What do you think about the furry fandom?", value: VerificationLog.FurryFandomData + "** **" },
                { name: "Do you have any sona? Tell us about it", value: VerificationLog.SonaData + "** **" },
              )
              .setColor(Color.RiskHigh)
              .setTimestamp()
              .setFooter({
                text: "ID: " + VerificationLog.UserID
              });

            await Verification.destroy({ where: { MessageID: interaction.message.id } });

            interaction.channel.messages.fetch(interaction.message.id).then(async () => {
              await interaction.update({
                content: "<@&" + LoggingData.StaffRoleVerify + "> | Verification from <@" + VerificationLog.UserID + "> denied by " + interaction.user.toString(),
                embeds: [verificationEmbedDenied],
                components: [],
              })
            });

            let Reason = MessageConfig.Verification.ReasonToDeny;
            let DM = bot.users.cache.get(VerificationLog.UserID);

            switch (args) {
              case ("noDetails"):
                return DM.send({
                  content: Reason,
                }).catch(() => { return });
              case ("troll"):
                return DM.send({
                  content: Reason.Troll,
                }).catch(() => { return });
              case ("new"):
                return DM.send({
                  content: Reason.NewAccount,
                }).catch(() => { return });
              case ("young"):
                return DM.send({
                  content: Reason.TooYoung,
                }).catch(() => { return });
              case ("website"):
                return DM.send({
                  content: Reason.Website,
                }).catch(() => { return });
            };

            break;
        };
      };
    };

    /*
      Action System
    */

    let actionId = [
      "AcceptSuggestion",
      "DenySuggestion"
    ];

    if (interaction.isButton() && actionId.includes(interaction.customId)) {
      let ActionImageData = await ActionImage.findOne({ where: { MessageID: interaction.message.id } });

      if (ActionImageData) {
        if (!ActionImageData.MessageID) {
          return interaction.reply({
            content: MessageConfig.CannotFindDataOfMessage,
            ephemeral: true,
          });
        };
      } else return;

      switch (interaction.customId) {
        case ("AcceptSuggestion"):
          const response = await client.upload({
            image: ActionImageData.ImageURL,
          })

          const ImageEmbed = new EmbedBuilder()
            .addFields(
              { name: "Category:", value: ActionImageData.Category, inline: true },
              { name: "Author:", value: ActionImageData.UserName + " ``(" + ActionImageData.UserID + ")``", inline: true }
            );

          if (response.data === "File is over the size limit") {
            ImageEmbed.addFields({ name: "Status:", value: "File is over the size limit" });
            ImageEmbed.setColor(Color.RiskHigh)

            await ActionImage.destroy({ where: { MessageID: interaction.message.id } });
          } else {
            ImageEmbed.addFields({ name: "Status:", value: "Accepted" });
            ImageEmbed.setColor(Color.Green)
            ImageEmbed.setImage(response.data.link)

            await ActionImage.update({ ImageURL: response.data.link }, { where: { MessageID: interaction.message.id } });
          };

          interaction.channel.messages.fetch(interaction.message.id).then(async () => {
            return interaction.update({
              embeds: [ImageEmbed],
              components: []
            });
          });

          break;
        case ("DenySuggestion"):
          interaction.channel.messages.fetch(interaction.message.id).then(async () => {
            const ImageEmbed = new EmbedBuilder()
              .addFields(
                { name: "Category:", value: ActionImageData.Category + "** **", inline: true },
                { name: "Author:", value: ActionImageData.UserName + " ``(" + ActionImageData.UserID + ")``" + "** **", inline: true },
                { name: "Status:", value: "Denied" },
              )
              .setColor(Color.RiskHigh)

            return interaction.update({
              embeds: [ImageEmbed],
              components: []
            })
          })

          return ActionImage.destroy({ where: { MessageID: interaction.message.id } });

          break;
      }
    };

    /*
      Ticket System
    */

    let ticketId = [
      "age_verification",
      "report",
      "support",
      "partnership",
      "claim_ticket",
      "unclaim_ticket",
      "cancel_ticket",
      "buttonToAdd",
      "buttonDeleteTicket"
    ];

    if (interaction.isButton() && ticketId.includes(interaction.customId)) {
      let TicketData = await Ticket.findOne({ where: { GuildID: interaction.guild.id, Author: interaction.user.id } });
      let TicketCountData = await TicketCount.findOne({ where: { GuildID: interaction.guild.id } });
      let Tickets = await Ticket.findOne({ where: { GuildID: interaction.guild.id, MessageID: interaction.message.id } });
      let TicketEdit = await Ticket.findOne({ where: { GuildID: interaction.guild.id, ChannelID: interaction.channel.id } });

      let isStaff = interaction.member.roles.cache.some(role => role.name === "Staff");
      let isVerified18 = interaction.member.roles.cache.some(role => role.name === "Verified 18+");

      !Tickets ? messageRefusingAction = MessageConfig.Ticket.unknownMessage : messageRefusingAction = MessageConfig.Ticket.Error;
      !manageChannelPermission ? messageRefusingAction = MessageConfig.Ticket.cantManageChannels : messageRefusingAction = MessageConfig.Ticket.Error;
      !isStaff ? messageRefusingAction = MessageConfig.Ticket.isNotStaff : messageRefusingAction = MessageConfig.Ticket.Error;

      switch (interaction.customId) {
        case ("age_verification"):
          var ReasonTicket = "Age Verification";
          break;
        case ("report"):
          var ReasonTicket = "Report";
          break;
        case ("support"):
          var ReasonTicket = "Support";
          break;
        case ("partnership"):
          var ReasonTicket = "Partnership";
          break;
      }

      /* 
        Ticket System - (Reason) Ticket Button
      */

      let reasonTicket = [
        "age_verification",
        "report",
        "support",
        "partnership"
      ];

      if (reasonTicket.includes(interaction.customId)) {
        let channelToReceiveTicket = interaction.guild.channels.cache.get(LoggingData.ChannelIDReceiveTicket);

        // Check if there's not an existing ticket

        if (TicketData) {
          if (TicketData.Reason === interaction.customId) {
            return interaction.reply({
              content: MessageConfig.Ticket.Waiting,
              ephemeral: true,
            });
          };
        };

        isVerified18 ? messageRefusingTicket = MessageConfig.Ticket.RefusingToCreateVerified : messageRefusingTicket = MessageConfig.Ticket.Error;
        isStaff ? messageRefusingTicket = MessageConfig.Ticket.RefusingToCreateStaff : messageRefusingTicket = MessageConfig.Ticket.Error;

        switch (interaction.customId) {
          case ("age_verification"):
            if (isStaff | isVerified18) {
              return interaction.reply({
                content: messageRefusingTicket,
                ephemeral: true
              });
            };

            break;
          case ("report"):
            if (isStaff) {
              return interaction.reply({
                content: messageRefusingTicket,
                ephemeral: true
              });
            };

            break;
          case ("support"):
            if (isStaff) {
              return interaction.reply({
                content: messageRefusingTicket,
                ephemeral: true
              });
            };

            break;
        }

        // Send the default message of success creation

        await interaction.reply({
          content: MessageConfig.Ticket.Created,
          ephemeral: true,
        });

        // Increase the ticket counter

        !TicketCountData ?
          await TicketCount.create({
            GuildID: interaction.guild.id,
          }) : await TicketCountData.increment('Count');

        // Creation of the ticket

        await Ticket.create({
          GuildID: interaction.guild.id,
          Reason: interaction.customId,
          TicketCount: TicketCountData.Count,
          Author: interaction.user.id,
          AuthorUsername: interaction.user.tag,
        });

        // Creation of button and embed

        const buttonClaim = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('claim_ticket')
              .setLabel('Claim')
              .setStyle(ButtonStyle.Success)
          )
          .addComponents(
            new ButtonBuilder()
              .setCustomId('cancel_ticket')
              .setLabel('Cancel')
              .setStyle(ButtonStyle.Secondary)
          );

        let claimingTicket = new EmbedBuilder()
          .setTitle("Ticket #" + TicketCountData.Count)
          .addFields(
            { name: "Author", value: interaction.user.toString(), inline: true },
            { name: "Reason", value: ReasonTicket, inline: true },
            { name: "Status", value: MessageConfig.Ticket.Unclaim, inline: true },
          )
          .setColor("Yellow");

        // Sending ticket message in channel

        return channelToReceiveTicket.send({
          embeds: [claimingTicket],
          components: [buttonClaim],
        }).then(async (channel) => {
          await Ticket.update({ MessageID: channel.id }, { where: { Author: interaction.user.id } })
        }).catch(() => { return });
      };

      /* 
        Ticket System - (Waiting) Ticket Button
      */

      let inTicket = [
        "claim_ticket",
        "unclaim_ticket",
        "cancel_ticket"
      ];

      if (inTicket.includes(interaction.customId)) {
        var guildIn = bot.guilds.cache.get(interaction.guild.id);
        let findingMember = guildIn.members.cache.get(Tickets.Author);
        let memberInServer = bot.users.cache.get(Tickets.Author);
        let manageChannelPermission = interaction.guild.members.me.permissions.has("ManageChannels");

        // Checking for missing permission

        if (!isStaff | !manageChannelPermission | !Tickets) {
          return interaction.reply({
            content: messageRefusingAction,
            ephemeral: true,
          });
        }

        // Checking role of user

        switch (Tickets.Reason) {
          case ("age_verification"):
            if (!interaction.member.roles.cache.some(role => role.name === "★★★")) {
              return interaction.reply({
                content: MessageConfig.Ticket.isntAdmin,
                ephemeral: true,
              });
            };

            break;
          case ("partnership"):
            if (!interaction.member.roles.cache.some(role => role.name === "Queen [Owner]") | !interaction.member.roles.cache.some(role => role.name === "Princess [Co-Owner]")) {
              return interaction.reply({
                content: MessageConfig.Ticket.isntOwner,
                ephemeral: true,
              });
            };
        }

        switch (interaction.customId) {
          case ("claim_ticket"):

            // Checking for possible error or missing permission

            if (Tickets.Author === interaction.user.id) {
              return interaction.reply({
                content: MessageConfig.Ticket.Own,
                ephemeral: true,
              });
            }

            // Editing ticket message for staff

            interaction.channel.messages.fetch(interaction.message.id).then(async (message) => {
              const buttonClaimEdit = new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setCustomId('unclaim_ticket')
                    .setLabel('Unclaim')
                    .setStyle(ButtonStyle.Danger)
                );

              let claimingTicketEdit = new EmbedBuilder()
                .setTitle("Ticket #" + Tickets.TicketCount)
                .addFields(
                  { name: "Author", value: "<@" + Tickets.Author + ">", inline: true },
                  { name: "Reason", value: message.embeds[0].fields[1].value, inline: true },
                  { name: "Status", value: MessageConfig.Ticket.Claim, inline: true },
                  { name: "Claimed by", value: interaction.user.toString() }
                )
                .setColor("Blue");

              await interaction.update({
                embeds: [claimingTicketEdit],
                components: [buttonClaimEdit],
              });
            }).catch(() => { return });

            // Updating database

            await Ticket.update({
              ClaimedBy: interaction.user.id,
            }, { where: { MessageID: interaction.message.id } });

            // Creating the ticket channel

            return interaction.guild.channels.create({
              name: Tickets.Reason + "-" + Tickets.TicketCount,
              type: 0,
              parent: LoggingData.ChannelIDParentTicket,
              nsfw: true,
              permissionOverwrites: [{
                id: interaction.guild.roles.everyone,
                deny: ['ViewChannel']
              },
              {
                id: interaction.user.id,
                allow: ['ViewChannel', 'SendMessages', 'AttachFiles']
              },
              {
                id: Tickets.Author,
                allow: ['ViewChannel', 'SendMessages', 'AttachFiles']
              },
              {
                id: bot.user.id,
                allow: ['ViewChannel', 'SendMessages', 'AttachFiles']
              }]
            }).then(async (channel) => {

              // Update database

              await Ticket.update({
                ChannelID: channel.id
              }, { where: { ClaimedBy: interaction.user.id, Author: Tickets.Author } });

              // Messaging the owner of the ticket

              findingMember ? memberInServer.send("Your ticket (<#" + channel.id + ">) have been claimed and created by: " + interaction.user.toString()).catch(() => { return }) : false;

              // Default ticket message

              let TicketMessage = new EmbedBuilder()
                .addFields(
                  { name: "Member", value: "<@" + Tickets.Author + ">", inline: true },
                  { name: "Staff", value: interaction.user.toString(), inline: true }
                )
                .setColor("Blue");

              let buttonTicket = new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setCustomId('buttonDeleteTicket')
                    .setLabel('Delete')
                    .setStyle(ButtonStyle.Danger)
                );

              // Adding new field in function of ticket reason

              switch (Tickets.Reason) {
                case ("age_verification"):
                  TicketMessage.setTitle("Age Verification - Ticket")
                  TicketMessage.addFields({
                    name: "Instruction",
                    value: "* One picture of a valid gouvernemental paper (driving license, passport, etc.). You can blur everything except the DOB."
                      + "\n* A paper with the server name on it (" + interaction.guild.name + ") and your name underneath it (" + Tickets.AuthorUsername + ")"
                      + "\n* Place both right next to each other and take a picture displaying the **paper** and **ID**."
                  });

                  buttonTicket.addComponents(
                    new ButtonBuilder()
                      .setCustomId('buttonToAdd')
                      .setLabel('Verify')
                      .setStyle(ButtonStyle.Success)
                  );

                  break;
                case ("report"):
                  TicketMessage.setTitle("Report - Ticket")
                  TicketMessage.addFields({
                    name: "Instruction",
                    value: "* Provide the name (user#0000 or user) of the user you would like to report"
                      + "\n* The reason of the report"
                      + "\n* Evidence (if possible)."
                  });
                  break;
                case ("support"):
                  TicketMessage.setTitle("Support - Ticket")
                  TicketMessage.addFields({
                    name: "Instruction",
                    value: "* Ask any question away, we will try to answer your question the best we can."
                  });
                  break;
                case ("partnership"):
                  TicketMessage.setTitle("Partnership - Ticket")
                  TicketMessage.addFields({
                    name: "Instruction",
                    value: "* Invite link of your server?"
                      + "\n * What's your member count?"
                      + "\n * What is the theme of your server?"
                  });
                  break;
              };

              // Sending messsage in the ticket

              return channel.send({
                embeds: [TicketMessage],
                components: [buttonTicket],
              }).then(async (msg) => {
                msg.pin();

                // Mention the staff and ticket author

                return channel.send({
                  content: "<@" + Tickets.Author + ">" + interaction.user.toString(),
                }).then(async (secondmsg) => {
                  return setTimeout(() => {
                    secondmsg.delete()
                  }, 500);
                });
              });
            }).catch(() => { return });

            break;
          case ("unclaim_ticket"):

            // Checking for possible error or missing permission

            if (Tickets.ClaimedBy !== interaction.user.id) {
              return interaction.reply({
                content: MessageConfig.Ticket.unclaimingOwn,
                ephemeral: true,
              });
            }

            // Editing ticket message for staff

            interaction.channel.messages.fetch(interaction.message.id).then(async (message) => {
              const buttonClaimEdit = new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setCustomId('claim_ticket')
                    .setLabel('Claim')
                    .setStyle(ButtonStyle.Success)
                );

              let claimingTicketEdit = new EmbedBuilder()
                .setTitle("Ticket #" + Tickets.TicketCount)
                .addFields(
                  { name: "Author", value: "<@" + Tickets.Author + ">", inline: true },
                  { name: "Reason", value: message.embeds[0].fields[1].value, inline: true },
                  { name: "Status", value: MessageConfig.Ticket.Unclaim, inline: true },
                )
                .setColor("Yellow");

              await interaction.update({
                embeds: [claimingTicketEdit],
                components: [buttonClaimEdit],
              });
            }).catch((error) => { return console.log(error) });

            // Messaging the owner of the ticket

            findingMember ? memberInServer.send("Your ticket (<#" + Tickets.ChannelID + ">) have been unclaimed by: " + interaction.user.toString()).catch(() => { return }) : false;

            // Deleting the ticket channel

            await guildIn.channels.cache.get(Tickets.ChannelID).delete("Ticket unclaimed of " + Tickets.AuthorUsername + " by " + interaction.user.tag)

            // Updating database

            return await Ticket.update({
              ChannelID: null,
              ClaimedBy: null,
            }, { where: { MessageID: interaction.message.id } });


            break;
          case ("cancel_ticket"):

            // Destroy data in database

            await Tickets.destroy({ where: { GuildID: interaction.guild.id, MessageID: interaction.message.id } });

            // Delete ticket message

            interaction.channel.messages.fetch(interaction.message.id).then(async (message) => {
              await message.delete();
            }).catch(() => { return });

            // Decrement the ticket counter

            await TicketCountData.decrement('Count', { by: 1 });

            break;
        };
      };

      /* 
        Ticket System - (Created) Ticket Button
      */

      let createdTicket = [
        "buttonToAdd",
        "buttonDeleteTicket"
      ];

      if (createdTicket.includes(interaction.customId)) {
        let member = interaction.guild.members.cache.get(TicketEdit.Author);
        let ProfileCheck = await Profile.findOne({ where: { UserID: member.user.id } });

        // Checking for missing permission

        if (!isStaff | !manageChannelPermission | !TicketEdit) {
          return interaction.reply({
            content: messageRefusingAction,
            ephemeral: true,
          });
        }

        switch (interaction.customId) {
          case ("buttonToAdd"):

            // Giving role

            await member.roles.add("1084970943820075050", "Age Verification: Verified by " + interaction.user.tag).catch(() => { return });

            // Upadting profile

            ProfileCheck ? await Profile.update({ Verified18: true }, { where: { UserID: member.user.id } }) :
              await Profile.create({
                UserName: member.user.tag,
                UserID: member.user.id,
                Age: "Adult",
                Verified18: true,
              });

            // Sending message in ticket and channel

            return interaction.reply({
              content: member.toString() + " is now a **Verified 18+**"
            }).then(() => {
              let channel18 = interaction.guild.channels.cache.get("1091220263569461349")

              channel18.send({
                content: member.toString() + " is now part of the cum zone!"
              });
            });

            break;
          case ("buttonDeleteTicket"):
            bot.channels.cache.get(LoggingData.ChannelIDReceiveTicket).messages.fetch(TicketEdit.MessageID).then(async (message) => {
              let claimingTicketEdit = new EmbedBuilder()
                .setTitle("Ticket #" + TicketEdit.TicketCount)
                .addFields(
                  { name: "Author:", value: "<@" + TicketEdit.Author + ">", inline: true },
                  { name: "Reason:", value: message.embeds[0].fields[1].value, inline: true },
                  { name: "Status:", value: MessageConfig.Ticket.Done, inline: true },
                  { name: "Claimed by:", value: "<@" + TicketEdit.ClaimedBy + ">" }
                )
                .setColor("Green");

              await message.edit({
                embeds: [claimingTicketEdit],
                components: [],
              });
            }).catch(() => { return });

            // Messaging the owner of the ticket

            findingMember ? memberInServer.send("Your ticket (<#" + TicketEdit.ChannelID + ">) have been closed and deleted by: " + interaction.user.toString()).catch(() => { return }) : false;

            // Alerting of the deletion of the channel

            await interaction.reply({
              content: MessageConfig.Ticket.Delete,
            });

            // Destroy the channel after x seconds

            return setTimeout(async () => {
              await TicketEdit.destroy({ where: { GuildID: interaction.guild.id, ChannelID: interaction.channel.id } });

              return interaction.channel.delete();
            }, 3000);

            break;
        };
      };
    };

    let settingsId = [
      "adminButton",
      "welcomeButton",
      "languageButton",
      "channelButton",
      "autoRoleButton",
      "backAdminPage",
      "nextAdminPage2",
      "backSettingsMainMenu",
      "nextSettingsMenu2",
      "modButton",
      "utilitiesButton",
      "funButton"
    ];

    if (settingsId.includes(interaction.customId)) {
      if (interaction.isButton()) {
        let LoggingData = await Logging.findOne({ where: { GuildID: interaction.guild.id } });

        let backAdminButton = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('backAdminPage')
              .setLabel('◀️')
              .setStyle(ButtonStyle.Secondary),
          );

        LoggingData.ChannelIDWelcome !== null ? ChannelWelcomeStatus = "<#" + LoggingData.ChannelIDWelcome + ">" : ChannelWelcomeStatus = MessageConfig.Settings.Disabled;
        LoggingData.AutoRole !== null ? AutoRoleStatus = "<@&" + LoggingData.AutoRole + ">" : AutoRoleStatus = MessageConfig.Settings.Disabled;

        if (interaction.customId === "backSettingsMainMenu") {
          let settingsButton = new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
                .setCustomId('adminButton')
                .setLabel('⚒️')
                .setStyle(ButtonStyle.Success),
            )
            .addComponents(
              new ButtonBuilder()
                .setCustomId('modButton')
                .setLabel('🛡️')
                .setStyle(ButtonStyle.Success),
            )
            .addComponents(
              new ButtonBuilder()
                .setCustomId('utilitiesButton')
                .setLabel('🔧')
                .setStyle(ButtonStyle.Success),
            )
            .addComponents(
              new ButtonBuilder()
                .setCustomId('funButton')
                .setLabel('🎲')
                .setStyle(ButtonStyle.Success),
            ).addComponents(
              new ButtonBuilder()
                .setLabel('Support Server')
                .setURL(Config.SupportDiscord)
                .setStyle(ButtonStyle.Link),
            );

          let settingsMainMenu = new EmbedBuilder()
            .setTitle("⚙️ Settings")
            .setDescription("Click on the reaction according to what you want.")
            .addFields(
              { name: "⚒️ Administration", value: "View the page of the admin command/function." },
              { name: "🛡️ Moderation", value: "View the page of the moderation command/function." },
              { name: "🔧 Utilities", value: "View the page of the utilities command/function." },
              { name: "🎲 Fun", value: "View the page of the fun command/function." }
            )
            .setColor(Color.Blue)

          return interaction.update({
            embeds: [settingsMainMenu],
            components: [settingsButton]
          });
        }

        let adminMainPageButton = [
          "adminButton",
          "backAdminPage"
        ];

        if (adminMainPageButton.includes(interaction.customId)) {
          let adminButtonPage = new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
                .setCustomId('backSettingsMainMenu')
                .setLabel('◀️')
                .setStyle(ButtonStyle.Secondary),
            )
            .addComponents(
              new ButtonBuilder()
                .setCustomId('welcomeButton')
                .setLabel('👋')
                .setStyle(ButtonStyle.Success),
            )
            .addComponents(
              new ButtonBuilder()
                .setCustomId('languageButton')
                .setLabel('🗣️')
                .setStyle(ButtonStyle.Success),
            )
            .addComponents(
              new ButtonBuilder()
                .setCustomId('nextSettingsMenu2')
                .setLabel('▶️')
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(),
            );

          let adminPage = new EmbedBuilder()
            .setTitle("⚙️ Settings")
            .setDescription("Click on the reaction according to what you want.")
            .addFields(
              { name: "👋 Welcome", value: "Change/View the settings of the welcome system." },
              { name: "🗣️ Language", value: "Change/View the settings of the language system." },
            )
            .setColor(Color.Blue)

          return interaction.update({
            embeds: [adminPage],
            components: [adminButtonPage]
          });
        };

        {
          LoggingData.ChannelIDWelcome !== null ? ChannelWelcomeStatus = "<#" + LoggingData.ChannelIDWelcome + ">" : ChannelWelcomeStatus = MessageConfig.Settings.Disabled;
          LoggingData.AutoRole !== null ? AutoRoleStatus = "<@&" + LoggingData.AutoRole + ">" : AutoRoleStatus = MessageConfig.Settings.Disabled;

          switch (interaction.customId) {
            case ("welcomeButton"):
              let welcomeButtonPage = new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setCustomId('backAdminPage')
                    .setLabel('◀️')
                    .setStyle(ButtonStyle.Secondary),
                )
                .addComponents(
                  new ButtonBuilder()
                    .setCustomId('channelButton')
                    .setLabel('1️⃣')
                    .setStyle(ButtonStyle.Success),
                )
                .addComponents(
                  new ButtonBuilder()
                    .setCustomId('autoRoleButton')
                    .setLabel('2️⃣')
                    .setStyle(ButtonStyle.Success),
                )
                .addComponents(
                  new ButtonBuilder()
                    .setCustomId('nextAdminPage2')
                    .setLabel('▶️')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled()
                );

              let welcomePage = new EmbedBuilder()
                .setTitle("⚙️ Settings")
                .setDescription("Click on the reaction according to what you want.")
                .addFields(
                  { name: "1️⃣ Channel", value: "*Current:* " + ChannelWelcomeStatus },
                  { name: "2️⃣ Auto-Role", value: "*Current:* " + AutoRoleStatus }
                )
                .setColor(Color.Blue)

              return interaction.update({
                embeds: [welcomePage],
                components: [welcomeButtonPage]
              });
          }
        }

        let adminSecondPage = [
          "channelButton",
          "autoRoleButton"
        ];

        if (adminSecondPage.includes(interaction.customId)) {
          switch (interaction.customId) {
            case ("channelButton"):
              LoggingData.ChannelIDWelcome !== null ? Status = "<#" + LoggingData.ChannelIDWelcome + ">" : Status = MessageConfig.Settings.Disabled;
              NameInt = "channel";
              Mention = "<#";
              Description = "Please send the channel you want the welcome message to be sent.";
              UpdateLog = "ChannelIDWelcome";

              break;
            case ("autoRoleButton"):
              LoggingData.AutoRole !== null ? Status = "<@&" + LoggingData.AutoRole + ">" : Status = MessageConfig.Settings.Disabled;
              NameInt = "role";
              Mention = "<@&";
              Description = "Please send the role you want to be given when new member arrived in your server.";
              UpdateLog = "AutoRole";

              break;
          };

          let welcomePage2 = new EmbedBuilder()
            .setTitle("⚙️ Settings")
            .setDescription(Description)
            .addFields(
              { name: "Old " + NameInt, value: Status },
            )
            .setColor(Color.Blue)

          return interaction.update({
            embeds: [welcomePage2],
            components: [backAdminButton],
            fetchReply: true,
          }).then((msg) => {
            interaction.channel.awaitMessages({
              max: 1,
              time: 10000,
              errors: ['time'],
            }).then(async (collected) => {
              switch (interaction.customId) {
                case ("channelButton"):
                  idCollect = collected.first().mentions.channels.map(NameInt => NameInt.id);
                  idCollect2 = !collected.first().mentions.channels;
                  break;
                case ("autoRoleButton"):
                  idCollect = collected.first().mentions.roles.map(NameInt => NameInt.id);
                  idCollect2 = !collected.first().mentions.roles;
                  break;
              };

              if (idCollect2) {
                return interaction.followUp({
                  content: "Please mention a " + NameInt + ".",
                  ephemeral: true
                });
              };

              welcomePage2.addFields(
                { name: "New " + NameInt, value: Mention + idCollect[0] + ">" },
              );

              interaction.channel.messages.fetch(msg.id).then(async (msg) => {
                await msg.edit({
                  embeds: [welcomePage2],
                  components: [backAdminButton],
                });
              });

              return LoggingData.update({ UpdateLog: idCollect[0] }, { where: { GuildID: interaction.guild.id } });
            })//.catch(() => { return; })
          });
        }
      };
    };

  } catch (error) {
    let fetchGuild = interaction.client.guilds.cache.get(Config.guildId);
    let CrashChannel = fetchGuild.channels.cache.get(Config.CrashChannel);
    console.log(error);

    return CrashChannel.send({ content: "**Error in 'interactionCreate' Event:** \n\n```javascript\n" + error + "```" });
  };
});

bot.login(Config.token);