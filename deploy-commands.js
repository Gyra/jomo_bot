// this file will be used to register and update the slash commands for the bot
// Slash commands can be registered in two ways; in one specific guild, or for every guild the bot is in. We're going to look at single-guild registration first, as this is a good way to develop and test your commands before a global deployment.

// Your application will need the applications.commands scope authorized in a guild for any of its slash commands to appear, and to be able to register them in a specific guild without error.

// Slash commands only need to be registered once, and updated when the definition (description, options etc) is changed. As there is a daily limit on command creations, it's not necessary nor desirable to connect a whole client to the gateway or do this on every ready event. As such, a standalone script using the lighter REST manager is preferred.

// This script is intended to be run separately, only when you need to make changes to your slash command definitions - you're free to modify parts such as the execute function as much as you like without redeployment.

const { REST, Routes } = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
clientId = process.env.APP_ID
token = process.env.DISCORD_TOKEN
guildId = process.env.GUILD_ID
const fs = require('node:fs');

const commands = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();