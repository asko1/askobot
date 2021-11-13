exports.run = (client, message, args) => {
    var commands = "";
    client.commands.forEach((value, key) => {
        commands += key + ": " + value.help.description + "\n";
    });
    var embed = client.createEmbed()
        .setColor(client.config.color)
        .addFields({name: "Commands", value: commands});
    message.channel.send({ embeds: [embed] }).catch(console.error);
};

exports.help = {
    description: "It helps",
    category: "Utility"
};