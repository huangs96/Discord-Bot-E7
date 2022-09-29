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
let arr1 = ['gas', '30', '40', 'girlfriend', '300', '400','600', '1000'];
const setDict = new Set ();
for (item of arr1) {
  setDict.add(item);
};

console.log(setDict);

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

  let m = message.content.split('-');
  console.log(m.length);
  let f = m.map(x => {
    return x;
  })
  console.log(f);

  console.log(setDict.has(f[0]) && setDict.has(f[1]) && setDict.has(f[2]));

  

if (setDict.has(f[0]) && setDict.has(f[1]) && setDict.has(f[2])) {

  let arr = [];
  const premessage = message.content.split('-');
  arr.push(premessage);

  const getRows = googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A1:B3",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: arr
    }
  });

  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId
  });

  const readData = await googleSheets.spreadsheets.values.get({
    auth, //auth object
    spreadsheetId, // spreadsheet id
    range: "Sheet1!A:C", //range of cells to read from.
  });

  let sheetsData = readData.data.values.values();
  for (let x of sheetsData) {
    discordValue.data1 = x[0];
    discordValue.data2 = x[1];
    discordValue.data3 = x[2];
  };
  let dev = 'user';

  const embed = new EmbedBuilder().setTitle('Budget Information').setDescription('Stephens expensive budget with pretax and total aftertax').setTimestamp().setThumbnail('https://upload.wikimedia.org/wikipedia/commons/f/f9/Money_Cash.jpg').addFields(
    { name: 'Expense', value: `${discordValue.data1}`, inline: true},
      { name: 'Pre-tax', value: `${discordValue.data2}`, inline: true },
      { name: 'Total', value: `${discordValue.data3}`, inline: true },
    ).setFooter({
      text: `Command Requested by: ${dev}`,
      iconURL: message.author.displayAvatarURL(),
    });

  message.channel.send({embeds: [embed]});
} else if (m.length === 3) {
  message.channel.send('No Budget Added');
};


});

client.login(config.token);