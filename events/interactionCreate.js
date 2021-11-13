module.exports = async (client, interaction) => {
    client.logger.log("Interaction wee");
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.slash.execute(interaction);
    }
    catch (error) {
        console.error(error);
        return interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
    }
};