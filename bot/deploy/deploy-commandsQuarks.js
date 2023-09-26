const fs = require('fs');
const path = require('path');

const { REST, Routes } = require('discord.js');
const { clientIdMimouss, guildId, tokenMimouss } = require('../../config.json');

const commands = [];
// Grab all the command files from the commands directory you created earlier
const foldersPath = path.join(__dirname, '../commandsQuarks');
const commandFolders = fs.readdirSync(foldersPath);

// eslint-disable-next-line no-restricted-syntax
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
  // eslint-disable-next-line no-restricted-syntax
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const command = require(filePath);
    commands.push(command.data.toJSON());
  }
}

const rest = new REST().setToken(tokenMimouss);

// BUILD ALL FUNCTION
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);
    const data = await rest.put(
      Routes.applicationGuildCommands(clientIdMimouss, guildId),
      { body: commands },
    );
    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();
