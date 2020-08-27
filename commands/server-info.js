const moment = require("moment");

exports.run = (client, message, args) => {
    server = message.guild;
    var roles = "";
    var chnlCount = 0;
    var botCount = 0;

    // Gets each
    server.roles.cache.forEach(role => {
        roles += `${role} `
    });

    // Gets amount of channels without category type
    server.channels.cache.forEach(chnl => {
        if (chnl.type == "category") return;
        chnlCount += 1;
    })

    // Gets amount of bots
    server.members.cache.forEach(member => {
        if (member.user.bot == true) botCount += 1;
    })
    
    // Bot or bots?
    if (botCount == 1) {
        botCountStr = botCount + " bot";
    } else botCountStr = botCount + " bots";

    var embed = new client.Discord.MessageEmbed()
        .setAuthor(server.name, server.iconURL())
        .setTitle(server.id)
        .setThumbnail(server.iconURL())
        .setColor(client.config.color)
        .addFields(
            {name: "Owner", value: server.owner.user.tag},
            {name: "Creation Date", value: moment(server.createdAt).format(client.timeFormat)},
            {name: "Verification Level", value: server.verificationLevel, inline:true},
            {name: "Explicit Content Filter Level", value: server.explicitContentFilter, inline:true},
            {name: '\u200B', value: '\u200B' },
            {name: "Members", value: server.members.cache.size + ` (${botCountStr})`, inline: true},
            {name: "Channels", value: chnlCount, inline: true},
            {name: "Roles", value: roles}
        );
    message.channel.send(embed).catch(console.error);
}
exports.help = {
    description: "Displays information about the server",
    category: "Information"
};