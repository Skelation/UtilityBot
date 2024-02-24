import {
  EmbedBuilder,
} from "discord.js";

import dotenv from "dotenv";
dotenv.config({ path: "config/.env" });
import fs from "fs";

export default function synthese_add(interaction) {
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
