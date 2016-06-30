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
    const promise = (emojiHelper.isUrl(req.body.text)) ?
        emojiSuggester.suggestEmojis(req.body.text) :
        emojiSuggester.suggestEmojisFromUrl(req.body.text);
    const response_url = req.body.response_url;

    // send immediate response since there is a 3000ms limit on request times
    res.status(200).json({
        text: 'Request in progress... 😼'
    });

    console.log('==');
    promise
        .then(emojis => {
            console.log('inc emojis', emojis);
            console.log('response_url', response_url);
            const payload = {
                text: emojis.join(' ')
            };
            got.post(response_url, {
                body: payload
            })
            .then(console.log)
            .catch(console.log);
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
