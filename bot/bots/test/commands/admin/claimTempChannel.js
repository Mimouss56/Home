const { Events, ChannelType, SlashCommandBuilder } = require('discord.js');
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
			interaction.reply('Tu dois être dans un channel vocal pour utiliser cette commande');
			return;
		}

		// if (!newState || newState.channelId === null) return;
		// const user = newState.member.user;
		// if (!user) return;

		// const channelJoinForCreate = oldState.guild.channels.cache.get(createOnJoinChannel);
		// if (!channelJoinForCreate) return console.log('channelJoinForCreate not found');
		// const channelJoinedInfo = oldState.guild.channels.cache.get(newState.channelId);
		// if (!channelJoinedInfo) return;
		// // Creation du nouveau channel vocal pour l'utilisateur qui rejoint le channel vocal de création
		// if (channelJoinForCreate.id === channelJoinedInfo.id) {
		// 	try {
		// 		const channel = await oldState.guild.channels.create({
		// 			name: `🔊 | ${user.globalName}-test`,
		// 			type: ChannelType.GuildVoice,
		// 			parent: channelJoinForCreate.parent,
		// 		});
		// 		console.log('channel', channel);
		// 		await channel.createWebhook({
		// 			name: user.id,
		// 		});
		// 		await newState.member.voice.setChannel(channel);
		// 	}
		// 	catch (error) {
		// 		console.error('error', error);
		// 	}
		// }

	},
};
