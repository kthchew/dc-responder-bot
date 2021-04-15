// TODO: the config should probably be checked for validity
const config = require('../config.json');

const Discord = require('discord.js');
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", message => {
    // only respond to first matching event
    let isComplete = false;
    config.usersToRespondTo.forEach(whitelistedUser => {
        if (isComplete) return;
        if (whitelistedUser.userID !== undefined && !(whitelistedUser.userID === message.author.id.toString())) return;

        let messageMatched = false;
        if (!messageMatched && whitelistedUser.receivedMessageCaseInsensitive !== undefined) {
            messageMatched = whitelistedUser.receivedMessageCaseInsensitive.toLowerCase() === message.content.toLowerCase()
        }
        if (!messageMatched && whitelistedUser.receivedMessageContains !== undefined) {
            messageMatched = message.content.toLowerCase().indexOf(whitelistedUser.receivedMessageContains.toLowerCase()) !== -1;
        }

        if (messageMatched) {
            isComplete = true;
            message.channel.send(whitelistedUser.sendMessage);
        }
    })
})

client.login(config.token);
