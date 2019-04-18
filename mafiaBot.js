const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");
 
client.on('ready', () => {
	console.log('I am ready!');
});
 
client.on('message', async (message) => {
	if (!message.content.startsWith(config.prefix) || message.author.bot || message.channel instanceof Discord.DMChannel) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command === 'mafia') {
		let mentionedIds = message.mentions.members.map(m => m.user).filter(u => !u.bot);
		const chosenMafia = mentionedIds[Math.floor(Math.random() * mentionedIds.length)];
		for (let uid of mentionedIds) {
			const u = await client.fetchUser(uid);
			const c = await u.createDM();
			if (uid === chosenMafia) {
				c.send(`${u.username}, you are the MAFIA for this round (game created by ${message.author.username})`).catch(e => {});
				break;
			}
			c.send(`${u.username}, you are a VILLAGER for this round (game created by ${message.author.username}`).catch(e => {});
		}
	}
});
 
client.login(config.token);