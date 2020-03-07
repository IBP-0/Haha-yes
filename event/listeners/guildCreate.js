const { Listener } = require('discord-akairo');
const { statsChannel } = require('../../config.json');


class guildCreateListener extends Listener {
	constructor() {
		super('guildCreate', {
			emitter: 'client',
			event: 'guildCreate'
		});
	}

	async exec(guild) {
		console.log(`${guild.name}\n${guild.memberCount} users\nOwner: ${guild.owner.user.username}\nOwner ID: ${guild.owner}`);
		const channel = this.client.channels.resolve(statsChannel);
		let botCount = guild.members.cache.filter(member => member.user.bot).size;
		const addEmbed = this.client.util.embed()
			.setColor('#52e80d')
			.setTitle('New boiz in town')
			.setURL('https://www.youtube.com/watch?v=6n3pFFPSlW4')
			.setThumbnail(guild.iconURL())
			.addField('Guild name', guild.name, true)
			.addField('Guild ID', guild.id, true)
			.addField('Total number of members', guild.memberCount, true)
			.addField('Number of users', guild.memberCount - botCount, true)
			.addField('Number of bots', botCount, true)
			.addField('Owner', guild.owner.user.username, true)
			.addField('Owner ID', guild.owner.id, true)
			.setFooter(`I'm now in ${this.client.guilds.cache.size} servers!`)
			.setTimestamp();
	
		channel.send({ embed: addEmbed });
	}
}
module.exports = guildCreateListener;