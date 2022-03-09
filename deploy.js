import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import 'dotenv/config';

import { commandBuilders } from './commands.js';

const commands = commandBuilders.map(cmd => cmd.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);
await rest.put(
	Routes.applicationCommands(process.env.DISCORD_CLIENT_ID),
	{
		body: commands
	}
);