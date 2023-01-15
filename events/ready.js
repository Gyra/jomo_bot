const { Events } = require('discord.js');

module.exports = {
	eventName: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};