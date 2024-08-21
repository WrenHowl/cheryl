const fr = require('../languages/fr.json');
const en = require('../languages/en.json');
const de = require('../languages/de.json');
const sp = require('../languages/sp.json');
const nl = require('../languages/nl.json');

function language(msgInt) {
    db.query(`SELECT language FROM loggings WHERE guildId=?`, [msgInt.guild.id], async (error, statement) => {
        if (statement) {
            const statString = JSON.stringify(statement);
            const value = JSON.parse(statString);

            const language = value[0]['language'];
            switch (language) {
                case ('en'):
                    languageSet = en;
                    break;
                case ('fr'):
                    languageSet = fr;
                    break;
                case ('de'):
                    languageSet = de;
                    break;
                case ('sp'):
                    languageSet = sp;
                    break;
                case ('nl'):
                    languageSet = nl;
                    break;
                default:
                    languageSet = en;
                    break;
            };
        }
    });
}

module.exports = { fr, en, de, sp, nl, language };