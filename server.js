const { TextInputStyle, ActionRowBuilder, ButtonStyle, ButtonBuilder, Partials, ActivityType, Client, GatewayIntentBits, EmbedBuilder, Collection, ModalBuilder, TextInputBuilder } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const Sequelize = require('sequelize');
const moment = require('moment');
const bot = new Client({
  allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
  intents: [
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

const configPreset = require('./config/main.json');
const message_preset = require('./config/message.json');

const fr = require('./languages/fr.json');
const en = require('./languages/en.json');
const de = require('./languages/de.json');
const sp = require('./languages/sp.json');
const nl = require('./languages/nl.json');

bot.commands = new Collection();

const sequelize = new Sequelize('database', 'user', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  storage: 'database.sqlite',
});

let date = new Date();

const Verification_Count = sequelize.define('Verification_Count', {
  guildId: {
    type: Sequelize.STRING,
    unique: false,
  },
  staffId: {
    type: Sequelize.STRING,
    unique: false,
  },
  staffTag: {
    type: Sequelize.STRING,
    unique: false,
  },
  verificationCount: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
});
const Verifier = sequelize.define('Verifier', {
  guildId: {
    type: Sequelize.STRING,
    unique: false,
  },
  userId: {
    type: Sequelize.STRING,
    unique: false,
  },
  userTag: {
    type: Sequelize.STRING,
    unique: false,
  },
  staffId: {
    type: Sequelize.STRING,
    unique: false,
  },
  staffTag: {
    type: Sequelize.STRING,
    unique: false,
  },
});
const Verification = sequelize.define('Verification', {
  guildId: {
    type: Sequelize.STRING,
    unique: false,
  },
  messageId: {
    type: Sequelize.STRING,
    unique: true,
  },
  userId: {
    type: Sequelize.STRING,
    unique: true
  },
  userTag: {
    type: Sequelize.STRING,
    unique: true
  },
  firstOption: {
    type: Sequelize.STRING,
    unique: false,
  },
  secondOption: {
    type: Sequelize.STRING,
    unique: false,
  },
  thirdOption: {
    type: Sequelize.STRING,
    unique: false
  },
  fourthOption: {
    type: Sequelize.STRING,
    unique: false,
  },
  fifthOption: {
    type: Sequelize.STRING,
    unique: false
  },
});
const Blacklist = sequelize.define('Blacklist', {
  userId: {
    type: Sequelize.STRING,
    unique: true,
  },
  userTag: {
    type: Sequelize.STRING,
    unique: true,
  },
  staffId: {
    type: Sequelize.STRING,
    unique: false,
  },
  staffTag: {
    type: Sequelize.STRING,
    unique: false,
  },
  reason: {
    type: Sequelize.STRING,
    unique: false,
  },
  evidence: {
    type: Sequelize.STRING,
    unique: false,
  },
  risk: {
    type: Sequelize.STRING,
    unique: false,
  },
  joinedServer: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
  joinedServerBan: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false,
  },
});
const ActionImage = sequelize.define('ActionImage', {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    primaryKey: true,
  },
  imageUrl: {
    type: Sequelize.STRING,
    unique: false,
  },
  category: {
    type: Sequelize.STRING,
    unique: false,
  },
  messageId: {
    type: Sequelize.STRING,
    unique: false,
  },
  userId: {
    type: Sequelize.STRING,
    unique: false,
  },
  userTag: {
    type: Sequelize.STRING,
    unique: false,
  },
});
const Logging = sequelize.define('Logging', {
  guildId: {
    type: Sequelize.STRING,
    unique: false,
  },
  channelId_Report: {
    type: Sequelize.STRING,
    unique: false,
  },
  channelId_Ban: {
    type: Sequelize.STRING,
    unique: false,
  },
  channelId_Verify: {
    type: Sequelize.STRING,
    unique: false,
  },
  channelId_AfterVerify: {
    type: Sequelize.STRING,
    unique: false,
  },
  channelId_Welcome: {
    type: Sequelize.STRING,
    unique: false,
  },
  roleAutoRoleId_Welcome: {
    type: Sequelize.STRING,
    unique: false,
  },
  staffRoleId_Report: {
    type: Sequelize.STRING,
    unique: false,
  },
  staffRoleId_Verify: {
    type: Sequelize.STRING,
    unique: false,
  },
  roleAddId_Verify: {
    type: Sequelize.STRING,
    unique: false,
  },
  roleRemoveId_Verify: {
    type: Sequelize.STRING,
    unique: false,
  },
  roleAddId_AgeVerified: {
    type: Sequelize.STRING,
    unique: false,
  },
  status_Blacklist: {
    type: Sequelize.STRING,
    unique: false,
  },
  channelId_Blacklist: {
    type: Sequelize.STRING,
    unique: false,
  },
  channelId_Warn: {
    type: Sequelize.STRING,
    unique: false,
  },
  channelId_Unban: {
    type: Sequelize.STRING,
    unique: false,
  },
  channelId_Kick: {
    type: Sequelize.STRING,
    unique: false,
  },
  channelId_ReceiveVerification: {
    type: Sequelize.STRING,
    unique: false,
  },
  status_BlacklistAutoban: {
    type: Sequelize.STRING,
    unique: false,
  },
  status_canActionMessage: {
    type: Sequelize.STRING,
    unique: false,
  },
  status_canActionImage: {
    type: Sequelize.STRING,
    unique: false,
  },
  channelId_Leaving: {
    type: Sequelize.STRING,
    unique: false,
  },
  channelId_TicketParent: {
    type: Sequelize.STRING,
    unique: false,
  },
  channelId_TicketReceive: {
    type: Sequelize.STRING,
    unique: false,
  },
});
const Permission = sequelize.define('Permission', {
  userId: {
    type: Sequelize.STRING,
  }
});
const Ticket = sequelize.define('Ticket', {
  guildId: {
    type: Sequelize.STRING,
    unique: true,
  },
  reason: {
    type: Sequelize.STRING,
  },
  messageId: {
    type: Sequelize.STRING,
    unique: true,
  },
  channelId: {
    type: Sequelize.STRING,
    unique: true,
  },
  userId: {
    type: Sequelize.STRING,
    unique: true,
  },
  userTag: {
    type: Sequelize.STRING,
  },
  claimedBy: {
    type: Sequelize.STRING,
    unique: true,
  },
  ticketCount: {
    type: Sequelize.STRING,
    unique: true,
  }
})
const TicketCount = sequelize.define('TicketCount', {
  guildId: {
    type: Sequelize.STRING,
  },
  count: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
  },
});
const Warns = sequelize.define('Warns')
const Profile = sequelize.define('Profile', {
  userId: {
    type: Sequelize.STRING,
    unique: false,
  },
  userTag: {
    type: Sequelize.STRING,
    unique: false,
  },
  age: {
    type: Sequelize.STRING,
    unique: false,
  },
  pronouns: {
    type: Sequelize.STRING,
    unique: false,
  },
  gender: {
    type: Sequelize.STRING,
    unique: false,
  },
  verified18: {
    type: Sequelize.STRING,
    unique: false,
  },
});
const CommandFunction = sequelize.define('CommandFunction', {
  name: {
    type: Sequelize.STRING,
  },
  value: {
    type: Sequelize.STRING,
  },
});

bot.once('ready', async () => {
  try {
    bot.user.setStatus('dnd')

    let counter = 0;

    setInterval(async function () {
      let memberCount = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
      let allServers = bot.guilds.cache.size;
      let blacklisted = await Blacklist.findAll({ attributes: ['userId'] });

      let Status = [
        `${memberCount} Members!`,
        `${allServers} Servers!`,
        `${blacklisted.length} Blacklisted Users!`,
        `Version ${configPreset.botInfo.version}`
      ]

      if (counter === Status.length) counter = 0;
      let statusChange = Status[counter];

      bot.user.setActivity(statusChange, { type: ActivityType.Watching });

      counter++;
    }, 5000)

    await Verification_Count.sync();
    await Verifier.sync();
    await Verification.sync();
    await Blacklist.sync();
    await Warns.sync();
    await Logging.sync();
    await ActionImage.sync();
    await Permission.sync();
    await Profile.sync();
    await CommandFunction.sync();
    await Ticket.sync();
    await TicketCount.sync();

    bot.guilds.cache.forEach(async (guild) => {
      let logging_data = await Logging.findOne({ where: { guildId: guild.id } });
      let ticket_data = await Ticket.findOne({ where: { guildId: guild.id } });

      if (!logging_data) {
        await Logging.create({
          guildId: guild.id,
        });
      } else if (!ticket_data) {
        await Ticket.create({
          guildId: guild.id,
        });
      };
    });

    return console.log(`${date.toLocaleString()} -> The bot is ready!`);
  } catch (error) {
    let fetchguildId = bot.guilds.cache.get(configPreset.botInfo.supportServerId);
    let crashchannelId = fetchguildId.channels.cache.get(configPreset.channelsId.crash);
    console.log(error);

    return crashchannelId.send({
      content: '**Error in the ready event:** \n\n```javascript\n' + error + '```'
    });
  };
});

bot.on('guildMemberAdd', async (newMember) => {
  let guild = bot.guilds.cache.get(newMember.guild.id);
  let logging_data = await Logging.findOne({ where: { guildId: guild.id } });

  switch (logging_data.language) {
    case ('en'):
      languageSet = en;
      break;
    case ('fr'):
      languageSet = fr;
      break;
    case ('de'):
      languageSet = de;
      break;
    case ('sp'):
      languageSet = sp;
      break;
    case ('nl'):
      languageSet = nl;
      break;
    default:
      languageSet = en;
      break;
  };

  try {
    let verifierData = await Verifier.findOne({ where: { userId: newMember.user.id } });
    let blacklistData = await Blacklist.findOne({ where: { userId: newMember.user.id } });

    ///////////////////////////////////
    //  Checking for welcome config  //
    ///////////////////////////////////


    if (logging_data.channelId_Welcome) {
      let lgWelcome = languageSet.welcomeMessage.message.embed.logs;

      // Check if the channel still exist
      let welcomeChannel = newMember.guild.channels.cache.get(logging_data.channelId_Welcome);
      if (!welcomeChannel) {
        return Logging.update({ channelId_Welcome: null }, { where: { guildId: guild.id } });
      };

      // Checking if the bot can send message in the channel
      let botPermission = newMember.guild.members.me.permissionsIn(logging_data.channelId_Welcome).has(['SendMessages', 'ViewChannel']);
      if (!botPermission | newMember.user.bot) return;

      // Creation of the message to send
      await welcomeChannel.send({
        content: [`${lgWelcome.description} ${newMember.user.toString()}!`],
      }).catch(() => { return });
    };

    if (logging_data.roleAutoRoleId_Welcome) {
      let botPermissionRole = newMember.guild.members.me.permissions.has('ManageRoles');
      let botPostion = newMember.roles.highest.position >= (await newMember.guild.members.fetch(configPreset.botPrivateInfo.botId)).roles.highest.position;

      if (botPermissionRole & botPostion) {
        return newMember.roles.add(logging_data.roleAutoRoleId_Welcome);
      };
    };

    ////////////////////////////////////////
    //  Checking for verification config  //
    ////////////////////////////////////////

    if (verifierData) {
      if (logging_data.roleAddId_Verify | logging_data.roleRemoveId_Verify) {
        await newMember.roles.add(logging_data.roleAddId_Verify);
        return newMember.roles.remove(logging_data.roleRemoveId_Verify);
      };
    };

    /////////////////////////////////////
    //  Checking for blacklist config  //
    /////////////////////////////////////

    if (blacklistData) {
      if (logging_data.status_Blacklist === 'Enabled' & logging_data.channelId_Blacklist) {
        // Check if the channel still exist
        let blacklistChannel = newMember.guild.channels.cache.get(logging_data.channelId_Blacklist);
        if (!blacklistChannel) {
          return Logging.update({ channelId_Blacklist: null }, { where: { guildId: guild.id } });
        };

        // Checking if the bot can send message in the channel
        let botPermission = newMember.guild.members.me.permissionsIn(logging_data.channelId_Blacklist).has(['SendMessages', 'ViewChannel']);
        if (botPermission) return;

        let blacklistEmbed = new EmbedBuilder()

        // Changing embed color in terms of the risk
        switch (blacklistData.risk) {
          case ('Low'):
            blacklistEmbed.setColor('57F287');
            break;
          case ('Medium'):
            blacklistEmbed.setColor('FEE75C');
            break;
          case ('High'):
            blacklistEmbed.setColor('ED4245');
            break;
          default:
            blacklistEmbed.setColor('FFFFFF');
            break;
        };

        // Creating the embed and sending the message
        blacklistEmbed.setTitle('<:BanHammer:997932635454197790> New Alert');
        blacklistEmbed.addFields(
          { name: 'User', value: newMember.user.toString(), inline: true },
          { name: 'reason', value: blacklistData.reason, inline: true },
          { name: 'Evidence', value: blacklistData.evidence, inline: true }
        );
        blacklistEmbed.setFooter({
          text: 'ID: ' + newMember.user.id
        });
        blacklistEmbed.setTimestamp();

        await blacklistChannel.send({
          embeds: [blacklistEmbed],
        });

        // Incrementing the join count in the database
        await blacklistData.increment('joinedServer', { by: 1 });

        // Check if the auto ban is on
        let autoBanResponse = languageSet.welcomeMessage.message.blacklist.autoBan;

        let riskLevel = [
          'Low',
          'Medium',
          'High'
        ];

        switch (logging_data.status_BlacklistAutoban) {
          case ('Low+'):
            if (riskLevel.includes(blacklistData.risk)) {
              // Incrementing the ban count in the database
              await blacklistData.increment('joinedServerBan');

              // Ban the member
              return newMember.guild.members.ban(blacklistData.userId, { reason: [blacklistData.reason + ' | ' + autoBanResponse] });
            };

            break;
          case ('Medium+'):
            if (blacklistData.risk === 'Medium' | blacklistData.risk === 'High') {
              // Incrementing the ban count in the database
              await blacklistData.increment('joinedServerBan');

              // Ban the member
              return newMember.guild.members.ban(blacklistData.userId, { reason: [blacklistData.reason + ' | ' + autoBanResponse] });
            };

            break;
          case ('High+'):
            if (blacklistData.risk === 'High') {
              // Incrementing the ban count in the database
              await blacklistData.increment('joinedServerBan');

              // Ban the member
              return newMember.guild.members.ban(blacklistData.userId, { reason: [blacklistData.reason + ' | ' + autoBanResponse] });
            };

            break;
          default:
            return; // Return nothing if it's not on
        };
      };
    };
  } catch (error) {
    let fetchguildId = bot.guilds.cache.get(configPreset.botInfo.supportServerId);
    let crashchannelId = fetchguildId.channels.cache.get(configPreset.channelsId.crash);
    console.log(error);

    return crashchannelId.send({
      content: '**Error in the guildMemberAdd event:** \n\n```javascript\n' + error + '```'
    });
  };
});

bot.on('guildMemberRemove', async (leavingMember) => {
  let guild = bot.guilds.cache.get(leavingMember.guild.id);
  let logging_data = await Logging.findOne({ where: { guildId: guild.id } });

  switch (logging_data.language) {
    case ('en'):
      languageSet = en;
      break;
    case ('fr'):
      languageSet = fr;
      break;
    case ('de'):
      languageSet = de;
      break;
    case ('sp'):
      languageSet = sp;
      break;
    case ('nl'):
      languageSet = nl;
      break;
    default:
      languageSet = en;
      break;
  }

  try {
    let ticket_data = await Ticket.findOne({ where: { guildId: guild.id, userId: leavingMember.user.id } });
    let ticket_count_data = await TicketCount.findOne({ where: { guildId: guild.id } });

    let lgLeaving = languageSet.leavingMessage.message.embed.logs;

    // Checking if they left the support discord and had permission
    if (guild.id === configPreset.botInfo.supportServerId) {
      return Permission.destroy({ where: { userId: leavingMember.user.id } });
    };

    if (logging_data.channelId_Leaving) {
      // Check if channel still exist
      let leavingChannel = leavingMember.guild.channels.cache.get(logging_data.channelId_Leaving);
      if (!leavingChannel) {
        return Logging.update({ channelId_Leaving: null }, { where: { guildId: guild.id } });
      };

      // Checking if the bot can send message in the channel
      let botPermission = leavingMember.guild.members.me.permissionsIn(logging_data.channelId_Leaving).has(['SendMessages', 'ViewChannel']);
      if (!botPermission | leavingMember.user.bot) return;

      // Get the member count of the server
      let memberCount = guild.members.cache.filter(leavingMember => !leavingMember.user.bot).size;

      // Creation of the message to send
      let leavingMemberEmbed = new EmbedBuilder()
        .setDescription(`${lgLeaving.description} ${leavingMember.toString()}!`)
        .addFields(
          { name: lgLeaving.fields.createdAt, value: moment(leavingMember.user.createdAt).format('Do MMMM YYYY hh:ss:mm A') },
          { name: lgLeaving.fields.joinedAt, value: moment(leavingMember.joinedAt).format('Do MMMM YYYY hh:ss:mm A') },
          { name: lgLeaving.fields.memberCount, value: memberCount }
        )
        .setColor('Green')
        .setFooter({
          text: leavingMember.user.id
        })
        .setThumbnail(leavingMember.user.displayAvatarURL());

      // Check if the verification is enable
      let verifierData = await Verifier.findOne({ where: { guildId: guild.id, userId: leavingMember.user.id } });
      verifierData ? statusVerification = en.leavingMessage.verificationEnable.isVerified : statusVerification = en.leavingMessage.verificationEnable.isVerified;

      if (logging_data.channelId_Verify) {
        leavingMemberEmbed.addFields(
          { name: lgLeaving.fields.statusVerification, value: statusVerification }
        );
      };

      return Channelguild.send({
        embeds: [leavingMemberEmbed]
      });
    };

    if (ticket_data) {
      // Check if the ticket channel still exist
      let ticket_channel = leavingMember.guild.channels.cache.get(ticket_data.channelId);
      if (ticket_channel) {

        await ticket_channel.delete('Ticket Canceled: Member left the server');
      };

      // Delete ticket message
      await bot.guilds.cache.get(leavingMember.guild.id).channels.cache.get(logging_data.channelId_TicketReceive).messages.fetch(ticket_data.messageId).then((message) => {
        message.delete();
      }).catch(() => { return })

      // Delete the data in the database
      await Ticket.destroy({ where: { guildId: guild.id, userId: leavingMember.user.id } });

      // Decrement the ticket counter
      return ticket_count_data.decrement('count', { by: 1 });
    };
  } catch (error) {
    let fetchguildId = bot.guilds.cache.get(configPreset.botInfo.supportServerId);
    let crashchannelId = fetchguildId.channels.cache.get(configPreset.channelsId.crash);
    console.log(error);

    return crashchannelId.send({
      content: '**Error in the guildMemberRemove event:** \n\n```javascript\n' + error + '```'
    });
  };
});

bot.on('guildBanAdd', async (bannedUser) => {
  try {
    let blacklistData = await Blacklist.findOne({ where: { userId: bannedUser.user.id } });

    if (blacklistData) {
      blacklistData.increment('joinedServerBan', { by: 1 })
    };
  } catch (error) {
    let fetchguildId = bot.guilds.cache.get(configPreset.botInfo.supportServerId);
    let crashchannelId = fetchguildId.channels.cache.get(configPreset.channelsId.crash);
    console.log(error);

    return crashchannelId.send({
      content: '**Error in the guildBanAdd event:** \n\n```javascript\n' + error + '```'
    });
  };
});

bot.on('userUpdate', async (oldUpdate, newUpdate) => {
  try {
    // Check if user changed is userTag or discriminator
    let changeOfUserTag = newUpdate.username !== oldUpdate.username;
    let changeOfDiscriminator = newUpdate.discriminator !== oldUpdate.discriminator;

    // Update if it has been changed
    if (changeOfUserTag | changeOfDiscriminator) {
      await Verifier.update({ staffTag: oldUpdate.tag }, { where: { staffId: oldUpdate.id } });
      return Blacklist.update({ staffTag: oldUpdate.tag }, { where: { staffId: oldUpdate.id } });
    };

  } catch (error) {
    let fetchguildId = bot.guilds.cache.get(configPreset.botInfo.supportServerId);
    let crashchannelId = fetchguildId.channels.cache.get(configPreset.channelsId.crash);
    console.log(error);


    return crashchannelId.send({
      content: '**Error in the userUpdate event:** \n\n```javascript\n' + error + '```'
    });
  };
});

bot.on('guildCreate', async (guild) => {
  try {
    let logging_data = await Logging.findOne({ where: { guildId: guild.id } });
    let ticket_data = await Ticket.findOne({ where: { guildId: guild.id } });

    let owner = await guild.fetchOwner();
    let blacklistData = await Blacklist.findOne({ where: { userId: owner.user.id } });

    let fetchguild = guild.client.guilds.cache.get(configPreset.botInfo.supportServerId);
    let newguildChannelId = fetchguild.channels.cache.get(configPreset.channelsId.botAdded);

    // Checking if the logging data or/and ticket data are missing
    if (!logging_data) {
      await Logging.create({
        guildId: guild.id,
      });
    } else if (!ticket_data) {
      await Ticket.create({
        guildId: guild.id,
      });
    }

    // Checking if the owner is blacklisted
    blacklistData ? isBlacklisted = 'Yes' : isBlacklisted = 'No';

    // Making the embed and sending it
    let newguildEmbed = new EmbedBuilder()
      .setTitle('Bot Added')
      .addFields(
        { name: 'Server Name', value: guild.name.toString(), inline: true },
        { name: 'Server ID', value: guild.id.toString(), inline: true },
        { name: 'Member Count', value: guild.memberCount.toString(), inline: true },
        { name: 'Owner Name', value: owner.user.tag.toString(), inline: true },
        { name: 'Owner ID', value: owner.user.id.toString(), inline: true },
        { name: 'Owner Blacklisted', value: isBlacklisted, inline: true },
      )
      .setColor('Green');

    return newguildChannelId.send({
      embeds: [newguildEmbed]
    });

  } catch (error) {
    let fetchguildId = bot.guilds.cache.get(configPreset.botInfo.supportServerId);
    let crashchannelId = fetchguildId.channels.cache.get(configPreset.channelsId.crash);
    console.log(error);

    return crashchannelId.send({
      content: '**Error in the guildCreate event:** \n\n```javascript\n' + error + '```'
    });
  };
});

bot.on('guildDelete', async (guild) => {
  try {
    let owner = await guild.fetchOwner();
    let blacklistData = await Blacklist.findOne({ where: { userId: owner.user.id } });

    let fetchguild = guild.client.guilds.cache.get(configPreset.botInfo.supportServerId);
    let deleteguildChannelId = fetchguild.channels.cache.get(configPreset.channelsId.botRemoved);

    // Checking if the owner is blacklisted
    blacklistData ? isBlacklisted = 'Yes' : isBlacklisted = 'No';

    // Making the embed and sending it
    let removeguildEmbed = new EmbedBuilder()
      .setTitle('Bot Removed')
      .addFields(
        { name: 'Server Name', value: guild.name.toString(), inline: true },
        { name: 'Server ID', value: guild.id.toString(), inline: true },
        { name: 'Member Count', value: guild.memberCount.toString(), inline: true },
        { name: 'Owner Name', value: owner.user.tag.toString(), inline: true },
        { name: 'Owner ID', value: owner.user.id.toString(), inline: true },
        { name: 'Owner Blacklisted', value: isBlacklisted, inline: true },
      )
      .setColor('Red');

    return deleteguildChannelId.send({
      embeds: [removeguildEmbed]
    });

  } catch (error) {
    let fetchguildId = bot.guilds.cache.get(configPreset.botInfo.supportServerId);
    let crashchannelId = fetchguildId.channels.cache.get(configPreset.channelsId.crash);
    console.log(error);

    return crashchannelId.send({
      content: '**Error in the guildDelete event:** \n\n```javascript\n' + error + '```'
    });
  };
});

bot.on('messageCreate', async (message) => {
  let logging_data = await Logging.findOne({ where: { guildId: message.guild.id } });

  switch (logging_data.language) {
    case ('en'):
      languageSet = en;
      break;
    case ('fr'):
      languageSet = fr;
      break;
    case ('de'):
      languageSet = de;
      break;
    case ('sp'):
      languageSet = sp;
      break;
    case ('nl'):
      languageSet = nl;
      break;
    default:
      languageSet = en;
      break;
  }

  try {
    // File Path
    let commandsPath = path.join(__dirname, 'commands_noslash');
    let commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (let file of commandFiles) {
      let filePath = path.join(commandsPath, file);
      let command = require(filePath);
      bot.commands.set(command.name, command);
    };

    // Prefix setup
    logging_data.prefix ? prefixSet = logging_data.prefix : prefixSet = configPreset.botInfo.messagePrefix;

    // Not answering the message if it's a bot or not using the prefix
    if (message.author.bot || message.content.indexOf(prefixSet) !== 0) return;

    // Setting up the command
    let args = message.content.slice(prefixSet.length).trim().split(/ +/);
    let command = args.shift().toLowerCase();
    let statusCommand = await CommandFunction.findOne({ where: { name: command } });

    if (!statusCommand) {
      await CommandFunction.create({
        name: command,
        value: true,
      });
    } else {
      if (statusCommand.value === false | !message.guild) {
        !message.guild ?
          refusingAction = languageSet.default.serverOnly :
          refusingAction = languageSet.default.commandDisabledGlobally;

        return interaction.reply({
          content: refusingAction,
          ephemeral: true,
        });
      };
    };

    switch (command) {
      case (en.cmd.default.name):
        return bot.commands.get(en.cmd.default.name).execute(bot, message, args, sequelize, Sequelize);
      case (en.language.default.name):
        return bot.commands.get(en.language.default.name).execute(bot, message, args, sequelize, Sequelize);
      case (en.data.default.name):
        return bot.commands.get(en.data.default.name).execute(bot, message, args, sequelize, Sequelize);
      case (en.ban.default.name):
        return bot.commands.get(en.ban.default.name).execute(bot, message, args, EmbedBuilder, sequelize, Sequelize);
      case (en.unban.default.name):
        return bot.commands.get(en.unban.default.name).execute(bot, message, args, EmbedBuilder, sequelize, Sequelize);
      case (en.ticket.default.name):
        return bot.commands.get(en.ticket.default.name).execute(bot, message, args, EmbedBuilder, sequelize, Sequelize);
    };
  } catch (error) {
    let fetchguildId = bot.guilds.cache.get(configPreset.botInfo.supportServerId);
    let crashchannelId = fetchguildId.channels.cache.get(configPreset.channelsId.crash);
    console.log(`${message.author.id} -> ${message.author.username}`);
    console.log(error);

    await message.reply({
      content: languageSet.default.errorOccured,
    });

    return crashchannelId.send({
      content: '**Error in the messageCreate event:** \n\n```javascript\n' + error + '```'
    });
  };
});

bot.on('messageCreate', async (message) => {
  let logging_data = await Logging.findOne({ where: { guildId: message.guild.id } });

  switch (logging_data.language) {
    case ('en'):
      languageSet = en;
      break;
    case ('fr'):
      languageSet = fr;
      break;
    case ('de'):
      languageSet = de;
      break;
    case ('sp'):
      languageSet = sp;
      break;
    case ('nl'):
      languageSet = nl;
      break;
    default:
      languageSet = en;
      break;
  }

  try {
    let member = message.interaction.user.id;

    if (message.embeds[0].description.startsWith('Bump')) {
      await message.channel.send({
        content: `${languageSet.bump.message.thanks_first} <@${member}> ${languageSet.bump.message.thanks_second}`
      });

      return setTimeout(async () => {
        let bumpTimeEmbed = new EmbedBuilder()
          .setTitle(languageSet.bump.message.embed.title)
          .setURL(`https://disboard.org/server/${message.guild.id}`)
          .setDescription(languageSet.bump.message.embed.description)
          .setColor('Blue');

        return message.channel.send({
          content: `<@${member}>`,
          embeds: [bumpTimeEmbed]
        });
      }, 7200000);
    };
  } catch (error) { return };
});

bot.on('interactionCreate', async (interaction) => {
  let logging_data = await Logging.findOne({ where: { guildId: interaction.guild.id } });

  switch (logging_data.language) {
    case ('en'):
      languageSet = en;
      break;
    case ('fr'):
      languageSet = fr;
      break;
    case ('de'):
      languageSet = de;
      break;
    case ('sp'):
      languageSet = sp;
      break;
    case ('nl'):
      languageSet = nl;
      break;
    default:
      languageSet = en;
      break;
  }

  try {
    // File Path
    let commandsPath = path.join(__dirname, 'commands');
    let commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (let file of commandFiles) {
      let filePath = path.join(commandsPath, file);
      let command = require(filePath);
      bot.commands.set(command.data.name, command);
    };

    // Checking if it's an existing interaction command
    if (!interaction.isCommand()) return;

    let command = bot.commands.get(interaction.commandName);
    let statusCommand = await CommandFunction.findOne({ where: { name: interaction.commandName } });

    if (!statusCommand) {
      await CommandFunction.create({
        name: interaction.commandName,
        value: true,
      });
    } else {
      if (statusCommand.value === false | !interaction.guild) {
        refusingAction = languageSet.default.commandDisabledGlobally;
        !interaction.guild ? refusingAction = languageSet.default.serverOnly : false;

        return interaction.reply({
          content: refusingAction,
          ephemeral: true,
        });
      };
    };

    // Execute the command
    return command.execute(interaction, bot, sequelize, Sequelize);
  } catch (error) {
    let fetchguildId = bot.guilds.cache.get(configPreset.botInfo.supportServerId);
    let crashchannelId = fetchguildId.channels.cache.get(configPreset.channelsId.crash);
    console.log(`${interaction.user.id} -> ${interaction.user.username}`);
    console.log(error);

    await interaction.reply({
      content: en.default.errorOccured,
      ephemeral: true,
    });

    return crashchannelId.send({
      content: '**Error in the interactionCreate event:** \n\n```javascript\n' + error + '```'
    });
  };
});

bot.on('interactionCreate', async (interaction) => {
  if (!interaction.guild) return;

  let logging_data = await Logging.findOne({ where: { guildId: interaction.guild.id } });
  let guild = bot.guilds.cache.get(interaction.guild.id);

  switch (logging_data.language) {
    case ('en'):
      languageSet = en;
      break;
    case ('fr'):
      languageSet = fr;
      break;
    case ('de'):
      languageSet = de;
      break;
    case ('sp'):
      languageSet = sp;
      break;
    case ('nl'):
      languageSet = nl;
      break;
    default:
      languageSet = en;
      break;
  }

  try {
    ///////////////////////////
    //  Verification System  //
    ///////////////////////////
    let verification_id = [
      'buttonToVerify',
      'buttonToAcceptVerify',
      'buttonToDenyVerify',
      'verificationModal',
      'reasonDeny'
    ];

    if (verification_id.includes(interaction.customId)) {
      let verificationData = await Verification.findOne({ where: { guildId: interaction.guild.id, userId: interaction.user.id } });
      let lgVerification = en.verification.buttonToVerify;

      if (interaction.isButton()) {

        // Checking if the bot has permission to manage role
        if (!interaction.guild.members.me.permissions.has('ManageRoles')) {
          return interaction.reply({
            content: en.default.userPermission.role,
          });
        };

        let verificationMessageData = await Verification.findOne({ where: { messageId: interaction.message.id } });
        let verification_CountData = await Verification_Count.findOne({ where: { staffId: interaction.user.id, guildId: interaction.guild.id } });
        let staff = interaction.user.toString();

        switch (interaction.customId) {
          case ('buttonToVerify'):
            if (interaction.member.roles.cache.some(role => role.id === logging_data.roleAddId_Verify)) {
              return interaction.reply({
                content: lgVerification.alreadyVerified,
                ephemeral: true,
              });
            };

            let modalVerification = new ModalBuilder()
              .setCustomId('verificationModal')
              .setTitle(lgVerification.modal.title);

            let firstOption = new TextInputBuilder()
              .setCustomId('firstOption')
              .setLabel(lgVerification.modal.firstOption.label)
              .setPlaceholder(lgVerification.modal.firstOption.placeholder)
              .setStyle(TextInputStyle.Short)
              .setRequired();

            let firstOptionRow = new ActionRowBuilder().addComponents(firstOption);

            let secondOption = new TextInputBuilder()
              .setCustomId('secondOption')
              .setLabel(lgVerification.modal.secondOption.label)
              .setPlaceholder(lgVerification.modal.secondOption.placeholder)
              .setStyle(TextInputStyle.Short)
              .setRequired();

            let secondOptionRow = new ActionRowBuilder().addComponents(secondOption);

            let thirdOption = new TextInputBuilder()
              .setCustomId('thirdOption')
              .setLabel(lgVerification.modal.thirdOption.label)
              .setPlaceholder(lgVerification.modal.thirdOption.placeholder)
              .setStyle(TextInputStyle.Paragraph)
              .setRequired();

            let thirdOptionRow = new ActionRowBuilder().addComponents(thirdOption);

            let fourthOption = new TextInputBuilder()
              .setCustomId('fourthOption')
              .setLabel(lgVerification.modal.fourthOption.label)
              .setPlaceholder(lgVerification.modal.fourthOption.placeholder)
              .setStyle(TextInputStyle.Paragraph)
              .setRequired();

            let fourthOptionRow = new ActionRowBuilder().addComponents(fourthOption);

            let fifthOption = new TextInputBuilder()
              .setCustomId('fifthOption')
              .setLabel(lgVerification.modal.fourthOption.label)
              .setPlaceholder(lgVerification.modal.fourthOption.placeholder)
              .setStyle(TextInputStyle.Paragraph)
              .setRequired();

            let fifthOptionRow = new ActionRowBuilder().addComponents(fifthOption);

            modalVerification.addComponents(firstOptionRow, secondOptionRow, thirdOptionRow, fourthOptionRow, fifthOptionRow);

            return interaction.showModal(modalVerification);
        };

        // Checking if the verification/message exist
        if (!verificationMessageData) return;

        // Checking if the member is still in the guild
        if (!guild.members.cache.find(member => member.id === verificationData.userId)?.id) {
          interaction.channel.messages.fetch(verficationData.messageId).then(async (message) => {
            verificationEmbed.setColor('Grey')

            await interaction.update({
              content: `<@&${logging_data.staffRoleId_Verify}> | ${languageSet.verification.reply.default} <@${verificationData.userId}> ${languageSet.verification.reply.cancelled}`,
              embeds: [verificationEmbed],
              components: [],
            })

            return Verification.destroy({ where: { messageId: message.id } });
          })
        }

        let verificationEmbed = new EmbedBuilder()
          .addFields(
            { name: lgVerification.modal.firstOption.label, value: verificationData.firstOption },
            { name: lgVerification.modal.secondOption.label, value: verificationData.secondOption },
            { name: lgVerification.modal.thirdOption.label, value: verificationData.thirdOption },
            { name: lgVerification.modal.fourthOption.label, value: verificationData.fourthOption },
            { name: lgVerification.modal.fifthOption.label, value: verificationData.fifthOption },
          )
          .setTimestamp()
          .setFooter(
            { text: `ID: ${verificationData.userId}` }
          )

        switch (interaction.customId) {
          case ('buttonToAcceptVerify'):
            // Verify the member
            let member = interaction.guild.members.cache.get(verificationData.userId);
            await member.roles.add(logging_data.roleAddId_Verify, `${languageSet.verification.buttonToAcceptVerify.roleAdd} ${interaction.user.tag}`);

            // Checking if user had a role to remove
            logging_data.roleRemoveId_Verify ? await member.roles.remove(logging_data.roleRemoveId_Verify) : false;

            // Check if the channel still exist
            if (!newMember.guild.channels.cache.get(logging_data.channelId_Verify)) {
              return Logging.update({ channelId_Verify: null }, { where: { guildId: guild.id } });
            };

            // Editing message
            interaction.channel.messages.fetch(interaction.message.id).then(async () => {
              verificationEmbed.setColor('Green')

              await interaction.update({
                content: `<@&${logging_data.staffRoleId_Verify}> | ${languageSet.verification.reply.default} <@${verificationData.userId}> ${languageSet.verification.reply.accepted} ${staff}`,
                embeds: [verificationEmbed],
                components: [],
              });
            });

            // Sending welcome message in a channel
            await interaction.guild.channels.cache.get(logging_data.channelId_AfterVerify).send({
              content: `${languageSet.verification.buttonToAcceptVerify.welcomeMessage} <@${verificationData.userId}> ${languageSet.verification.buttonToAcceptVerify.guildWelcomeMessage} ${guild.name}!`,
            });

            // Creating or incrementing the verification counter
            if (verification_CountData) {
              if (verification_CountData.guildId === interaction.guild.id) {
                await verification_CountData.increment('verificationCount');
              };
            } else {
              await Verification_Count.create({
                staffId: interaction.user.id,
                staffTag: interaction.user.tag,
                guildId: interaction.guild.id,
              });
            };

            // Create log of the verification in the database
            await Verifier.create({
              userTag: verificationData.userTag,
              userId: verificationData.userId,
              staffTag: interaction.user.tag,
              staffId: interaction.user.id,
              guildId: interaction.guild.id,
            });

            // Deleting the verification
            return Verification.destroy({ where: { messageId: interaction.message.id } });
          case ('buttonToDenyVerify'):
            // Editing message 
            interaction.channel.messages.fetch(interaction.message.id).then(async () => {
              verificationEmbed.setColor('Red');

              await interaction.update({
                content: `<@&${logging_data.staffRoleId_Verify}> | ${languageSet.verification.reply.default} <@${verificationData.userId}> ${languageSet.verification.reply.denied} ${staff}`,
                embeds: [verificationEmbed],
                components: [],
              });
            });

            // Waiting for answer to send reason to member
            let filter = message => message.userId.id === interaction.user.id;
            await interaction.channel.awaitMessages({ filter, max: 1, time: 30000 }).then(async (response) => {
              response.delete();

              let reason = response.first().content.toString();
              let memberToDm = bot.users.cache.get(VerificationLog.userId);

              await memberToDm.send({
                content: `${languageSet.verification.buttonToDenyVerify.reason} *${reason}*`,
              });
            });

            // Destroy the verification data
            return Verification.destroy({ where: { messageId: interaction.message.id } });
        };
      };

      if (interaction.isModalSubmit()) {
        switch (interaction.customId) {
          case ('verificationModal'):
            // Checking if the member is already waiting for a verification
            if (verificationData) {
              return interaction.reply({
                content: languageSet.verification.modalSubmit.waiting,
                ephemeral: true,
              });
            };

            let firstOption = interaction.fields.getTextInputValue('firstOption');
            let secondOption = interaction.fields.getTextInputValue('secondOption');
            let thirdOption = interaction.fields.getTextInputValue('thirdOption');
            let fourthOption = interaction.fields.getTextInputValue('fourthOption');
            let fifthOption = interaction.fields.getTextInputValue('fifthOption');

            let buttonVerify = new ActionRowBuilder()
              .addComponents(
                new ButtonBuilder()
                  .setCustomId('buttonToAcceptVerify')
                  .setLabel(languageSet.verification.modalSubmit.accept)
                  .setStyle(ButtonStyle.Success),
              )
              .addComponents(
                new ButtonBuilder()
                  .setCustomId('buttonToDenyVerify')
                  .setLabel(languageSet.verification.modalSubmit.deny)
                  .setStyle(ButtonStyle.Danger),
              );

            let verificationEmbed = new EmbedBuilder()
              .addFields(
                { name: lgVerification.modal.firstOption.label, value: firstOption },
                { name: lgVerification.modal.secondOption.label, value: secondOption },
                { name: lgVerification.modal.thirdOption.label, value: thirdOption },
                { name: lgVerification.modal.fourthOption.label, value: fourthOption },
                { name: lgVerification.modal.fifthOption.label, value: fifthOption },
              )
              .setTimestamp()
              .setFooter(
                { text: `ID: ${interaction.user.id}` }
              )
              .setColor('Blue')

            let channelForVerification = interaction.guild.channels.cache.get(logging_data.channelId_ReceiveVerification);

            await channelForVerification.send({
              content: `<@&${logging_data.staffRoleId_Verify}> | ${languageSet.verification.reply.default} ${interaction.user.toString()}`,
              embeds: [verificationEmbed],
              components: [buttonVerify],
            }).then(async (sent) => {
              await Verification.create({
                guildId: interaction.guild.id,
                messageId: sent.id,
                userId: interaction.user.id,
                userTag: interaction.user.tag,
                firstOption: firstOption,
                secondOption: secondOption,
                thirdOption: thirdOption,
                fourthOption: fourthOption,
                fifthOption: fifthOption,
              })

              return interaction.reply({
                content: languageSet.verification.modalSubmit.received,
                ephemeral: true,
              });
            });
        };
      };
    };

    /////////////////////
    //  Action System  //
    /////////////////////

    let action_id = [
      'acceptSuggestionAction',
      'denySuggestionAction'
    ];

    if (interaction.isButton() & action_id.includes(interaction.customId)) {
      let actionImageData = await ActionImage.findOne({ where: { messageId: interaction.message.id } });

      if (!actionImageData) return;

      // Making the embed
      let suggestionEmbed = new EmbedBuilder()
        .addFields(
          { name: 'Category', value: actionImageData.category, inline: true },
          { name: 'User', value: `${actionImageData.userTag}`, inline: true },
          { name: 'ID', value: `${actionImageData.userId}`, inline: true },
          { name: 'Image URL', value: `${actionImageData.imageUrl}`, inline: true },
        )
        .setImage(interaction.message.embeds[0].image.url);

      // Fetching the message to edit it
      interaction.channel.messages.fetch(interaction.message.id).then(async () => {
        // Checking for the interaction name and sending the appropriate response
        switch (interaction.customId) {
          case ('acceptSuggestionAction'):
            actionUpdate = await ActionImage.update({ ImageURL: interaction.message.embeds[0].image.url }, { where: { messageId: interaction.message.id } });

            suggestionEmbed.addFields(
              { name: 'Status', value: 'Accepted' }
            )
            suggestionEmbed.setColor('Green')

            response = `The image (${actionImageData.id}) you suggested has been denied. Thank you for your contribution!`

            break;
          case ('denySuggestionAction'):
            actionUpdate = await ActionImage.destroy({ where: { messageId: interaction.message.id } });

            suggestionEmbed.addFields(
              { name: 'Status', value: 'Denied' },
            )
            suggestionEmbed.setColor('Red')

            response = `The image (${actionImageData.id}) you suggested has been denied.`

            break;
        };

        await bot.users.cache.get(actionImageData.userId).send({
          content: response,
        });

        await interaction.update({
          embeds: [suggestionEmbed],
          components: []
        });

        return actionUpdate;
      });
    };

    /////////////////////
    //  Ticket System  //
    /////////////////////

    let ticket_id = [
      'age_verification',
      'report',
      'support',
      'partnership',
      'claim_ticket',
      'unclaim_ticket',
      'cancel_ticket',
      'buttonToAdd',
      'buttonDeleteTicket',
    ];

    if (interaction.isButton() && ticket_id.includes(interaction.customId)) {
      // Database Find
      let ticket_data = await Ticket.findOne({ where: { guildId: interaction.guild.id, userId: interaction.user.id } });
      let ticket_message_data = await Ticket.findOne({ where: { guildId: interaction.guild.id, messageId: interaction.message.id } });
      let ticket_channel_data = await Ticket.findOne({ where: { guildId: interaction.guild.id, channelId: interaction.channel.id } });
      let ticket_count_data = await TicketCount.findOne({ where: { guildId: interaction.guild.id } });

      // Permission Check
      let permission_manage_channels = interaction.guild.members.me.permissions.has('ManageChannels');

      // Role Check
      let staff_role = interaction.member.roles.cache.some(role => role.id === '1083475130241523852');
      let executive_role = interaction.member.roles.cache.some(role => role.id === '1191482864156557332');
      let admin_role = interaction.member.roles.cache.some(role => role.id === '1082104096959504404');
      let verified_role = interaction.member.roles.cache.some(role => role.id === '1084970943820075050');
      let partner_role = interaction.member.roles.cache.some(role => role.id === '1088952912610328616');

      // Errors
      !ticket_message_data ?
        return_error = message_preset.ticket.unknownMessage :
        return_error = message_preset.ticket.error; // Check if the message data exist in db
      !permission_manage_channels ?
        return_error = message_preset.ticket.cantManageChannels :
        return_error = message_preset.ticket.error; // Check if he has permission to manage channels
      !staff_role ?
        return_error = message_preset.ticket.isNotStaff :
        return_error = message_preset.ticket.error; // Check if the person claiming the ticket is a staff
      verified_role | staff_role | partner_role ?
        messageRefusingTicket = message_preset.ticket.refusingToCreateVerified :
        messageRefusingTicket = message_preset.ticket.error; // Check if the member is already verified

      function return_error_func() {
        return interaction.reply({
          content: messageRefusingTicket,
          ephemeral: true,
        });
      };

      switch (interaction.customId) {
        case ('age_verification'):
          if (staff_role | verified_role) {
            return_error_func();
          };

          reasonTicketChange = 'Age Verification';
          ping = '<@&1105937890011250872> & <@&1191482864156557332>';
          break;
        case ('report'):
          if (staff_role | verified_role) {
            return_error_func();
          };

          reasonTicketChange = 'Report';
          ping = '<@&1083475130241523852>';
          break;
        case ('support'):
          if (staff_role | verified_role) {
            return_error_func();
          };

          reasonTicketChange = 'Support';
          ping = '<@&1083475130241523852>';
          break;
        case ('partnership'):
          if (partner_role | verified_role) {
            return_error_func();
          };

          reasonTicketChange = 'Partnership';
          ping = '<@&1191482864156557332>';
          break;
      };

      //////////////////////////////////////////
      //   Ticket System - Button for Reason  //
      //////////////////////////////////////////

      let buttonReasonTicket = [
        'age_verification',
        'report',
        'support',
        'partnership',
      ];

      if (buttonReasonTicket.includes(interaction.customId)) {
        let channelToReceiveTicket = interaction.guild.channels.cache.get(logging_data.channelId_TicketReceive);

        // Check if there's not an existing ticket
        if (ticket_data) {
          if (ticket_data.reason === interaction.customId) {
            return interaction.reply({
              content: message_preset.ticket.waiting,
              ephemeral: true,
            });
          };
        };

        // Increase the ticket counter or create a ticket counter for the server
        !ticket_count_data ? await TicketCount.create({ guildId: interaction.guild.id }) : await ticket_count_data.increment('count');

        // Creation of the ticket
        await Ticket.create({
          guildId: interaction.guild.id,
          reason: interaction.customId,
          ticketCount: ticket_count_data.count,
          userId: interaction.user.id,
          userTag: interaction.user.tag,
        });

        // Send the message to the member that the ticket has been created/waiting to be claimed
        await interaction.reply({
          content: message_preset.ticket.created,
          ephemeral: true,
        });

        // Creation of claim and cancel buttons
        let buttonClaim = new ActionRowBuilder()
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

        // Creation of the ticket embed
        let claimingTicket = new EmbedBuilder()
          .setTitle(`Ticket #${ticket_count_data.count}`)
          .addFields(
            { name: 'Member', value: interaction.user.toString(), inline: true },
            { name: 'Reason', value: reasonTicketChange, inline: true },
            { name: 'Status', value: message_preset.ticket.unclaim, inline: true },
          )
          .setColor('Yellow');

        // Sending ticket message in channel
        return channelToReceiveTicket.send({
          embeds: [claimingTicket],
          content: ping,
          components: [buttonClaim],
        }).then(async (message) => {
          await Ticket.update({
            messageId: message.id
          }, {
            where: {
              guildId: interaction.guild.id,
              userId: interaction.user.id,
              reason: interaction.customId,
            }
          });
        }).catch(() => { return });
      };

      ////////////////////////////////////////////////////////
      //  Ticket System - Button Claim, Unclaim and Cancel  //
      ////////////////////////////////////////////////////////

      let button_claim_ticket = [
        'claim_ticket',
        'unclaim_ticket',
        'cancel_ticket'
      ];

      let created_ticket = [
        'buttonToAdd',
        'buttonDeleteTicket'
      ];

      let user_id = interaction.message.embeds[0].fields[0].value.replace('>', '').replace('<@', '');
      let member_in_guild = guild.members.cache.find(member => member.id === user_id);

      async function cancel_func() {
        if (created_ticket.includes(interaction.customId)) {
          // Check if member is still in guild
          if (member_in_guild & ticket_data) {
            // Delete ticket message
            await bot.guilds.cache.get(interaction.guild.id).channels.cache.get(logging_data.channelId_TicketReceive).messages.fetch(ticket_channel_data.messageId).then((message) => {
              message.delete();
            }).catch(() => { return });
          };
        };

        // Decrement the ticket counter
        await ticket_count_data.decrement('count', { by: 1 });

        // Delete the ticket channel if there is one created
        let ticket_channel = interaction.guild.channels.cache.get(interaction.channel.id);
        if (ticket_channel) {
          await ticket_channel.delete('Error: Member left the server or error with database');
        };

        // Delete the data in the database
        return Ticket.destroy({
          where: {
            guildId: guild.id,
            userId: user_id,
          },
        });
      };

      if (button_claim_ticket.includes(interaction.customId)) {
        // Checking if the member is still in the guild
        if (!member_in_guild) return cancel_func();

        let findingMember = guild.members.cache.get(ticket_message_data.userId);
        let memberInServer = bot.users.cache.get(ticket_message_data.userId);

        // Checking for missing permission
        if (!staff_role | !permission_manage_channels | !ticket_message_data) {
          return interaction.reply({
            content: return_error,
            ephemeral: true,
          });
        }

        // Checking ticket reason and permission of staff
        switch (ticket_message_data.reason) {
          case ('age_verification'):
            if (!admin_role & !executive_role) {
              return interaction.reply({
                content: message_preset.ticket.cantAgeVerify,
                ephemeral: true,
              });
            };

            break;
          case ('partnership'):
            if (!executive_role) {
              return interaction.reply({
                content: message_preset.ticket.cantPartnership,
                ephemeral: true,
              });
            };

            break;
        };

        switch (interaction.customId) {
          case ('claim_ticket'):
            // Checking for possible error or missing permission
            if (ticket_message_data.userId === interaction.user.id) {
              return interaction.reply({
                content: message_preset.ticket.own,
                ephemeral: true,
              });
            };

            // Editing ticket message for staff
            interaction.channel.messages.fetch(interaction.message.id).then(async (message) => {
              let buttonClaimEdit = new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setCustomId('unclaim_ticket')
                    .setLabel('Unclaim')
                    .setStyle(ButtonStyle.Danger)
                );

              let ticketEmbed = new EmbedBuilder()
                .setTitle('Ticket #' + ticket_message_data.ticketCount)
                .addFields(
                  { name: 'Member', value: `<@${ticket_message_data.userId}>`, inline: true },
                  { name: 'Reason', value: message.embeds[0].fields[1].value, inline: true },
                  { name: 'Status', value: message_preset.ticket.claim, inline: true },
                  { name: 'Claimed by', value: interaction.user.toString() }
                )
                .setColor('Blue');

              await interaction.update({
                embeds: [ticketEmbed],
                components: [buttonClaimEdit],
              });
            }).catch(() => { return });

            // Updating database
            await Ticket.update({
              claimedBy: interaction.user.id,
            }, { where: { guildId: interaction.guild.id, messageId: interaction.message.id } });

            // Creating the ticket channel
            return interaction.guild.channels.create({
              name: ticket_message_data.reason + '-' + ticket_message_data.ticketCount,
              type: 0,
              parent: logging_data.channelId_TicketParent,
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
                id: ticket_message_data.userId,
                allow: ['ViewChannel', 'SendMessages', 'AttachFiles']
              },
              {
                id: bot.user.id,
                allow: ['ViewChannel', 'SendMessages', 'AttachFiles']
              }]
            }).then(async (channel) => {

              // Update database
              await Ticket.update({
                channelId: channel.id
              }, { where: { guildId: interaction.guild.id, messageId: ticket_message_data.messageId, claimedBy: interaction.user.id, userId: ticket_message_data.userId } });

              // Messaging the owner of the ticket
              findingMember ? memberInServer.send(`Your ticket (<#${channel.id}>) have been claimed and created by: ${interaction.user.toString()}`).catch(() => { return }) : false;

              // Default ticket message
              let ticketMessagEmbed = new EmbedBuilder()
                .addFields(
                  { name: 'Member', value: `<@${ticket_message_data.userId}>`, inline: true },
                  { name: 'Staff', value: interaction.user.toString(), inline: true }
                )
                .setColor('Blue');

              let buttonTicket = new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setCustomId('buttonDeleteTicket')
                    .setLabel('Delete')
                    .setStyle(ButtonStyle.Danger)
                );

              // Adding new field in function of ticket reason
              switch (ticket_message_data.reason) {
                case ('age_verification'):
                  ticketMessagEmbed.setTitle('Age Verification - Ticket')
                  ticketMessagEmbed.addFields({
                    name: 'Instruction',
                    value:
                      `1. Write on a piece of paper the server name (${interaction.guild.name}) and your username underneath it (${ticket_message_data.userTag})\n` +
                      '* Place the ID **on** the piece of paper and take a photo\n' +
                      '* Send the picture in this channel\n\n' +
                      '*You can blur everything on your ID of choice, but we must see the border of the card/piece of paper, the DOB and expiry date must be seen clearly*'
                  });

                  buttonTicket.addComponents(
                    new ButtonBuilder()
                      .setCustomId('buttonToAdd')
                      .setLabel('Verify')
                      .setStyle(ButtonStyle.Success)
                  );

                  break;
                case ('report'):
                  ticketMessagEmbed.setTitle('Report - Ticket')
                  ticketMessagEmbed.addFields({
                    name: 'Instruction',
                    value:
                      '* Provide the name (user#0000 or user) of the user you would like to report\n' +
                      '* The reason of the report\n' +
                      '* Evidence (if possible).'
                  });
                  break;
                case ('support'):
                  ticketMessagEmbed.setTitle('Support - Ticket')
                  ticketMessagEmbed.addFields({
                    name: 'Instruction',
                    value:
                      '* Ask any question away, we will try to answer your question the best we can.'
                  });
                  break;
                case ('partnership'):
                  ticketMessagEmbed.setTitle('Partnership - Ticket')
                  ticketMessagEmbed.addFields({
                    name: 'Instruction',
                    value:
                      `* Invite link of your server?\n` +
                      `* What's your member count?\n` +
                      `* What is the theme of your server ?`
                  });
                  break;
              };

              // Sending messsage in the ticket
              return channel.send({
                embeds: [ticketMessagEmbed],
                components: [buttonTicket],
              }).then(async (message) => {
                message.pin();

                // Mention the staff and ticket userId
                return channel.send({
                  content: `<@${ticket_message_data.userId}> ${interaction.user.toString()}`,
                }).then(async (response) => {
                  return setTimeout(() => {
                    response.delete()
                  }, 500);
                });
              }).catch(() => { return });
            }).catch(() => { return });
          case ('unclaim_ticket'):
            // Checking for possible error or missing permission
            if (ticket_message_data.claimedBy !== interaction.user.id) {
              return interaction.reply({
                content: message_preset.ticket.own,
                ephemeral: true,
              });
            }

            // Editing ticket message for staff
            interaction.channel.messages.fetch(interaction.message.id).then(async (message) => {
              let buttonClaimEdit = new ActionRowBuilder()
                .addComponents(
                  new ButtonBuilder()
                    .setCustomId('claim_ticket')
                    .setLabel('Claim')
                    .setStyle(ButtonStyle.Success)
                );

              let ticketEmbed = new EmbedBuilder()
                .setTitle('Ticket #' + ticket_message_data.ticketCount)
                .addFields(
                  { name: 'Member', value: `<@${ticket_message_data.userId}>`, inline: true },
                  { name: 'Reason', value: message.embeds[0].fields[1].value, inline: true },
                  { name: 'Status', value: message_preset.ticket.unclaim, inline: true },
                )
                .setColor('Yellow');

              await interaction.update({
                embeds: [ticketEmbed],
                components: [buttonClaimEdit],
              });
            }).catch((error) => { return console.log(error) });

            // Messaging the owner of the ticket
            findingMember ? memberInServer.send(`Your ticket(<#${ticket_message_data.channelId}>) have been unclaimed by: ${interaction.user.toString()}`).catch(() => { return }) : false;

            // Deleting the ticket channel
            await guild.channels.cache.get(ticket_message_data.channelId).delete(`${ticket_message_data.userTag}'s ticket has been unclaimed by ${interaction.user.tag}`)

            // Updating database
            return await Ticket.update({
              channelId: null,
              claimedBy: null,
            }, { where: { messageId: interaction.message.id } });
          case ('cancel_ticket'):
            // Destroy data in database
            await ticket_message_data.destroy({ where: { guildId: interaction.guild.id, messageId: interaction.message.id } });

            // Delete ticket message
            interaction.channel.messages.fetch(interaction.message.id).then(async (message) => {
              await message.delete();
            }).catch(() => { return });

            // Decrement the ticket counter
            return ticket_count_data.decrement('Count', { by: 1 });
        };
      };

      ////////////////////////////////////////////////
      //  Ticket System - Button Verify and Delete  //
      ////////////////////////////////////////////////

      if (created_ticket.includes(interaction.customId)) {
        // Checking if the member is still in the guild
        if (!member_in_guild | !ticket_channel_data | !ticket_message_data) return cancel_func();

        let member = interaction.guild.members.cache.get(ticket_channel_data.userId);

        // Checking for missing permission
        if (!staff_role | !permission_manage_channels | !ticket_channel_data) {
          return interaction.reply({
            content: return_error,
            ephemeral: true,
          });
        };

        switch (interaction.customId) {
          case ('buttonToAdd'):
            let profileCheck = await Profile.findOne({ where: { userId: member.user.id } });

            // Giving/removing roles
            let role_add = [
              '1084970943820075050',
              '1084970943820075050'
            ];

            await member.roles.add(role_add, `Age Verification: Verified by ${interaction.user.tag}`).catch(() => { return });
            await member.roles.remove('1233066501825892383');

            // Upadting profile
            profileCheck ?
              await Profile.update({
                verified18: true
              }, {
                where: {
                  userId: member.user.id
                }
              }) :
              await Profile.create({
                userTag: member.user.tag,
                userId: member.user.id,
                age: 'Adult',
                verified18: true,
              });

            // Sending message in ticket and channel
            return interaction.reply({
              content: `${member.toString()} is now a **Verified 18 +**`
            }).then(() => {
              let channel18 = interaction.guild.channels.cache.get('1091220263569461349')

              const verifiedEmbed = new EmbedBuilder()
                .setDescription(
                  'NSFW channels access -> <#1082135024264032297>',
                  'Informative roles -> <#1082135082246078464>',
                )
                .setColor('Red')

              channel18.send({
                content: `Please <@&1181362122945462323> ${member.toString()} to the cum zone!`,
                embeds: [verifiedEmbed],
              });
            });
          case ('buttonDeleteTicket'):
            bot.channels.cache.get(logging_data.channelId_TicketReceive).messages.fetch(ticket_channel_data.messageId).then(async (message) => {
              let ticketEmbed = new EmbedBuilder()
                .setTitle(`Ticket #${ticket_channel_data.ticketCount}`)
                .addFields(
                  { name: 'Member:', value: `<@${ticket_channel_data.userId}>`, inline: true },
                  { name: 'Reason:', value: message.embeds[0].fields[1].value, inline: true },
                  { name: 'Status:', value: message_preset.ticket.done, inline: true },
                  { name: 'Claimed by:', value: interaction.user.toString() }
                )
                .setColor('Green');

              await message.edit({
                embeds: [ticketEmbed],
                components: [],
              });
            }).catch(() => { return });

            // Messaging the owner of the ticket
            member_in_guild ? member_in_guild.send(`Your ticket (<#${ticket_channel_data.channelId}>) have been closed and deleted by: ${interaction.user.toString()}`).catch(() => { return }) : false;

            // Alerting of the deletion of the channel
            await interaction.reply({
              content: message_preset.ticket.delete,
            });

            // Destroy the channel after x seconds
            return setTimeout(async () => {
              await ticket_channel_data.destroy({
                where: {
                  guildId: interaction.guild.id,
                  channelId: interaction.channel.id
                }
              });

              return interaction.channel.delete();
            }, 3000);
        };
      };
    };
  } catch (error) {
    let fetchguildId = bot.guilds.cache.get(configPreset.botInfo.supportServerId);
    let crashchannelId = fetchguildId.channels.cache.get(configPreset.channelsId.crash);
    console.log(`${interaction.user.id} -> ${interaction.user.username}`);
    console.log(error);

    await interaction.reply({
      content: en.default.errorOccured,
      ephemeral: true,
    });

    return crashchannelId.send({
      content: '**Error in the interactionCreate event:** \n\n```javascript\n' + error + '```'
    });
  };
});

bot.login(configPreset.botPrivateInfo.token);