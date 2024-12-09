const { EmbedBuilder } = require('discord.js');

module.exports = {
	async sendEmbedSanction(interaction, typeSanctionName) {
		const reason = interaction.options.getString('reason');
		const user = interaction.options.getUser('user');
		const author = interaction.member;
		if (!interaction.isChatInputCommand()) return;
		const channel = interaction.guild.channels.cache.get(process.env.CHANNEL_ANNONCE);
		const embed = new EmbedBuilder()
			.setColor(0xff0000)
			.setTitle(`${user} vient de prendre un ${typeSanctionName}`)
			.setDescription(`${author} a utilisé la commande /${typeSanctionName}\nRaison: ${reason}`);
		channel.send({ embeds: [embed] });
		interaction.reply({ embeds: [embed], ephemeral: true });
	},
};