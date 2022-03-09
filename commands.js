import { SlashCommandBuilder } from '@discordjs/builders';

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
            .setName('date')
            .setDescription('MM/DD (optional)'))
        .addStringOption(option => option
            .setName('time')
            .setDescription('HH:MM (24hr time)')
            .setRequired(true)),
    new SlashCommandBuilder()
        .setName('query')
        .setDescription('Search for saved information')
        .addStringOption(option => option
            .setName('search')
            .setDescription('Word/phrase to search for')
            .setRequired(true)),
    new SlashCommandBuilder()
        .setName('save-info')
        .setDescription('Information to save')
        .addStringOption(option => option
            .setName('search')
            .setDescription('Information to save')
            .setRequired(true))
];

export const repeatReminder = async (interaction) => {

}

export const singleReminder = async (interaction) => {

}

export const query = async (interaction) => {

}