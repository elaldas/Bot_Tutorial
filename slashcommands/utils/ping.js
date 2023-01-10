const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
	.setName("ping")//nombre del comando
	.setDescription("Latencia de putin"),//descripcion del comando

	async run(client, interaction){

		let embed = new EmbedBuilder()
		.setColor("White")
		.setDescription(`!pong: ${client.ws.ping}ms`)

		interaction.reply({ embeds: [embed] })
	}
}