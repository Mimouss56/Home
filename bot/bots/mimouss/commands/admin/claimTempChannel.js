const debug = require('debug')('discord');

const {
	SlashCommandBuilder,
	VoiceState,
	GuildMember,
	Collection,
	Snowflake,
} = require('discord.js');
const { getSalonProprietaire, setSalonProprietaire, getAllProprietaire } = require('../../events/createNewChannelOnJoin');

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
		/**
		 * @type {VoiceState}
		 */
		const voiceChannel = interaction.member.voice.channel;
		if (!voiceChannel) {
			return interaction.reply({ content: 'Tu dois être dans un channel vocal pour utiliser cette commande', ephemeral: true });
		}
		// on récupère les utilisateurs connectés dans le salon vocal 
		/**
		 * @type {Collection<Snowflake, GuildMember>} 
		 */
		const voiceMembers = voiceChannel.members;
		console.log(voiceChannel.id);
		const proprietaireActuel = getSalonProprietaire(voiceChannel.id);
		// console.log('proprietaireActuel', proprietaireActuel);
		const isProprioPresentIn = voiceMembers.some(member => member.id === proprietaireActuel.userId)
		// console.log(isProprioPresentIn);
		if (isProprioPresentIn && proprietaireActuel.userId !== user.id) {
			return interaction.reply({ content: `Désolé, ${user.globalName}, le salon vocal appartient à <@${proprietaireActuel.userId}>.`, ephemeral: true });
		}
		if (proprietaireActuel.userId === user.id) {
			return interaction.reply({ content: `Désolé, ${user.globalName}, tu es déjà propriétaire de ce salon vocal.`, ephemeral: true });
		}
		setSalonProprietaire(voiceChannel.id, user.id);
		return interaction.reply({ content: `Félicitations, ${user.globalName}, tu as réclamé la propriété du salon vocal !`, ephemeral: true });

	},
};
