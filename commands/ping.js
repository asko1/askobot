const { SlashCommandBuilder } = require("@discordjs/builders");

exports.help = {
    name: "ping",
    description: "Ping!",
    category: "Utility",
};

exports.run = (client, message) => {
    message.channel.send({ content: "pong!" }).catch(console.error);
};

exports.slash = {
    data: new SlashCommandBuilder()
        .setName(this.help.name)
        .setDescription(this.help.description),
    async execute(interaction) {
        return interaction.reply("pong!");
    },
};
