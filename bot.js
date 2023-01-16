// const Discord = require("discord.js");
// const {EmbedBuilder} = require("discord.js");
// const config = require('./config.json');
// const express = require('express')();
// const {google} = require('googleapis');
// const app = express;
// const { GatewayIntentBits } = require('discord.js');
// const client = new Discord.Client({
//   intents: [
//     GatewayIntentBits.Guilds,
//     GatewayIntentBits.GuildMessages,
//     GatewayIntentBits.DirectMessages,
//     GatewayIntentBits.MessageContent
//   ],
//   partials: [
//     'MESSAGE',
//     'CHANNEL',
//     'REACTIONS'
//   ]
// });

// let chars = ['Adventurer Ras', 'Alencia', 'Apocalypse Ravi', 'Choux', 'Rimuru', 'Spirit Eye Celine', 'Archdemons Shadow', 'Belian', 'Rem', 'Remnant', 'Violet', 'Maid Chloe', 'Hwayoung', 'Edward Elric', 'Arbiter Vildred', 'Cidd', 'Ran', 'Peira', 'Summertime', 'Iseria', 'Kawerik', 'Mercedes', 'Closer Charles', 'Eda', 'Pavel', 'Landy', 'Lilias', 'Senya', 'Sylvian Sage Vivian', 'Conqueror Lilias', 'Celine', 'Fallen Cecilia', 'Violet', 'Holiday Yufine', 'Krau', 'Ruele of Light', 'Specter of Tenebria', 'Mort', 'Kise', 'Judge Kise', 'Operator Sigret', 'Kayron', 'Aria', 'Troublemaker Crozet', 'Ravi','Fairytale Tenebria', 'Apo', "Archdemon's Shadow"];

// const setDict = new Set ();
// for (item of chars) {
//   let finalItem = item.toLowerCase();
//   setDict.add(finalItem);
// };

// const auth = new google.auth.GoogleAuth({
//   keyFile: "credentials.json",
//   scopes: "https://www.googleapis.com/auth/spreadsheets"
// });

// const clients = auth.getClient();
// const googleSheets = google.sheets({version: "v4", auth: clients });
// const spreadsheetId = "1c6TyHAnRHY0o4r823RFtTzkZDdU9aGx1bBAGZZibn-U";

// client.on("ready", () => {
//   console.log(`Logged in as ${client.user.tag}!`)
// })


// // using message parameter in messageCreate to receive discord messages
// client.on('messageCreate', async (message) => {
//   if (message.author.bot) return;

//   //spliting message from discord user from dash and making sure it is always lowercase
//   let untouchedMsg = message.content.split('-');
//   const lowercasedMsg = untouchedMsg.map(o => {
//     return o.toLowerCase();
//   });

//   const finalDiscordMsg = lowercasedMsg.map(x => {
//     return x;
//   });


//   if (setDict.has(finalDiscordMsg[0]) && setDict.has(finalDiscordMsg[1]) && setDict.has(finalDiscordMsg[2])) {

//     // breaking down discord message to send to google sheets
//     let arr = [];
//     const premessage = message.content.split('-');
//     arr.push(premessage);

//     // capitalizing first letter and spacing format for consistent embed title
//     const embedTitle = premessage.map(x => {
//       return ' ' + x.charAt(0).toUpperCase() + x.slice(1).toLowerCase();
//     });

//     // add values into cells
//     const getRows = googleSheets.spreadsheets.values.update({
//       auth,
//       spreadsheetId,
//       range: "Comp Search!B6:D6",
//       valueInputOption: "USER_ENTERED",
//       resource: {
//         values: arr
//       }
//     });

//     const metaData = await googleSheets.spreadsheets.get({
//       auth,
//       spreadsheetId
//     });

//     const readData = await googleSheets.spreadsheets.values.get({
//       auth, 
//       spreadsheetId, 
//       range: "Comp Search!B9:L18", 
//     });

//     // reading data in certain cells, pushing values in array, referencing 2d array for object/dictionary for consistent reference
//     let sheetsData = readData.data.values;
//     let finalArr = [];
//     let dataObj = {};

//     sheetsData.map((x) => {
//       finalArr.push(x);
//     });

//     dataObj.units = finalArr[2];
//     dataObj.artifacts = finalArr[5];
//     dataObj.notes = finalArr[9];

//     // recommended
//     const recommendedBuild = dataObj.units[0] + ',' + ' ' + dataObj.units[1] + ',' + ' ' + dataObj.units[2];
//     const recommendedArtifacts = dataObj.artifacts[0] + ',' + ' ' + dataObj.artifacts[1] + ',' + ' ' + dataObj.artifacts[2];
//     const recommendedNotes = dataObj.notes != undefined && dataObj.notes[0] != '' ? dataObj.notes[0] : 'No Data';



//     // alternate1
//     const alternativeBuild1 = dataObj.units.length >= 7 ? dataObj.units[4] + ',' + ' ' + dataObj.units[5] + ',' + ' ' + dataObj.units[6] : 'No Data';
//     const alternativeArtifacts1 = dataObj.artifacts.length >= 7 ? dataObj.artifacts[4] + ',' + ' ' + dataObj.artifacts[5] + ',' + ' ' + dataObj.artifacts[6] : 'No Data';
//     const alternativeNotes1 =  dataObj.notes != undefined && dataObj.notes.length >= 5 ? dataObj.notes[4] : 'No Data';


//     //alternate2
//     const alternativeBuild2 = dataObj.units.length >= 11 ? dataObj.units[8] + ',' + ' ' + dataObj.units[9] + ',' + ' ' + dataObj.units[10] : 'No Data';
//     const alternativeArtifacts2 = dataObj.artifacts.length >= 11 ? dataObj.artifacts[4] + ',' + ' ' + dataObj.artifacts[5] + ',' + ' ' + dataObj.artifacts[6] : 'No Data';
//     const alternativeNotes2 = dataObj.notes != undefined && dataObj.notes.length >= 9 ? dataObj.notes[8] : 'No Data';

//     //getting username tag for embed
//     let dev = message.member.user.tag;

//     const embed = new EmbedBuilder()
//     .setTitle('Enemy Defense' + ':' + embedTitle)
//     .setDescription('The offense below is safer than condom with a man')
//     .setTimestamp()
//     .setThumbnail('https://qtoptens.com/wp-content/uploads/2021/08/Celestial_Mercedes.png.webp')
//     .setColor('#FFC933')
//     .addFields(
//       // recommended
//       { name: 'Recommended Offense', value: `${recommendedBuild}`, inline: true},
//       { name: 'Recommended Artifacts', value: `${recommendedArtifacts}`, inline: true },
//       { name: 'Notes: Recommended', value: `${recommendedNotes}`, inline: false },
//       // alternate1
//       { name: 'Alternative 1 Offense', value: `${alternativeBuild1}`, inline: true },
//       { name: 'Alternate1 Artifacts', value: `${alternativeArtifacts1}`, inline: true },
//       { name: 'Notes: Alternative 1', value: `${alternativeNotes1}`, inline: false },
//       // alternate2
//       { name: 'Alternative 2 Offense', value: `${alternativeBuild2}`, inline: true },
//       { name: 'Alternate2 Artifacts', value: `${alternativeArtifacts2}`, inline: true },
//       { name: 'Notes: Alternative 2', value: `${alternativeNotes2}`, inline: false },
//     ).setFooter({
//         text: `Command Requested by: ${dev}`,
//         iconURL: message.author.displayAvatarURL(),
//       });

//     message.channel.send({embeds: [embed]});
//   } else if (lowercasedMsg.length === 3) {
//     message.channel.send('No Build Available');
//   };


// });

// client.login(config.token);

require('dotenv').config();
const {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Client,
  Events,
  EmbedBuilder,
  GatewayIntentBits,
  InteractionType,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require('discord.js');
const FunctionalityManager = require('./BotFunctionality/FunctionalityManager.js');
const SharedFunctionality = require('./InjectedFunctionality/SharedFunctionality');

const constants = SharedFunctionality.constants;
const client = new Client({
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
  ],
  autoReconnect: true
})

// bot is ready and logged in
client.on(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}!`);
})

client.on("disconnect", () => {
  console.log('Disconnected from Discord server');
});

client.on(Events.Error, (err) => {
  console.log(err);
})


client.on(Events.InteractionCreate, async (interaction) => {

})

// using message parameter in messageCreate to receive discord messages
client.on(Events.MessageCreate, async (message) => {

  //if bot repeats message, return
  if (message.author.bot) return;
  
  //if message does not start with command prefix, do nothing.
  if(!message.content.startsWith(constants.prefix)) return;

  try {
  
    //Example command: !vhelp peira hwa choux
    const body = message.content.slice(constants.prefix.length);
  
    //Extracts the command immediately after !
    const command = body.slice(
      0,
      body.includes(' ') ? body.indexOf(' ') : body.length
    ).toLowerCase();
  
    //Extracts the rest of the arguments
    const theRestString = body.slice(body.indexOf(' ') + 1);
  
    //Grabs the user
    const userTag = message.member.user.tag;
  
    //Creates the necessary classes 
    const neededClasses = createNeededClasses(message, command);
  
    //Command structure
    switch(command) {
  
      //Vhelp commands
      case constants.noBuildCommand:
      case constants.vPeasant: 
      case constants.vhelpCommand: {
        const vhelp = neededClasses.vhelp;
        
        if(userTag == constants.vcroxId && command == constants.vhelpCommand)  {
          vhelp.denyVcroxVhelp();
          break;
        }
        else if (userTag != constants.vcroxId && command == constants.vPeasant) {
          vhelp.directToVhelpCommand();
          break;
        }
        else if(command == constants.noBuildCommand) {
          vhelp.getNoBuildComps(command, userTag);
          break;
        }
        
        await vhelp.doVhelpCommand(theRestString, userTag, command);
        break;
      }
  
      //Guildmanager Commands
      case constants.updateWinrates:
      case constants.checkWinrate: {
      const guildManager = neededClasses.guildmanager;
  
        if(command == constants.checkWinrate) await guildManager.checkWinrate(command, theRestString, userTag);
        //if(command == constants.updateWinrates) guildManager.displayWinrateModalButton();
  
        break;
      }
  
  
      //Other Commands
      case constants.commands: {
        displayCommands(command, message, userTag, neededClasses);
        break;
      }
      default:
        message.channel.send('My IQ is too low to understand that.');
        break;
    }
  }
  catch(err) {
    console.log(err);
  }
});

const displayCommands = (command, message, userTag, neededClasses) => {
  const keys = Object.keys(neededClasses);

  const commands = keys.reduce((commandList, element) => {
    return commandList.concat(neededClasses[element].getCommands()); 
  }, []);
  
  const embed = new EmbedBuilder()
      .setTitle(`Commands`)
      .setTimestamp()
      .setThumbnail(constants.embedImage)
      .setColor('#FFC933');

  commands.forEach((element) => {
    embed.addFields(
      {name: element.name, value: element.text, inline: false}
    );
  });

  embed.addFields({name: '!Vcommands', value: 'Displays this helpful embed.', inline: false});

  embed.setFooter({
    text: `Vhelp Requested by: ${userTag}`,
    iconURL: message.author.displayAvatarURL(),
  });

  message.channel.send(SharedFunctionality.getPingUserString(command, message.member.user.id));
  message.channel.send({embeds: [embed]});
};

const createNeededClasses = (message, command) => {
  
  switch(command) {
    case constants.noBuildCommand:
    case constants.vPeasant:
    case constants.vhelpCommand: {
      return {
        vhelp: FunctionalityManager.GetVhelp(message, SharedFunctionality, constants, getObjectDiscordDependencies('vhelp'))
      }
    }
    //case constants.updateWinrates:
    case constants.checkWinrate: {
      return {
        guildmanager: FunctionalityManager.GetGuildManager(message, SharedFunctionality, constants, getObjectDiscordDependencies('guildmanager'))
      }
    }
    default: {
      return {
        vhelp: FunctionalityManager.GetVhelp(message, SharedFunctionality, constants, getObjectDiscordDependencies('vhelp')),
        guildmanager: FunctionalityManager.GetGuildManager(message, SharedFunctionality, constants, getObjectDiscordDependencies('guildmanager')),
      };
    }
  }
}

const getObjectDiscordDependencies = (objectName) => {
  switch(objectName) {
    case 'vhelp':
      return {
        EmbedBuilder: EmbedBuilder
      };
  case 'guildmanager':
    return {
      ActionRowBuilder: ActionRowBuilder,
      ButtonBuilder: ButtonBuilder,
      ButtonStyle: ButtonStyle,
      EmbedBuilder: EmbedBuilder, 
      ModalBuilder: ModalBuilder,
      TextInputBuilder: TextInputBuilder,
      TextInputStyle: TextInputStyle,
    };
  }
}


(async () => {
  try{
    console.log('Attempting to connect');
    const status = await client.login(process.env.token);

    console.log(`Status: ${status}`);
  }
  catch(err) {
    console.log(err);
  }
})()
