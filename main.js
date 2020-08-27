const fs = require("fs");
const Enmap = require("enmap");
const Discord = require("discord.js");

//to-do: move some of these to config
const client = new Discord.Client();
client.config = require("./config.js");
client.logger = require("./modules/Logger.js");
require("./modules/extra.js")(client);
client.timeFormat = "Y-MM-DD HH:mm:ss Z [UTC]"; //moment.js format
client.Discord = Discord; //this may be silly but for example it allows making embeds without having to import the discord.js module

client.login(client.config.token)

client.commands = new Enmap();
client.settings = new Enmap({name: "settings"});

// Loads events
fs.readdir("./events/", (err, files) => {
    if (err) return client.logger.log(err, "error"); //logs any errors
    files.forEach(file => {
      const event = require(`./events/${file}`); //requires event file
      let eventName = file.split(".")[0]; //event name is the file name without the extension (e.g "main" if the file is main.js)
      client.on(eventName, event.bind(null, client)); //binds event to client
    });
  });

// Loads commands
fs.readdir("./commands/", (err, files) => {
    if (err) return client.logger.log(err, "error");
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/${file}`);
      let commandName = file.split(".")[0];
      client.logger.log(`Attempting to load command ${commandName}`, "log");
      client.commands.set(commandName, props);
    });
  });

// Logs that bot is ready
client.on('ready', () => {
    client.logger.log(`${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`, "ready");
});

// For when shit hits the fan
process.on("uncaughtException", (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    client.logger.error(`Uncaught Exception: ${errorMsg}`);
    console.error(err);
    process.exit(1);
  });

  process.on("unhandledRejection", err => {
    client.logger.error(`Unhandled rejection: ${err}`);
    console.error(err);
  });