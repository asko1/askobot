module.exports = (client, message) => {
    const guildConf = client.settings.ensure(message.guild.id, client.config.defaultSettings);
    var embed = new client.Discord.MessageEmbed()
        .setColor(client.color)
        .setAuthor(message.author.tag, message.author.avatarURL())
        .addFields(
        {name: "Deleted Message", value: message.content},
        {name: "Channel", value: `${message.channel}`});
        client.channels.cache.get(guildConf.modLogChannel).send(embed).catch(console.error);
}