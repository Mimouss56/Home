const { GuildMember, PermissionFlagsBits } = require('discord.js');
const { user, don } = require('../../../../../../app/api/cscargo/models/index.mapper');

module.exports = {

	async soldeReply(interaction) {
		const member = interaction.options.getUser('user');
		const userCommand = interaction.member;
		if (!member) return;
		if (!(userCommand instanceof GuildMember)) return;

		const isAdmin = userCommand.permissions.has(PermissionFlagsBits.Administrator);

		const userBDD = await user.findOne({
			where: { discord_id: (isAdmin) ? member.id : userCommand.id },
			include: ['donateurUser'],
		});

		let text = '';
		if (userBDD.donateurUser) {
			if (!isAdmin) {
				text = `Actuellement le solde de tes dons est :  ${userBDD.donateurUser.solde} €`;
			}
			else {
				text = `Actuellement le solde des dons de ${member} est :  ${userBDD.donateurUser.solde} €`;
			}
		}
		else if (!isAdmin) {
			text = 'Désolé mais tu n\'es pas donateur';
		}
		else {
			text = `Désolé mais ${member} n'est pas donateur`;
		}

		if (!member) {
			const soldeCompte = await don.soldeCompte();
			text = `Actuellement il y a ${soldeCompte} € sur les comptes`;
		}

		await interaction.reply(text);
	},

}