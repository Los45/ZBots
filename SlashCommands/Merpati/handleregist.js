const { Client, CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "handleregist",
    description: "Menampilkan Panel Register Server",
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        const msgEmbed = new MessageEmbed()
        .setAuthor({ name:"Cleveland Roleplay", iconURL:client.config.ICON2 })
        // .setColor("#000000")
        .setTitle('User Control Panel')
        .setDescription("Halo Citizen, User Control Panel Ini Berfungsi Untuk Mengatur Akun Anda\nSeperti Membuat Akun, Mengecek Akun, Dll\nHarap Membaca Dan Mematuhi Rules Yang Berlaku\n\n> **Fungsi Tombol**\n\n- 🗒️ Register\n> Tombol Untuk Mendaftarkan Akun Anda Kedalam Server\n> Pendaftaran Hanya Dapat Dilakukan 1 Kali Per Orang\n> Gunakanlah Password Yang Kuat Agar Tidak Terjadi Pembobolan\n\n- 📍 Check UCP\n> Tombol Ini Untuk Melihat Detail Dari Akun UCP Yang Kamu Daftarkan\n\n- 🎭 Take Role\n> Tombol Ini Untuk Memberikan Kamu Role <@&1036682811916161078>\n> Ini Memberikan Kamu Akses Untuk Melihat Semua Channel Yang Ada\n> Dan Akses Sosial Di Server Ini Seperti Chatting, Dll")
        .setFooter({ text:"Cleveland | Handler" })
        .setImage(client.config.ICON_URL)
        .setThumbnail(client.config.ICON2)
        .setColor('BLUE')
        .setTimestamp()

        const Buttons = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId("button-register")
            .setLabel("Register")
            .setStyle("PRIMARY")
            .setEmoji("🗒️"),

            new MessageButton()
            .setCustomId("button-resendcode")
            .setLabel("Check UCP")
            .setStyle("PRIMARY")
            .setEmoji("📍"),

            
            // new MessageButton()
            // .setCustomId("button-reset")
            // .setLabel("Change Password")
            // .setStyle("DANGER")
            // .setEmoji("🔐"),

            new MessageButton()
            .setCustomId("button-reffrole")
            .setLabel("Take Role")
            .setStyle("SECONDARY")
            .setEmoji("🎭")

        )

        interaction.reply({  embeds: [msgEmbed], components: [Buttons] })
    },
};
