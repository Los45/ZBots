const { CommandInteraction, MessageEmbed, WebhookClient } = require("discord.js")
const { Modal } = require("discord-modals");
const MysqlMerpati = require("../Mysql")
const MySQL = require("../Events/ready");
const client = require("../Merpati");
require("../Functions")

module.exports = {
    id: "modal-register",
    /**
     * @param {CommandInteraction} interaction
     */
    run: async (interaction) => {
        const userid = interaction.user.id;
        const currentDate = new Date();
        const inputName = interaction.fields.getTextInputValue('reg-name');
        var randCode = Math.floor(Math.random() * 99999) + 1;

        if(inputName.includes("_") === true) return IntError(interaction, "Nama akun Tidak boleh disertai dengan Simbol \"_\"");
        if(inputName.includes(" ") === true) return IntError(interaction, "Nama akun Tidak boleh disertai dengan Spasi")
        if(!/^[a-z]+$/i.test(inputName)) return IntError(interaction, "Nama akun Tidak boleh disertai dengan simbol ataupun angka!")
    
        MysqlMerpati.query(`SELECT * FROM playerucp WHERE ucp = '${inputName}'`, async(err, row) =>{
            if(row.length < 1) {
                await MysqlMerpati.query(`INSERT INTO playerucp SET ucp = '${inputName}', discordid = '${userid}', verifycode = '${randCode}'`);
                const msgEmbed = new MessageEmbed()
                .setTitle("Cleveland | System Information")
                .setDescription(`- :white_check_mark: **Succes**\n\n> Akun Kamu Berhasil Terdaftar Kedalam Server\n> Harap Screenshot Atau Salin Informasi Ini\n\n> Jangan Berikan Informasi Ini Kepada Siapapun\n> **Username : ${inputName}**\n> **Code :** ||${randCode}||`)
                .setColor('RED')
                .setAuthor({ name:"Cleveland Roleplay", iconURL:client.config.ICON2 })
                .setFooter({ text:"Cleveland | Handler" })
                .setImage(client.config.ICON_URL)
                .setTimestamp();
                await interaction.user.send({ embeds:[msgEmbed] }).catch(error => {
                    // interaction.reply({ content:"```\nTidak dapat mengirimkan kode/pin Verifikasi akun ucp anda, Silahkan gunakan command /resendcode jika sudah melakukan intruksi di bawah ini:\n- INTRUKSI OPEN DIRECT MESSAGE -\n• Tips Pertama, Kamu Pergi Ke Pengaturan Discord\n• Tips Ke Dua, Pilih Privacy & Safety\n• Tips Ke Tiga, Pilih Do Not Scan\n```", ephemeral: true });
                    const Error = new MessageEmbed()
                    .setAuthor({ name: "Cleveland Roleplay", iconURL: client.config.ICON2 })
                    .setTitle('Cleveland | System Information')
                    .setDescription(`Tidak Dapat Mengirimkan Detail Akun Kamu, Gunakan Tombol CheckUCP Jika Sudah Melakukan Instruksi Dibawah Ini :\n\n- Open Direct Message\n\n> 1. Pergi Ke Pengaturan Discord\n> 2. Pilih Privacy & Safety\n> 3. Pilih Do Not Scan\n`)
                    .setColor('RED')
                    .setFooter({ text: "Cleveland | Handler" })
                    .setImage(client.config.ICON_URL)
                    .setTimestamp();
    
                    interaction.reply({ embeds: [Error], ephemeral: true });
                })

                console.log(`\x1b[36m[BOT]: \x1b[0mUser \x1b[36m(${interaction.user.tag}) \x1b[0mTelah Berhasil mendaftarkan akun UCP nya dengan Nama \x1b[36m(${inputName}) \x1b[0mDan Pin \x1b[36m(${randCode})`)

                const embed = new MessageEmbed()
                .setTitle("cleveland | System Information")
                .setDescription(`- :white_check_mark: **Succes**\n\n> Akun Kamu Berhasil Terdaftar Kedalam Server\n> Silahkan Buka Direct Message Dari BOT.`)
                .setColor('RED')
                .setAuthor({ name:"Cleveland Roleplay", iconURL:client.config.ICON2 })
                .setFooter({ text:"Cleveland | Handler" })
                .setImage(client.config.ICON_URL)
                .setTimestamp();

            interaction.reply({ embeds: [embed], ephemeral: true });
                const rUCP = interaction.guild.roles.cache.get(client.config.ROLE_UCP);
                    interaction.member.roles.add(rUCP);
                    interaction.member.setNickname(`Warga | ${inputName}`);
            }
            else return IntError(interaction, "Maaf nama akun yang anda input telah terdaftar, Silahkan mencoba nama akun yang lain!");
        })
    }
}