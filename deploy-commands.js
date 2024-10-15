const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
const configPreset = require('./config/main.json');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandsFiles) {
	const filesPath = path.join(commandsPath, file);
	const command = require(filesPath);

	if ('data' in command && 'execute' in command) {
		commands.push(command.data.toJSON());
	} else {
		console.log(`[WARNING] The command at ${filesPath} is missing a required "data" or "execute" property.`);
	}
};

const rest = new REST({ version: '9' }).setToken(configPreset.botPrivateInfo.token);

rest.put(Routes.applicationCommands(configPreset.botPrivateInfo.botId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);