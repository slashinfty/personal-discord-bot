import { SlashCommandBuilder } from '@discordjs/builders';

export const commandBuilders = [
    new SlashCommandBuilder()
        .setName('new-reminder')
        .setDescription('Create a new reminder')
        .addStringOption(option => option
            .setName('content')
            .setDescription('Content of the reminder')
            .setRequired(true))
];

export const newReminder = async (interaction) => {

}