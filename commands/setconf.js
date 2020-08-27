exports.run = (client, message, args, guildConf) => {
    var member = message.guild.member(message.author);
    if (!member.hasPermission("MANAGE_GUILD")) {
        return message.channel.send("You do not have the permissions to run this command.");
    }

    if (args.length <= 1) {
        return message.channel.send("Missing arguments!");
    }
    // Get key and value from args
    const [prop, ...value] = args;

    // Checks if config exists
    if(!client.settings.has(message.guild.id, prop)) {
        return message.channel.send("This key is not in the configuration.");
    }
    
    // Changes config
    client.settings.set(message.guild.id, value.join(" "), prop);

    // Send confirmation
    message.channel.send(`Guild configuration item ${prop} has been changed to:\n\`${value.join(" ")}\``);
};

exports.help = {
    description: "Edit server configuration",
    category: "Configuration"
};