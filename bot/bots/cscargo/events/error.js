const { Events } = require('discord.js');

module.exports = {
	name: Events.Error,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			interaction.reply({ content: `Pas de commande ${interaction.commandName} trouvé.`, ephemeral: true });
			return;
		}

		try {
			await command.execute(interaction);
		}
		catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
			await interaction.reply({ content: 'Il y a eu une erreur en essayant d\'exécuter cette commande.', ephemerale: true });
		}
	},
};
