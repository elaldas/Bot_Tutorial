const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
	.setName("kill")
	.setDescription("Mataste a un usuario")
	.addUserOption(x => x.setName("usuario").setDescription("Menciona a un usuario a matar").setRequired(true)),

	async run(client, interaction) {

		let user = interaction.options.getUser("usuario")

		let embed = new EmbedBuilder()
		.setDescription(`${interaction.user} Mataste a ${user}`)
		.setColor("Red")
		.setImage("https://media.giphy.com/media/yNFjQR6zKOGmk/giphy.gif")

		interaction.reply({ embeds: [embed] })
	}
}