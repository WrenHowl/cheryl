const { ActionRowBuilder, ButtonStyle, ButtonBuilder, Partials, Client, GatewayIntentBits, EmbedBuilder, Collection } = require('discord.js');
const { fr, en, de, sp, nl } = require('./preset/language')
const { logging, ticket, ticketCount } = require('./preset/db')
const fs = require('node:fs');
const path = require('node:path');
var bot = new Client({
  allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
  intents: [
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildVoiceStates,
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
const messagePreset = require('./config/message.json');

bot.commands = new Collection();

let date = new Date();

module.exports = { bot, date }

bot.on('messageCreate', async (message) => {
  eventName = 'messageCreate';

  let logging_data = await logging.findOne({ where: { guildId: message.guild.id } });

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
    let member = message.interaction.user.toString();

    if (message.embeds[0].description.startsWith('Bump')) {
      await message.channel.send({
        content: `${languageSet.bump.message.thanks_first} ${member} ${languageSet.bump.message.thanks_second}`
      });

      return setTimeout(async () => {
        let bumpTimeEmbed = new EmbedBuilder()
          .setTitle(languageSet.bump.message.embed.title)
          .setURL(`https://disboard.org/server/${message.guild.id}`)
          .setDescription(languageSet.bump.message.embed.description)
          .setColor('Blue');

        return message.channel.send({
          content: `${member}`,
          embeds: [bumpTimeEmbed]
        });
      }, 7200000);
    };
  } catch (err) { return }
});

// File Path for commands
let commandsPath = path.join(__dirname, 'commands');
let commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (let file of commandsFiles) {
  let filesPath = path.join(commandsPath, file);
  let command = require(filesPath);
  if ('data' in command && 'execute' in command) {
    bot.commands.set(command.data.name, command);
  } else {
    console.log(`[WARNING] The command at ${filesPath} is missing a required "data" or "execute" property.`);
  }
};

// File Path for events
let eventsPath = path.join(__dirname, 'events');
let eventsFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (let file of eventsFiles) {
  let filesPath = path.join(eventsPath, file);
  let event = require(filesPath);
  if (event.once) {
    bot.once(event.name, (...args) => event.execute(...args));
  } else {
    bot.on(event.name, (...args) => event.execute(...args));
  }
};

bot.on('interactionCreate', async (interaction) => {
  if (!interaction.guild) return;

  eventName = 'interactionCreate';

  let guild = bot.guilds.cache.get(interaction.guild.id);
  let logging_data = await logging.findOne({ where: { guildId: guild.id } });

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

  ///////////////////////////
  //  Verification System  //
  ///////////////////////////

  // Offline for a while

  /*let verification_id = [
    'buttonToVerify',
    'buttonToAcceptVerify',
    'buttonToDenyVerify',
    'verificationModal',
    'reasonDeny'
  ];

  if (verification_id.includes(interaction.customId)) {
    let verificationData = await Verification.findOne({ where: { guildId: interaction.guild.id, userId: interaction.user.id } });
    let lgVerification = en.verification.default.button.verification;

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
            return logging.update({ channelId_Verify: null }, { where: { guildId: guild.id } });
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
  };*/

  /////////////////////
  //  Action System  //
  /////////////////////

  let action_id = [
    'acceptSuggestionAction',
    'denySuggestionAction'
  ];

  if (interaction.isButton() & action_id.includes(interaction.customId)) {
    let actionImageData = await ActionImage.findOne({ where: { messageId: interaction.message.id } })
      .catch((err) => {
        intOrMsg_console = interaction.user;
        intOrMsg_message = interaction.reply;
        error = err;
        errorToDm();
      });
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
    })
      .catch((err) => {
        reply_user = true;
        intOrMsg_console = interaction.user;
        intOrMsg_message = interaction.reply;
        error = err;
        errorToDm();
      });
  };

  /////////////////////
  //  ticket System  //
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
    'buttonDeleteticket',
  ];

  if (interaction.isButton() && ticket_id.includes(interaction.customId)) {
    // Database Find
    let ticket_data = await ticket.findOne({ where: { guildId: interaction.guild.id, userId: interaction.user.id } });
    let ticketMessageData = await ticket.findOne({ where: { guildId: interaction.guild.id, messageId: interaction.message.id } });
    let ticket_channel_data = await ticket.findOne({ where: { guildId: interaction.guild.id, channelId: interaction.channel.id } });
    let ticketCountData = await ticketCount.findOne({ where: { guildId: interaction.guild.id } });

    // Permission Check
    let permission_manage_channels = interaction.guild.members.me.permissions.has('ManageChannels');

    // Role Check
    let staff_role = interaction.member.roles.cache.some(role => role.id === '1083475130241523852');
    let executive_role = interaction.member.roles.cache.some(role => role.id === '1191482864156557332');
    let admin_role = interaction.member.roles.cache.some(role => role.id === '1082104096959504404');
    let verified_role = interaction.member.roles.cache.some(role => role.id === '1084970943820075050');
    let partner_role = interaction.member.roles.cache.some(role => role.id === '1088952912610328616');

    // Errors
    !ticketMessageData ? errorReturn = messagePreset.ticket.unknownMessage : errorReturn = messagePreset.ticket.error; // Check if the message data exist in db

    !permission_manage_channels ? errorReturn = messagePreset.ticket.cantManageChannels : errorReturn = messagePreset.ticket.error; // Check if he has permission to manage channels

    if (!staff_role) {
      errorReturn = messagePreset.ticket.isNotStaff;
      messageRefusingticket = messagePreset.ticket.refusingToCreateStaff;
    } else {
      errorReturn = messagePreset.ticket.error;
      messageRefusingticket = messagePreset.ticket.error;
    };

    verified_role ? messageRefusingticket = messagePreset.ticket.refusingToCreate : messageRefusingticket = messagePreset.ticket.error; // Check if the member is already verified

    partner_role ? messageRefusingticket = messagePreset.ticket.refusingToCreatePartner : messageRefusingticket = messagePreset.ticket.error; // Check if the member is already verified

    function error_func() {
      interaction.reply({
        content: messageRefusingticket,
        ephemeral: true,
      });
    };

    switch (interaction.customId) {
      case ('age_verification'):
        if (staff_role | verified_role) {
          return error_func();
        };

        reasonticketChange = 'Age Verification';
        ping = '<@&1105937890011250872> & <@&1191482864156557332>';
        break;
      case ('report'):
        if (staff_role | !verified_role) {
          return error_func();
        };

        reasonticketChange = 'Report';
        ping = '<@&1083475130241523852>';
        break;
      case ('support'):
        if (staff_role | !verified_role) {
          error_func();
        };

        reasonticketChange = 'Support';
        ping = '<@&1083475130241523852>';
        break;
      case ('partnership'):
        if (partner_role | !verified_role) {
          return error_func();
        };

        reasonticketChange = 'Partnership';
        ping = '<@&1191482864156557332>';
        break;
    };

    //////////////////////////////////////////
    //   ticket System - Button for Reason  //
    //////////////////////////////////////////

    let buttonReasonticket = [
      'age_verification',
      'report',
      'support',
      'partnership',
    ];

    if (buttonReasonticket.includes(interaction.customId)) {
      let channelToReceiveticket = interaction.guild.channels.cache.get(logging_data.channelId_ticketReceive);

      if (!channelToReceiveticket) return;

      // Check if there's not an existing ticket
      if (ticket_data) {
        if (ticket_data.reason === interaction.customId) {
          return interaction.reply({
            content: messagePreset.ticket.waiting,
            ephemeral: true,
          });
        };
      };

      // Increase the ticket counter or create a ticket counter for the server
      !ticketCountData ?
        await ticketCount.create({ guildId: interaction.guild.id }) :
        await ticketCountData.increment('count');

      // Creation of the ticket
      await ticket.create({
        guildId: interaction.guild.id,
        reason: interaction.customId,
        ticketCount: ticketCountData.count,
        userId: interaction.user.id,
        userTag: interaction.user.tag,
      });

      // Send the message to the member that the ticket has been created/waiting to be claimed
      await interaction.reply({
        content: messagePreset.ticket.created,
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
      let claimingticket = new EmbedBuilder()
        .setTitle(`Ticket #${ticketCountData.count}`)
        .addFields(
          { name: 'Member', value: interaction.user.toString(), inline: true },
          { name: 'Reason', value: reasonticketChange, inline: true },
          { name: 'Status', value: messagePreset.ticket.unclaim, inline: true },
        )
        .setColor('Yellow');

      // Sending ticket message in channel
      return channelToReceiveticket.send({
        embeds: [claimingticket],
        content: ping,
        components: [buttonClaim],
      }).then(async (message) => {
        await ticket.update({
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
    //  ticket System - Button Claim, Unclaim and Cancel  //
    ////////////////////////////////////////////////////////

    let button_claim_ticket = [
      'claim_ticket',
      'unclaim_ticket',
      'cancel_ticket'
    ];

    let created_ticket = [
      'buttonToAdd',
      'buttonDeleteticket'
    ];

    let user_id = interaction.message.embeds[0].fields[0].value.replace('>', '').replace('<@', '');
    let member_in_guild = guild.members.cache.find(member => member.id === user_id);

    async function cancelTicket() {
      if (created_ticket.includes(interaction.customId)) {
        // Check if member is still in guild
        if (member_in_guild & ticket_data) {
          // Delete ticket message
          await bot.guilds.cache.get(interaction.guild.id).channels.cache.get(logging_data.channelId_ticketReceive).messages.fetch(ticket_channel_data.messageId).then((message) => {
            message.delete();
          }).catch(() => { return });
        };
      };

      // Decrement the ticket counter
      await ticketCountData.decrement('count', { by: 1 });

      // Delete the ticket channel if there is one created
      let ticket_channel = interaction.guild.channels.cache.get(interaction.channel.id);
      if (ticket_channel) {
        await ticket_channel.delete('Error: Member left the server or error with database');
      };

      // Delete the data in the database
      return ticket.destroy({
        where: {
          guildId: guild.id,
          userId: user_id,
        },
      });
    };

    if (button_claim_ticket.includes(interaction.customId)) {
      // Checking if the member is still in the guild
      if (!member_in_guild) return cancelTicket();

      let findingMember = guild.members.cache.get(ticketMessageData.userId);
      let memberInServer = bot.users.cache.get(ticketMessageData.userId);

      // Checking for missing permission
      if (!staff_role | !permission_manage_channels | !ticketMessageData) {
        return interaction.reply({
          content: errorReturn,
          ephemeral: true,
        });
      }

      // Checking ticket reason and permission of staff
      switch (ticketMessageData.reason) {
        case ('age_verification'):
          if (!admin_role & !executive_role) {
            return interaction.reply({
              content: messagePreset.ticket.cantAgeVerify,
              ephemeral: true,
            });
          };

          break;
        case ('partnership'):
          if (!executive_role) {
            return interaction.reply({
              content: messagePreset.ticket.cantPartnership,
              ephemeral: true,
            });
          };

          break;
      };

      switch (interaction.customId) {
        case ('claim_ticket'):
          // Checking for possible error or missing permission
          if (ticketMessageData.userId === interaction.user.id) {
            return interaction.reply({
              content: messagePreset.ticket.own,
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
              .setTitle('Ticket #' + ticketMessageData.ticketCount)
              .addFields(
                { name: 'Member', value: `<@${ticketMessageData.userId}>`, inline: true },
                { name: 'Reason', value: message.embeds[0].fields[1].value, inline: true },
                { name: 'Status', value: messagePreset.ticket.claim, inline: true },
                { name: 'Claimed by', value: interaction.user.toString() }
              )
              .setColor('Blue');

            await interaction.update({
              embeds: [ticketEmbed],
              components: [buttonClaimEdit],
            });
          }).catch(() => { return });

          // Updating database
          await ticket.update({
            claimedBy: interaction.user.id,
          }, {
            where: {
              guildId: interaction.guild.id,
              messageId: interaction.message.id
            }
          });

          // Creating the ticket channel
          return interaction.guild.channels.create({
            name: ticketMessageData.reason + '-' + ticketMessageData.ticketCount,
            type: 0,
            parent: logging_data.channelId_ticketParent,
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
              id: ticketMessageData.userId,
              allow: ['ViewChannel', 'SendMessages', 'AttachFiles']
            },
            {
              id: bot.user.id,
              allow: ['ViewChannel', 'SendMessages', 'AttachFiles']
            }]
          }).then(async (channel) => {
            if (channel.id === logging_data.channelId_ticketReceive) {
              channel_newId = null;
            } else {
              channel_newId = channel.id;
            };

            // Update database
            await ticket.update({
              channelId: channel_newId
            }, {
              where: {
                guildId: interaction.guild.id,
                messageId: ticketMessageData.messageId,
                claimedBy: interaction.user.id,
                userId: ticketMessageData.userId
              }
            });

            // Messaging the owner of the ticket
            findingMember ? memberInServer.send(`Your ticket (<#${channel.id}>) have been claimed and created by: ${interaction.user.toString()}`).catch(() => { return }) : false;

            // Default ticket message
            let ticketMessagEmbed = new EmbedBuilder()
              .addFields(
                { name: 'Member', value: `<@${ticketMessageData.userId}>`, inline: true },
                { name: 'Staff', value: interaction.user.toString(), inline: true }
              )
              .setColor('Blue');

            let buttonticket = new ActionRowBuilder()
              .addComponents(
                new ButtonBuilder()
                  .setCustomId('buttonDeleteticket')
                  .setLabel('Delete')
                  .setStyle(ButtonStyle.Danger)
              );

            // Adding new field in function of ticket reason
            switch (ticketMessageData.reason) {
              case ('age_verification'):
                ticketMessagEmbed.setTitle('Age Verification - ticket')
                ticketMessagEmbed.addFields({
                  name: 'Instruction',
                  value:
                    '1. Write on a piece of paper the server name (`' + interaction.guild.name + '`) and your username underneath it (`' + ticketMessageData.userTag + '`)\n' +
                    '* Place the ID **on** the piece of paper and take a photo\n' +
                    '* Send the picture in this channel\n\n' +
                    '*You can blur everything on your ID of choice, but we must see the border of the card/piece of paper, the DOB and expiry date must be seen clearly*'
                });

                buttonticket.addComponents(
                  new ButtonBuilder()
                    .setCustomId('buttonToAdd')
                    .setLabel('Verify')
                    .setStyle(ButtonStyle.Success)
                );

                break;
              case ('report'):
                ticketMessagEmbed.setTitle('Report - ticket')
                ticketMessagEmbed.addFields({
                  name: 'Instruction',
                  value:
                    '* Provide the name (user#0000 or user) of the user you would like to report\n' +
                    '* The reason of the report\n' +
                    '* Evidence (if possible).'
                });
                break;
              case ('support'):
                ticketMessagEmbed.setTitle('Support - ticket')
                ticketMessagEmbed.addFields({
                  name: 'Instruction',
                  value:
                    '* Ask any question away, we will try to answer your question the best we can.'
                });
                break;
              case ('partnership'):
                ticketMessagEmbed.setTitle('Partnership - ticket')
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
              components: [buttonticket],
            }).then(async (message) => {
              message.pin();

              // Mention the staff and ticket userId
              return channel.send({
                content: `<@${ticketMessageData.userId}> ${interaction.user.toString()}`,
              }).then(async (response) => {
                return setTimeout(() => {
                  response.delete()
                }, 500);
              });
            }).catch(() => { return });
          }).catch(() => { return });
        case ('unclaim_ticket'):
          // Checking for possible error or missing permission
          if (ticketMessageData.claimedBy !== interaction.user.id) {
            return interaction.reply({
              content: messagePreset.ticket.own,
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
              .setTitle('Ticket #' + ticketMessageData.ticketCount)
              .addFields(
                { name: 'Member', value: `<@${ticketMessageData.userId}>`, inline: true },
                { name: 'Reason', value: message.embeds[0].fields[1].value, inline: true },
                { name: 'Status', value: messagePreset.ticket.unclaim, inline: true },
              )
              .setColor('Yellow');

            await interaction.update({
              embeds: [ticketEmbed],
              components: [buttonClaimEdit],
            });
          }).catch((error) => { return console.log(error) });

          // Messaging the owner of the ticket
          findingMember ? memberInServer.send(`Your ticket(<#${ticketMessageData.channelId}>) have been unclaimed by: ${interaction.user.toString()}`).catch(() => { return }) : false;

          // Deleting the ticket channel
          await guild.channels.cache.get(ticketMessageData.channelId).delete(`${ticketMessageData.userTag}'s ticket has been unclaimed by ${interaction.user.tag}`)

          // Updating database
          return await ticket.update({
            channelId: null,
            claimedBy: null,
          }, { where: { messageId: interaction.message.id } });
        case ('cancel_ticket'):
          // Destroy data in database
          await ticketMessageData.destroy({ where: { guildId: interaction.guild.id, messageId: interaction.message.id } });

          // Delete ticket message
          interaction.channel.messages.fetch(interaction.message.id).then(async (message) => {
            await message.delete();
          }).catch(() => { return });

          // Decrement the ticket counter
          return ticketCountData.decrement('Count', { by: 1 });
      };
    };

    ////////////////////////////////////////////////
    //  ticket System - Button Verify and Delete  //
    ////////////////////////////////////////////////

    if (created_ticket.includes(interaction.customId)) {
      // Checking if the member is still in the guild
      if (!member_in_guild | !ticket_channel_data) return cancelTicket();

      let member = interaction.guild.members.cache.get(ticket_channel_data.userId);

      // Checking for missing permission
      if (!staff_role | !permission_manage_channels | !ticket_channel_data) {
        return interaction.reply({
          content: errorReturn,
          ephemeral: true,
        });
      };

      switch (interaction.customId) {
        case ('buttonToAdd'):
          let profileCheck = await Profile.findOne({ where: { userId: member.user.id } })
            .catch((err) => {
              reply_user = true;
              intOrMsg_console = interaction.user;
              intOrMsg_message = interaction.reply;
              error = err;
              errorToDm();
            });

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
        case ('buttonDeleteticket'):
          bot.channels.cache.get(logging_data.channelId_ticketReceive).messages.fetch(ticket_channel_data.messageId).then(async (message) => {
            let ticketEmbed = new EmbedBuilder()
              .setTitle(`ticket #${ticket_channel_data.ticketCount}`)
              .addFields(
                { name: 'Member:', value: `<@${ticket_channel_data.userId}>`, inline: true },
                { name: 'Reason:', value: message.embeds[0].fields[1].value, inline: true },
                { name: 'Status:', value: messagePreset.ticket.done, inline: true },
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
            content: messagePreset.ticket.delete,
          });

          // Destroy the channel after x seconds
          return setTimeout(async () => {
            await ticket_channel_data.destroy({
              where: {
                guildId: interaction.guild.id,
                channelId: interaction.channel.id
              }
            });

            if (interaction.channel.id === logging_data.channelId_ticketReceive) return;
            return interaction.channel.delete();
          }, 3000);
      };
    };
  };
});

bot.on('error', async (error) => {
  // Send to the user
  try {
    console.log(`${interaction.user.id} -> ${interaction.user.username}`);

    await interaction.reply({
      content: en.default.errorOccured,
      ephemeral: true,
    });
  } catch (error) { }

  // Send it to console
  console.log(error.stack);

  // Send it to my DM
  return bot.users.cache.get(configPreset.botInfo.ownerId).send({
    content: '**Error in the ' + eventName + ' event:** \n\n```javascript\n' + error.stack + '```'
  }).catch((error) => { })
});

bot.login(configPreset.botPrivateInfo.token);