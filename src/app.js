import { RTMClient } from '@slack/rtm-api'
import { WebClient } from '@slack/web-api'
import { startBot, sendNotification } from './slack'
import Express from 'express'
import CORS from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'

import dotenv from 'dotenv'

// import fileSystem from 'fs'
// const fileContent = fileSystem.readFileSync('./src/test.txt', 'utf8')
// console.log(fileContent)

dotenv.config()

const rtm = new RTMClient(process.env.SLACK_OAUTH_TOKEN)
const web = new WebClient(process.env.SLACK_OAUTH_TOKEN)
const app = new Express()
const PORT = process.env.PORT || 5000

// Init Middlewares
app.use(CORS())
app.use(helmet())
app.use(bodyParser.json())

// Routes
app.post('/send-notification', async (req, res) => {
    const { channel, text } = req.body

    await startBot(rtm)
    await sendNotification(web, `#${channel}`, text)

    res.status(200).json({
        message: 'Notification Sent Successfully!'
    })
})

// Starting App
app.listen(PORT, async () => {
    console.log(`App started and listens on PORT ${PORT}`)
})