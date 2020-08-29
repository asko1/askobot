exports.run = (client, message, args, guildConf) => {
    let configProps = Object.keys(guildConf).map(prop => {
        return `${prop}:  ${guildConf[prop]}`;
    });
      var embed = new client.Discord.MessageEmbed()
        .setColor(client.config.color)
        .addFields({name: "Settings", value: configProps.join("\n")});
      message.channel.send(embed);
};

exports.help = {
    description: "Shows server configuration",
    category: "Configuration"
};