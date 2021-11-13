const moment = require("moment");

exports.run = async (client, message) => {
    const server = message.guild;
    let roles = "";
    let channelCount = 0;
    let botCount = 0;
    let ownerTag = "";
    let botCountStr;

    // Gets each
    server.roles.cache.forEach(role => {
        roles += `${role} `;
    });

    // Gets owner tag
    ownerTag = await server.fetchOwner();

    // Gets amount of channels without category type
    server.channels.cache.forEach(channel => {
        if (channel.type == "category") return;
        channelCount += 1;
    });

    // Gets amount of bots
    server.members.cache.forEach(member => {
        if (member.user.bot === true) botCount += 1;
    });

    // Bot or bots?
    if (botCount === 1) {
        botCountStr = botCount + " bot";
    }
    else {botCountStr = botCount + " bots";}

    const embed = client.createEmbed()
        .setAuthor(server.name, server.iconURL())
        .setTitle(server.id)
        .setThumbnail(server.iconURL())
        .setColor(client.config.color)
        .addFields(
            { name: "Owner", value: `${ownerTag}` },
            { name: "Creation Date", value: `${moment(server.createdAt).format(client.timeFormat)}` },
            { name: "Verification Level", value: `${server.verificationLevel}`, inline:true },
            { name: "Explicit Content Filter Level", value: `${server.explicitContentFilter}`, inline:true },
            { name: "\u200B", value: "\u200B" },
            { name: "Members", value: `${server.members.cache.size}` + ` (${botCountStr})`, inline: true },
            { name: "Channels", value: `${channelCount}`, inline: true },
            { name: "Roles", value: `${roles}` },
        );
    message.channel.send({ embeds: [embed] }).catch(console.error);
};
exports.help = {
    description: "Displays information about the server",
    category: "Information",
};