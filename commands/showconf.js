exports.run = (client, message, args, guildConf) => {
    let configProps = Object.keys(guildConf).map(prop => {
        return `${prop}:  ${guildConf[prop]}`;
    });
      var embed = client.createEmbed()
        .setColor(client.config.color)
        .addFields({name: "Settings", value: configProps.join("\n")});
      message.channel.send({embeds: [embed]}).catch(console.error);
};

exports.help = {
    description: "Shows server configuration",
    category: "Configuration"
};