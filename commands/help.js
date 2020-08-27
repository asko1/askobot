exports.run = (client, message, args) => {
    var string = "";
    client.commands.forEach((value, key) => {
        string += key + ": " + value.help.description + "\n";
    });
    var embed = new client.Discord.MessageEmbed()
        .setColor(client.config.color)
        .addFields({name: "Commands", value: string});
    message.channel.send(embed).catch(console.error);
}
exports.help = {
    description: "It helps"
};