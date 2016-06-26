'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5555;

const emojiSuggester = require('./src/emoji-suggester');
const auth = require('./src/auth');

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
    // check if message starts with url
    const userName = req.body.user_name;
    console.log('yas', req.body);

    emojiSuggester.suggestEmojis(req.body.text)$
        .then(emojis => {
            const payload = {
                text: emojis.join(' ')
            };
            return (userName !== 'slackbot') ?
                res.status(200).json(payload) :
                res.status(200).end();
        });
});

/**
 * handling oauth flow.
 */
app.get('/oauth', (req, res) => {
    auth.sendOauthAccess(req.params.code)
        .then(() => res.status(200).send('ok!'))
        .catch(() => res.status(200).send('failed 💩!'));
});

// listening to server
app.listen(port, () => {
    console.log('listening on port', port);
});
