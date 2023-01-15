const { SlashCommandBuilder } = require('discord.js');

// role id
// meme_role = '1051183997805400085';
// photo_role = '1059182297884131349';
// chat_role = '1051462150385836102';
// story_role = '1034282775181791342';
// jol_rol = '1024294826478419998';
boss_role = '1063843040768303154';
normal_role = '1063843445514444925';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction) {
		// interaction.guild is the object representing the Guild in which the command was run
		
		// await interaction.deferReply(); // allow longer calculation
		
		interaction.guild.members.fetch();
		interaction.guild.roles.fetch();
		const normal = interaction.guild.roles.cache.get(normal_role).members.map(m => m.user.tag);

		await interaction.reply({content: `${normal.join('\n')}`, ephemeral: true});
	},
};