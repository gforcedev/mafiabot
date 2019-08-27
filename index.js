const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

const mentionRegexp = /<@!?(\d+)>/;
const mentionRegexpGlobal = /<@!?\d+>/g;
client.on('ready', () => {});

client.on('message', async message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot || message.channel instanceof Discord.DMChannel) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command === 'mafia') {
		let mentionedUsers = [];
		for (const mentionText of message.content.match(mentionRegexpGlobal)) {
			console.log(mentionText);
			mentionedUsers.push(client.users.get(mentionText.match(mentionRegexp)[1])); // The id (using the group)
		}
		console.log(mentionedUsers);

		const chosenMafia = mentionedUsers[Math.floor(Math.random() * mentionedUsers.length)];
		for (let user of mentionedUsers) {
			console.log(`sending message to ${user.username} (id ${user.id})`);
			if (user.id === chosenMafia.id) {
				user.send(`${user.username}, you are the MAFIA for this round (game created by ${message.author.username})`).catch(() => {});
				break;
			} else {
				user.send(`${user.username}, you are a VILLAGER for this round (game created by ${message.author.username})`).catch(() => {});
			}
		}
	}
});

client.login(config.token);
