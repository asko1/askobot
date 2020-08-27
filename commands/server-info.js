exports.run = (client, message, args) => {
    server = message.guild;
    var embed = new client.Discord.MessageEmbed()
        .setAuthor(server.name, server.iconURL())
        .setTitle(server.id)
        .setThumbnail(server.iconURL())
        .setColor(client.config.color)
        .addFields(
            {name: "Verification Level", value: "ID:" + server.verificationLevel, inline:true},
            {name: "Explicit Content Filter Level", value: server.explicitContentFilter, inline:true},
            {}
        )
    message.channel.send(embed).catch(console.error);
}
exports.help = {
    description: "Displays information about the server",
    category: "Information"
};