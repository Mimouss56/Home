const fs = require('fs');
const path = require('path');

const { REST, Routes } = require('discord.js');
const { clientIdMimouss, tokenMimouss } = require('../../config.json');

const commands = [];
// Grab all the command files from the commands directory you created earlier
const foldersPath = path.join(__dirname, '../commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
  }
}

const rest = new REST().setToken(tokenMimouss);

// BUILD ALL FUNCTION GLOBAL
(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);
    const data = await rest.put(
      Routes.applicationCommands(clientIdMimouss),
      { body: commands },
    );
    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    console.error(error);
  }
})();
