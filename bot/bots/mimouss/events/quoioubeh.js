const { Events } = require('discord.js');

const regexQuoi = /\w+\s+quoi\??$/;
module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		const { author } = message;
		if (regexQuoi.test(message.content) && !author.bot) {
			message.reply(`Hey tu sais quoi !?!?! <@${author.id}>`);
			setTimeout(() => {
				message.channel.send('QUOICOUBEH ! ! !');
			}, 3 * 1000);
		}
	},
};
