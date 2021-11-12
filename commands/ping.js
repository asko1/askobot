const { SlashCommandBuilder } = require('@discordjs/builders');

exports.run = (client, message, args) => {
    message.channel.send({ content: "pong!" }).catch(console.error);
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Ping!'),
    async execute(interaction) {
        return interaction.reply('pong!');
    },
};

exports.help = {
    description: "Ping!",
    category: "Utility"
};