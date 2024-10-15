const { Partials, Client, GatewayIntentBits, EmbedBuilder, Collection } = require('discord.js');
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
});

db.on('connection', () => {
  console.log(`${localDate} MySQL connection success`);
})

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

  /////////////////////
  //  Action System  //
  /////////////////////

  let action_id = [
    'acceptSuggestionAction',
    'denySuggestionAction'
  ];

  if (interaction.isButton() & action_id.includes(interaction.customId)) {
    await db.query(`SELECT * FROM actionimages WHERE messageId=?`,
      [interaction.message.id]
    )
      .then((response) => {
        response = response[0];
        if (response == undefined) return;

        userId = response['userId'];
        url = response['url'];
        category = response['category'];
        createdAt = response['createdAt'];
      });

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
          await db.query(`UPDATE actionimages SET url=? WHERE messageId=?`,
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

          db.query(`DELETE FROM actionimages WHERE messageId=?`,
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
  };
});

bot.login(botPrivateInfo.token);