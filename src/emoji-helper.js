'use strict';

const validator = require('validator');


/**
 * checks if a string is an url.
 *
 * @param string str
 * @return boolean
 */
function isUrl(str) {
    return validator.isURL(str);
}

/**
 * builds a slack message block for an emoji suggestion.
 *
 * @param string userName
 * @param string userId
 * @param string requestText
 * @param array emojis
 * @return object
 */
function buildSuggestMessage(userName, userId, requestText, emojis) {
    return {
        response_type: 'in_channel',
        text: `<@${userId}|${userName}> asked for emoji suggestions: *${requestText}*`,
        unfurl_links: false,
        attachments: [
            {
                text: emojis.join(' ')
            }
        ]
    };
}

module.exports = {
    isUrl,
    buildSuggestMessage,
};
