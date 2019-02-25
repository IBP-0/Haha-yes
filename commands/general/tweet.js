const { Command } = require('discord-akairo');
const Twitter = require('twitter-lite');
const rand = require('../../rand.js');
const { twiConsumer, twiConsumerSecret, twiToken, twiTokenSecret, twiChannel } = require('../../config.json');
const reload = require('auto-reload');

class tweetCommand extends Command {
	constructor() {
		super('tweet', {
			aliases: ['tweet'],
			category: 'general',
			cooldown: 86400,
			ratelimit: 2,
			args: [
				{
					id: 'text',
					type: 'string',
					match: 'rest'
				}
			],
			description: {
				content: 'Send tweet from Haha yes twitter account',
				usage: '[text]',
				examples: ['this epic tweet is in my epic twitter']
			}
		});
	}

	async exec(message, args) {
		const blacklist = reload('../../json/twiBlacklist.json');
		const channel = this.client.channels.get(twiChannel);

		if (blacklist.includes(message.author.id)) {
			return message.channel.send('You have been blacklisted from this command... be less naughty next time.');
		}

		let text = args.text;
		if (!text)
			return;

		//Basic filter, hopefully i wont get banned from twitter
		text = text.replace(/n[\w\W]+gg[\w\W]+|f[aA\W*-_0-9]gg[\w\W]+|f[aA\W*-_0-9]g|kys/gi, '❤');

		text = rand.random(text, message);

		try {
			let client = new Twitter({
				consumer_key: twiConsumer,
				consumer_secret: twiConsumerSecret,
				access_token_key: twiToken,
				access_token_secret: twiTokenSecret
			});

			const response = await client.post('statuses/update', {
				status: text
			});
	
			const tweetid = response.id_str;
	
			//	  Send the final text

			channel.send(`AUTHOR: ${message.author.username} (${message.author.id}) Sent: ${text}`);

			return message.channel.send(`Go see ur epic tweet https://twitter.com/HahaYesDB/status/${tweetid}`);
		} catch(err) {
			console.error(err);
			return message.channel.send('Oh no, an error has occured :(');
		}

	}
}

module.exports = tweetCommand;