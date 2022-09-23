const { MessageActionRow, MessageSelectMenu, MessageEmbed, Message } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const dateTime = new Date();
console.log(dateTime.toLocaleString() + " -> The 'staff' command is loaded.")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('staff')
        .setDescription('Show the staff!'),
    execute: async (interaction, bot) => {

        let fetchGuild = interaction.client.guilds.cache.get("821241527941726248")

        await fetchGuild.members.fetch()

        let ownerRole = fetchGuild ? fetchGuild.roles.cache.get("996270489070751765")
            .members.map(m => m.user.id)
            .join("> \n- <@") : false;

        let coOwnerRole = fetchGuild ? fetchGuild.roles.cache.get("1020543982289301517")
            .members.map(m => m.user.id)
            .join("> \n- <@") : false;

        let adminRole = fetchGuild ? fetchGuild.roles.cache.get("898352526154416138")
            .members.map(m => m.user.id)
            .join("> \n- <@") : false;

        let managerRole = fetchGuild ? fetchGuild.roles.cache.get("981249822315118632")
            .members.map(m => m.user.id)
            .join("> \n- <@") : false;

        let seniorRole = fetchGuild ? fetchGuild.roles.cache.get("930517273540702218")
            .members.map(m => m.user.id)
            .join("> \n- <@") : false;

        let modRole = fetchGuild ? fetchGuild.roles.cache.get("900184624494428170")
            .members.map(m => m.user.id)
            .join("> \n- <@") : false;

        let helperRole = fetchGuild ? fetchGuild.roles.cache.get("991781727292891147")
            .members.map(m => m.user.id)
            .join("> \n- <@") : false;

        let eoRole = fetchGuild ? fetchGuild.roles.cache.get("973621263098605618")
            .members.map(m => m.user.id)
            .join("> \n- <@") : false;

        let gateKeeperRole = fetchGuild ? fetchGuild.roles.cache.get("975749680774402088")
            .members.map(m => m.user.id)
            .join("> \n- <@") : false;

        const managementRoleSize = fetchGuild.roles.cache.get("991769060956192799")
        const moderationRoleSize = fetchGuild.roles.cache.get("991769189796823202")
        const communityRoleSize = fetchGuild.roles.cache.get("991768688267100184")
        const staffRoleSize = fetchGuild.roles.cache.get("931038287114678334")

        if (ownerRole) ownerRole = "- <@" + ownerRole + ">";
        if (coOwnerRole) coOwnerRole = "- <@" + coOwnerRole + ">";
        if (adminRole) adminRole = "- <@" + adminRole + ">";
        if (managerRole) managerRole = "- <@" + managerRole + ">";
        if (seniorRole) seniorRole = "- <@" + seniorRole + ">";
        if (modRole) modRole = "- <@" + modRole + ">";
        if (helperRole) helperRole = "- <@" + helperRole + ">";
        if (eoRole) eoRole = "- <@" + eoRole + ">";
        if (gateKeeperRole) gateKeeperRole = "- <@" + gateKeeperRole + ">";

        if (!ownerRole) ownerRole = "- N/A";
        if (!coOwnerRole) coOwnerRole = "- N/A";
        if (!adminRole) adminRole = "- N/A";
        if (!managerRole) managerRole = "- N/A";
        if (!seniorRole) seniorRole = "- N/A";
        if (!modRole) modRole = "- N/A";
        if (!helperRole) helperRole = "- N/A";
        if (!eoRole) eoRole = "- N/A";
        if (!gateKeeperRole) gateKeeperRole = "- N/A";

        const staffList = new MessageEmbed()
            .setDescription("List of all the staff members on ``Over Control Furry``. There's currently ``" + staffRoleSize.members.size + "`` staff.")
            .addFields(
                { name: "__**Management [" + managementRoleSize.members.size + "]**__", value: "*Owner*\n" + ownerRole + "\n\n*Co-Owner*\n" + coOwnerRole + "\n\n*Administrator*\n" + adminRole + "\n\n*Manager*\n" + managerRole, inline: true },
                { name: "__**Moderation [" + moderationRoleSize.members.size + "]**__", value: "*Senior Moderator*\n" + seniorRole + "\n\n*Moderator*\n" + modRole + "\n\n*Helper*\n" + helperRole, inline: true },
                { name: "__**Community [" + communityRoleSize.members.size + "]**__", value: "*Event Organizer*\n" + eoRole + "\n\n*Gate Keeper*\n" + gateKeeperRole, inline: true }
            )
            .setColor("2f3136")

        return interaction.reply({
            embeds: [staffList]
        });
    }
};