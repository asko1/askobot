const moment = require("moment");

exports.run = (client, message) => {
    // targetUser is the user that sent the command, unless...
    let targetUser = message.author;
    let member = message.guild.members.cache.get(message.author.id);
    if (message.mentions.members.size !== 0) {
        // ...there's an user mentioned, then targetUser is the mentioned user
        targetUser = message.mentions.members.first().user;
        member = message.mentions.members.first();
    }
    const embed = client.createEmbed()
        .setTitle("User Information")
        .setAuthor(targetUser.tag, targetUser.avatarURL())
        .setThumbnail(targetUser.avatarURL())
        .addFields(
            { name: "Id", value: targetUser.id, inline: true },
            { name: "Nickname", value: member.displayName, inline: true },
            { name: "Account Creation", value: moment(targetUser.createdAt).format(client.timeFormat) },
            { name: "Server Join Date", value: moment(member.joinedAt).format(client.timeFormat) },
        );
    let roles = "";
    message.guild.roles.fetch().catch(console.error);
    member.roles.cache.forEach(element => {
        roles += `${element} `;
    });
    embed.addFields({ name: `Roles (${member.roles.cache.size})`, value: roles });
    message.channel.send({ embeds: [embed] }).catch(client.logger.error);
};

exports.help = {
    description: "Displays information about an user",
    category: "Information",
};