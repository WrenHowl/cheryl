
const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'serverlist' command is loaded.")

module.exports = {
    name: "serverlist",
    execute: async (bot, message, args, MessageEmbed) => {
        if (!message.author.id === "291262778730217472") return;

        let serverlist = "";

        for (const [id, guild] of bot.guilds.cache) {
            const owner = await guild.fetchOwner();
            serverlist = serverlist.concat(guild.name + "\n\nID: " + guild.id + " | Owner: " + owner.user.tag + "\n\n");
        }

        console.log(serverlist)

        /*bot.guilds.cache.forEach(guild => {
            guild.channels.cache.filter(c => c.type === "GUILD_TEXT").random().createInvite().then(invite =>
                console.log(invite.url)
            );
        })*/
    }
};