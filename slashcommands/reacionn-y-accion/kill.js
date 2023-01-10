const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
	.setName("kill")//Nombre del comando
	.setDescription("Mataste a un usuario")//Descripcion del comando
	.addUserOption(x => x.setName("usuario").setDescription("Menciona a un usuario a matar").setRequired(true)),//Opcion del usuario

	async run(client, interaction) {

		let user = interaction.options.getUser("usuario")

		let embed = new EmbedBuilder()
		.setDescription(`${interaction.user} Mataste a ${user}`)
		.setColor("Red")
		.setImage("https://media.giphy.com/media/yNFjQR6zKOGmk/giphy.gif")

		interaction.reply({ embeds: [embed] })
	}
}
