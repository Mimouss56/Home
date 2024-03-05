const { ChannelType } = require('discord.js');

module.exports = {
	name: ChannelType.InteractionCreate,
	async execute(interaction) {
		// After acknowledging the interaction, we retrieve the string sent by the user
		const chosenVoiceChannelName = `${interaction.user.username}-channel`;
		console.log(interaction);
		try {
			// Create a new voice channel
			await interaction.channel.parent.children.create({
				// The name given to the Channel by the user
				name: chosenVoiceChannelName,
				// The type of the Channel created.
				type: ChannelType.GuildVoice,
			});
		}
		catch (error) {
			console.error(error);
			await interaction.reply('Erreur lors de la création du channel');
		}
	},
};
