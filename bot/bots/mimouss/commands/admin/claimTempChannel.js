const { SlashCommandBuilder } = require('discord.js');
const { getSalonProprietaire, setSalonProprietaire } = require('../../../../events/createNewChannelOnJoin.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('voice-claim')
		.setDescription('Réclamer la propriété d\'un channel vocal'),
	/**
	 * @param {Interaction} interaction
	 * @returns
	 */
	async execute(interaction) {

		if (!interaction.isChatInputCommand) return;
		const user = interaction.user;
		const voiceChannel = interaction.member.voice.channel;
		if (!voiceChannel) {
			interaction.reply('Tu dois être dans un channel vocal pour utiliser cette commande', { ephemeral: true });
			return;
		}
		// on récupère les utilisateurs connectés dans le salon vocal
		const voiceMembers = voiceChannel.members;
		const proprietaireActuel = getSalonProprietaire();
		if (voiceMembers.some(member => member.id === proprietaireActuel) && proprietaireActuel !== user.id) {
			interaction.reply(`Désolé, ${user.globalName}, le salon vocal appartient à ${proprietaireActuel}.`, { ephemeral: true });
			return;
		}
		setSalonProprietaire(user.id);
		interaction.reply(`Félicitations, ${user.globalName}, tu as réclamé la propriété du salon vocal !`);

	},
};
