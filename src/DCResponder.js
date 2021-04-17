// TODO: the config should probably be checked for validity
const config = require('../config.json');
let rules;

const Discord = require('discord.js');
const client = new Discord.Client();

const RespondRule = require('./RespondRule.js')

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    rules = config.usersToRespondTo.map(rule => {
        return RespondRule.from(rule);
    })
});

client.on("message", message => {
    // only respond to first matching event
    let isComplete = false;

    rules.forEach(rule => {
        if (isComplete) return;

        if (rule.matches(message)) {
            isComplete = true;
            message.channel.send(rule.sendMessage);
        }
    })
})

client.login(config.token);
