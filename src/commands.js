import { SlashCommandBuilder } from '@discordjs/builders'

export const math = new SlashCommandBuilder()
.setName("math")
.setDescription("Do math with two numbers")
.addNumberOption(option => option.setName("num1").setDescription("The first number").setRequired(true))
.addStringOption(option => option.setName("operation").setDescription("Perform operation").setRequired(true).setChoices({
    name: "+",
    value: "add"
}, {
    name: "-",
    value: "subtract"
}, {
    name: "*",
    value: "multiply"
}, {
    name: "/",
    value: "divide"
}))
.addNumberOption(option => option.setName("num2").setDescription("The second number").setRequired(true))

export const trivia = new SlashCommandBuilder()
.setName("trivia")
.setDescription("Answer a math question")
.addStringOption(option => option.setName("difficulty").setDescription("Difficulty").setRequired(true).setChoices({
    name: "easy",
    value: "easy"
}, {
    name: "hard",
    value: "hard"
}))