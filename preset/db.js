let Sequelize = require('sequelize');

var sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

var verifier = sequelize.define('Verifier', {
    guildId: {
        type: Sequelize.STRING,
    },
    userId: {
        type: Sequelize.STRING,
    },
    userTag: {
        type: Sequelize.STRING,
    },
    staffId: {
        type: Sequelize.STRING,
    },
    staffTag: {
        type: Sequelize.STRING,
    },
});
var actionImage = sequelize.define('ActionImage', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        primaryKey: true,
    },
    imageUrl: {
        type: Sequelize.STRING,
    },
    category: {
        type: Sequelize.STRING,
    },
    messageId: {
        type: Sequelize.STRING,
    },
    userId: {
        type: Sequelize.STRING,
    },
    userTag: {
        type: Sequelize.STRING,
    },
});
var logging = sequelize.define('Logging', {
    guildId: {
        type: Sequelize.STRING,
    },
    language: {
        type: Sequelize.STRING,
    },
    channelId_Report: {
        type: Sequelize.STRING,
    },
    channelId_Ban: {
        type: Sequelize.STRING,
    },
    channelId_Verify: {
        type: Sequelize.STRING,
    },
    channelId_AfterVerify: {
        type: Sequelize.STRING,
    },
    channelId_Welcome: {
        type: Sequelize.STRING,
    },
    roleAutoRoleId_Welcome: {
        type: Sequelize.STRING,
    },
    staffRoleId_Report: {
        type: Sequelize.STRING,
    },
    staffRoleId_Verify: {
        type: Sequelize.STRING,
    },
    roleAddId_Verify: {
        type: Sequelize.STRING,
    },
    roleRemoveId_Verify: {
        type: Sequelize.STRING,
    },
    roleAddId_AgeVerified: {
        type: Sequelize.STRING,
    },
    status_Blacklist: {
        type: Sequelize.STRING,
    },
    channelId_Blacklist: {
        type: Sequelize.STRING,
    },
    channelId_Warn: {
        type: Sequelize.STRING,
    },
    channelId_Unban: {
        type: Sequelize.STRING,
    },
    channelId_Kick: {
        type: Sequelize.STRING,
    },
    channelId_ReceiveVerification: {
        type: Sequelize.STRING,
    },
    status_BlacklistAutoban: {
        type: Sequelize.STRING,
    },
    status_canActionMessage: {
        type: Sequelize.STRING,
    },
    status_canActionImage: {
        type: Sequelize.STRING,
    },
    channelId_Leaving: {
        type: Sequelize.STRING,
    },
    channelId_TicketParent: {
        type: Sequelize.STRING,
    },
    channelId_TicketReceive: {
        type: Sequelize.STRING,
    },
});
var permission = sequelize.define('Permission', {
    userId: {
        type: Sequelize.STRING,
    }
});
var ticket = sequelize.define('Ticket', {
    guildId: {
        type: Sequelize.STRING,
        unique: true,
    },
    reason: {
        type: Sequelize.STRING,
    },
    messageId: {
        type: Sequelize.STRING,
        unique: true,
    },
    channelId: {
        type: Sequelize.STRING,
        unique: true,
    },
    userId: {
        type: Sequelize.STRING,
        unique: true,
    },
    userTag: {
        type: Sequelize.STRING,
    },
    claimedBy: {
        type: Sequelize.STRING,
        unique: true,
    },
    ticketCount: {
        type: Sequelize.STRING,
        unique: true,
    }
})
var ticketCount = sequelize.define('TicketCount', {
    guildId: {
        type: Sequelize.STRING,
    },
    count: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
    },
});
var profile = sequelize.define('Profile', {
    userId: {
        type: Sequelize.STRING,
    },
    userTag: {
        type: Sequelize.STRING,
    },
    age: {
        type: Sequelize.STRING,
    },
    pronouns: {
        type: Sequelize.STRING,
    },
    gender: {
        type: Sequelize.STRING,
    },
    verified18: {
        type: Sequelize.STRING,
    },
});
var blacklist = sequelize.define('Blacklist');
var commandFunction = sequelize.define('CommandFunction', {
    name: {
        type: Sequelize.STRING,
    },
    value: {
        type: Sequelize.STRING,
    }
});
var actionImage = sequelize.define('ActionImage', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: false,
        autoIncrement: true
    },
    imageUrl: {
        type: Sequelize.STRING,
    },
    category: {
        type: Sequelize.STRING,
    },
    messageId: {
        type: Sequelize.STRING,
    },
    userTag: {
        type: Sequelize.STRING,
    },
    userId: {
        type: Sequelize.STRING,
    },
});

module.exports = { sequelize, Sequelize, actionImage, verifier, actionImage, logging, permission, ticket, ticketCount, profile, blacklist, commandFunction };