const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
	.setName("say")//Nombre del comando
	.setDescription("Has decir un mensaje al bot")//Descripcion del comando
	.addStringOption(x => x.setName("texto").setDescription("Pon la palabara que dira el bot").setRequired(true)),//Opcion de texto

	async run(client, interaction) {

		const palabra = interaction.options.getString("texto")

		const canal = interaction.channel

		const embed = new EmbedBuilder()
		.setColor("Green")
		.setDescription(`${palabra}`)

		interaction.reply({ content: `Mensaje enviado`, ephemeral: true })

		canal.send({ embeds: [embed] })
	}
}
