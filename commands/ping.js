exports.run = (client, message, args) => {
    message.channel.send({ content: "pong!" }).catch(console.error);
}
exports.help = {
    description: "Ping!",
    category: "Utility"
};