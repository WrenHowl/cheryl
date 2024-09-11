const configPreset = require("../config/main.json");

const en = require("../languages/en.json");

module.exports = {
    name: 'pishock',
    execute: async (bot, message, sequelize, Sequelize) => {
        if (message.author.id === "248991306305503232" | message.author.id === configPreset.botInfo.ownerId) {

            let state_duration = message.content.split(' ')[1];
            let state_intensity = message.content.split(' ')[2];

            if (!state_duration) {
                message.channel.send('Please enter a duration between 1 to 15.');
            } else if (!state_intensity) {
                message.channel.send('Please enter an intensity between 1 to 100.');
            }

            async function shockSend() {
                await fetch("https://do.pishock.com/api/apioperate/", {
                    method: "POST",
                    body: JSON.stringify({
                        "Name": configPreset.botPrivateInfo.pishock.spot1.name,
                        "Username": configPreset.botPrivateInfo.pishock.spot1.username,
                        "Code": configPreset.botPrivateInfo.pishock.spot1.password,
                        "Apikey": configPreset.botPrivateInfo.pishock.spot1.key,
                        "Op": state_op,
                        "Duration": state_duration,
                        "Intensity": state_intensity
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).catch(error => {
                    console.error(error);
                });

                await fetch("https://do.pishock.com/api/apioperate/", {
                    method: "POST",
                    body: JSON.stringify({
                        "Name": configPreset.botPrivateInfo.pishock.spot2.name,
                        "Username": configPreset.botPrivateInfo.pishock.spot2.username,
                        "Code": configPreset.botPrivateInfo.pishock.spot2.password,
                        "Apikey": configPreset.botPrivateInfo.pishock.spot2.key,
                        "Op": state_op,
                        "Duration": state_duration,
                        "Intensity": state_intensity
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).catch(error => {
                    console.error(error);
                });
            };

            async function shockReady() {
                log = `Shocked for '${state_duration}' seconds with '${state_intensity}' of intensity by ${message.author.toString()}`;
                message.channel.send(log)

                state_op = 0; // 0 = Shock, 1 = Vibrate, 3 = Beep

                if (state_intensity > 100) {
                    state_intensity = 100;
                };

                if (state_duration > 15) {
                    state_duration = 15;
                };

                return shockSend();
            };

            shockReady();
        };
    }
};