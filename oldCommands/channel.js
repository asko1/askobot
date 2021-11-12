exports.run = (client, message, args) => {
    gChnls = client.getChannels(message, args)
    if (gChnls == undefined) return;
    channel = gChnls[0]
    channelId = gChnls[1];
    message.channel.send(`${channel}` + " " + channelId);
}

exports.help = {
    description: "testing channel inputs"
}