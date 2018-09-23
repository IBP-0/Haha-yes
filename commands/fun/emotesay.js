const { Command } = require('discord.js-commando');
const emojiCharacters = require('../../emojiCharacters');
module.exports = class emoteSayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'emotesay',
            group: 'fun',
            memberName: 'emotesay',
            description: `repeat the text in dancing letters`,
            args: [
                {
                    key: 'text',
                    prompt: 'What do you want me to say',
                    type: 'string',
                }
            ]
        });
    }

    async run(message, { text }) {
        message.delete();
        text.toLowerCase().split('')
        let emojiArray = [];
        for (let i = 0; i < text.length; i++) {
            emojiArray[i] = emojiCharacters[text[i]];
        }
        message.say(emojiArray.join(""))
        

    }
};