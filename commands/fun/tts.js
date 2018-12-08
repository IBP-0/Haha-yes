const { Command } = require('discord.js-commando');
const textToSpeech = require('@google-cloud/text-to-speech');
const gclient = new textToSpeech.TextToSpeechClient();
const SelfReloadJSON = require('self-reload-json');
const fs = require('fs');


module.exports = class BadMemeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'tts',
            group: 'fun',
            memberName: 'tts',
            description: `Return what you type in a tts file`,
            args: [
                {
                    key: 'text',
                    prompt: 'What do you want to be said',
                    type: 'string',
                }
            ]
        });
    }

    async run(message, { text }) {
        let blacklistJson = new SelfReloadJSON('./json/blacklist.json');
        if(blacklistJson[message.author.id])
        return blacklist(blacklistJson[message.author.id] , message)

          // Construct the request
          const request = {
            input: {text: text},
            // Select the language and SSML Voice Gender (optional)
            voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
            // Select the type of audio encoding
            audioConfig: {audioEncoding: 'MP3'},
          };

          // Performs the Text-to-Speech request
          gclient.synthesizeSpeech(request, (err, response) => {
            if (err) {
              console.error('ERROR:', err);
              return;
            }

            // Write the binary audio content to a local file
            fs.writeFile('tts.mp3', response.audioContent, 'binary', err => {
              if (err) {
                console.error('ERROR:', err);
                return;
              }
              console.log('Audio content written to file: tts.mp3');
            });
          });
          setTimeout(function(){
          message.say({files: ['./tts.mp3']})
      }, 2000)
}}
