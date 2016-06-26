'use strict';

const assert = require('chai').assert;
const emojiSuggester = require('../src/emoji-suggester');

describe('emoji suggester', () => {

    it('should return any suggestions', (done) => {
        const text = 'sun';
        emojiSuggester.suggestEmojis(text)
            .then(emojis => {
                assert.equal(emojis.length > 0, true);
                done();
            })
            .catch(done);
    });

    it('should return any suggestions from a URL', (done) => {
        const url = 'https://www.disney.com';

        emojiSuggester.suggestEmojisFromUrl(url)
            .then(emojis => {
                assert.equal(emojis.length > 0, true);
                done();
            })
            .catch(done);
    });

});
