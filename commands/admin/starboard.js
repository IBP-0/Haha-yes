const { Command } = require('discord-akairo');
const fs = require('fs');

class StarBoardCommand extends Command {
	constructor() {
		super('starboard', {
			aliases: ['starboard'],
			category: 'admin',
			channelRestriction: 'guild',
			userPermissions: ['ADMINISTRATOR'],
			description: {
				content: 'Set starboard',
				usage: '[]',
				examples: ['']
			}
		});
	}

	async exec(message) {
		let starboardChannel = message.channel.id;

		fs.readFile(`./board/star${message.guild.id}.json`, 'utf8', function readFileCallback(err, data) {
			if (err) {
				console.log('yes');
				fs.writeFile(`./board/star${message.guild.id}.json`, `{"starboard": "${starboardChannel}"}`, function (err) {
					if (err) {
						console.log(err);
					}
				});
			} else {
				let starboard = JSON.parse(data); //now it an object
				starboard['starboard'] = starboardChannel;
				var json = JSON.stringify(starboard); //convert it back to json
				fs.writeFile(`./board/star${message.guild.id}.json`, json, 'utf8', function (err) {
					if (err) {
						
						return console.log(err);
					}
				});
			}
		});
		
		return message.channel.send('This channel have been set as the starboard');
	}
}

module.exports = StarBoardCommand;