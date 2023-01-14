const dotenv = require('dotenv');
dotenv.config();
const {REST, Routes, Client, GatewayIntentBits, Events} = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

TOKEN = process.env.DISCORD_TOKEN

client.once(Events.ClientReady, c => {
    console.log(`Ready ! Logged in as ${c.user.tag}`);
});

client.login(TOKEN);

// const commands = [
//     {
//         name: 'ping',
//         description: 'Replies with Pong',
//     },
// ];

// const rest = new REST({ version: '10' }).setToken(TOKEN);

// (async () => {
//     try {
//         console.log('Started refreshing application (/) commands.');
//         await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
//         console.log('Successfully reloaded application (/) commands.');
//     } catch (error) {
//         console.error(error);
//     }
// })();

// client.on('ready', () => {
//     console.log(`Logged in as ${client.user.tag}!`);
// });

// client.on('interactionCreate', async interaction => {
//     if (!interaction.isChatInputCommand()) return;

//     if (interaction.commandName === 'ping') {
//         await interaction.reply('Pong!');
//     }
// });

// client.login(TOKEN);