import { config } from 'dotenv'
import { Client, GatewayIntentBits } from 'discord.js'

config()
const TOKEN = process.env.JUMPY_TOKEN

const client = new Client({
    intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ]
})
client.login(TOKEN)
client.on('ready', () => {
    console.log(client.user.username + " is online")
})

client.on('messageCreate', (message) => {
    if(message.author.bot) return
    console.log(message.content)
    message.reply("wa")
})
