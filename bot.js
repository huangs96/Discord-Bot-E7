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
let chars = ['Adventurer Ras', 'Alencia', 'Apocalypse Ravi', 'Choux', 'Rimuru', 'Spirit Eye Celine', 'Archdemons Shadow', 'Belian', 'Rem', 'Remnant', 'Violet', 'Maid Chloe', 'Hwayoung', 'Edward Elric', 'Arbiter Vildred', 'Cidd', 'Ran', 'Peira', 'Summertime', 'Iseria', 'Kawerik', 'Mercedes', 'Closer Charles', 'Eda', 'Pavel', 'Landy', 'Lilias', 'Senya', 'Sylvian Sage Vivian', 'Conqueror Lilias', 'Celine', 'Fallen Cecilia', 'Violet', 'Holiday Yufine', 'Krau', 'Ruele of Light', 'Specter of Tenebria', 'Mort', 'Kise', 'Judge Kise', 'Operator Sigret', 'Kayron', 'Aria', 'Troublemaker Crozet', 'Ravi','Fairytale Tenebria'];

// setting dictionary/object for chars array to match with user input
const setDict = new Set ();
for (item of chars) {
  let finalItem = item.toLowerCase();
  setDict.add(finalItem);
};

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
  });

  //Create client instance for auth

  const clients = auth.getClient();

  //Instance of Google Sheets API

  const googleSheets = google.sheets({version: "v4", auth: clients });

  
  const spreadsheetId = "1c6TyHAnRHY0o4r823RFtTzkZDdU9aGx1bBAGZZibn-U";


// bot is ready 

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})


// using message parameter in messageCreate to receive discord messages
client.on('messageCreate', async (message) => {

  if (message.author.bot) return;

  let n = message.content.split('-');
  const m = n.map(o => {
    return o.toLowerCase();
  });
  let f = m.map(x => {
    return x;
  });

  // if (m.every(setDict.has)) {
  //   m + '1';
  //   console.log(m);
  // }

  

if (setDict.has(f[0]) && setDict.has(f[1]) && setDict.has(f[2])) {

  let arr = [];
  const premessage = message.content.split('-');
  arr.push(premessage);

  // add values into cells
  const getRows = googleSheets.spreadsheets.values.update({
    auth,
    spreadsheetId,
    range: "Comp Search!B6:D6",
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
    range: "Comp Search!B9:P18", //range of cells to read from.
  });

  

  let sheetsData = readData.data.values;
  console.log('sheetsData----', sheetsData);
  let finalArr = [];
  for(let i = 0; i < sheetsData.length; i++) {
    finalArr = finalArr.concat(sheetsData[i]);
    }
  console.log('finalArr--------', finalArr);

  discordValue.reco = [finalArr[5],' ' + finalArr[6], ' ' + finalArr[7]];
  discordValue.alt1 = [finalArr[9],' ' + finalArr[10], ' ' + finalArr[11]];
  discordValue.alt2 = [finalArr[13],' ' + finalArr[14], ' ' + finalArr[15]];
  discordValue.alt3 = [finalArr[18],' ' + finalArr[19], ' ' + finalArr[20]];
  discordValue.notesR = [finalArr[48]];
  discordValue.notesAlt1 = [finalArr[52]];
  discordValue.notesAlt2 = [finalArr[56]];
  discordValue.notesAlt3 = [finalArr[0]];
  console.log('discordValue----------', discordValue);


  let dev = message.member.user.tag;

  const embed = new EmbedBuilder().setTitle('Enemy Defense' + ':' + ' ' + 'Lillias/Choux/Senya').setDescription('The offense below is safer than condom with a man').setTimestamp().setThumbnail('https://qtoptens.com/wp-content/uploads/2021/08/Celestial_Mercedes.png.webp').addFields(
    { name: 'Recommended Offense', value: `${discordValue.reco}`, inline: true},
      { name: 'Alternative 1', value: `${discordValue.alt1}`, inline: false },
      { name: 'Alternative 2', value: `${discordValue.alt2}`, inline: false },
      // { name: 'Alternative 3', value: `${discordValue.alt3}`, inline: false },
      { name: 'Notes: Recommended', value: `${discordValue.notesR}`, inline: false },
      { name: 'Notes: Alternative 1', value: `${discordValue.notesAlt1}`, inline: false },
      // { name: 'Notes: Alternative 2', value: `${discordValue.notesAlt2}`, inline: false },
      // { name: 'Notes: Alternative 3', value: `${discordValue.notesAlt3}`, inline: false },
      { name: 'Artifacts', value: `${discordValue.reco}`, inline: false },
    ).setFooter({
      text: `Command Requested by: ${dev}`,
      iconURL: message.author.displayAvatarURL(),
    });

  message.channel.send({embeds: [embed]});
} else if (m.length === 3) {
  message.channel.send('No Build Available');
};


});

client.login(config.token);