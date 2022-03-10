import { Client, Intents } from 'discord.js';
import _ from 'lodash';
import fs from 'fs';
import {} from 'dotenv/config';
import * as Command from './commands.js';

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

if (!fs.existsSync(new URL('./reminders.json', import.meta.url))) {
    fs.writeFileSync(new URL('./reminders.json', import.meta.url), '[]');
}
if (!fs.existsSync(new URL('./information.json', import.meta.url))) {
    fs.writeFileSync(new URL('./information.json', import.meta.url), '[]');
}

export const reminders = JSON.parse(fs.readFileSync(new URL('./reminders.json', import.meta.url)));

export const information = JSON.parse(fs.readFileSync(new URL('./information.json', import.meta.url)));

client.once('ready', async () => {
    console.log(`Online @ ${new Date().toTimeString()} on ${new Date().toDateString()}`);
    setInterval(async () => {
        const now = new Date(Date.now());
        const filteredReminders = reminders.filter(reminder => (reminder.repeat === true && reminder.days.includes(now.getDay())) || (reminder.repeat === false && reminder.date.join('/') === `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`));
        for (let i = 0; i < filteredReminders.length; i++) {
            const reminder = filteredReminders[i];
            if (reminder.repeat === true) {
                const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), reminder.time[0], reminder.time[1]);
                if (date < now && Date.parse(date) + 60000 > now) {
                    const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL);
                    await channel.send(reminder.message);
                }
            } else {
                const date = new Date(reminder.date[2], reminder.date[0] - 1, reminder.date[1], reminder.time[0], reminder.time[1]);
                if (date < now && Date.parse(date) + 60000 > now) {
                    const channel = await client.channels.fetch(process.env.DISCORD_CHANNEL);
                    await channel.send(reminder.message);
                    const index = reminders.findIndex(r => _.isEqual(r, reminder));
                    reminders.splice(index, 1);
                    fs.writeFileSync(new URL('./reminders.json', import.meta.url), JSON.stringify(reminders));
                }
            }
        }
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