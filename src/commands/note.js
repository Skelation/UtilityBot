import {
  EmbedBuilder,
} from "discord.js";

import dotenv from "dotenv";
dotenv.config({ path: "config/.env" });
import fs from "fs";

//TODO if argument is given, show the note with, as the input the correct title or index
export default function note(interaction) {
  const filePath = "note_data.json";
  let data = {};
  let embedContent = '';

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
      embedContent += `\n\n${i + 1}. ` + title;
    }
    const embed = new EmbedBuilder()
      .setTitle("Notes")
      .setDescription(embedContent);
    console.log("test");
    interaction.channel.send({ embeds: [embed] });
  } catch (error) {
    console.log(error);
  }
}
