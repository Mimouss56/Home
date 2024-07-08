const { serverCost } = require('../../../../../../app/api/cscargo/services/serverCost.service');

module.exports = {
	async partReply(interaction) {
		const costPart = serverCost();
		await interaction.reply(`Le coût actuelle de la part est de : ${costPart} €`);
	},
};
