import {
  Client,
  IntentsBitField,
  ActivityType,
} from "discord.js";

import dotenv from "dotenv";
dotenv.config({ path: "config/.env" });

const DISCORD_TOKEN = process.env.TOKEN;

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
  ],
});

import ping from './commands/ping.js';
import note_add from './commands/note_add.js';
import note from './commands/note_add.js';
import note_delete from './commands/note_delete.js';
import synthese_add from './commands/synthese_add.js';
import synthese from './commands/synthese.js';

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`${client.user.tag} is utilitying`);
  //Client Activity
  client.user.setActivity({
    name: "your problems",
    type: ActivityType.Listening,
  });
});

//Slash Commands
client.on("interactionCreate", async (interaction) => {
  console.log(interaction.commandName);
  if (interaction.isCommand()) {
    try {
      if (interaction.commandName === "ping") {
        ping(interaction);
      }
      if (interaction.commandName === "note_add") {
        await interaction.deferReply();
        await interaction.deleteReply();
        note_add(interaction);
      }
      if (interaction.commandName === "note_delete") {
        await interaction.deferReply();
        await interaction.deleteReply();
        note_delete(interaction);
      }
      if (interaction.commandName === "note") {
        await interaction.deferReply();
        await interaction.deleteReply();
        note(interaction);
      }
      if (interaction.commandName === "synthese") {
        await interaction.deferReply();
        await interaction.deleteReply();
        synthese(interaction);
      }
      if (interaction.commandName === "synthese_add") {
        await interaction.deferReply();
        await interaction.deleteReply();
        synthese_add(interaction);
      }
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

client.login(DISCORD_TOKEN);
