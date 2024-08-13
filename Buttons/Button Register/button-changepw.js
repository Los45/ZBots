const { MessageButton, MessageActionRow, MessageEmbed } = require('discord.js');
const MysqlMerpati = require('../../Mysql');
const client = require('../../Merpati');
const { IntError } = require('../../Functions');

module.exports = {
    id: 'button-resetpw',
    /**
     * @param {CommandInteraction} interaction
     */
    run: async (interaction) => {
        const userid = interaction.user.id;

        // Membuat button resend code
        const buttonResendCode = new MessageButton()
            .setCustomId('button-reset')
            .setLabel('Reset')
            .setStyle('PRIMARY');

        // Membuat row dengan button resend code
        const row = new MessageActionRow().addComponents(buttonResendCode);

        // Menampilkan pesan dengan button
        const msgEmbed = new MessageEmbed()
            .setAuthor({ name: 'Reset Password | Server Roleplay', iconURL: client.config.ICON_URL })
            .setDescription(':warning: **Konfirmasi Reset Password**\nApakah Anda yakin ingin mereset password akun UCP Anda?')
            .setColor('#000000')
            .setFooter({ text: 'Bot Server' })
            .setTimestamp();

        try {
            // Menggunakan fetchReply untuk mendapatkan pesan yang telah diposting
            const replyMessage = await interaction.reply({ embeds: [msgEmbed], components: [row], fetchReply: true });

            // Menambahkan fungsi MySQL query jika pengguna memberikan respons positif
            const filter = (i) => i.customId === 'button-reset' && i.user.id === userid;
            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

            collector.on('collect', async (i) => {
                // Menghapus pesan tombol setelah diklik
                await i.deferUpdate();

                // Menjalankan operasi reset password pada tabel ucp
                MysqlMerpati.query(`UPDATE playerucp SET Password = '', Active = 0 WHERE DiscordID = '${userid}'`, (error) => {
                    if (error) {
                        console.error('Failed to update ucp:', error);
                        // Memberikan pesan kesalahan jika query gagal
                        return IntError(interaction, 'Terjadi kesalahan saat mereset password.');
                    }

                    // Memberikan respons berhasil
                    IntError(interaction, 'Password Anda telah di-reset. Silakan cek DM untuk informasi lebih lanjut.');

                    // Menghapus respons konfirmasi setelah beberapa saat
                    setTimeout(() => replyMessage.delete(), 10000);
                });
            });

            // Menangani timeout jika pengguna tidak memberikan respons
            collector.on('end', (collected, reason) => {
                if (reason === 'time') {
                    // Memberikan pesan timeout jika pengguna tidak memberikan respons
                    IntError(interaction, 'Waktu konfirmasi telah habis. Silakan coba lagi.');
                }
            });
        } catch (error) {
            console.error('Failed to send interaction reply:', error);
        }
    },
};
