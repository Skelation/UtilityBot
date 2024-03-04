import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });
import { WebhookClient } from "discord.js";

const webhookId = process.env.WEBHOOK_ID;
const webhookToken = process.env.WEBHOOK_TOKEN;

const webhookClient = new WebhookClient({ id: webhookId, token: webhookToken });

export default function ping(interaction) {
  webhookClient.send({
        content: "Pong",
        username: interaction.user.username,
        avatarURL: interaction.user.avatarURL(),
    });
}
