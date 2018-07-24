# custom-bot

> Project to test bot customization on dialogflow

## Build Setup

``` bash
# install dependencies
$ npm install # Or yarn install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).

## Configuration

To run this project you need to add the DialogFlow credentials sent on the `handlers/server.js:9` file. To do this you have two options:

1. Download file credentials from your GCP app and use the `keyFilename` option to create session client, like this:

    ```js
        const sessionClient = new dialogflow.SessionsClient({
            keyFilename: process.env.CREDENTIALS_FILE || '<JSON_CREDENTIALS_FILE_PATH>'
        });
    ```

2. By default the project has a configuration using the `client_email` and `private_key`, if you want to use this method you can modify the `handlers/config.js` variables.