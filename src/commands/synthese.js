import {
  EmbedBuilder,
} from "discord.js";

import dotenv from "dotenv";
dotenv.config({ path: "config/.env" });
import fs from "fs";

export default function synthese(interaction) {
  let filePath = "note_data.json";
  let data = {};
  let topic = interaction.options.get("topic");
  let syntheses = "";
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

      syntheses += `${i + 1}. ${title} - ${link}\n`;
    }
    const embed = new EmbedBuilder()
    .setTitle(`Synthese for ${topic.value}`)
    .setDescription(syntheses);
    console.log("test");
    interaction.channel.send({ embeds: [embed] });
    console.log(data);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }catch (error) {
    console.log(error);
  }
}
