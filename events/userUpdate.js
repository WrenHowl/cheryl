const { Events } = require('discord.js');
const { db } = require('../server');

module.exports = {
    name: Events.UserUpdate,
    once: false,
    execute: async (oldUpdate, newUpdate) => {
        const request = await db.getConnection();

        const arrayUpdate = Object.entries(newUpdate);

        const updatedVariable = [
            'username',
            'globalName',
            'avatar'
        ];

        let data = [];

        for (value of arrayUpdate) {
            if (!updatedVariable.includes(value[0])) continue;
            data.push(value[1]);
        };

        await request.query(
            `UPDATE users SET name=?, global_name=?, avatar=? WHERE id=?`,
            [
                ...data
            ]
        );

        return db.releaseConnection(request);
    }
};