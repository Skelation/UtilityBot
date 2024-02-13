import {
    Client,
    IntentsBitField,
    ActivityType,
    EmbedBuilder,
} from "discord.js";

import dotenv from "dotenv";
dotenv.config({ path: "config/.env" });
import fs, { cp } from "fs";

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
        data = JSON.parse(rawData);
    }
} catch (error) {
    console.log(error);
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(`${client.user.tag} is utilitying`);

    client.user.setActivity({
        name: "your problems",
        type: ActivityType.Listening,
    });
});

function isValidDate(dateString) {
    // First check for the pattern
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

    var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Adjust for leap years
    if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
}

//Ping command
function ping(interaction) {
    interaction.reply({ content: "Pong!" });
}

//agenda command
function agenda_add(interaction) {
    const filePath = "data.json";
    let data = {};

    try {
        //Setup json file
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

        const date = interaction.options.getString("date");
        const content = interaction.options.getString("content");
        //Check if date is valid
        if (isValidDate(date)) {
            data[interaction.user.id].push({ date: date, content: content });
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

            const embed = new EmbedBuilder()
                .setTitle("Agenda")
                .setDescription(`Added "${content}" to your agenda at ${date}`)
                .setTimestamp();
            interaction.channel.send({ embeds: [embed] });
        } else {
            console.log(isValidDate(date));
            interaction.channel.send("Invalid date format!");
        }
    } catch (error) {
        console.log(error);
    }
}

function agenda_view(interaction) {
    const filePath = "data.json";
    let data = {};

    try {
        if (fs.existsSync(filePath)) {
            const rawData = fs.readFileSync(filePath);
            if (rawData.length > 0) {
                data = JSON.parse(rawData);
            }
        }
        if (!data[interaction.user.id]) {
            data[interaction.user.id] = [];
        }
        if (data[interaction.user.id].length > 0) {
            for (let i = 0; i < data[interaction.user.id].length; i++) {
                const date = data[interaction.user.id][i]["date"];
                const content = data[interaction.user.id][i]["content"];
                let dateEvent = `${i + 1}. ${date} ${content}`;

                const embed = new EmbedBuilder()
                    .setTitle("Agenda")
                    .setColor("#0099ff")
                    .setTimestamp()
                    .setDescription(dateEvent);
                interaction.channel.send({ embeds: [embed] });
            }
        } else {
            interaction.channel.send("You don't have any agenda items!");
        }
    } catch (error) {
        console.log(error);
    }
}

//Agenda delete command
function agenda_delete(interaction) {
    const filePath = "data.json";
    let data = {};
    try {
        if (fs.existsSync(filePath)) {
            const rawData = fs.readFileSync(filePath);
            if (rawData.length > 0) {
                data = JSON.parse(rawData);
            }
        }
        if (!data[interaction.user.id]) {
            data[interaction.user.id] = [];
        }
        if (data[interaction.user.id].length > 0) {
            const index = interaction.options.getInteger("index");
            if (index > 0 && index <= data[interaction.user.id].length) {
                data[interaction.user.id].splice(index - 1, 1);
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
                const embed = new EmbedBuilder()
                    .setTitle("Agenda")
                    .setColor("#0099ff")
                    .setTimestamp()
                    .setDescription(`Deleted agenda item ${index}`);
                interaction.channel.send({ embeds: [embed] });
            } else {
                interaction.channel.send("Invalid index!");
            }
        }
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
                await ping(interaction);
            }
            if (interaction.commandName === "agenda_add") {
                await interaction.deferReply();
                await interaction.deleteReply();
                await agenda_add(interaction);
            }
            if (interaction.commandName === "agenda_view") {
                await interaction.deferReply();
                await interaction.deleteReply();
                await agenda_view(interaction);
            }
            if (interaction.commandName === "agenda_remove") {
                await interaction.deferReply();
                await interaction.deleteReply();
                await agenda_delete(interaction);
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
