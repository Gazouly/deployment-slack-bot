# Deployment Notifier
A bot made with [Slack API](https://api.slack.com/) that notifies team members on a specific channel with builds changelog

## Installation
You need to install packages before using the bot, so run one of the following commands to install them

if you use `Yarn - Package Manager`

```
yarn
```
or if you're a `NPM` fan just run

```
npm i
```

## Setup

### Generate the slack api token

1. Create a brand new [Classic App](https://api.slack.com/apps?new_classic_app=1).
2. Under the section of **Add features and functionality** choose Bots, and you'll be redirected to **App Home** page.
3. Add a legacy bot user, add its display name and username. A legacy bot user comes with a bundle of bot scopes, which are needed to show the app home tab.
4. Install your app to your workspace.

After installing the app, you can see your api keys now!

### Using your the api token
Create a `.env` file in the root directory of the project and add the following

```js
SLACK_OAUTH_TOKEN = <your-oauth-access-token>
```

## Usage
- Create two brand new files in your root directory and give them names of your choice, I'll name them `deployment_notifier.js` and `changelog.txt`
- Add [axios](https://www.npmjs.com/package/axios) or any promise-based HTTP client for node.js (if your project is a JS one)
- Open `deployment_notifier.js` file and add the following script

```js
  const axios = require('axios')
  const fs = require('fs');

  (async () => {
    const changelog = fs.readFileSync('changelog.txt', 'utf8')
    await axios.post('<your-deployed-bot-base-url>/send-notification>', {
      channel: '<channel-name>',
      text: changelog
    })
  })()
```

- Edit your pipeline stages to run this script after every new build
```
pipeline {
    agent any
    stages {
        stage('Build & deploy') {
            steps {
                timeout(time: 3, unit: 'MINUTES') {
                    sh '/<path-to-your-project>/yarn'
                    sh '/<path-to-your-project>/yarn build --mode testing'
                    sh '/<path-to-your-project>/node deployment_notifier.js'
                }
            }
        }
    }
}
```

