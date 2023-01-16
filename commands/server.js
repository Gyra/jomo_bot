const { SlashCommandBuilder } = require('discord.js');
const { roles } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('jomo-og-calculation')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		
		// await interaction.deferReply(); // allow longer calculation

		await interaction.guild.members.fetch();  // fetch all member and roles first.
		await interaction.guild.roles.fetch();

		const candidates = {};
		// loop roles and record occurance and add scores
		for (const role in roles) {
			const role_data = interaction.guild.roles.cache.get(roles[role]["id"])
			if (!role_data) continue;
			const members = role_data.members.map(m => m.user.tag);

			for (const member in members) {
				candidates[members[member]] = (candidates[members[member]] || 0) + roles[role]["score"];
			}
		}
		

		await interaction.reply({content: `${normal.join('\n')}`, ephemeral: true});
	},
};