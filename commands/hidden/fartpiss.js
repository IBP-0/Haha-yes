const { Command } = require('discord-akairo');

class fartpissCommand extends Command {
	constructor() {
		super('fartpiss', {
			aliases: ['fartpiss'],
			category: 'hidden',
			args: [
				{
					id: 'member',
					type: 'member'
				}
			],
			description: {
				content: 'fartpiss',
				usage: '',
				examples: ['']
			}
		});
	}

	async exec(message, args) {
		if (!args.member) {
			message.guild.members.get(message.author.id).setNickname('fart pis');
			return message.channel.send('fart piss <:youngtroll:488559163832795136>');
		}
		args.member.setNickname('fart pis');
		return message.channel.send('fart piss <:youngtroll:488559163832795136>');
	}
}

module.exports = fartpissCommand;