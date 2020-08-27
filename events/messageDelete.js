module.exports = (client, message) => {
    var embed = new client.Discord.MessageEmbed()
        .setColor(client.color)
        .setAuthor(message.author.tag, message.author.avatarURL())
        .addFields({name: "Deleted Message", value: message.content});
    message.channel.send(embed).catch(console.error);
}