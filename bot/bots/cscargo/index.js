const fs = require('fs');
const path = require('path');
// Require the necessary discord.js classes
const {
	Client, Collection, GatewayIntentBits,
} = require('discord.js');

// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

client.commands = new Collection();
const foldersPath = path.join(__dirname, './commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	console.log(event);
	if (event.once) {
		client.once(event.name, (...args) => {
			try {
				console.log(`Executing once event ${event.name}`);
				event.execute(...args);
			}
			catch (error) {
				console.error(`Error executing once event ${event.name}`);
				console.error(error);
			}
		});
	}
	else {
		client.on(event.name, (...args) => {
			try {
				console.log(`Executing event ${event.name}`);
				event.execute(...args);
			}
			catch (err) {
				console.error(`Error executing event ${event.name}`);
				console.error(err);
			}
		},
		);
	}
}


module.exports = client;
