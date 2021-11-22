module.exports = (client, message) => {
    const guildConf = client.settings.ensure(message.guild.id, client.config.defaultSettings);

    if (message.author.bot) return;
    else if (guildConf.modLogChannel == "") return;

    const embed = client.createEmbed()
        .setColor("FF0000")
        .setAuthor(message.author.tag, message.author.avatarURL())
        .addFields(
            { name: "Deleted Message", value: message.content },
            { name: "Channel", value: `${message.channel}` });
    client.channels.cache.get(guildConf.modLogChannel).send({ embeds: [embed] }).catch(console.error);
};