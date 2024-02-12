import { REST, Routes, SlashCommandBuilder } from "discord.js";
import dotenv from "dotenv";

dotenv.config({ path: 'config/.env' });

const botID = process.env.BOT_ID
const serverID = process.env.SERVER_ID
const botToken = process.env.TOKEN

const rest = new REST().setToken(botToken)
const slashRegister = async () => {
    try {
        await rest.put(Routes.applicationGuildCommands(botID, serverID), {
            body: [
                new SlashCommandBuilder()
                .setName("ping")
                .setDescription("Testing connection"),

                new SlashCommandBuilder()
                .setName("agenda_add")
                .setDescription("add to your agenda")
                .addStringOption( option => 
                    option.setName("date")
                    .setDescription("Enter a date. FORMAT: DD/MM/YY")
                    .setRequired(true)
                )
                .addStringOption(option => 
                        option.setName("content")
                        .setDescription("Enter content")
                        .setRequired(true)
                ),
                new SlashCommandBuilder()
                .setName("agenda_remove")
                .setDescription("remove from your agenda")
                .addStringOption( option =>
                    option.setName("date")
                    .setDescription("Enter a date. FORMAT: DD/MM/YY")
                    .setRequired(true)
                )
            ]
        })
    } catch (error) {
    console.log(error)
    }
}

slashRegister();
console.log("Registered slash commands")
