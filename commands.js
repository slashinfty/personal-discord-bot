import { SlashCommandBuilder, time } from '@discordjs/builders';
import fs from 'fs';

import { reminders, information } from './index.js';

export const commandBuilders = [
    new SlashCommandBuilder()
        .setName('repeat-reminder')
        .setDescription('Create a reminder that repeats')
        .addStringOption(option => option
            .setName('content')
            .setDescription('Content of the reminder')
            .setRequired(true))
        .addStringOption(option => option
            .setName('days')
            .setDescription('Comma separated (Sun=0)')
            .setRequired(true))
        .addStringOption(option => option
            .setName('time')
            .setDescription('HH:MM (24hr time)')
            .setRequired(true)),
    new SlashCommandBuilder()
        .setName('single-reminder')
        .setDescription('Create a one-time reminder')
        .addStringOption(option => option
            .setName('content')
            .setDescription('Content of the reminder')
            .setRequired(true))
        .addStringOption(option => option
            .setName('time')
            .setDescription('HH:MM (24hr time)')
            .setRequired(true))
        .addStringOption(option => option
            .setName('date')
            .setDescription('MM/DD/YYYY (optional)')),
    new SlashCommandBuilder()
        .setName('query')
        .setDescription('Search for saved information')
        .addStringOption(option => option
            .setName('search')
            .setDescription('Word/phrase to search for')
            .setRequired(true)),
    new SlashCommandBuilder()
        .setName('save-info')
        .setDescription('Add information')
        .addStringOption(option => option
            .setName('info')
            .setDescription('Information to save')
            .setRequired(true))
];

export const repeatReminder = async (interaction) => {
    const dayArray = interaction.options.getString('days').split(',').map(res => parseInt(res.trim()));
    const timeArray = interaction.options.getString('time').split(':').map(res => parseInt(res.trim()));
    reminders.push({
        message: interaction.options.getString('content'),
        time: timeArray,
        repeat: true,
        days: dayArray
    });
    fs.writeFileSync(new URL('./reminders.json', import.meta.url), reminders);
}

export const singleReminder = async (interaction) => {
    const timeArray = interaction.options.getString('time').split(':').map(res => parseInt(res.trim()));
    let date;
    if (interaction.options.getString('date') === null) {
        const now = new Date(Date.now());
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), timeArray[0], timeArray[1]);
        if (today < now) {
            date = [now.getMonth(), now.getDate() + 1, now.getFullYear()];
        } else {
            date = [now.getMonth(), now.getDate(), now.getFullYear()];
        }
    } else {
        date = interaction.options.getString('date').split('/').map(res => parseInt(res.trim()));
    }
    reminders.push({
        message: interaction.options.getString('content'),
        time: timeArray,
        repeat: false,
        date: date
    });
    fs.writeFileSync(new URL('./reminders.json', import.meta.url), JSON.stringify(reminders));
}

export const query = async (interaction) => {
    const found = information.filter(info => new RegExp(interaction.options.getString('search'), 'i').test(info));
    if (found.length === 0) {
        interaction.reply({
            content: `No information found for ${interaction.options.getString('search')}`,
            ephemeral: true
        });
    } else {
        interaction.reply({
            content: found.join(`\n\n`),
            ephemeral: true
        });
    }
}

export const saveInfo = async (interaction) => {
    information.push(interaction.options.getString('info'));
    fs.writeFileSync(new URL('./information.json', import.meta.url), JSON.stringify(information));
}