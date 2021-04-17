// TODO: the config should probably be checked for validity
const config = require('../config.json');
let rules;

const Discord = require('discord.js');
const client = new Discord.Client();

const RespondRule = require('./RespondRule.js')

let recentlySentMessages = 0;

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    rules = config.usersToRespondTo.map(rule => {
        return RespondRule.from(rule);
    })

    if (config.maximumMessageIntervalInSeconds !== undefined || config.maximumMessageCount !== undefined) {
        setInterval(function () {
            recentlySentMessages = 0;
        }, config.maximumMessageIntervalInSeconds)
    }
});

client.on("message", message => {
    // only respond to first matching event
    let isComplete = false;

    rules.forEach(rule => {
        if (isComplete) return;

        if (rule.matches(message)) {
            if (config.maximumMessageCount === undefined || recentlySentMessages <= config.maximumMessageCount) {
                isComplete = true;
                message.channel.send(rule.sendMessage).then(() => {
                    recentlySentMessages++;
                });
            }
        }
    })
})

client.login(config.token);
