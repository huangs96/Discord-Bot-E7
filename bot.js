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
  
    //Example command: !cc peira hwa choux
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
    // console.log('neededClasses', await neededClasses.vhelp.ccGearScore());
  
    //Command structure
    // console.log('command', command);
    switch(command) {
  
      //cc commands
      case constants.noBuildCommand:
      case constants.ccHelpCommand: {
        const vhelp = neededClasses.vhelp;
        
        if(userTag == constants.vikChun && command == constants.ccHelpCommand)  {
          vhelp.denyHelp();
          break;
        }
        else if (userTag != constants.bullied && command == constants.ccHelpCommand) {
          vhelp.directToHelpCommand();
          break;
        }
        else if(command == constants.noBuildCommand) {
          vhelp.getNoBuildComps(command, userTag);
          break;
        }
        
        await vhelp.doHelpCommand(theRestString, userTag, command);
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

      //gear score checker
      case constants.ccGS: {
        const vhelp = neededClasses.vhelp;

        if(command == constants.ccGS) {
          await vhelp.ccGearScore(theRestString, userTag);
          break;
        }
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

  embed.addFields({name: '!commands', value: 'Displays this helpful embed.', inline: false});

  embed.setFooter({
    text: `Requested by: ${userTag}`,
    iconURL: message.author.displayAvatarURL(),
  });

  message.channel.send(SharedFunctionality.getPingUserString(command, message.member.user.id));
  message.channel.send({embeds: [embed]});
};

const createNeededClasses = (message, command) => {
  switch(command) {
    case constants.noBuildCommand:
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