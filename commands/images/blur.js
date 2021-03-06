const { Command } = require('discord-akairo');
const attachment = require('../../utils/attachment');
const jimp = require('jimp');
const os = require('os');

class blurCommand extends Command {
	constructor() {
		super('blur', {
			aliases: ['blur'],
			category: 'images',
			clientPermissions: ['SEND_MESSAGES', 'ATTACH_FILES'],
			args: [
				{
					id: 'link',
					type: 'url',
					unordered: true
				},
				{
					id: 'radius',
					type: 'integer',
					unordered: true
				}
			],
			description: {
				content: 'Make your vid shit quality.',
				usage: '[link to image] [angle of rotation]',
				examples: ['']
			}
		});
	}

	async exec(message, args) {
		let output = `${os.tmpdir()}/blurred${message.id}.jpg`;

		if (!args.radius) args.radius = 10;
		let url;

		if (args.link)
			url = args.link.href;
		else
			url = await attachment(message);

		if (!url) {
			return message.channel.send('You need an image to use this command!');
		}

		let loadingmsg = await message.channel.send('Processing <a:loadingmin:527579785212329984>');

		jimp.read({
			url: url
		})
			.then(image => {
				return image
					.blur(args.radius)
					.write(output);
			})
			.then(() => {
				loadingmsg.delete();
				return message.channel.send({files: [output]});
			})
			.catch(error => {
				console.error(error);
				return message.channel.send('Oh no, an error just occurred! Maybe the format of your image don\'t work?');
			});




	}
}

module.exports = blurCommand;