import {
  EmbedBuilder,
} from "discord.js";

import dotenv from "dotenv";
dotenv.config({ path: "config/.env" });
import fs from "fs";

export default function note_delete(interaction) {
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
