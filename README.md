# UtilityBot
Discord bot that acts like a swiss knife. Multi-purpose

---

## Installation

1. Clone the repository
2. Install dependencies with `npm i`
3. Create a `.env` file in the `/config` directory and add a `TOKEN` variable with your bot's token

---

## Add commands
1. In `index.js` add a new line in

```
client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        try {
            if (interaction.commandName === "ping") {
            await interaction.deferReply();
            await interaction.deleteReply();
                ping(interaction);
            }
            //Add more commands here
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
        }
    }
})
```

as structured

```
try {
    if interaction.commandName === "ping" {
        await interaction.deferReply();
        await interaction.deleteReply();
        ping(interaction);
    }
    if interaction.commandName === "newCommandName" {
        await interaction.deferReply();
        await interaction.deleteReply();
        newCommandFunction(interaction);
    }
    ...
```

2. Then create your function in the code

```
function newCommandFunction(interaction) {
    //Do stuff
    interaction.channel.send("Your message here");
}
```

3. Register your command in `cmd-deploy.js``

```
const slashRegister = async () => {
    try {
        await rest.put(Routes.applicationGuildCommands(botID, serverID), {
            body: [
                new SlashCommandBuilder()
                .setName("agenda")
                .setDescription("Edit your agenda"),

                //Add your new command

            ]
        })
    } catch (error) {
    console.log(error)
    }
}
```

as structured below

```
body: [
    new SlashCommandBuilder()
    .setName("Ping")
    .setDescription("test command),

    new SlashCommandBuilder()
    .setName("newCommandName")
    .setDescription('Name must be the same as your function name in step 1'),
    //additional statements here
]
```

#### Thats it !

---

## Run Bot

To run the bot go into the terminal and launch the bot with `npm run start`

Anytime you save new changes the bot will restart by itself with the help of the nodemon package

---