const fs = require('fs');
const path = require('path');

const { REST, Routes } = require('discord.js');

const deployCommands = async (clientID, tokenBot, folderNameBot) => {
  const commands = [];
  // Grab all the command files from the commands directory you created earlier
  const foldersPath = path.join(__dirname, `../bots/${folderNameBot}/commands`);
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

  const rest = new REST().setToken(tokenBot);

  // BUILD ALL FUNCTION GLOBAL
  (async () => {
    try {
      console.log(`Started refreshing ${commands.length} application (/) commands.`);
      const data = await rest.put(
        Routes.applicationCommands(clientID),
        { body: commands },
      );
      console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
      console.error(error);
    }
  })();
};

async function removeCommands(clientID, tokenBot, guildId) {
  const rest = new REST().setToken(tokenBot);

  // DELETE ALL FUNCTION
  // for guild-based commands
  rest.put(Routes.applicationGuildCommands(clientID, guildId), { body: [] })
    .then(() => console.log('Successfully deleted all guild commands.'))
    .catch(console.error);

  // for global commands
  rest.put(Routes.applicationCommands(clientID), { body: [] })
    .then(() => console.log('Successfully deleted all application commands.'))
    .catch(console.error);
}

module.exports = {
  deployCommands,
  removeCommands,
};