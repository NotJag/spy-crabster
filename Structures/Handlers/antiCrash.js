const fs = require('fs');
module.exports = async (client) => {

    process.on('unhandledRejection', (reason, p) => {
        fs.writeFile("./errors.txt", `Reason:\n${reason}\n\nP:\n${p}\n\n\n\n\n\n\n\n\n\n`, function (err) {
            if (err) { }
        });
    })
    process.on("uncaughtException", (err, origin) => {
        fs.writeFile("./errors.txt", `Error:\n${err}\n\Origin:\n${origin}\n\n\n\n\n\n\n\n\n\n`, function (err) {
            if (err) { }
        });
    })
    process.on('uncaughtExceptionMonitor', (err, origin) => {
        fs.writeFile("./errors.txt", `Error:\n${err}\n\Origin:\n${origin}\n\n\n\n\n\n\n\n\n\n`, function (err) {
            if (err) { }
        });
    });
    process.on('multipleResolves', (type, promise, reason) => {
        fs.writeFile("./errors.txt", `Type:\n${type}\n\nPromise:\n${promise}\n\nPromise:\n\nReason:${reason}\n\n\n\n\n\n\n\n\n\n`, function (err) {
            if (err) { }
        });
    });

}