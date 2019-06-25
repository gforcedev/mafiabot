const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

client.on('ready', () => {
});

client.on('message', async (message) => {
	if (!message.content.startsWith(config.prefix) || message.author.bot || message.channel instanceof Discord.DMChannel) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command === 'mafia') {
		let mentionedUsers = Array.from(message.mentions.members.filter(u => !u.bot).keys());
		const chosenMafia = mentionedUsers[Math.floor(Math.random() * mentionedUsers.length)];
		for (let userid of mentionedUsers) {
			let u = client.users.get(userid);
			if (userid === chosenMafia) {
				u.send(`${u.username}, you are the MAFIA for this round (game created by ${message.author.username})`).catch(e => {
				});
				break;
			} else {
				u.send(`${u.username}, you are a VILLAGER for this round (game created by ${message.author.username})`).catch(e => {
				});
			}
		}
	}
});

client.login(config.token);