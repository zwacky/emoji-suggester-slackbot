'use strict';

function isUrl(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
}

/**
 * builds a slack message block for an emoji suggestion.
 *
 * @param string requestText
 * @param array emojis
 * @return object
 */
function buildSuggestMessage(requestText, emojis) {
    return {
        response_type: 'in_channel',
        text: `Your request: *${requestText}*`,
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
