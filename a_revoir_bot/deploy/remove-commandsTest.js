const { REST, Routes } = require('discord.js');
const { clientId, token, guildId } = require('../../config.json');

const rest = new REST().setToken(token);

// DELETE ALL FUNCTION

// for global commands
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
  .then(() => console.log('Successfully deleted all guild commands.'))
  .catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(clientId), { body: [] })
  .then(() => console.log('Successfully deleted all application commands.'))
  .catch(console.error);
