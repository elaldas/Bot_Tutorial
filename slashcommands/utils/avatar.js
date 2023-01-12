const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
	.setName("avatar")
	.setDescription("Mira el avatar de un usuario")
	.addUserOption(x => x.setName("usuario").setDescription("Menciona a un usuario").setRequired(true)),

	async run(client, interaction) {

		const user = interaction.options.getUser("usuario")

		const embed = new EmbedBuilder()
		.setColor("Green")
		.setTitle(`Avatar de ${interaction.user.username}`)
		.setImage(user.displayAvatarURL({ dynamic: true, size: 256 }))

		interaction.reply({ embeds: [embed] })
	}
}
