//Require Stuff

const {
    Client,
    Collection,
    MessageEmbed
} = require("discord.js");
const {
    TOKEN
} = require("./config.json");
const {
    DisTube
} = require("distube");
const {
    SpotifyPlugin
} = require('@distube/spotify');
const { YtDlpPlugin } = require("@distube/yt-dlp");

// Create Client

const client = new Client({
    partials: ['CHANNEL'],
    intents: 32767
});

// Create collections

client.commands = new Collection();
client.buttons = new Collection();

//Handlers

require("../Systems/giveawaySystem")(client);
require("./Handlers/commandsHandler")(client);
require("./Handlers/eventsHandler")(client);
require("./Handlers/buttonHandler")(client);
require("./Handlers/antiCrash")(client);

//Create Distube Client

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnFinish: true,
    leaveOnEmpty: false,
    leaveOnStop: false,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    plugins: [
      new SpotifyPlugin({
        emitEventsAfterFetching: true
      }),
      new YtDlpPlugin()
    ],
    youtubeDL: false
});

module.exports = client;

client.login(TOKEN);
