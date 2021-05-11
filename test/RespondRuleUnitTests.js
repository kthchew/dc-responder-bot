const assert = require('assert');
const MockDiscord = require("./DiscordMock.js");
const RespondRule = require('../src/RespondRule.js');

// Create mock messages
const discord = new MockDiscord();
const messageExactMatch = discord.mockMessage('hi there');
const messagePartialMatch = discord.mockMessage('hi there general kenobi');
const messageNoMatch = discord.mockMessage('completely unrelated message');
const messageExactMatchEmbed = discord.mockMessageWithEmbed('placeholder', 'title', 'hi there');
const messagePartialMatchEmbed = discord.mockMessageWithEmbed('placeholder', 'title', 'hi there general kenobi');
const messageNoMatchEmbed = discord.mockMessageWithEmbed('placeholder', 'title', 'completely unrelated message');
const messageNoDescEmbed = discord.mockMessageWithEmbed('placeholder', 'title', null);

// TESTS: `receivedMessageContains` rules
let containsRule = new RespondRule();
containsRule.receivedMessageContains = 'hi there';
containsRule.sendMessage = 'hello';
assert.strictEqual(containsRule.matches(messageExactMatch), true, "receivedMessageContains: Regular message with exact match does not have expected behavior.");
assert.strictEqual(containsRule.matches(messagePartialMatch), true, "receivedMessageContains: Regular message with partial match does not have expected behavior.");
assert.strictEqual(containsRule.matches(messageNoMatch), false, "receivedMessageContains: Regular message with no match does not have expected behavior.");
assert.strictEqual(containsRule.matches(messageExactMatchEmbed), true, "receivedMessageContains: Message with embed containing exact match does not have expected behavior.");
assert.strictEqual(containsRule.matches(messagePartialMatchEmbed), true, "receivedMessageContains: Message with embed containing partial match does not have expected behavior.");
assert.strictEqual(containsRule.matches(messageNoMatchEmbed), false, "receivedMessageContains: Message with embed containing no match does not have expected behavior.");
assert.strictEqual(containsRule.matches(messageNoDescEmbed), false, "receivedMessageContains: Message with embed containing no description (and thus no match) does not have expected behavior.");

// TESTS: `receivedMessageCaseInsensitive` rules
let caseInsensitiveRule = new RespondRule();
caseInsensitiveRule.receivedMessageCaseInsensitive = 'hi there';
caseInsensitiveRule.sendMessage = 'hello';
assert.strictEqual(caseInsensitiveRule.matches(messageExactMatch), true, "receivedMessageCaseInsensitive: Regular message with exact match does not have expected behavior.");
assert.strictEqual(caseInsensitiveRule.matches(messagePartialMatch), false, "receivedMessageCaseInsensitive: Regular message with partial match does not have expected behavior.");
assert.strictEqual(caseInsensitiveRule.matches(messageNoMatch), false, "receivedMessageCaseInsensitive: Regular message with no match does not have expected behavior.");
assert.strictEqual(caseInsensitiveRule.matches(messageExactMatchEmbed), true, "receivedMessageCaseInsensitive: Message with exact match does not have expected behavior.");
assert.strictEqual(caseInsensitiveRule.matches(messagePartialMatchEmbed), false, "receivedMessageCaseInsensitive: Message with partial match does not have expected behavior.");
assert.strictEqual(caseInsensitiveRule.matches(messageNoMatchEmbed), false, "receivedMessageCaseInsensitive: Message with no match does not have expected behavior.");
assert.strictEqual(caseInsensitiveRule.matches(messageNoDescEmbed), false, "receivedMessageCaseInsensitive: Message with embed containing no description (and thus no match) does not have expected behavior.");

// TODO: tests for user and sending messages

console.info('All tests have passed.');
process.exit(0);
