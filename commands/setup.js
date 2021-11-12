exports.run = (client, message, args, guildConf) => {

    var member = message.guild.member(message.author);
    if (!member.hasPermission("MANAGE_GUILD")) {
        return message.channel.send("You do not have the permissions to run this command.");
    }

    // Filter for .awaitReactions
    const filter = (reaction, user) => {
        return (reaction.emoji.name == '✅' || reaction.emoji.name == '❌') && user.id === message.author.id;
    };

    const filter2 = (reaction, user) => {
        return (reaction.emoji.name == '❌') && user.id === message.author.id;
    };

    const userFilter = m => message.author.id === m.author.id;

    const options = {time: 60000, max: 1, errors: ["time"] }

    var start = client.createEmbed()
        .setDescription("This embed will go through each server config variable and will prompt you to change them at which point you can input a new value or skip it.\
         React with :white_check_mark: to continue, or with :x: to cancel.");
    msg = message.channel.send(start).then(msg => { // Message is the message which the command was ran with, msg is the embed
        msg.react('✅')
        .then(() => msg.react('❌'))
        msg.awaitReactions(filter, options)

        .then(collected => {
            if (collected.first().emoji.name === '✅') {
                return configs();
            }
            else if (collected.first().emoji.name === '❌') {
                msg.delete();
                return;
            }            
        })
    });
    configs = () => {
        Array.from(Object.keys(guildConf)).forEach(prop => {
            var embed = client.createEmbed()
                .setTitle(prop)
                .setDescription(`Insert a new value for ${prop} or react with ❌ to skip.`);
            query = message.channel.send(embed).then(query => {
                query.react('❌')
                query.awaitReactions(filter2, options)
                .then(collected => {
                    return;
                });

                message.channel.awaitMessages(userFilter, options)
                .then(messages => {
                    mesg = messages.first()
                    val = mesg.content;
                    if (prop == "modLogChannel") {
                        val = client.getChannels(mesg, mesg.content)[1]
                    }
                    client.settings.set(message.guild.id, val, prop);
                    return message.channel.send(`Guild configuration item ${prop} has been changed to:\n\`${val}\``);
                })
            });
        })
    }
}

exports.help = {
    description: "Sets up server configuration",
    category: "Configuration"
};