const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
	.setName("create-ticket")//nombre del comando
	.setDescription("Crea un sistema de ticket")//descripcion del comando
	.addChannelOption(x => x .setName("canal").setDescription("Menciona un canal").setRequired(true)),//mencion de un canal

		async run(client, interaction) {

			const canal = interaction.options.getChannel("canal")

			const embed = new EmbedBuilder()
			.setTitle("Tickets")
			.setColor("Green")
			.setDescription("Preciona el boton para habrir un ticket")


			const boton = new ButtonBuilder()
			.setCustomId("crear")
			.setStyle(ButtonStyle.Success)
			.setLabel("ticket")
			.setEmoji("📩")

			const row = new ActionRowBuilder()
			.addComponents(boton)

			interaction.reply({ content: "✅ Ticket enviado correctamente", ephemeral: true })

			canal.send({ embeds: [embed], components: [row] })

		},
};