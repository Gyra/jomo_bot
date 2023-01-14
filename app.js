const dotenv = require('dotenv');
dotenv.config();
const {REST, Routes, Client, GatewayIntentBits, Events, Guild} = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

TOKEN = process.env.DISCORD_TOKEN

client.once(Events.ClientReady, c => {
    console.log(`Ready ! Logged in as ${c.user.tag}`);
});

client.login(TOKEN);

client.on('message', message => {
    const listMbrs = message.guild.roles.get("1063843040768303154").members.map(m => m.user.tag).join('\n');
    message.channel.send(listMbrs);
});
