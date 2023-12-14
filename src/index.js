import { config } from 'dotenv'
import { Client, GatewayIntentBits, REST, Routes } from 'discord.js'
import * as Commands from './commands.js'

config()
const TOKEN = process.env.JUMPY_TOKEN
const CLIENT_ID = process.env.JUMPY_APP_ID
const GUILD_ID = process.env.DEV_GUILD_ID

const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ] })
const rest = new REST({ version: "10" }).setToken(TOKEN)

async function main() {
    try {
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: [ Commands.math.toJSON(), Commands.trivia.toJSON() ] });
        console.log('Successfully reloaded application (/) commands.');
        client.login(TOKEN)
    } catch (error) {
        console.log(error)
    }
}

main()
client.on('ready', () => console.log(client.user.username + " is online"))
client.on('interactionCreate', async interaction => {
    if(!interaction.isChatInputCommand()) return;
    switch(interaction.commandName) {
        case "math": {
            let num1 = interaction.options.getNumber("num1")
            let operation = interaction.options.getString("operation")
            let num2 = interaction.options.getNumber("num2")
            let result
            let op
            if(operation == "add") {
                result = num1 + num2
                op = "+"
            } else if(operation == "subtract") {
                result = num1 - num2
                op = "-"
            } else if(operation == "multiply") {
                result = num1 * num2
                op = "\u00d7"
            } else if(operation == "divide") {
                result = num1 / num2
                op = "\u00f7"
            }
            interaction.reply(num1 + " " + op + " " + num2 + " = " + result)
            return
        }
        case "trivia": {
            let difficulty = interaction.options.getString("difficulty")
            if(difficulty == "easy") interaction.reply("what is `1 + 1`")
            else interaction.reply("what is the integral of `x^x`")
            return
        }
    }
})
