import { Client, Intents } from 'discord.js';
import fs from 'fs';
import 'dotenv/config';
import * as Command from './commands.js';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// check if reminders and information files exist, and create them if necessary

export const reminders = JSON.parse(fs.readFileSync(new URL('./reminders.json', import.meta.url)));

export const information = JSON.parse(fs.readFileSync(new URL('./information.json', import.meta.url)));

client.once('ready', async () => {

    setInterval(() => { //will use process.env.DISCORD_CHANNEL

    }, 60000);
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    try {
        Command[interaction.commandName.replace(/-([a-z])/g, str => str[1].toUpperCase())](interaction);
    } catch (e) {
        console.error(e);
        await interaction.reply({
            content: 'Oops! Something went wrong.',
            ephemeral: true
        });
    }
});

client.login(process.env.DISCORD_TOKEN);