const { Command } = require('discord-akairo');
const autoResponse = require('../../models').autoresponse;

class addResponseCommand extends Command {
	constructor() {
		super('addResponse', {
			aliases: ['addResponse'],
			category: 'owner',
			ownerOnly: 'true',
			userPermissions: ['MANAGE_MESSAGES'],
			args: [
				{
					id: 'trigger',
					type: 'string',
					prompt: {
						start: 'What word or sentence should trigger it?',
					}
				},
				{
					id: 'response',
					type: 'string',
					prompt: {
						start: 'What word or sentence should the response be?',
					}
				},
				{
					id: 'type',
					type: 'string',
					prompt: {
						start: 'What is the type of the response? (text,image,react)',
					}
				}
			],
			channelRestriction: 'guild',
			description: {
				content: 'Create custom autoresponse',
				usage: '[trigger] [response]',
				examples: ['"do you know da wea" Fuck off dead meme', 'hello Hello [author], how are you today?']
			}
		});
	}

	async exec(message, args) {
		const autoresponse = await autoResponse.findOne({where: {trigger: args.trigger}});

		if (!autoresponse) {
			const body = {trigger: args.trigger, response: args.response, type: args.type};
			autoResponse.create(body);
			return message.channel.send(`autoresponse have been set to ${args.trigger} : ${args.response} with type: ${args.type}`);
		} else {
			return message.channel.send('The autoresponse already exist!');
		}
	}
}

module.exports = addResponseCommand;