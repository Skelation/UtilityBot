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

    const title = interaction.options.getString("title");
    const content = interaction.options.getString("content");
    data[interaction.user.id].push({ title: title, content: content });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    const embed = new EmbedBuilder()
      .setTitle("Notes")
      .setDescription(`Added "${content}" to your notes called ${title}`)
      .setTimestamp();
    interaction.channel.send({ embeds: [embed] });
  } catch (error) {
    console.log(error);
  }
}

//TODO if argument is given, show the note with, as the input the correct title or index
function note(interaction) {
  const filePath = "note_data.json";
  let data = {};

  try {
    if (fs.existsSync(filePath)) {
      const rawData = fs.readFileSync(filePath);
      if (rawData.length > 0) {
        data = JSON.parse(rawData);
      }
    }
    if (!data[interaction.user.id]) {
      interaction.reply("No data for this user");
      return;
    }
    for (let i = 0; i < data[interaction.user.id].length; i++) {
      let title = data[interaction.user.id][i]["title"];
      let content = data[interaction.user.id][i]["content"];

      const embed = new EmbedBuilder()
        .setTitle(`${i + 1}. ` + title)
        .setDescription(content);
      console.log("test");
      interaction.channel.send({ embeds: [embed] });
    }
  } catch (error) {
    console.log(error);
  }
}

function note_delete(interaction) {
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
    if (!data[interaction.user.id]) {
      interaction.channel.send("No Data for this user");
      return;
    }
    const index = interaction.options.get("index");

    console.log(index.value);
    if (index.value > 0 && index.value <= data[interaction.user.id].length) {
      data[interaction.user.id].splice(index.value - 1, 1);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
      const embed = new EmbedBuilder().setTitle(
        `Deleted Note, index n.${index}`,
      );
      interaction.channel.send({ embeds: [embed] });
    }
  } catch (error) {
    console.log(error);
  }
}

function synthese_add(interaction) {
  let filePath = "note_data.json";
  let data = {};

  let topic = interaction.options.get("topic");
  let title = interaction.options.get("title");
  let link = interaction.options.get("link");
  try {
    //Setup json file incase file isn't there
    if (fs.existsSync(filePath)) {
      const rawData = fs.readFileSync(filePath);
      if (rawData.length > 0) {
        data = JSON.parse(rawData);
      }
    }
    if (!data[topic.value]) {
      data[topic.value] = [];
    }
    data[topic.value].push({ title: title.value, link: link.value });
    const embed = new EmbedBuilder()
      .setTitle("Added Synthese")
      .setDescription(`Added ${title.value} to the syntheses`);

    interaction.channel.send({ embeds: [embed] });
    console.log(data);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); 
  } catch (error) {
    console.log(error);
  }
}

function synthese(interaction) {
  let filePath = "note_data.json";
  let data = {};
  let topic = interaction.options.get("topic");
  try {
    if (fs.existsSync(filePath)) {
      const rawData = fs.readFileSync(filePath);
      if (rawData.length > 0) {
        data = JSON.parse(rawData);
      }
    }
    if (!data[topic.value]) {
      interaction.reply("No data for this topic");
      return;
    }
    for (let i = 0; i < data[topic.value].length; i++) {
      let title = data[topic.value][i]["title"];
      let link = data[topic.value][i]["link"];
      const embed = new EmbedBuilder()
      .setTitle(`${i + 1}. ` + title)
      .setDescription(link);
      console.log("test");
      interaction.channel.send({ embeds: [embed] });
      console.log(data);
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
  }catch (error) {
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
