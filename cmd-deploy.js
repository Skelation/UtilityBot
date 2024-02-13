import { REST, Routes, SlashCommandBuilder } from "discord.js";
import dotenv from "dotenv";

dotenv.config({ path: "config/.env" });

const botID = process.env.BOT_ID;
const serverID = process.env.SERVER_ID;
const botToken = process.env.TOKEN;

const rest = new REST().setToken(botToken);
const slashRegister = async () => {
  try {
    await rest.put(Routes.applicationGuildCommands(botID, serverID), {
      body: [
        new SlashCommandBuilder()
          .setName("ping")
          .setDescription("Testing connection"),
        new SlashCommandBuilder()
          .setName("note_add")
          .setDescription("add to your notes")
          .addStringOption((option) =>
            option
              .setName("title")
              .setDescription("Enter the title of your note")
              .setRequired(true),
          )
          .addStringOption((option) =>
            option
              .setName("content")
              .setDescription("Enter the body of your note")
              .setRequired(true),
          ),
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

slashRegister();
console.log("Registered slash commands");
