const { Events, ChannelType } = require('discord.js');
const createOnJoinChannel = '1214670999027458149';
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
					name: `🔊 | ${user.globalName}-test`,
					type: ChannelType.GuildVoice,
					parent: channelJoinForCreate.parent,
				});
				console.log('channel', channel);
				await channel.createWebhook({
					name: user.id,
				});
				await newState.member.voice.setChannel(channel);
			}
			catch (error) {
				console.error('error', error);
			}
		}

	},
};
