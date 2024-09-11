const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.GuildDelete,
    once: false,
    execute: async (guild) => {
        updateGuildDB(guild, 0);

        let removeGuildChannel = fetchguild.client.guilds.cache.get(configPreset.botInfo.supportServerId).guild.channels.cache.get(configPreset.channelsId.botRemoved);
        if (!removeGuildChannel) return;

        let owner = await guild.fetchOwner();

        db.query(`SELECT userId FROM blacklists WHERE guildId=?`, [owner.user.id], (error, statement) => {
            statement ? isBlacklisted = 'Yes' : isBlacklisted = 'No';
        });

        let removeguildEmbed = new EmbedBuilder()
            .setTitle('Bot Removed')
            .addFields(
                { name: 'Server Name', value: guild.name.toString(), inline: true },
                { name: 'Server ID', value: guild.id.toString(), inline: true },
                { name: 'Members', value: guild.memberCount.toString(), inline: false },
                { name: 'Owner Name', value: owner.user.tag.toString(), inline: true },
                { name: 'Owner ID', value: owner.user.id.toString(), inline: true },
                { name: 'blacklisted?', value: isBlacklisted.toString(), inline: false },
            )
            .setColor('Red');

        return removeGuildChannel.send({
            embeds: [removeguildEmbed]
        });
    }
};