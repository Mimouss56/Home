const { REST, Routes } = require('discord.js');
const { clientIdMimouss, guildId, tokenMimouss } = require('../../config.json');

const rest = new REST().setToken(tokenMimouss);

// DELETE ALL FUNCTION
// for guild-based commands
rest.put(Routes.applicationGuildCommands(clientIdMimouss, guildId), { body: [] })
  .then(() => console.log('Successfully deleted all guild commands.'))
  .catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(clientIdMimouss), { body: [] })
  .then(() => console.log('Successfully deleted all application commands.'))
  .catch(console.error);
