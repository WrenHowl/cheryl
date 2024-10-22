const { Partials, Client, GatewayIntentBits, EmbedBuilder, Collection, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const mysql = require('mysql2/promise');
const { botPrivateInfo } = require('./config/main.json');

const bot = new Client({
  allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
  intents: [
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildMessageReactions,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});
const date = new Date();

const localDate = `${date.toLocaleString()} ->`;

let db = mysql.createPool({
  host: botPrivateInfo.database.host,
  port: botPrivateInfo.database.port,
  user: botPrivateInfo.database.username,
  password: botPrivateInfo.database.password,
  database: "cherylbo_servers",
  waitForConnections: true,
  connectionLimit: 100,
});

db.on('error', (error) => {
  console.error(`${localDate} MySQL error`, error);
})

db.on('close', (error) => {
  console.error(`${localDate} MySQL close`, error);
})

module.exports = { bot, date, localDate, db };

function loadIntCommand() {
  let commandsPath = path.join(__dirname, 'commands');
  let commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
  for (const file of commandsFiles) {
    let filesPath = path.join(commandsPath, file);
    let command = require(filesPath);
    bot.commands.set(command.data.name, command);
  };

  console.log(`${localDate} All interaction loaded.`)
};

function loadEvent() {
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

  console.log(`${localDate} All events loaded.`)
};

bot.commands = new Collection();

loadIntCommand();
loadEvent();

bot.on('interactionCreate', async (interaction) => {
  if (!interaction.guild) return;

  const request = await db.getConnection();

  // Action button
  async function actionButton() {
    const actionFind = await request.query(
      `SELECT * FROM actionimages WHERE messageId=?`,
      [interaction.message.id]
    )

    if (actionFind[0][0] == undefined) return;

    userId = actionFind[0][0]['userId'];
    url = actionFind[0][0]['url'];
    category = actionFind[0][0]['category'];
    createdAt = actionFind[0][0]['createdAt'];

    let suggestionEmbed = new EmbedBuilder()
      .addFields(
        { name: 'User', value: `<@${userId}>`, inline: true },
        { name: 'Category', value: category, inline: true },
        { name: 'Image URL', value: imageUrl, inline: true },
      )
      .setImage(interaction.message.embeds[0].image.url);

    // Fetching the message to edit it
    interaction.channel.messages.fetch(interaction.message.id).then(async () => {
      // Checking for the interaction name and sending the appropriate response
      switch (interaction.customId) {
        case ('acceptSuggestionAction'):
          await request.query(
            `UPDATE actionimages SET url=? WHERE messageId=?`,
            [interaction.message.embeds[0].image.url, interaction.message.id]
          );

          suggestionEmbed.addFields(
            { name: 'Status', value: 'Accepted' }
          );
          suggestionEmbed.setColor('Green');

          response = `The image you suggested the (${createdAt}) has been denied. Thank you for your contribution!`;
          break;
        case ('denySuggestionAction'):
          suggestionEmbed.addFields(
            { name: 'Status', value: 'Denied' },
          );
          suggestionEmbed.setColor('Red');

          response = `The image (${actionImageData.id}) you suggested has been denied.`;

          request.query(
            `DELETE FROM actionimages WHERE messageId=?`,
            [interaction.message.id]
          );
          break;
      };

      bot.users.cache.get(actionImageData.userId).send({
        content: response,
      });

      await interaction.update({
        embeds: [suggestionEmbed],
        components: []
      });

    })
  }

  // Ticket button
  async function ticketButton() {
    const loggingFind = await request.query(
      `SELECT * FROM loggings WHERE guildId=?`,
      [interaction.guild.id]
    )

    if (loggingFind[0][0] == undefined) return;

    switch (interaction.customId) {
      case 'age-verification':
        reason = 'Age Verification';

        break;
      case 'report':
        reason = 'Report';

        break;
      case 'partnership':
        reason = 'Partnership';

        break;
      case 'support':
        reason = 'Support';

        break;
      default:
        reason = 'Other';

        break;
    }

    const ticketFind = await request.query(
      `SELECT * FROM ticket WHERE guildId=? AND reason=?`,
      [interaction.guild.id, reason]
    )

    if (ticketFind[0][0] != undefined && ticketFind[0][0]['reason'] === reason) {
      return interaction.reply({
        content: `You already created a ticket for the following reason: \`${reason}\``,
        ephemeral: true,
      });
    };

    const ticketCountFind = await request.query(
      `SELECT * FROM ticket_count WHERE guildId=?`,
      [interaction.guild.id]
    )

    let ticketCount = 1;

    if (ticketCountFind[0][0] == undefined) {
      await request.query(
        `INSERT INTO ticket_count (guildId, count) VALUES(?, ?)`,
        [interaction.guild.id, ticketCount]
      )
    } else {
      ticketCount = ticketCountFind[0][0]['count'] + 1;

      await request.query(
        `UPDATE ticket_count SET count=? WHERE guildId=?`,
        [ticketCount, interaction.guild.id]
      )
    }

    // Creating the buttons
    const newTicketButton = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('Accept')
          .setCustomId('ticket_accept')
          .setStyle(ButtonStyle.Success),
      )
      .addComponents(
        new ButtonBuilder()
          .setLabel('Decline')
          .setCustomId('ticket_decline')
          .setStyle(ButtonStyle.Danger),
      )

    // Creating the embed
    const newTicketEmbed = new EmbedBuilder()
      .setTitle(`Ticket #${ticketCount}`)
      .addFields(
        {
          name: 'Member',
          value: interaction.user.toString(),
          inline: true
        },
        {
          name: 'Reason',
          value: reason,
          inline: true
        },
        {
          name: '\u200b',
          value: '\u200b',
          inline: true
        },
        {
          name: 'Status',
          value: 'Waiting',
          inline: true
        },
      )
      .setColor('Yellow')

    // Sending the embed and button to the right channel
    const ticketLogChannel = interaction.guild.channels.cache.get(loggingFind[0][0]['ticket_channelDestination']);
    ticketLogChannel.send({
      embeds: [newTicketEmbed],
      components: [newTicketButton]
    }).then(async (msg) => {
      await request.query(
        `INSERT INTO ticket (guildId, userId, ticketId, reason, messageId) VALUES (?, ?, ?, ?, ?)`,
        [interaction.guild.id, interaction.user.id, ticketCount, reason, msg.id]
      )
    })
  }

  if (
    interaction.customId === 'acceptSuggestionAction' ||
    interaction.customId === 'denySuggestionAction'
  ) actionButton();
  else if (
    interaction.customId === 'age-verification' ||
    interaction.customId === 'report' ||
    interaction.customId === 'partnership' ||
    interaction.customId === 'support' ||
    interaction.customId === 'other'
  ) ticketButton();

  switch (interaction.customId) {
    case 'ticket_accept':
      const ticketFind = await request.query(
        `SELECT * FROM ticket WHERE guildId=? AND messageId=?`,
        [interaction.guild.id, interaction.message.id]
      )

      if (ticketFind[0][0]['reason'] === 'Age Verification' || ticketFind[0][0]['reason'] === 'Partnership')

        // Check if the person claiming the ticket is a staff member
        if (!interaction.member.roles.cache.some(role => role.name === 'Staff')) {
          return interaction.reply({
            content: 'You cannot claim ticket since you are not a staff member.',
            ephemeral: true,
          });
        }

      const loggingFind = await request.query(
        `SELECT * FROM loggings WHERE guildId=?`,
        [interaction.guild.id]
      )

      if (ticketFind[0][0] == undefined || loggingFind[0][0] == undefined) return;
      if (ticketFind[0][0]['channelId'] != undefined) return;

      // Creating the ticket channel
      await interaction.guild.channels.create({
        name: `${ticketFind[0][0]['reason']}-${ticketFind[0][0]['ticketId']}`,
        type: ChannelType.GuildText,
        parent: loggingFind[0][0]['ticket_categoryDestination'],
        permissionOverwrites: [
          {
            id: interaction.guild.id,
            deny: 'ViewChannel',
          },
          {
            id: interaction.user.id,
            allow: 'ViewChannel',
          },
          {
            id: ticketFind[0][0]['userId'],
            allow: 'ViewChannel',
          }
        ]
      }).then(async (channel) => {
        await request.query(
          `UPDATE ticket SET channelId=?, claimedBy=? WHERE userId=? AND guildId=?`,
          [channel.id, interaction.guild.id, ticketFind[0][0]['userId'], interaction.guild.id]
        )
      })
      break;
    case 'ticket_decline':

      break;
  }

  db.releaseConnection(request);
});

bot.login(botPrivateInfo.token);