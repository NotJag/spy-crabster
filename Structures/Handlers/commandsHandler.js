const { Perms } = require("../Validation/permissions");
const { Client, Application, ApplicationCommand, Guild, AnonymousGuild } = require("discord.js");
const { promisify } = require("util");
const glob = require("glob");
const PG = promisify(glob)
const Ascii = require("ascii-table");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { TOKEN } = require('../config.json');
const { CLIENTID } = require('../config.json');

const fs = require('fs');




/**
 * 
 * @param { Client } client
 * 
 */
module.exports = async (client) => {
    const Table = new Ascii("Command Loaded")

    CommandsArray = [];

    (await PG(`${(process.cwd().replace(/\\/g, "/"))}/Commands/*/*.js`)).map(async (file) => {
        const command = require(file);

        if (!command.name)
            return Table.addRow(file.split("/")[7], "❌ FAILED", "Missing a name.")

        if (!command.description)
            return Table.addRow(file.split("/")[7], "❌ FAILED", "Missing a description.")

        if (command.permission) {
            if (Perms.includes(command.permission))
                command.defaultPermission = false;
            else
                return Table.addRow(command.name, "❌ FAILED", "Permission is invalid.")
        }


        client.commands.set(command.name, command);
        CommandsArray.push(command);

        await Table.addRow(command.name, "✔ SUCCESSFUL")


        console.log(Table.toString());

    });





    client.on("ready", async () => {



        const rest = new REST({ version: '9' }).setToken(TOKEN)

        await rest.put(Routes.applicationCommands(CLIENTID), { body: CommandsArray })
        console.log("Application Commands Refreshed! ✅")

    });

}

