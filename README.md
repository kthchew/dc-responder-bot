# Discord Responder

A basic Discord bot to respond to messages. WIP.

Uses [Discord.js](https://github.com/discordjs/discord.js).

## Usage

In the root directory of the project, create a `config.json` file, similar to below:

```
{
  "token": "YOUR_TOKEN_HERE",
  "usersToRespondTo": [
    {
      "userID": "USER_YOU_WANT_TO_RESPOND_TO",
      "receivedMessageCaseInsensitive": "a message that this user sent",
      "receivedMessageContains": "a different message",
      "sendMessage": "message to reply to the user"
    },
    {
      "userID": "USER_YOU_WANT_TO_RESPOND_TO",
      "receivedMessageCaseInsensitive": "another message",
      "sendMessage": "hello!"
    }
  ]
}
```

Then, run `npm run start` while in the project directory.

For now, it only responds to a single person per event.