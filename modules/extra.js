module.exports = (client, MessageEmbed) => {
    client.getChannels = (message, args) => {
        let channel, channelId;
        if (args.length === 0) {
            message.channel.send("Please specify a channel");
            return;
        }
        if (message.mentions.channels.size !== 0) {
            channel = message.mentions.channels.first();
            channelId = channel.id;
        }
        else {
            try {
                channel = client.channels.cache.get(args[0]);
                channelId = channel.id;
            }
            catch (error) {
                if (error instanceof TypeError) {
                    return;
                }
                else {
                    return client.logger.error(`${error}`);
                }
            }
        }
        return [channel, channelId];
    };

    client.createEmbed = (e) => {
        const embed = new MessageEmbed(e)
            .setColor(client.config.color);
        return embed;
    };
    client.setActivity = () => {
        const activity1 = () => {
            client.user.setActivity("Asko", { type: "WATCHING" });
            setTimeout(activity2, 30000);
        };
        const activity2 = () => {
            client.user.setActivity("with Asko", { type: "PLAYING" });
            setTimeout(activity1, 5000);
        };
        activity1();
    };
};
