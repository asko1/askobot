const { SlashCommandBuilder } = require("@discordjs/builders");

exports.help = {
    name: "help",
    description: "It helps",
    category: "Utility",
};

exports.run = (client, message) => {
    let commands = "";
    client.commands.forEach((value, key) => {
        commands += key + ": " + value.help.description + "\n";
    });
    const embed = client.createEmbed()
        .setColor(client.config.color)
        .addFields({ name: "Commands", value: commands });
    message.channel.send({ embeds: [embed] }).catch(console.error);
};

exports.slash = {
    data: new SlashCommandBuilder()
        .setName(this.help.name)
        .setDescription(this.help.description),
    async execute(interaction) {
        return interaction.reply({ embeds: [this.run.embed] });
    },
};
