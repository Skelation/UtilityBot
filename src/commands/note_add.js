import {
  EmbedBuilder,
} from "discord.js";

import dotenv from "dotenv";
dotenv.config({ path: "config/.env" });
import fs from "fs";

//Note add command
export default function note_add(interaction) {
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
