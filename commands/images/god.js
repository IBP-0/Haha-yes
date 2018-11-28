const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const { createCanvas, loadImage, getContext } = require('canvas')
const superagent = require('superagent')
const SelfReloadJSON = require('self-reload-json');
const blacklist = require('../../blacklist');


module.exports = class godCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'god',
            group: 'images',
            memberName: 'god',
            description: `Retweet if you aren't afraid to have a picture of god on your timeline`,
        });
    }

    async run(message) {
        let blacklistJson = new SelfReloadJSON('../../json/blacklist.json');
        if(blacklistJson[message.author.id])
        return blacklist(blacklistJson[message.author.id] , message)
        
        let Attachment = (message.attachments).array();
        let image = null
        if (!Attachment[0])
            image = message.author.displayAvatarURL
        else if(Attachment[0] && Attachment[0].url.endsWith('gif'))
            return message.say('Gif dosent work, sorry')
        else 
        image = Attachment[0].url

        const canvas = createCanvas(310, 400)
        const ctx = canvas.getContext('2d')
        const background = await loadImage(image);
        ctx.drawImage(background, 20, 80, 275, 250);
        const { body: buffer } = await superagent.get('https://image.noelshack.com/fichiers/2018/42/1/1539555260-untitled.png').catch(error => {
            return message.say('An error as occured, please try again')
        })
        const bg = await loadImage(buffer);
        ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
    
        const attachment = new Discord.Attachment(canvas.toBuffer(), 'god.png');

        message.say(attachment).catch(error => {
            message.say('an error as occured. Check the bot/channel permissions')
        })

          }
};