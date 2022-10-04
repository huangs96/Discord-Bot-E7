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

let chars = ['Adventurer Ras', 'Alencia', 'Apocalypse Ravi', 'Choux', 'Rimuru', 'Spirit Eye Celine', 'Archdemons Shadow', 'Belian', 'Rem', 'Remnant', 'Violet', 'Maid Chloe', 'Hwayoung', 'Edward Elric', 'Arbiter Vildred', 'Cidd', 'Ran', 'Peira', 'Summertime', 'Iseria', 'Kawerik', 'Mercedes', 'Closer Charles', 'Eda', 'Pavel', 'Landy', 'Lilias', 'Senya', 'Sylvian Sage Vivian', 'Conqueror Lilias', 'Celine', 'Fallen Cecilia', 'Violet', 'Holiday Yufine', 'Krau', 'Ruele of Light', 'Specter of Tenebria', 'Mort', 'Kise', 'Judge Kise', 'Operator Sigret', 'Kayron', 'Aria', 'Troublemaker Crozet', 'Ravi','Fairytale Tenebria', 'Apo'];

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

  // breaking down discord message to send to google sheets
  let arr = [];
  const premessage = message.content.split('-');
  arr.push(premessage);

  // capitalizing first letter and spacing format for consistent embed title
  const embedTitle = premessage.map(x => {
    return ' ' + x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();   
  })

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
    range: "Comp Search!B9:L18", //range of cells to read from.
  });

  // reading data in certain cells, pushing values in array, referencing 2d array for object/dictionary for consistent reference

  let sheetsData = readData.data.values;
  let finalArr = [];
  let dataObj = {};

  sheetsData.map((x) => {
    finalArr.push(x);
  });

  console.log('map1-------', finalArr);

  dataObj.units = finalArr[2];
  dataObj.artifacts = finalArr[5];
  dataObj.notes = finalArr[9];

  console.log('data------', dataObj);
  console.log('datalength------', dataObj.units.length);


  // if google sheets does not populate data, return

  // if (finalArr.includes('#N/A')) {
  //   message.channel.send('No build data available for this team');
  //   return;
  // }

    // ** variables for cell positions on Google Sheet

    // recommended

  const recommendedBuild = dataObj.units[0] + ',' + ' ' + dataObj.units[1] + ',' + ' ' + dataObj.units[2];

  const recommendedArtifacts = dataObj.artifacts[0] + ',' + ' ' + dataObj.artifacts[1] + ',' + ' ' + dataObj.artifacts[2];

  const recommendedNotes = dataObj.notes[0];


    // // alternate1

    const alternativeBuild1 = dataObj.units.length >= 7 ? dataObj.units[4] + ',' + ' ' + dataObj.units[5] + ',' + ' ' + dataObj.units[6] : 'No Data';

    const alternativeArtifacts1 = dataObj.artifacts.length >= 7 ? dataObj.artifacts[4] + ',' + ' ' + dataObj.artifacts[5] + ',' + ' ' + dataObj.artifacts[6] : 'No Data';

    const alternativeNotes1 =  dataObj.notes.length >= 5 ? dataObj.notes[4] : 'No Data';


    // //alternate2

    const alternativeBuild2 = dataObj.units.length >= 11 ? dataObj.units[8] + ',' + ' ' + dataObj.units[9] + ',' + ' ' + dataObj.units[10] : 'No Data';
    
    const alternativeArtifacts2 = dataObj.artifacts.length >= 11 ? dataObj.artifacts[4] + ',' + ' ' + dataObj.artifacts[5] + ',' + ' ' + dataObj.artifacts[6] : 'No Data';

    const alternativeNotes2 = dataObj.notes.length >= 9 ? dataObj.notes[8] : 'No Data';

    //---------------------------------------------
    // //alternate3

    // const alternativebuild3 = message || message !== undefined || message !== '' ? [finalArr[17],' ' + finalArr[18], ' ' + finalArr[19]] : 'No Data';

    // const alternativeNotes3 = message || message !== undefined || message !== '' ? [finalArr[0]] : 'No Data';

    // const alternativeArtifacts3 = message || message !== undefined || message !== '' ? [finalArr[20],' ' + finalArr[21], ' ' + finalArr[22]] : 'No Data';

    // //alternate4

    // const alternativebuild4 = message || message !== undefined || message !== '' ? [finalArr[17],' ' + finalArr[18], ' ' + finalArr[19]] : 'No Data';

    // const alternativeNotes4 = message || message !== undefined || message !== '' ? [finalArr[0]] : 'No Data';

    // const alternativeArtifacts4 = message || message !== undefined || message !== '' ? [finalArr[20],' ' + finalArr[21], ' ' + finalArr[22]] : 'No Data';

    // //alternate5

    // const alternativebuild5 = message || message !== undefined || message !== '' ? [finalArr[17],' ' + finalArr[18], ' ' + finalArr[19]] : 'No Data';

    // const alternativeNotes5 = message || message !== undefined || message !== '' ? [finalArr[0]] : 'No Data';

    // const alternativeArtifacts5 = message || message !== undefined || message !== '' ? [finalArr[20],' ' + finalArr[21], ' ' + finalArr[22]] : 'No Data';



    //getting username tag for embed
    let dev = message.member.user.tag;

    const embed = new EmbedBuilder().setTitle('Enemy Defense' + ':' + embedTitle).setDescription('The offense below is safer than condom with a man').setTimestamp().setThumbnail('https://qtoptens.com/wp-content/uploads/2021/08/Celestial_Mercedes.png.webp').addFields(
      //recommended
      { name: 'Recommended Offense', value: `${recommendedBuild}`, inline: true},
      { name: 'Recommended Artifacts', value: `${recommendedArtifacts}`, inline: false },
      { name: 'Notes: Recommended', value: `${recommendedNotes}`, inline: false },
      //alternate1
      { name: 'Alternative 1 Offense', value: `${alternativeBuild1}`, inline: false },
      { name: 'Alternate1 Artifacts', value: `${alternativeArtifacts1}`, inline: false },
      { name: 'Notes: Alternative 1', value: `${alternativeNotes1}`, inline: false },
      // //alternate2
      { name: 'Alternative 2 Offense', value: `${alternativeBuild2}`, inline: false },
      { name: 'Alternate2 Artifacts', value: `${alternativeArtifacts2}`, inline: false },
      { name: 'Notes: Alternative 2', value: `${alternativeNotes2}`, inline: false },
      //alternate3
      // { name: 'Alternative 3 Offense', value: `${alternativebuild3}`, inline: false },
      // { name: 'Notes: Alternative 3', value: `${alternativeNotes3}`, inline: false },
      // { name: 'Alternate3 Artifacts', value: `${alternativeArtifacts3}`, inline: false },
      // //alternate4
      // { name: 'Alternative 4 Offense', value: `${alternativebuild4}`, inline: false },
      // { name: 'Notes: Alternative 4', value: `${alternativeNotes4}`, inline: false },
      // { name: 'Alternate4 Artifacts', value: `${alternativeArtifacts4}`, inline: false },
      // //alternate5
      // { name: 'Alternative 5 Offense', value: `${alternativebuild5}`, inline: false },
      // { name: 'Notes: Alternative 5', value: `${alternativeNotes5}`, inline: false },
      // { name: 'Alternate5 Artifacts', value: `${alternativeArtifacts5}`, inline: false },
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