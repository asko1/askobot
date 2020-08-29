module.exports = (client, message) => {
    const guildConf = client.settings.ensure(message.guild.id, client.config.defaultSettings);

    if (guildConf.modLogChannel == "") return;

    var embed = new client.Discord.MessageEmbed()
        .setColor("FF0000")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .addFields(
        {name: "Deleted Message", value: message.content},
        {name: "Channel", value: `${message.channel}`});
        client.channels.cache.get(guildConf.modLogChannel).send(embed).catch(console.error);
}