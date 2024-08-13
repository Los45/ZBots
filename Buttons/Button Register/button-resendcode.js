const { CommandInteraction, MessageEmbed } = require("discord.js");
const MysqlMerpati = require("../../Mysql")
const client = require("../../Merpati");

module.exports = {
    id: "button-resendcode",
    /**
     * @param {CommandInteraction} interaction
     */
    run: async (interaction) => {
        const userid = interaction.user.id;
        MysqlMerpati.query(`SELECT * FROM playerucp WHERE DiscordID = '${userid}'`, async (error, row) => {
            if (row[0]) {
                const msgEmbed = new MessageEmbed()
                    .setAuthor({ name: "Server Roleplay", iconURL: client.config.ICON2 })
                    .setTitle("Server | Account Information")
                    .setDescription(`- **Detail Account**\n\n> Username : **${row[0].ucp}**\n> VerifyCode : **${row[0].verifycode}**\n> ID : **${userid}**\n> Discord Account : **${interaction.user.tag}**\n> Status : **Verified**`)
                    .setColor('RED')
                    .setImage(client.config.ICON_URL)
                    .setFooter({ text: "Server | Handler" })
                    .setTimestamp();
                await interaction.user.send({ embeds: [msgEmbed] }).catch(error => {
                    // interaction.reply({ content: "```\nTidak Dapat Mengirimkan Detail Akun Kamu, Gunakan Tombol CheckUCP Jika Sudah Melakukan Instruksi Dibawah Ini :\n\n- Open Direct Message\n\n> 1. Pergi Ke Pengaturan Discord\n> 2. Pilih Privacy & Safety\n> 3. Pilih Do Not Scan\n````", ephemeral: true });
                    const Error = new MessageEmbed()
                    .setAuthor({ name: "Server Roleplay", iconURL: client.config.ICON2 })
                    .setTitle('Server | System Information')
                    .setDescription(`Tidak Dapat Mengirimkan Detail Akun Kamu, Gunakan Tombol CheckUCP Jika Sudah Melakukan Instruksi Dibawah Ini :\n\n- Open Direct Message\n\n> 1. Pergi Ke Pengaturan Discord\n> 2. Pilih Privacy & Safety\n> 3. Pilih Do Not Scan\n`)
                    .setColor('RED')
                    .setFooter({ text: "Server | Handler" })
                    .setImage(client.config.ICON_URL)
                    .setTimestamp();
    
                    interaction.reply({ embeds: [Error], ephemeral: true });
                })
                const Info = new MessageEmbed()
                .setAuthor({ name: "Server Roleplay", iconURL: client.config.ICON2 })
                .setTitle('Server | System Information')
                .setDescription(`- :white_check_mark: Success\n\n> Silahkan Buka Direct Message Dari BOT!`)
                .setColor('RED')
                .setFooter({ text: "Server | Handler" })
                .setImage(client.config.ICON_URL)
                .setTimestamp();

            await interaction.reply({ embeds: [Info], ephemeral: true });
            }
            else{
            const msgEmbed = new MessageEmbed()
            .setAuthor({ name: "Server Roleplay", iconURL: client.config.ICON2 })
            .setTitle('Server | System Information')
            .setDescription(`- :x: Error\n> Gagal Memeriksa Akun\n\n> Kamu Belum Mendaftar Ke Server!\n> Silahkan Tekan Tombol Register Untuk Mendaftar`)
            .setColor('RED')
            .setFooter({ text: "Server | Handler" })
            .setImage(client.config.ICON_URL)
            .setTimestamp();

        await interaction.reply({ embeds: [msgEmbed], ephemeral: true });
            }
        })
    },
}