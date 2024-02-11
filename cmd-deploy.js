const { REST, Routes, SlashCommandBuilder } = require("discord.js")
require("dotenv").config({ path: 'config/.env' });

const botID = process.env.BOT_ID
const serverID = process.env.SERVER_ID
const botToken = process.env.TOKEN

const rest = new REST().setToken(botToken)
const slashRegister = async () => {
    try {
        await rest.put(Routes.applicationGuildCommands(botID, serverID), {
            body: [
                new SlashCommandBuilder()
                .setName("agenda")
                .setDescription("Edit your agenda"),

                //Add Other commands

            ]
        })
    } catch (error) {
    console.log(error)
    }
}

slashRegister();
console.log("Registered slash commands")