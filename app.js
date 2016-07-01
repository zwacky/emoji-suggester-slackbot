'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5555;

const emojiSuggester = require('./src/emoji-suggester');
const emojiHelper = require('./src/emoji-helper');
const authHelper = require('./src/auth-helper');
const got = require('got');

// body parser middleware
app.use(bodyParser.urlencoded({
    extended: true
}));

// base route
app.get('/', (req, res) => {
    res.status(200).send('works! 💪👌💯🙌');
});

/**
 * here is where the magic happens.
 * depending on the content it will suggest emojis from text or a URL content.
 */
app.post('/suggest', (req, res) => {
    const userName = req.body.user_name;
    console.log('💋', req.body);
    const requestText = req.body.text;
    const promise = (emojiHelper.isUrl(requestText)) ?
        emojiSuggester.suggestEmojis(requestText) :
        emojiSuggester.suggestEmojisFromUrl(requestText);
    const response_url = req.body.response_url;

    // send immediate response since there is a 3000ms limit on request times
    res.status(200).end();

    promise
        .then(emojis => {
            const payload = emojiHelper.buildSuggestMessage(userName, requestText, emojis);
            got.post(response_url, {
                body: JSON.stringify(payload)
            });
        });
});

/**
 * handling oauth flow.
 */
app.get('/oauth', (req, res) => {
    const code = authHelper.getParameterFromUrl(req.url, 'code');
    authHelper.sendOauthAccess(code)
        .then((result) => res.status(200).send('ok!'))
        .catch(() => res.status(200).send('failed 💩!'));
});

// listening to server
app.listen(port, () => {
    console.log('listening on port', port);
});
