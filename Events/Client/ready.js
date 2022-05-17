const mongoose = require('mongoose');
const { DATABASE } = require("../../Structures/config.json")

module.exports = {
    name: "ready",
    once: true,
    execute(client) {

        console.log("The client is now ready!")

        // client.user.setActivity("watching hoovies", {
        //     type: "STREAMING",
        //     url: "https://www.twitch.tv/neoniceye"
        // })

        // let botStatus = [
        //     "https://www.twitch.tv/neoniceye",
        //     `https://www.twitch.tv/kushty_dogg`,
        //     `https://www.twitch.tv/shadowshield`,
        // ]

        // setInterval(function () {
        //     let status = botStatus[Math.floor(Math.random() * botStatus.length)];
        //     client.user.setActivity("Amazing content!", {
        //         type: "STREAMING",
        //         url: status
        //     })
        // }, 10000)

        client.user.setActivity("Github Repositories", {
            type: "WATCHING",
        })
        //Login to database

        if (!DATABASE) return;
        mongoose.connect(DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("The client is now connected to Mongo DB")
        }).catch((err) => {
            console.log(err)
        })
    }
}
