require("colors");
const Discord = require("discord.js");
const fs = require("fs");
const { Client, GatewayIntentBits, Partials, ActivityType, EmbedBuilder } = require("discord.js");
const client = new Client ({ intents: 3276799 });
const config = require("./config.json");

client.on("ready", async () => {

	const time = (200*5);

	let status = [
	[{
		name: "A pruebas",
		type: ActivityType.Playing
	}],
	[{
		name: "ELALDA",
		type: ActivityType.Watching
	}],
	[{
		name: "Con otros bots",
		type: ActivityType.Competing
	}]
	];
	setInterval(() => {
		function randomStatus() {
			let astatus = status[Math.floor(Math.random() * status.length)];
			client.user.setPresence({ activities: astatus, status: "idle" });
	}
	randomStatus();
   }, time)

	console.log(`Conectado como ${client.user.username}`.green)

});
////////////////////Hola
client.on("guildMemberAdd", (member) => {

	const embed = new EmbedBuilder()
	.setColor("Green")
	.setDescription(`Bienvenido/a usuario ${member.user.username} `)
	.addFields(
		{ name: "No olvides leer las reglas", value: "reglas: <#1045527000934268999>" },
		{ name: "No olvides ponerte un rol", value: "roles: <#1045527292132216912>"}
	)
	.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
	.setTimestamp()

	client.channels.cache.get("ID-CANAL").send({ embeds: [embed] })
});
////////////////////Adios
client.on("guildMemberRemove", (member) => {

	const embed = new EmbedBuilder()
	.setColor("Red")
	.setDescription(`Hasta pronto usuario ${member.user.username}, esperamo tu regreso`)
	.setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
	.setTimestamp()

	client.channels.cache.get("ID-CANAL").send({ embeds: [embed] })
});
////////////////////guildCreate
client.on("guildCreate", async (guild) => {

	const agregado = new EmbedBuilder()
	.setColor("Green")
	.setDescription("Fui agregado a un servidor")
	.addFields(
		{ name: "Nombre del Servidor", value: `${guild.name}` },
		{ name: "ID del servidor", value: `${guild.id}` },
		{ name: "Usuario del servidor", value: `${guild.memberCount}` },
		{ name: "Dueño del servidor", value: `${await (await guild.fetchOwner()).user.tag}` }
		)
	.setThumbnail(guild.iconURL())
	.setTimestamp()

	client.channels.cache.get("ID-CANAL").send({ embeds: [agregado] })
});
/////////////////guildDelete
client.on("guildDelete", async (guild) => {

	const agregado = new EmbedBuilder()
	.setColor("Red")
	.setDescription("Fui eliminado a un servidor")
	.addFields(
		{ name: "Nombre del Servidor", value: `${guild.name}` },
		{ name: "ID del servidor", value: `${guild.id}` },
		{ name: "Usuario del servidor", value: `${guild.memberCount}` },
		{ name: "Dueño del servidor", value: `${await (await guild.fetchOwner()).user.tag}` }
		)
	.setThumbnail(guild.iconURL())
	.setTimestamp()

	client.channels.cache.get("ID-CANAL").send({ embeds: [agregado] })
});
/////////////////messageCreate
let prefix = config.prefix;

client.on("messageCreate", async (message) => {

	if(!message.content.startsWith(prefix)) return;
	if(message.author.bot) return;
	
	if(message.content.startsWith(prefix + "ping")) {//nombre del comando
		message.channel.send("pong")//respuesta del comando
	}
	if(message.content.startsWith(prefix + "embed")) {//nombre del comando
		const embed = new EmbedBuilder()
		.setColor("White")
		.setDescription("embed de pruebas")
		message.channel.send({ embeds: [embed] })//respuesta del comando
	}
})
///////////////////SlashComands
client.slashcommand = new Discord.Collection()

fs.readdirSync("./slashcommands").forEach(async(categorys) => {
	const commandFilesSlash = fs.readdirSync(`./slashcommands/${categorys}`).filter((archivo) => archivo.endsWith("js"))
	for(const archivo of commandFilesSlash) {
		const command = require(`./slashcommands/${categorys}/${archivo}`)
		client.slashcommand.set(command.data.name, command)
	}
})

require("./slashcommands")

client.on("interactionCreate", async(interaction) => {
	if(interaction.isCommand()) {
		const cmd = client.slashcommand.get(interaction.commandName)
		if(!cmd) return;
		await cmd.run(client, interaction)
	}
});
//////////////////////////////////tickets

client.on("interactionCreate", async (interaction) => {
	if(interaction.isButton()) {
		if(interaction.customId === "crear") {

			const { EmbedBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionsBitField, ActionRowBuilder } = require("discord.js")

			const everyone = interaction.guild.roles.cache.find(x => x.name === "@everyone")

			let canalname = "Tickets"

			let ticket = interaction.guild.channels.cache.filter(channel => channel.name === `${canalname}`)

			interaction.guild.channels.create({
				name: canalname,
				type: ChannelType.GuildText,
				permissionsOverwrites: [
				{
					id: interaction.user.id,
					allow: [PermissionsBitField.Flags.ViewChannel]
				},
				{
					id: everyone.id,
					deny: [PermissionsBitField.Flags.ViewChannel]
				}
				]
			}).then(channel => {
				const embed = new EmbedBuilder()
				.setTitle("Ticket habierto")
				.setDescription("Bienvenido a tu ticket espera a el staff")
				.setColor("White")

				const boton = new ButtonBuilder()
				.setCustomId("cerrar")
				.setStyle(ButtonStyle.Danger)
				.setLabel("Cerrar Ticket")
				.setEmoji("🗑")

				const row = new ActionRowBuilder()
				.addComponents(boton)

				channel.send({ embeds: [embed], components: [row]});
			});
			interaction.reply({ content: "Ticket creado", ephemeral: true })
		};
		if(interaction.customId === "cerrar"){
			return interaction.reply({ content: "Tu ticket se borrara en 5s/segundos" })
			&& setTimeout(() => {
				interaction.channel.delete(`${interaction.channels}`)
			}, 5000)
		}
	}
})

////////////////////////////////////
client.login(config.token);
