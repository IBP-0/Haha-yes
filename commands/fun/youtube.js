const { Command } = require('discord.js-commando');
const fs = require('fs');
const ytdl = require('ytdl-core')
const blacklist = require('../../json/blacklist.json')

module.exports = class youtubeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'youtube',
            group: 'fun',
            memberName: 'youtube',
            description: `Send a youtube link as mp4`,
            args: [
                {
                    key: 'link',
                    prompt: 'Wich youtube link would you like to send',
                    type: 'string',
                    default: 'https://www.youtube.com/watch?v=6n3pFFPSlW4'
                }
            ]
        });
    }

    async run(message, { link }) {
        if(blacklist[message.author.id])
        return message.channel.send("You are blacklisted")
        if(link.includes("http") || link.includes("www")) {
            ytdl(link, { filter: (format) => format.container === 'mp4' })
            .pipe(fs.createWriteStream('video.mp4'))
            setTimeout(function(){
            message.channel.sendFile("./video.mp4")
            .catch(error => {
                message.say('Video too long')
            })
            }, 5000)
        } else 
            message.say("You need to input a valid youtube link")
    }

}