const { Events, ChannelType } = require('discord.js');
const createOnJoinChannel = '1214670999027458149';
// Variable globale pour stocker l'ID du propriétaire du salon vocal
const salonProprietaire = {};
module.exports = {
	name: Events.VoiceStateUpdate,
	/**
	 * @param {VoiceState} oldState
	 * @param {VoiceState} newState
	 * @returns
	 */
	async execute(oldState, newState) {
		if (!newState || newState.channelId === null) return;
		const user = newState.member.user;
		if (!user) return;

		const channelJoinForCreate = oldState.guild.channels.cache.get(createOnJoinChannel);
		if (!channelJoinForCreate) return console.log('channelJoinForCreate not found');
		const channelJoinedInfo = oldState.guild.channels.cache.get(newState.channelId);
		if (!channelJoinedInfo) return;
		// Creation du nouveau channel vocal pour l'utilisateur qui rejoint le channel vocal de création
		if (channelJoinForCreate.id === channelJoinedInfo.id) {
			this.setSalonProprietaire(channelJoinedInfo.id, user.id);
			try {
				const channel = await oldState.guild.channels.create({
					name: `🔊 | ${user.globalName}`,
					type: ChannelType.GuildVoice,
					parent: channelJoinForCreate.parent,
				});
				await newState.member.voice.setChannel(channel);
			}
			catch (error) {
				console.error('error', error);
			}
		}
	},
	/**
	 * @param {VoiceState.channelId} channelId
	 * @returns
	 */
	getSalonProprietaire(channelId) {
		return salonProprietaire[channelId];
	},
	/**
	 * @param {VoiceState.channelId} channelId
	 * @param {User.id} userId
	 */
	setSalonProprietaire(channelId, userId) {
		salonProprietaire[channelId] = userId;
	},
	/**
	 * @param {VoiceState.channelId} channelId
	 */
	deleteSalonProprietaire(channelId) {
		delete salonProprietaire[channelId];
	},

};
