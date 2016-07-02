'use strict';

const assert = require('chai').assert;
const emojiHelper = require('../src/emoji-helper');

describe('emoji helper', () => {

    it('should determine if a text starts with a URL', () => {
        const checks = [
            {text: 'just some text', result: false},
            {text: 'https://www.disney.com', result: true},
            {text: 'www.disney.com', result: true},
            {text: 'disney.com', result: true},
            {text: 'https://www.disney.com with some appending text', result: false},
            {text: 'with prepending text https://www.disney.com', result: false},
        ];

        checks.forEach(item => {
            const result = emojiHelper.isUrl(item.text);
            assert.equal(result, item.result);
        });
    });

});
