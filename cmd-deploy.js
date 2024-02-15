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
        new SlashCommandBuilder()
          .setName("note")
          .setDescription("See your notes")
          .addStringOption((option) =>
            option
              .setName("title")
              .setDescription("Enter the title of the note to view it")
              .setRequired(false),
          ),
        new SlashCommandBuilder()
          .setName("note_delete")
          .setDescription("Delete a note")
          .addStringOption((option) =>
            option
              .setName("index")
              .setDescription("Index of the note. Find it with /note")
              .setRequired(true),
          ),
        new SlashCommandBuilder()
          .setName("synthese_add")
          .setDescription("Add a synthese")
          .addStringOption((option) =>
            option
              .setName("topic")
              .setDescription("Topic of the synthese")
              .setRequired(true)
              .addChoices(
                { name: "Math", value: "math" },
                { name: "Français", value: "francais" },
                { name: "Chimie", value: "chimie" },
                { name: "Physique", value: "physique" },
                { name: "Biologie", value: "biologie" },
                { name: "Histoire", value: "histoire" },
                { name: "Anglais", value: "anglais" },
                { name: "Néerlandais", value: "neerlandais" },
                { name: "Espagnol", value: "espagnol" },
                { name: "Religion", value: "religion" },
                { name: "Géographie", value: "geographie" },
              ),
          )
          .addStringOption((option) =>
            option
              .setName("title")
              .setDescription("Title of the synthese")
              .setRequired(true),
          )
          .addStringOption((option) =>
            option
              .setName("link")
              .setDescription("Google docs link to the synthese")
              .setRequired(true),
          ),
          new SlashCommandBuilder()
          .setName("synthese")
          .setDescription("See your syntheses")
          .addStringOption((option) =>
            option
              .setName("topic")
              .setDescription("Topic of the synthese")
              .setRequired(true)
              .addChoices(
                { name: "Math", value: "math" },
                { name: "Français", value: "francais" },
                { name: "Chimie", value: "chimie" },
                { name: "Physique", value: "physique" },
                { name: "Biologie", value: "biologie" },
                { name: "Histoire", value: "histoire" },
                { name: "Anglais", value: "anglais" },
                { name: "Néerlandais", value: "neerlandais" },
                { name: "Espagnol", value: "espagnol" },
                { name: "Religion", value: "religion" },
                { name: "Géographie", value: "geographie" },
              ),
          ),
      ],
    });
  } catch (error) {
    console.log(error);
  }
};

slashRegister();
console.log("Registered slash commands");
