const Discord = require("discord.js");
const {EmbedBuilder} = require("discord.js");
const config = require('./config.json');
const express = require('express')();
const {google} = require('googleapis');

const app = express;
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    'MESSAGE',
    'CHANNEL',
    'REACTIONS'
  ]
})

let value = [];
let discordValue = {};
let chars = ['gas 30 dollars', 'add budget 60'];
// let dictionary = ['Adventurer Ras, Alencia, Apocalypse Ravi, Choux, Rimuru, Spirit Eye Celine, Archdemons Shadow, Belian, Rem, Remnant Violet, Maid Chloe, Hwayoung, Edward Elric, Arbiter Vildred, Cidd, Ran, Peira, Summertime Iseria, Kawerik, Mercedes, Closer Charles, Eda, Pavel, Landy, Lilias, Senya, Sylvian Sage Vivian, Conqueror Lilias, Celine, Fallen Cecilia, Violet, Holiday Yufine, Krau, Ruele of Light, Specter of Tenebria, Mort, Kise, Judge Kise, Operator Sigret, Kayron, Aria, Troublemaker Crozet, Ravi, Fairytale Tenebria'];

app.get("/", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
  });

  //Create client instance for auth

  const clients = await auth.getClient();

  //Instance of Google Sheets API

  const googleSheets = google.sheets({version: "v4", auth: clients });

  const spreadsheetId = "1kj5iar2zGgF9r-OjDCHtRGwvL5tAWBeyw8HG08S7rZQ";

  //Get metadata about spreadsheet

  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId
  });

  const getRows = await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A:B",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: value
    }
  })

  const readData = await googleSheets.spreadsheets.values.get({
    auth, //auth object
    spreadsheetId, // spreadsheet id
    range: "Sheet1!A:C", //range of cells to read from.
})

  //send the data with the response
  let sheetsData = readData.data.values.values();
  for (let x of sheetsData) {
    discordValue.data1 = x[0];
    discordValue.data2 = x[1];
    discordValue.data3 = x[2];
  };
  console.log(discordValue.data1);

  res.send('submitted');
})


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('messageCreate', (message) => {
  let stringedObj = JSON.stringify(discordValue);
  console.log(discordValue.data1);
  const embed = new EmbedBuilder().setTitle('Budget Information').setDescription('Stephens expensive budget for his girlfriend').setTimestamp().setThumbnail('https://upload.wikimedia.org/wikipedia/commons/f/f9/Money_Cash.jpg').addFields(
		{ name: `${discordValue.data1}`, value: `${discordValue.data3}`, inline: true},
		{ name: `${JSON.stringify(discordValue)}`, value: `${JSON.stringify(discordValue)}`, inline: true },
		{ name: `${JSON.stringify(discordValue)}`, value: `${JSON.stringify(discordValue)}`, inline: true },
	);

  for (let i=0;i<chars.length;i++) {
    if (message.content === chars[i]) {
      message.channel.send({embeds: [embed]});
      let splitMsg = message.content.split(' ')
      value.push(splitMsg);
    }
  }

});

client.login(config.token);

app.listen(1000, (req, res) => {
  console.log("running on 1000");
})