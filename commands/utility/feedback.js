const { Command } = require('discord-akairo');
const { feedbackChannel } = require('../../config.json');
const { MessageEmbed } = require('discord.js');

class FeedbackCommand extends Command {
	constructor() {
		super('feedback', {
			aliases: ['feedback'],
			category: 'utility',
			quoted: false,
			args: [
				{
					id: 'text',
					type: 'string',
					match: 'rest'
				}
			],
			description: {
				content: 'Send feedback to the bot owner',
				usage: '[What do you want to say]',
				examples: ['Hello, i just wanted to say hi!']
			}
		});
	}

	async exec(message,args) {
		const channel = this.client.channels.get(feedbackChannel);

		const Embed = new MessageEmbed()
			.setAuthor(message.author.username, message.author.displayAvatarURL())
			.setDescription(args.text)
			.setFooter(`Author ID: ${message.author.id}`)
			.setTimestamp();
		channel.send({embed: Embed});
		message.channel.send('Your feedback has been sent!');
	}
}

module.exports = FeedbackCommand;