// Starting Bot
export const startBot = async (rtm) => {
    try {
        await rtm.start()
    } catch (e) {
        console.log(e)
    }
}

// Sending Notification
export const sendNotification = async (web, channel, text) => await web.chat.postMessage({
    channel,
    text
})