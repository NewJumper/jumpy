import { config } from 'dotenv'
import { Client, GatewayIntentBits, REST, Routes } from 'discord.js'

config()
const TOKEN = process.env.JUMPY_TOKEN
const CLIENT_ID = process.env.JUMPY_APP_ID
const GUILD_ID = process.env.DEV_GUILD_ID

const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ] })
const rest = new REST({ version: "10" }).setToken(TOKEN)

const commands = [
    {
        name: "add",
        description: "Add two numbers",
        options: [
            {
                name: "num1",
                description: "The first number",
                type: 4,
                required: true
            },
            {
                name: "num2",
                description:" The second number",
                type: 4,
                required: true
            }
        ]
    },
    {
        name: "math",
        description: "Answer a math question",
        options: [
            {
                name: "difficulty",
                description: "Difficulty",
                type: 3,
                required: true,
                choices: [
                    {
                        name: "easy",
                        value: "easy"
                    },
                    {
                        name: "hard",
                        value: "hard"
                    }
                ]
            }
        ]
    }
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
client.on('ready', () => console.log(client.user.username + " is online"))
client.on('interactionCreate', async interaction => {
    if(!interaction.isChatInputCommand()) return;
    switch(interaction.commandName) {
        case "add": {
            let num1 = interaction.options.getInteger("num1")
            let num2 = interaction.options.getInteger("num2")
            await interaction.reply(num1 + " + " + num2 + " = " + (num1 + num2))
            return
        }
        case "math": {
            let difficulty = interaction.options.getString("difficulty")
            if(difficulty == "easy") await interaction.reply("what is `1 + 1`")
            else await interaction.reply("what is the integral of `x^x`")
            return
        }
    }
})
