const { Client, Partials, Collection, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionsBitField, MessageFlags } = require('discord.js');
const { botPrivateInfo } = require('./config/main.json');
const fs = require('node:fs');
const path = require('node:path');
const mysql = require('mysql2/promise');
const { en, fr, de, sp, nl } = require('./preset/language');
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
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction
  ]
});

const db = mysql.createPool({
  host: botPrivateInfo.database.host,
  port: botPrivateInfo.database.port,
  user: botPrivateInfo.database.username,
  password: botPrivateInfo.database.password,
  database: "cherylbo_servers",
  waitForConnections: true,
  connectionLimit: 100,
});

// Check if there is any error while loading the database.
db.on('error', (error) => {
  return console.error(`${new Date().toLocaleString()} → MySQL error`, error);
});

// Check if there is any error while closing connection of the database.
db.on('close', (error) => {
  return console.error(`${new Date().toLocaleString()} → MySQL close`, error);
});

// Exporting vital parts of the code.
module.exports = { bot, db };

bot.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandsFilter = fs.readdirSync(commandsPath);

for (folder of commandsFilter) {
  const commandsPath = path.join(__dirname, `commands/${folder}`);
  const commandsFilter = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (file of commandsFilter) {
    const filesPath = path.join(commandsPath, file);
    const command = require(filesPath);

    if (typeof command.data === "undefined") {
      if (command.once) {
        bot.once(command.name, (...args) => command.execute(...args));
        continue;
      }

      bot.on(command.name, (...args) => command.execute(...args));
      continue;
    }

    bot.commands.set(command.data.name, command);
  }
}

const eventsPath = path.join(__dirname, 'events');
const eventsFiles = fs.readdirSync(eventsPath);

for (folder of eventsFiles) {
  const eventsPath = path.join(__dirname, `events/${folder}`);
  const eventsFilter = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

  for (file of eventsFilter) {
    const filesPath = path.join(eventsPath, file);
    const event = require(filesPath);

    if (event.once) {
      bot.once(event.name, (...args) => event.execute(...args));
      continue;
    }

    bot.on(event.name, (...args) => event.execute(...args));
  }
}

bot.on('interactionCreate', async (interaction) => {
  if (!interaction.guild) return;

  const request = await db.getConnection();

  const action = [
    'acceptSuggestionAction',
    'denySuggestionAction'
  ]

  switch (true) {
    case action.includes(interaction.customId):
      const actionFind = await request.query(
        `SELECT * FROM action_suggest WHERE message_id=?`,
        [interaction.message.id]
      )

      if (typeof actionFind[0][0] === "object") return db.releaseConnection(request);;

      const url = actionFind[0][0]['url'];
      const category = actionFind[0][0]['category'];

      let suggestionEmbed = new EmbedBuilder()
        .addFields(
          { name: 'User', value: `<@${actionFind[0][0]['user_id']}>`, inline: true },
          { name: 'Category', value: category, inline: true },
          { name: 'Image URL', value: url, inline: true },
        )
        .setImage(interaction.message.embeds[0].image.url);

      // Checking for the interaction name and sending the appropriate response
      switch (interaction.customId) {
        case ('action_accept'):
          await request.query(
            `INSERT INTO action_suggest (url, category) VALUES (?, ?)`,
            [url, category]
          );

          suggestionEmbed.addFields(
            { name: 'Status', value: 'Accepted' }
          );
          suggestionEmbed.setColor('Green');

          break;
        case ('action_deny'):
          suggestionEmbed.addFields(
            { name: 'Status', value: 'Denied' },
          );
          suggestionEmbed.setColor('Red');

          request.query(
            `DELETE FROM action_suggest WHERE message_id=?`,
            [interaction.message.id]
          );
          break;
      };

      // Fetching the message to edit it
      interaction.channel.messages.fetch(interaction.message.id).then(async () => {
        await interaction.update({
          embeds: [suggestionEmbed],
          components: []
        });
      });
      break;
  }

  return db.releaseConnection(request);;
});

// Login to discord and the bot.
bot.login(botPrivateInfo.token);