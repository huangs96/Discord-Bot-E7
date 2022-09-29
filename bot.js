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

let discordValue = {};
let chars = ['gas 20 30', 'girlfriend 3000 3200'];
// let dictionary = ['Adventurer Ras, Alencia, Apocalypse Ravi, Choux, Rimuru, Spirit Eye Celine, Archdemons Shadow, Belian, Rem, Remnant Violet, Maid Chloe, Hwayoung, Edward Elric, Arbiter Vildred, Cidd, Ran, Peira, Summertime Iseria, Kawerik, Mercedes, Closer Charles, Eda, Pavel, Landy, Lilias, Senya, Sylvian Sage Vivian, Conqueror Lilias, Celine, Fallen Cecilia, Violet, Holiday Yufine, Krau, Ruele of Light, Specter of Tenebria, Mort, Kise, Judge Kise, Operator Sigret, Kayron, Aria, Troublemaker Crozet, Ravi, Fairytale Tenebria'];


  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
  });

  //Create client instance for auth

  const clients = auth.getClient();

  //Instance of Google Sheets API

  const googleSheets = google.sheets({version: "v4", auth: clients });

  
  const spreadsheetId = "1kj5iar2zGgF9r-OjDCHtRGwvL5tAWBeyw8HG08S7rZQ";
  
  
  //Get metadata about spreadsheet

//   const metaData = googleSheets.spreadsheets.get({
//     auth,
//     spreadsheetId
//   });


//   const getRows = googleSheets.spreadsheets.values.append({
//     auth,
//     spreadsheetId,
//     range: "Sheet1!A1:B8",
//     valueInputOption: "USER_ENTERED",
//     resource: {
//       values: value
//     }
//   })

//   const readData = googleSheets.spreadsheets.values.get({
//     auth, //auth object
//     spreadsheetId, // spreadsheet id
//     range: "Sheet1!A:C", //range of cells to read from.
// }) 

//   console.log(readData);

  //send the data with the response




client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})


// need to use async/await to retrieve username
client.on('messageCreate', async (message) => {

  if (message.author.bot) return;

  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId
  });

  const readData = await googleSheets.spreadsheets.values.get({
    auth, //auth object
    spreadsheetId, // spreadsheet id
    range: "Sheet1!A:C", //range of cells to read from.
  });
  

  let arr = [];
  const premessage = message.content.split(' ');
  arr.push(premessage);
  console.log('arr------', arr);
  
  
  const getRows = googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A1:B3",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: arr
    }
  });

  let dev = 'user';
  
  const embed = new EmbedBuilder().setTitle('Budget Information').setDescription('Stephens expensive budget with pretax and total aftertax').setTimestamp().setThumbnail('https://upload.wikimedia.org/wikipedia/commons/f/f9/Money_Cash.jpg').addFields(
  { name: 'Expense', value: `${discordValue.data1}`, inline: true},
    { name: 'Pre-tax', value: `${discordValue.data2}`, inline: true },
    { name: 'Total', value: `${discordValue.data3}`, inline: true },
  ).setFooter({
    text: `Command Requested by: ${dev}`,
    iconURL: message.author.displayAvatarURL(),
  });

  let sheetsData = readData.data.values.values();

    for (let x of sheetsData) {
      console.log('x---------', x);
      discordValue.data1 = x[0];
      discordValue.data2 = x[1];
      discordValue.data3 = x[2];
    };


    console.log('embed', embed.build());

    message.channel.send({embeds: [embed]});


});

client.login(config.token);