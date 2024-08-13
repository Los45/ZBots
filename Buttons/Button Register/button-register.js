const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const { Modal, TextInputComponent, showModal } = require("discord-modals");
const ms = require("ms");
const MysqlMerpati = require("../../Mysql")
const client = require("../../Merpati");
const timeAccount = ms("0 days")
require("../../Functions")

module.exports = {
    id: "button-register",
    /**
     * @param {CommandInteraction} interaction
     */
    run: async (interaction, client) => {
        const userid = interaction.user.id;
        const createdAt = new Date(interaction.user.createdAt).getTime()
        const detectDays = Date.now() - createdAt;

        if(detectDays < timeAccount) return IntError(interaction, "Umur akun anda tidak mencukupi untuk mendaftar Akun UCP di server Server!");
        MysqlMerpati.query(`SELECT * FROM playerucp WHERE DiscordID = '${userid}'`, async (err, row) => {
            if (row.length < 1) {
                const modalRegister = new Modal()
                    .setCustomId("modal-register")
                    .setTitle("Server | Register Account")
                    .addComponents(
                        new TextInputComponent()
                            .setCustomId("reg-name")
                            .setLabel("Masukkan Username UCP | Example : Zikrii")
                            .setMinLength(4)
                            .setMaxLength(15)
                            .setStyle("SHORT")
                            .setPlaceholder("Username")
                            .setRequired(true)
                    )

                showModal(modalRegister, {
                    client: client,
                    interaction: interaction
                });
            }
            else{
                const msgEmbed = new MessageEmbed()
                .setAuthor({ name: "Server Roleplay", iconURL: client.config.ICON2 })
                .setTitle('Server | System Information')
                .setDescription(`- :x: Error\n> Gagal Melakukan Pendaftaran\n\n> Kamu Sudah Pernah Mendaftar Dengan Nama **${row[0].ucp}**\n> Setiap Orang Hanya Dapat Melakukan 1 Kali Pendaftaran\n> Mohon Agar Tidak Melakukan Dual UCP`)
                .setColor('RED')
                .setFooter({ text: "Server | Handler" })
                .setImage(client.config.ICON_URL)
                .setTimestamp();

            await interaction.reply({ embeds: [msgEmbed], ephemeral: true });
            }
        })
    },
}