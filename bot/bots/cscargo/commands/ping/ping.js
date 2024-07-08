const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pong?'),

	async execute(interaction) {
		console.log('ping');
		await interaction.reply('Pong!');
	},
};