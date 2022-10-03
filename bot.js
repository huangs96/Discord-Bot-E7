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
    range: "Comp Search!B9:L18", //range of cells to read from.
  });

  // reading data in certain cells, putting data into array

  let sheetsData = readData.data.values;
  console.log('sheetsData----', sheetsData);
  let finalArr = [];
  for(let i = 0; i < sheetsData.length; i++) {
    finalArr = finalArr.concat(sheetsData[i]);
    }
  console.log('finalArr--------', finalArr);
  console.log('arraylength------', finalArr.length);

  if (finalArr.length < 45) {
    let finalLength = 45 - finalArr.length;
    const noData = 'No Data;';
    let multiData = noData.repeat(finalLength);
    console.log('multiData-----', multiData);
    const separStr = multiData.split(';');
    console.log('separStr------', separStr);
    for (let x=0;x<separStr.length;x++) {
      console.log(separStr.indexOf(' '));
      separStr.splice(separStr.length, 1, 'No Data');
      finalArr.push(separStr);
    }
    console.log('lesslength-----', finalArr);
  }


  // if google sheets does not populate data, return

  if (finalArr.includes('#N/A')) {
    message.channel.send('No build data available for this team');
    return;
  }

    // variables for cell positions on Google Sheet

    // recommended  

    const recommendedBuild = message || message != undefined || message !== '' ? [finalArr[5],' ' + finalArr[6], ' ' + finalArr[7]] : 'No Information Available';

    const recommendedNotes = message || message !== undefined || message !== '' ? [finalArr[36]] : 'No Information Available';

    const recommendedArtifacts = message || message !== undefined || message !== '' ? [finalArr[16],' ' + finalArr[17], ' ' + finalArr[18]] : 'No Information Available';

    // alternate1

    const alternativebuild1 = message || message != undefined || message !== '' || message === undefined ? [finalArr[9],' ' + finalArr[10], ' ' + finalArr[11]] : 'No Information Available';

    const alternativeNotes1 = message || message !== undefined || message !== '' ? [finalArr[40]] : 'No Information Available';

    const alternativeArtifacts1 = message || message !== undefined || message !== '' ? [finalArr[20],' ' + finalArr[21], ' ' + finalArr[22]] : 'No Information Available';

    //alternate2

    const alternativebuild2 = message || message !== undefined || message !== '' ? [finalArr[13],' ' + finalArr[14], ' ' + finalArr[15]] : 'No Information Available';

    const alternativeNotes2 = message || message !== undefined || message !== '' ? [finalArr[44]] : 'No Information Available';

    const alternativeArtifacts2 = message || message !== undefined || message !== '' ? [finalArr[24],' ' + finalArr[25], ' ' + finalArr[26]] : 'No Information Available';

    // //alternate3

    // const alternativebuild3 = message || message !== undefined || message !== '' ? [finalArr[17],' ' + finalArr[18], ' ' + finalArr[19]] : 'No Information Available';

    // const alternativeNotes3 = message || message !== undefined || message !== '' ? [finalArr[0]] : 'No Information Available';

    // const alternativeArtifacts3 = message || message !== undefined || message !== '' ? [finalArr[20],' ' + finalArr[21], ' ' + finalArr[22]] : 'No Information Available';

    // //alternate4

    // const alternativebuild4 = message || message !== undefined || message !== '' ? [finalArr[17],' ' + finalArr[18], ' ' + finalArr[19]] : 'No Information Available';

    // const alternativeNotes4 = message || message !== undefined || message !== '' ? [finalArr[0]] : 'No Information Available';

    // const alternativeArtifacts4 = message || message !== undefined || message !== '' ? [finalArr[20],' ' + finalArr[21], ' ' + finalArr[22]] : 'No Information Available';

    // //alternate5

    // const alternativebuild5 = message || message !== undefined || message !== '' ? [finalArr[17],' ' + finalArr[18], ' ' + finalArr[19]] : 'No Information Available';

    // const alternativeNotes5 = message || message !== undefined || message !== '' ? [finalArr[0]] : 'No Information Available';

    // const alternativeArtifacts5 = message || message !== undefined || message !== '' ? [finalArr[20],' ' + finalArr[21], ' ' + finalArr[22]] : 'No Information Available';



    //getting username tag for embed
    let dev = message.member.user.tag;

    const embed = new EmbedBuilder().setTitle('Enemy Defense' + ':' + ' ' + 'Lillias/Choux/Senya').setDescription('The offense below is safer than condom with a man').setTimestamp().setThumbnail('https://qtoptens.com/wp-content/uploads/2021/08/Celestial_Mercedes.png.webp').addFields(
      //recommended
      { name: 'Recommended Offense', value: `${recommendedBuild}`, inline: true},
      { name: 'Notes: Recommended', value: `${recommendedNotes}`, inline: false },
      { name: 'Recommended Artifacts', value: `${recommendedArtifacts}`, inline: false },
      //alternate1
      { name: 'Alternative 1 Offense', value: `${alternativebuild1}`, inline: false },
      { name: 'Notes: Alternative 1', value: `${alternativeNotes1}`, inline: false },
      { name: 'Alternate1 Artifacts', value: `${alternativeArtifacts1}`, inline: false },
      //alternate2
      { name: 'Alternative 2 Offense', value: `${alternativebuild2}`, inline: false },
      { name: 'Notes: Alternative 2', value: `${alternativeNotes2}`, inline: false },
      { name: 'Alternate2 Artifacts', value: `${alternativeArtifacts2}`, inline: false },
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