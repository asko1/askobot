exports.run = (client, message, args, guildConf) => {
    var member = message.guild.member(message.author);
    if (!member.hasPermission("MANAGE_GUILD")) {
        return message.channel.send("You do not have the permissions to run this command.");
    }

    if (args.length <= 1) {
        return message.channel.send("Missing arguments!");
    }
    // Get key and value from args
    var [prop, ...value] = args;

    // Checks if config exists
    if(!client.settings.has(message.guild.id, prop)) {
        return message.channel.send("This key is not in the configuration.");
    }
    if (prop == "modLogChannel") {
        gChnls = client.getChannels(message, value)
        value = gChnls[1];
        client.settings.set(message.guild.id, value, prop);
        return message.channel.send(`Guild configuration item ${prop} has been changed to:\n\`${value}\``);
    }

    // Changes config
    try {
        client.settings.set(message.guild.id, value.join(" "), prop);

        // Send confirmation
        message.channel.send(`Guild configuration item ${prop} has been changed to:\n\`${value.join(" ")}\``);
    } catch (error) {
        return client.logger.error(`${error}`);
    }
};

exports.help = {
    description: "Edit server configuration",
    category: "Configuration"
};