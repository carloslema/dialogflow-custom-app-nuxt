import express from 'express';
import cors from 'cors';
import dialogflow from 'dialogflow';
import bodyParser from 'body-parser';

import config from './config';

const app = express();
const sessionClient = new dialogflow.SessionsClient({
    //keyFilename: process.env.CREDENTIALS_FILE || './Lonk-5fb2a6a4fcaa.json'
    credentials: {
        client_email: config.dialogflowConfig.clientEmail,
        private_key: config.dialogflowConfig.privateKey
    }
});

app.use(cors());
app.use(bodyParser.json());

app.post('/message', function(req, res) {
    // The path to identify the agent that owns the created intent.
    console.log(req.body);
    const projectId = process.env.PROJECT_ID || 'lonk-1b8cc';
    const sessionPath = sessionClient.sessionPath(projectId, req.body.sessionId);

    let promise;
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: req.body.query,
                languageCode: process.env.BOT_LANGUAGE || 'es',
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

app.post('/converse/challenge', function(req, res){
    res.json({
        challenge: req.body.payload.message.text
    });
});

export default {
    path: '/handlers',
    handler: app
}
