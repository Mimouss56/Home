const { Events } = require('discord.js');

const regexCeSoir = /\bce\s+soir\b/;
module.exports = {
	name: Events.MessageCreate,
	async execute(message) {
		const { author } = message;
		if (regexCeSoir.test(message.content) && !author.bot) {
			message.reply(` La même chose que chaque nuit, <@${author.id}> : tenter de conquérir le monde ! `);
		}
	},
};
