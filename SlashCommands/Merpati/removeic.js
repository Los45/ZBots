const { Client, CommandInteraction } = require("discord.js");
const MysqlMerpati = require("../../Mysql");
require("../../Functions");

module.exports = {
    name: "removeic",
    description: "Untuk menghapus karakter dari tabel players berdasarkan nama",
    type: "",
    options: [
        {
            name: "char-name",
            description: "Nama karakter yang akan dihapus",
            type: "STRING",
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
        if (!interaction.member.permissions.has('ADMINISTRATOR')) return IntPerms(interaction);

        const charName = interaction.options.getString("char-name");

        MysqlMerpati.query(`SELECT * FROM players WHERE Name = '${charName}'`, async (err, row) => {
            if (row[0]) {
                MysqlMerpati.query(`DELETE FROM players WHERE Name = '${charName}'`, (deleteErr) => {
                    if (deleteErr) {
                        IntError(interaction, "Terjadi kesalahan saat menghapus karakter.");
                    } else {
                        IntAdmin(interaction, `Karakter dengan nama (${charName}) berhasil dihapus oleh admin <@${interaction.user.id}>`);
                    }
                });
            } else {
                IntError(interaction, "Karakter dengan nama tersebut tidak ditemukan dalam database.");
            }
        });
    },
};
