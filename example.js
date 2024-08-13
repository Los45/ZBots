const { CommandInteraction, MessageActionRow, MessageButton } = require("discord.js");
const MysqlMerpati = require("../../Mysql");
const { IntSucces, IntError } = require("../../Functions");

module.exports = {
    data: {
        name: "resetpassword",
        description: "Reset password akun UCP",
    },
    /**
     * @param {CommandInteraction} interaction
     */
    run: async (interaction) => {
        const userId = interaction.user.id;

        MysqlMerpati.query(`SELECT * FROM playerucp WHERE DiscordID = '${userId}'`, async (error, rows) => {
            if (rows[0]) {
                // Reset password logic here
                MysqlMerpati.query(`UPDATE playerucp SET Password = '', Active = 0 WHERE DiscordID = '${userId}'`, (err) => {
                    if (err) {
                        return IntError(interaction, ":x: **Error**\nGagal mereset password akun UCP. Silakan coba lagi.");
                    }
                    IntSucces(interaction, ":white_check_mark: **Success**\nPassword akun UCP anda berhasil direset.", successRow);
                });
            } else {
                IntError(interaction, ":x: **Error**\nAnda belum pernah mengambil tiket di kota Server Roleplay. Silakan daftarkan akun anda dengan cara ambil tiket.");
            }
        });
    },
};


