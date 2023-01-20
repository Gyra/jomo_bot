const { SlashCommandBuilder } = require('discord.js');
const { roles, forums } = require('../config.json');
const fsLibrary = require('fs');

const objectToCsv = function (data) {
     
	const csvRows = [];
 
	for (const row in data) {
		csvRows.push(`${row},${data[row]}`);
	}
	return csvRows.join('\n');
};

module.exports = {
	data: new SlashCommandBuilder()
		.setName('jomo-og-calculation')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {		
		// await interaction.deferReply(); // allow longer calculation
		await interaction.guild.members.fetch();  // fetch all member and roles first.
		await interaction.guild.roles.fetch();
		/*-----------------------------------------------------------------------
		1. get the role based score
		--------------------------------------------------------------------------*/
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
	
		/*-----------------------------------------------------------------------
		2. get JOL based score
		--------------------------------------------------------------------------*/
		// get JOL members
		const jolId = roles["normal"]["id"];  // roles["jol"]["id"];
		const forumId = forums["test"];  // forums["jol"];
		const jolMembers = interaction.guild.roles.cache.get(jolId).members.map(m => m.id);

		const threads = interaction.guild.channels.cache.get(forumId).threads;
		await threads.fetch();
		const threadChannels = threads.cache.map(m => m.id);
		for (const id in threadChannels) {
			const post = threads.cache.get(threadChannels[id]);
			let messages = [];
			
			let message = await post.messages.fetch({ limit: 1 }).then(messagePage => (messagePage.size === 1 ? messagePage.at(0) : null));
			while (message) {
				await post.messages.fetch({ limit: 100, before: message.id }).then(messagePage => {
					messagePage.forEach(msg => messages.push(msg));

					message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
				})
			}

			// check number of msg per jol user
			for (const hippo in jolMembers) {
				const userMessage = messages.filter(msg => msg.author.id === jolMembers[hippo]);
				if (userMessage.length > 0) candidates[userMessage[0].author.tag] = candidates[userMessage[0].author.tag] + userMessage.length;
			}
		}
		
		// save the output to a local csv file
		const csv = objectToCsv(candidates);
		fsLibrary.writeFile('jomo-og.csv', csv, (error) => {
			if (error) throw error;
		})
		
		await interaction.reply({content: 'check the output file'});
	},
};