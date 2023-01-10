const { SlashCommandBuilder, EmbedBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
	.setName("confesion")
	.setDescription("Envia una confesion a este servidor")
	.addStringOption(x => x.setName("confesion").setDescription("Escribe tu confesion").setRequired(true)),

	async run(client, interaction) {

		const confe = interaction.options.getString("confesion")

		const embed = new EmbedBuilder()
		.setColor("Green")
		.setTitle("Nueva confesion para el servidor")
		.setDescription(`${confe}`)
		.setTimestamp()
		.setFooter({ text: `confesion hecha en el servidor ${interaction.guild.name}` })

		interaction.reply({ content: "confesion enviada con exito", ephemeral: true })

		client.channels.cache.get("1062393170555576330").send({ embeds: [embed] });
	}
}