const Discord = require('discord.js');
const randomWord = require('random-word');
const client = new Discord.Client();
const config = require('./config.json');

const mentionRegexp = /<@!?(\d+)>/;
const mentionRegexpGlobal = /<@!?\d+>/g;
client.on('ready', () => {
	console.log('Client ready');
});

client.on('message', async message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot || message.channel instanceof Discord.DMChannel) return;

	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command === 'mafia') {
		const gameKeyword = randomWord();
		let mentionedUsers = [];
		for (const mentionText of message.content.match(mentionRegexpGlobal)) {
			mentionedUsers.push(client.users.get(mentionText.match(mentionRegexp)[1])); // The id (using the group)
		}

		const chosenMafia = mentionedUsers[Math.floor(Math.random() * mentionedUsers.length)];
		for (let user of mentionedUsers) {
			if (user.id === chosenMafia.id) {
				user.send(`${user.username}, you are the MAFIA for this round (game keyword: ${gameKeyword})`).catch(() => {message.channel.send('Ah shoot. I probably got ratelimited or something')});
				break;
			}
		}
		message.channel.send(`Mafia assigned :eyes: - game keyword: ${gameKeyword}`);
	}
});

client.login(config.token);
