const moment = require("moment");

exports.run = (client, message, args) => {
    var u = message.author
    var member = message.guild.member(message.author);
    if (message.mentions.members.size !== 0) {
        u = message.mentions.members.first().user;
        member = message.mentions.members.first();
    }
    var embed = new client.Discord.MessageEmbed()
        .setColor(client.config.color)
        .setTitle("User Information")
        .setAuthor(u.tag, u.avatarURL())
        .setThumbnail(u.avatarURL())
        .addFields(
            {name: "ID", value: u.id, inline: true},
            {name: "Nickname", value: member.displayName, inline: true},
            {name: "Account Creation", value: moment(u.createdAt).format(client.timeFormat)},
            {name: "Server Join Date", value: moment(member.joinedAt).format(client.timeFormat)}
        );
    var roles = "";
    message.guild.roles.fetch().catch(console.error);
    member.roles.cache.forEach(element => {
        roles += `${element} `
    });
    embed.addFields({name: `Roles (${member.roles.cache.size})`, value: roles});
    message.channel.send(embed).catch(console.error);
}

exports.help = {
    description: "Displays information about an user",
    category: "Information"
};