import {
  Client,
  IntentsBitField,
  ActivityType,
  EmbedBuilder,
} from "discord.js";

import dotenv from "dotenv";
dotenv.config({ path: "config/.env" });
import fs from "fs";

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
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`${client.user.tag} is utilitying`);
  //Client Activity
  client.user.setActivity({
    name: "your problems",
    type: ActivityType.Listening,
  });
});

function ping(interaction) {
  interaction.reply("Pong!");
}

//Note add command
function note_add(interaction) {
  const filePath = "note_data.json";
  let data = {};

  try {
    //Setup json file incase file isn't there
    if (fs.existsSync(filePath)) {
      const rawData = fs.readFileSync(filePath);
      if (rawData.length > 0) {
        data = JSON.parse(rawData);
      }
    }
    //If user doesn't exist then create an empty array
    if (!data[interaction.user.id]) {
      data[interaction.user.id] = [];
    }

    const date = interaction.options.getString("title");
    const content = interaction.options.getString("content");
    data[interaction.user.id].push({ date: date, content: content });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    const embed = new EmbedBuilder()
      .setTitle("Notes")
      .setDescription(`Added "${content}" to your notes called ${Title}`)
      .setTimestamp();
    interaction.channel.send({ embeds: [embed] });
  } catch (error) {
    console.log(error);
  }
}

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
