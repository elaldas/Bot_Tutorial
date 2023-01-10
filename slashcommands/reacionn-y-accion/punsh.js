const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
	.setName("punsh")//Nombre del comando
	.setDescription("Golpeaste a un usuario")//Descripcion del comando
	.addUserOption(x => x.setName("usuario").setDescription("Menciona a un usuario a golpear").setRequired(true)),//Opcion del usuario

	async run(client, interaction) {

		let user = interaction.options.getUser("usuario")

		let embed = new EmbedBuilder()
		.setDescription(`${interaction.user} golpeaste a ${user}`)
		.setColor("Red")
		.setImage("https://media.giphy.com/media/l1J3G5lf06vi58EIE/giphy.gif")

		interaction.reply({ embeds: [embed] })
	}
}
