const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const MysqlMerpati = require("../../Mysql");
const numberFormat = (value, currencyCode) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);

// Fungsi untuk mengonversi level VIP menjadi teks
const getVipStatus = (vipLevel) => {
    switch (vipLevel) {
        case 1:
            return "VIP : Bronze";
        case 2:
            return "VIP : Silver";
        case 3:
            return "VIP : Gold";
        default:
            return "Not a VIP";
    }
};

// Fungsi untuk mendapatkan nama faction berdasarkan ID
const getFactionName = (factionId) => {
    const factionNames = {
        '-1': "Bukan Anggota Faction",
        '0': "Polisi",
        '1': "Medis",
        '2': "Reporter",
        '3': "Pemerintah",
        '4': "Pedagang",
        // Tambahkan faction lain sesuai kebutuhan
    };

    return factionNames[factionId] || "Bukan Anggota Faction";
};

module.exports = {
    name: "stats",
    description: "Memeriksa statistik/harta karakter player",
    type: "",
    options: [
        {
            name: "char-name",
            description: "Nama Karakter yang akan diperiksa",
            type: "STRING",
            required: true,
        },
    ],
    run: async (client, interaction, args) => {
        const karakter = interaction.options.getString("char-name");

        MysqlMerpati.query(`
            SELECT *
            FROM players
            WHERE Name = '${karakter}'
        `, async (err, row) => {
            if (row[0]) {
                const vipStatus = getVipStatus(row[0].vip);
                const factionName = getFactionName(row[0].Faction);

                const jobNames = {
                    1: "Sopir Bus",
                    2: "Petani",
                    3: "Penjahit",
                    4: "Penambang",
                    5: "Tukang Kayu",
                    6: "Tukang Ayam",
                    7: "Mechanic",
                    8: "Supir Taxi",
                    9: "Truk Cargo",
                    // Tambahkan pekerjaan lain sesuai kebutuhan
                };

                const jobName = jobNames[row[0].Job] || "Pengangguran";

                const msgChar = new MessageEmbed()
                    .setAuthor({ name: "Cleveland Roleplay", iconURL: client.config.ICON_URL })
                    .setDescription(`- Data Karakter \n• Nama: ${row[0].Name}\n• UCP: ${row[0].UCP}\n• ${vipStatus} | VIP Time: ${row[0].vip_time} days\n\n- Stats \n• Uang: ${numberFormat(row[0].Money, 'USD')}\n• Saldo Bank: ${numberFormat(row[0].Bank, 'USD')}\n\n- HUD Player Server\n• Lapar: ${row[0].Lapar || "Not Available"}\n• Haus: ${row[0].Haus || "Not Available"}\n• Stress: ${row[0].Stress || "Not Available"}\n\n- Pekerjaan\n• ${jobName}\n\n- Faction\n• ${factionName}\n\n- Seberapa Sepuh di Server\n• Level: ${row[0].Level || 1}\n• Waktu Bermain: ${row[0].Hour || 0} Jam ${row[0].Minute || 0} Menit ${row[0].Second || 0} Detik`)
                    .setColor("#000000")
                    .setFooter({ text: "Bot Cleveland" });

                if (row[0].Skin) {
                    msgChar.setThumbnail(`https://assets.open.mp/assets/images/skins/${row[0].Skin}.png`);
                } else {
                    msgChar.setThumbnail("DEFAULT_SKIN_URL");
                }

                msgChar.setTimestamp();

                interaction.reply({ embeds: [msgChar] });
            }
        });
    },
};
