const { MessageActionRow, MessageButton } = require('discord.js');
const Config = require("../config/config.json");
let e621 = require('e621-api').default;
let enums = require('e621-api/build/enums');
let wrapper = new e621(Config.e621AgentName, Config.e621UserName, Config.e621APIKey);

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'e621' command is loaded.");

module.exports = {
    name: "e621",
    execute: async (bot, message, args, MessageEmbed) => {
        if (message.channel.nsfw) {
            if (args.length == 0) {
                return message.reply("Please select a tag to search on e621.")
            }

        } else {
            return message.reply({
                content: "Naughty boy!~ This can only be used in NSFW channel.",
                ephemeral: true,
            });
        }
    }
};