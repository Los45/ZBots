const client = require("../Merpati");
const mongoose = require("mongoose");
const samp = require("samp-query");

const connection = {
    host: client.config.SERVER_IP,
    port: client.config.SERVER_PORT
};

function StatusActivityUpdate() {
    samp(connection, function (error, response) {
        if (error) {
            // console.error("Loading SA:MP Server", error);
            try {
                client.user.setActivity("Server : Offline", { type: "PLAYING" });
            } catch (err) {
                console.error("Error setting activity:", err);
            }
        } else {
            const { hostname, gamemode, maxplayers } = response;
            const activityText = `${hostname}\nPlayers : ${response.online} / ${maxplayers}\nMode : ${gamemode}\n\nBot Version : 1.3 | FanzBots`;
            

            try {
                client.user.setActivity(activityText, { type: "PLAYING" });
            } catch (err) {
                console.error("Error setting activity:", err);
            }
        }
    });
}

client.on("ready", () => {
    console.log(`\x1b[36m[BOT]: \x1b[0m(${client.user.tag}) Telah berhasil diluncurkan!`);
    setInterval(StatusActivityUpdate, 1000);
    
    if (client.config.mongooseConnectionString) {
        mongoose.connect(client.config.mongooseConnectionString)
            .then(() => console.log('\x1b[36m[MONGODB]: \x1b[0mDatabase MongoDB telah berhasil terhubung!'))
            .catch(error => console.error("Error connecting to MongoDB:", error));
    }
});