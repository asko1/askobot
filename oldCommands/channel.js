exports.run = (client, message, args) => {
    gChnls = client.getChannels(message, args)
    if (gChnls == undefined) return;
    chnl = gChnls[0]
    chnlID = gChnls[1];
    message.channel.send(`${chnl}` + " " + chnlID);
}

exports.help = {
    description: "testing channel inputs"
}