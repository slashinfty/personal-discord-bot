import { Client, Intents } from 'discord.js';
import 'dotenv/config';
import * as Command from './commands.js';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const reminders = [];

const information = [];

client.once('ready', async () => {

    setInterval(() => { //will use process.env.DISCORD_CHANNEL

    }, 60000);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    try {
        Command[interaction.commandName.replace(/-([a-z])/g, str => str[1].toUpperCase())](interaction, /reminder/.test(interaction.commandName) ? reminders : information);
    } catch (e) {
        console.error(e);
        await interaction.reply({
            content: 'Oops! Something went wrong.',
            ephemeral: true
        });
    }
});

client.login(process.env.DISCORD_TOKEN);