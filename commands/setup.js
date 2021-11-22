exports.run = async (client, message, args, guildConf) => {

    const member = message.guild.members.cache.get(message.author.id);
    if (!member.permissions.has("MANAGE_GUILD")) {
        return message.channel.send("You do not have the permissions to run this command.");
    }

    // Filter for .awaitReactions
    const filter = (reaction, user) => {
        return (reaction.emoji.name == "✅" || reaction.emoji.name == "❌") && user.id === message.author.id;
    };

    const filter2 = (reaction, user) => {
        return (reaction.emoji.name == "❌") && user.id === message.author.id;
    };

    const userFilter = (m) => {
        return m.author.id == message.author.id;
    };
    const start = client.createEmbed()
        .setDescription("This embed will go through each server config variable and will prompt you to change them at which point you can input a new value or skip it.\
         React with :white_check_mark: to continue, or with :x: to cancel.");

    message.channel.send({ embeds: [start] }).then(msg => {
        msg.react("✅")
            .then(() => msg.react("❌"))
            .then(() => {
                const collector = msg.createReactionCollector({ filter, time: 30000, max: 1 });
                collector.on("collect", (reaction) => {
                    if (reaction.emoji.name === "✅") {
                        client.logger.log("User confirmed setup.");
                        collector.stop();
                        return configs();
                    }
                });
            });

        /* .then(collected => {
                if (collected.first().emoji.name === "✅") {
                    console.logger.log("User confirmed setup.");
                    return configs();
                }
                else if (collected.first().emoji.name === "❌") {
                    msg.delete();
                    return;
                }
            }); */
    });

    let index = 0;
    const properties = Array.from(Object.keys(guildConf));

    const configs = async () => {
        if (index == properties.length) {
            return message.channel.send({ content: "Setup complete." });
        }
        let val;

        const embed = client.createEmbed()
            .setTitle(properties[index])
            .setDescription(`Insert a new value for ${properties[index]} or react with ❌ to skip.`);
        const query = message.channel.send({ embeds: [embed] });
        await query.react("❌");
        const collector = query.createReactionCollector({ filter: filter2, time: 30000, max: 1 });
        const messages = message.channel.createMessageCollector({ filter: userFilter, time: 30000, max: 1 });
        // client.logger.log("we made it here");

        messages.on("collect", async (msg) => {
            client.logger.log(`${msg.content}`);
            val = msg.content;

            if (properties[index] == "modLogChannel") {
                val = client.getChannels(msg, val)[1];
            }
            await client.settings.set(message.guild.id, val, properties[index]);
            await message.channel.send(`Guild configuration item ${properties[index]} has been changed to:\n\`${val}\``);
            index++;
            return configs();
        });

        collector.on("collect", async (reaction, user) => {
            client.logger.log(reaction.emoji.name);
            client.logger.log(user.tag);
            if (reaction.emoji.name === "❌") {
                client.logger.log("User cancelled setup.");
                client.logger.log(`${index}`);
                index++;
                return configs();
            }
        });
    };
};

exports.help = {
    description: "Sets up server configuration",
    category: "Configuration",
};