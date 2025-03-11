const { Events } = require('discord.js');
const { bot } = require('../server');
const fs = require('node:fs');
const colors = require('colors');
const configPreset = require('../config/main.json');

module.exports = {
    name: Events.Error,
    async execute(error) {
        // Send it to console
        console.error(`${error.stack}`.red);

        fs.writeFile(`./logs/log-${new Date().toLocaleDateString()}.txt`, `At ${new Date().toLocaleString()} :\n${error.stack}\n\n`, { flag: 'a+' }, callback => { });

        try {
            // Send it to my DM
            return bot.users.cache.get(configPreset.botInfo.ownerId).send({
                content: '**Error at ' + new Date().toLocaleString() + '** \n\n```javascript\n' + error.stack + '```'
            });
        } catch (err) {
            console.error(err)
        }
    }
}