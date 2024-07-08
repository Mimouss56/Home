const { SlashCommandBuilder } = require('discord.js');
const { partReply } = require('./options/part');
const { soldeReply } = require('./options/solde');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('dons')
		.setDescription('M')
		.addSubcommand((subcommand) => subcommand
			.setName('solde')
			.setDescription('état des comptes')
			.addUserOption((option) => option
				.setName('user')
				.setDescription('Mon solde actuel')))
		.addSubcommand((subcommand) => subcommand
			.setName('part')
			.setDescription('le Prix actuel de la part'))
	// .addSubcommand((subcommand) => subcommand
	// 	.setName('info')
	// 	.setDescription('Description du modèle de dons'))
	,

	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;
		const interactionCommand = interaction;
		const subCommand = interactionCommand.options.getSubcommand();

		if (subCommand === 'part') partReply(interactionCommand);
		if (subCommand === 'solde') soldeReply(interactionCommand);
	},
};