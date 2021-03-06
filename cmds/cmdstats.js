'use strict';

let manager = require('../functions/blacklistManager');
let stats = require('../functions/commandStatistics');

module.exports = {
    name: 'cmdstats',

    exec: (client, msg, args) => {
        if (!manager.gblacklist.users.includes(msg.author.id)) {
            var entries = stats.uses.toJSON().sort((a, b) => a[1] - b[1]).reverse();
            if (args[0] === undefined) args[0] = 0; else args[0] = parseInt(args[0])
            if (args[0] === NaN) args[0] = 0; else if (args[0] !== 0) args[0] --;
            if (args[0] + 1 > Math.ceil(entries.length / 5)) return `That's more pages then there are pages of commands! The last page is ${Math.ceil(entries.length / 5)}!`
            msg.channel.createMessage(`This is page ${args[0] + 1} of ${Math.ceil(entries.length / 5)}\n\`\`\`${entries.slice(0 + (5 * args[0]), 5 + (5 * args[0])).map(e => `${entries.indexOf(e) + 1}. ${e[0]}: ${e[1]} uses`).join('\n')}\`\`\``)
        }else {
            msg.author.getDMChannel().then(chn => {
                chn.createMessage('You have been blacklisted from dad bot! If you think this is a mistake, please go here https://alekeagle.com/discord and ask AlekEagle#0001 about this issue.').catch(() => {
                    msg.channel.createMessage(`<@${msg.author.id}> You have been blacklisted from dad bot! If you think this is a mistake, please go here https://alekeagle.com/discord and ask AlekEagle#0001 about this issue.`)
                })
            })
        }
    },

    options: {
        description: 'Which command is the most used command?',
        fullDescription: 'Shows each commands stats',
        usage: '[page#]'
    }
}