'use strict';

let nums = require('../functions/numbers');
let manager = require('../functions/blacklistManager');
let owners = require('../functions/getOwners');
let util = require('util');
let guildCount = require('../functions/getGuilds');
let eco = require('../functions/economy');
let prefixes = require('../functions/getPrefixes');
let toHHMMSS = require('../functions/toReadableTime');
let genRanString = require('../functions/genRanString');
let stats = require('../functions/commandStatistics');
let music = require('../functions/musicUtils');
let fs = require('fs');
const Logger = require('./functions/logger');
const console = new Logger();

module.exports = {
    name: 'eval',

    exec: (client, msg, args) => {
        if (owners.isOwner(msg.author.id)) {
            try {
                var evalCommand = args.join(' ');
                let evaluation = eval(evalCommand);
                if (typeof evaluation !== "string") {
                    evaluation = JSON.stringify(evaluation).replace(client.token, '(insert token here)')
                }else {
                    evaluation = evaluation.replace(client.token, '(insert token here)')
                }
                if (evaluation.length > 2000) {
                    client.createMessage(msg.channel.id, 'Output too large, it should be on your website at https://alekeagle.com/eaglenugget/eval_out').then(() => {
                        fs.writeFile('/home/pi/node_server/root/eaglenugget/eval_out/eval_output.txt', evaluation.replace(/\n/g, '<br>'), (err) => {
                            if (err != undefined) {
                                client.createMessage(msg.channel.id, 'An error occurred while this action was being preformed error code: `' + err.code + '`')
                            }
                        });
                    });
                }else {
                    client.createMessage(msg.channel.id, evaluation)
                }
            } catch (err) {
                client.createMessage(msg.channel.id, 'OOF ERROR:\ninput: ```' + evalCommand + '``` output: ```' + err + '```')
            }
        }else if (!manager.gblacklist.users.includes(msg.author.id)) {
            client.createMessage(msg.channel.id, 'You need the permission `BOT_OWNER` to use this command!')
        }else {
            msg.author.getDMChannel().then(chn => {
                chn.createMessage('You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.com/discord and ask AlekEagle#0001 about this issue.').catch(() => {
                    msg.channel.createMessage(`<@${msg.author.id}> You have been blacklisted from EagleNugget! If you think this is a mistake, please go here https://alekeagle.com/discord and ask AlekEagle#0001 about this issue.`)
                })
            })
        }
    },

    options: {
        hidden: true,
        fullDescription: 'Evaluates code with a command (owner only)',
        aliases: [
            'evaluate',
            'ev'
        ]
    }
}