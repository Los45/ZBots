const { CommandInteraction, MessageEmbed } = require("discord.js");
const MysqlMerpati = require("../Mysql");
const client = require("../Merpati");

module.exports = {
    id: "button-reffrole",
    /**
     * @param {CommandInteraction} interaction
     */
    run: async (interaction) => {
        const userid = interaction.user.id;
        const rUCP = interaction.guild.roles.cache.get(client.config.ROLE_UCP);

        // Check if the user already has the role
        if (interaction.member.roles.cache.has(rUCP.id)) {
            const alreadyHasRoleEmbed = new MessageEmbed()
                .setAuthor({ name: "Cleveland Roleplay", iconURL: client.config.ICON2 })
                .setTitle('Server | System Information')
                .setDescription(`- :x: Error\n\n> Kamu Sudah Memiliki Role <@&${rUCP.id}>\n> Gunakan Tombol Ini Jika Kamu Kehilangan Role <@&${rUCP.id}>`)
                .setColor('RED')
                .setFooter({ text: "Server | Handler" })
                .setImage(client.config.ICON_URL)
                .setTimestamp();

            await interaction.reply({ embeds: [alreadyHasRoleEmbed], ephemeral: true });
            return;
        }

        MysqlMerpati.query(`SELECT * FROM playerucp WHERE DiscordID = '${userid}'`, async (err, rows) => {
            if (err) {
                console.error(err);
                await interaction.reply({ content: 'Terjadi kesalahan saat memeriksa database.', ephemeral: true });
                return;
            }

            if (rows.length > 0) {
                // Jika Discord ID sudah terdaftar di tabel ucp
                await interaction.member.roles.add(rUCP);

                const successEmbed = new MessageEmbed()
                    .setAuthor({ name: "Cleveland Roleplay", iconURL: client.config.ICON2 })
                    .setTitle('Server | System Information')
                    .setDescription(`- :white_check_mark: Success\n\n> Berhasil Mengambil Role <@&${rUCP.id}>\n> Kini Kamu Dapat Mengakses Seluruh Channel Public`)
                    .setColor('RED')
                    .setFooter({ text: "Server | Handler" })
                    .setImage(client.config.ICON_URL)
                    .setTimestamp();

                await interaction.reply({ embeds: [successEmbed], ephemeral: true });
            } else {
                // Tindakan yang ingin Anda lakukan jika Discord ID belum terdaftar
                const errorEmbed = new MessageEmbed()
                    .setAuthor({ name: "Cleveland Roleplay", iconURL: client.config.ICON2 })
                    .setTitle('Server | System Information')
                    .setDescription(`- :x: Error\n> Gagal Memeriksa Akun\n\n> Kamu Belum Mendaftar Ke Server!\n> Silahkan Tekan Tombol Register Untuk Mendaftar`)
                    .setColor('RED')
                    .setFooter({ text: "Server | Handler" })
                    .setImage(client.config.ICON_URL)
                    .setTimestamp();

                await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            }
        });
    }
};
