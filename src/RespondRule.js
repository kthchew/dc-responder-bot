class RespondRule {
    /**
     * Creates a blank `RespondRule` that matches no messages.
     */
    constructor() {
        /**
         * @type {?String}
         */
        this.userID = null;
        /**
         * @type {?String}
         */
        this.receivedMessageCaseInsensitive = null;
        /**
         * @type {?String}
         */
        this.receivedMessageContains = null;
        /**
         * @type {String}
         */
        this.sendMessage = 'Looks like someone configured me incorrectly. Please report this issue to them.';
    }

    /**
     * Creates a new `RespondRule` from the given `json` data.
     * @param json
     * @returns {RespondRule}
     */
    static from(json) {
        return Object.assign(new RespondRule(), json);
    }

    /**
     * Determines if the given `message` matches this rule.
     * @param message
     * @returns {boolean} `true` if the given `message` matches this rule, otherwise `false`.
     */
    matches(message) {
        if (this.userID !== null && this.userID !== message.author.id.toString()) return false;

        let messageMatched = false;
        if (!messageMatched && this.receivedMessageCaseInsensitive !== null) {
            messageMatched = this.receivedMessageCaseInsensitive.toLowerCase() === message.content.toLowerCase();
            let currentEmbed = 0;
            while (!messageMatched && currentEmbed < message.embeds.length && message.embeds[currentEmbed].description !== null) {
                messageMatched = this.receivedMessageCaseInsensitive.toLowerCase() === message.embeds[currentEmbed].description.toLowerCase();
                currentEmbed++;
            }
        }
        if (!messageMatched && this.receivedMessageContains !== null) {
            messageMatched = message.content.toLowerCase().indexOf(this.receivedMessageContains.toLowerCase()) !== -1;
            let currentEmbed = 0;
            while (!messageMatched && currentEmbed < message.embeds.length && message.embeds[currentEmbed].description !== null) {
                messageMatched = message.embeds[currentEmbed].description.toLowerCase().indexOf(this.receivedMessageContains.toLowerCase()) !== -1;
                currentEmbed++;
            }
        }
        return messageMatched;
    }
}

module.exports = RespondRule;
