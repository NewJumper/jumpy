import { config } from 'dotenv'
import { Client, GatewayIntentBits, REST, Routes } from 'discord.js'

config()
const TOKEN = process.env.JUMPY_TOKEN
const CLIENT_ID = process.env.JUMPY_APP_ID
const GUILD_ID = process.env.DEV_GUILD_ID

const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ] })
const rest = new REST({ version: "10" }).setToken(TOKEN)

client.on('ready', () => console.log(client.user.username + " is online"))
const commands = [
    {
      name: "ping",
      description: "pong",
    },
];

async function main() {
    try {
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: commands });
        console.log('Successfully reloaded application (/) commands.');
        client.login(TOKEN)
    } catch (error) {
        console.log(error)
    }
}

main()
