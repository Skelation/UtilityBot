import  { Client, IntentsBitField, ActivityType, EmbedBuilder } from "discord.js";

import dotenv from "dotenv";
dotenv.config({ path: 'config/.env' });
import fs, {cp} from "fs"

const DISCORD_TOKEN = process.env.TOKEN;

const client = new Client({
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.MessageContent,
    ],
});

const filePath = "/config/data.json";
try {
    if (fs.existsSync(filePath)) {
        const rawData = fs.readFileSync(filePath);
        data = JSON.parse(rawData)
    }
} catch(error) {
    console.log(error)
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`${client.user.tag} is utilitying`);
  
    client.user.setActivity({
      name: "your problems",
      type: ActivityType.Listening,
    });
});

//Ping command
function ping(interaction) {
    interaction.reply({ content: "Pong!"});
}

//Agenda command
function agenda(interaction) {
    
    interaction.reply({content: "in_dev"})
}



//Slash Commands
client.on("interactionCreate", async (interaction) => {
    console.log(interaction.commandName);
    if (interaction.isCommand()) {
        try {
            if (interaction.commandName === "ping") {
                await ping(interaction);
            }
            if (interaction.commandName === "agenda") {
                await agenda(interaction);
            }
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
    }
})

client.login(DISCORD_TOKEN);