const { Client, CommandInteraction } = require("discord.js");
const MysqlMerpati = require("../../Mysql");
require("../../Functions")

module.exports = {
    name: "removeucp",
    description: "Untuk menghapus akun ucp server Server!",
    type: "",
    options: [
        {
            name: "ucp-account",
            description: "Nama akun UCP yang akan dihapus!",
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
        if(!interaction.member.permissions.has("ADMINISTRATOR")) return IntPerms(interaction);
        const ucpName = interaction.options.getString("ucp-account");

        MysqlMerpati.query(`SELECT * FROM ucp WHERE username = '${ucpName}'`, async(err, row) => {
            if(row[0])
            {
                IntAdmin(interaction, `Akun User Control Panel dengan Nama **${ucpName}** Telah berhasil di hapus oleh Admin **<@${interaction.user.id}>**`)
                await MysqlMerpati.query(`DELETE FROM ucp WHERE username = '${ucpName}'`);   
            }
            else {
                IntAdmin(interaction, "Akun dengan User Control Panel tersebut tidak ditemukan!")
            }
        })
    },
};
