module.exports = (client) => {
    client.getChannels = (message, args) => {
        if (args.length == 0) {
            message.channel.send("Please specify a channel")
            return;
        }
        if (message.mentions.channels.size !== 0) {
            chnl = message.mentions.channels.first();
            chnlID = chnl.id;
        }
        else {try {
            chnl = client.channels.cache.get(args[0]);
            chnlID = chnl.id;
        } catch (error) {
            if (error instanceof TypeError) {
                return;
            } else {
                client.logger.error(`${error}`)
                return;
            }        
        }}
        return [chnl, chnlID];
    }
}