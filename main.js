const fs = require("fs");
const Enmap = require("enmap");
const { Intents, Client, MessageEmbed } = require("discord.js");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// etc. configuration parameters
client.config = require("./config.js");
client.logger = require("./modules/Logger.js");
require("./modules/extra.js")(client, MessageEmbed);
// moment.js format
client.timeFormat = "Y-MM-DD HH:mm:ss Z [UTC]";

client.login(client.config.token);

// Storing commands and settings
client.commands = new Enmap();
client.settings = new Enmap({ name: "settings" });


// Loads events
const events = fs.readdirSync("./events/").filter(file => file.endsWith(".js"));
for (const file of events) {
    const event = require(`./events/${file}`);
    // event name is the file name without the extension (e.g "main" if the file is main.js)
    const eventName = file.split(".")[0];
    client.logger.log(`Loading event: ${eventName}`);
    client.on(eventName, event.bind(null, client));
}

// Loads commands
const commands = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for (const file of commands) {
    if (!file.endsWith(".js")) return;
    const props = require(`./commands/${file}`);
    const commandName = file.split(".")[0];
    client.logger.log(`Attempting to load command ${commandName}`, "log");
    client.commands.set(commandName, props);
}

// Logs that bot is ready
client.on("ready", () => {
    client.logger.log(`${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`, "ready");
    client.setActivity();
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