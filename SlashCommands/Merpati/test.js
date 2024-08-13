const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const samp = require("samp-query");

module.exports = {
    data: {
        name: "monitor",
        description: "Menampilkan Monitor Server"
    },

    /**
     *
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        interaction.reply("hi")
    },
};
