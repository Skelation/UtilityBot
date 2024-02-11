import  { Client, IntentsBitField, ActivityType, EmbedBuilder } from "discord.js";

import dotenv from "dotenv";
dotenv.config({ path: 'config/.env' });

const DISCORD_TOKEN = process.env.TOKEN;

const client = new Client({
    intents: [
      IntentsBitField.Flags.Guilds,
      IntentsBitField.Flags.GuildMessages,
      IntentsBitField.Flags.GuildMembers,
      IntentsBitField.Flags.MessageContent,
    ],
});

client.on("ready", () => {
    console.log("Ready for waffling");
    console.log(`${client.user.tag} is waffling`);
  
    client.user.setActivity({
      name: "bluds waffling",
      type: ActivityType.Listening,
    });
});

//Ping command
function ping(interaction) {
    interaction.reply({ content: "Pong!"});
}

//Add more commands

//Slash Commands
client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        try {
            if (interaction.commandName === "ping") {
            await interaction.deferReply();
            await interaction.deleteReply();
            await ping(interaction);
            }
            //Add more commands


        } catch (error) {
            console.error(error);
            await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
    }
})

client.login(DISCORD_TOKEN);