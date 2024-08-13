const { Client, CommandInteraction } = require("discord.js");
const MysqlMerpati = require("../../Mysql");
require("../../Functions");

function getVipName(level) {
    switch (level) {
        case 0:
            return "Not VIP";
        case 1:
            return "Bronze";
        case 2:
            return "Silver";
        case 3:
            return "Gold";
        default:
            return "Unknown";
    }
}

module.exports = {
    name: "setvip",
    description: "Untuk mengatur status VIP karakter",
    type: "",
    options: [
        {
            name: "char-name",
            description: "Nama karakter yang akan diatur VIP-nya",
            type: "STRING",
            required: true,
        },
        {
            name: "vip-level",
            description: "Level VIP (0-3)",
            type: "INTEGER",
            required: true,
            choices: [
                { name: "Not VIP", value: 0 },
                { name: "Bronze", value: 1 },
                { name: "Silver", value: 2 },
                { name: "Gold", value: 3 },
            ],
        },
        {
            name: "vip-time",
            description: "Waktu VIP (dalam hari, 0 untuk permanen)",
            type: "INTEGER",
            required: true,
        },
    ],
    run: async (client, interaction, args) => {
        if (!interaction.member.permissions.has('ADMINISTRATOR')) return IntPerms(interaction);

        const charName = interaction.options.getString("char-name");
        const vipLevel = interaction.options.getInteger("vip-level");
        const vipTime = interaction.options.getInteger("vip-time");

        MysqlMerpati.query(`SELECT * FROM players WHERE Name = '${charName}'`, async (err, row) => {
            if (row[0]) {
                MysqlMerpati.query(
                    `UPDATE players SET vip = ${vipLevel}, vip_time = ${vipTime} WHERE Name = '${charName}'`,
                    (updateErr) => {
                        if (updateErr) {
                            IntError(interaction, "Terjadi kesalahan saat mengatur status VIP karakter.");
                        } else {
                            IntAdmin(interaction, `Status VIP karakter \`${charName}\` berhasil diatur menjadi ${getVipName(vipLevel)} ${vipTime} hari oleh admin <@${interaction.user.id}>`);
                        }
                    }
                );
            } else {
                IntError(interaction, "Karakter dengan nama tersebut tidak ditemukan dalam database.");
            }
        });
    },
};
