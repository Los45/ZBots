const { CommandInteraction, MessageEmbed } = require("discord.js");
const MysqlMerpati = require("../../Mysql");
const client = require("../../Merpati");
const { IntSucces, IntError } = require("../../Functions");

module.exports = {
    id: "button-reset",
    /**
     * @param {CommandInteraction} interaction
     */
    run: async (interaction) => {
        const userid = interaction.user.id;
                const msgEmbed = new MessageEmbed()
                    .setAuthor({ name: "Server | System Information", iconURL: client.config.ICON2 })
                    .setDescription(`Coming Soon`)
                    .setColor('RED')
                    .setImage(client.config.ICON_URL)
                    .setFooter({ text: "Bot Server" })
                    .setTimestamp();

                try {
                    await interaction.reply({ embeds: [msgEmbed], ephemeral: true });
                } catch (error) {
                    IntError(interaction, ":x: **ERROR**\nGagal mengirim pesan. Pastikan pengaturan privasi Anda memperbolehkan pesan dari server ini.");
                }

    },
};
