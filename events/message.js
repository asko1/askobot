module.exports = (client, message) => {
    // Ignore all bots
    if (!message.guild || message.author.bot) return;

    // Makes sure server config exists
    const guildConf = client.settings.ensure(message.guild.id, client.config.defaultSettings);
  
    // Ignore messages not starting with the server prefix
    if(message.content.indexOf(guildConf.prefix) !== 0) return;
  
    // Argument/command name definition.
    const args = message.content.slice(guildConf.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    // Grab the command data from the client.commands Enmap
    const cmd = client.commands.get(command);
  
    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;
  
    // Run the command
    cmd.run(client, message, args, guildConf);
    // Logs it
    client.logger.log(`${message.author.username} ran ${command}`, "cmd")
  };