const { Events, ChannelType } = require('discord.js');
const { object } = require('joi');
const createOnJoinChannel = '1214670999027458149';
// Variable globale pour stocker l'ID du propriétaire du salon vocal
let salonProprietaire = [];
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
			try {
				const channel = await oldState.guild.channels.create({
					name: `🔊 | ${user.globalName}`,
					type: ChannelType.GuildVoice,
					parent: channelJoinForCreate.parent,
				});
				this.addProprietaire(channel.id, user.id);
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
		console.log(salonProprietaire);
		return salonProprietaire.find(object => object.channelId === channelId);
	},
	/**
	 * @param {VoiceState.channelId} channelId
	 * @param {User.id} userId
	 */
	setSalonProprietaire(channelId, userId) {
		// on cherche le salon vocal dans le tableau
		const salon = salonProprietaire.find(proprietaire => proprietaire.channelId === channelId);
		// on modifie le proprietaire du salon vocal
		if (salon) {
			console.log('je suis dans le if');
			// on modifie l'ID du proprietaire dans l'objet salonProprietaire
			salon.userId = userId;
			// on modifie l'objet salonProprietaire
			salonProprietaire = salonProprietaire.map((proprietaire) => {
				proprietaire.channelId === channelId ? salon : proprietaire
				});

			return;
		}

	},
	/**
	 * @param {VoiceState.channelId} channelId
	 * @param {User.id} userId
	 */
	addProprietaire(channelId, userId) {
		salonProprietaire.push({ channelId, userId });
	},
	/**
	 * @param {VoiceState.channelId} channelId
	 */
	deleteSalonProprietaire(channelId) {
		// on delete l'object qui ccontien l'ID du salon vocal
		const newList = salonProprietaire.filter(proprietaire => proprietaire.channelId !== channelId);
		salonProprietaire = newList;
		return;
	},
	getAllProprietaire() {
		return salonProprietaire;
	}

};
