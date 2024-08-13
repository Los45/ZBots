const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const MysqlMerpati = require("../../Mysql");

module.exports = {
    name: "ucp",
    description: "Cek karakter User Control Panel",
    type: "",
    options: [
        {
            name: "ucp-account",
            description: "Nama akun UCP yang akan diperiksa karakternya!",
            type: "USER",
            required: true,
        },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        try {
            const getAccount = interaction.options.getUser("ucp-account");

            const roww = await new Promise((resolve, reject) => {
                MysqlMerpati.query(`SELECT * FROM ucp WHERE discordID = '${getAccount.id}'`, (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                });
            });

            if (roww[0]) {
                const row = await new Promise((resolve, reject) => {
                    MysqlMerpati.query(`SELECT * FROM players WHERE UCP = '${roww[0].UCP}' LIMIT 2`, (err, result) => {
                        if (err) reject(err);
                        resolve(result);
                    });
                });

                const msgChar = new MessageEmbed()
                    .setAuthor({ name: "Cleveland Roleplay", iconURL: client.config.ICON_URL })
                    .setDescription(`- Data Akun User Control Panel -\n• Karakter 1: ${row[0]?.Name || "Tidak Ditemukan"}\n• Karakter 2: ${row[1]?.Name || "Tidak Ditemukan"}\n• Karakter 3: ${row[1]?.Name || "Tidak Ditemukan"}`)
                    .setColor("#000000")
                    .setFooter({ text: "Bot Cleveland" })
                    .setTimestamp();

                interaction.reply({ embeds: [msgChar] });
                console.log(`1. ${row[0]?.Name || "Tidak Ditemukan"}\n2. ${row[1]?.Name || "Tidak Ditemukan"}\n3. ${row[1]?.Name || "Tidak Ditemukan"}`);
            } else {
                IntError(interaction, "Maaf user yang anda tag tidak memiliki akun UCP!");
            }
        } catch (error) {
            console.error("Error in ucp command:", error);
            IntError(interaction, "Terjadi kesalahan saat menjalankan perintah. Silakan coba lagi nanti.");
        }
    },
};
