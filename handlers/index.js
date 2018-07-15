const express = require('express');
const cors = require('cors');
const dialogflow = require('dialogflow');
var bodyParser = require('body-parser');

const app = express();
const sessionClient = new dialogflow.SessionsClient({
    keyFilename: './Lonk-5fb2a6a4fcaa.json'
});

app.use(cors());
app.use(bodyParser.json());

app.post('/message', function(req, res) {
    // The path to identify the agent that owns the created intent.
    console.log(req.body);
    const sessionPath = sessionClient.sessionPath('lonk-1b8cc', req.body.sessionId);

    let promise;
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: req.body.query,
                languageCode: 'es',
            },
        },
    };
    promise = sessionClient.detectIntent(request);
    promise.then(responses => {
        console.log('Detected intent');
        console.log(responses[0].queryResult);
        res.json({
            text: responses[0].queryResult.fulfillmentText,
        });
    })
    .catch(err => {
        console.error('ERROR:', err);
    });
});

module.exports = {
    path: '/handlers',
    handler: app
};
