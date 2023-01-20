const ClassWithImmutablePublicAttr = require('../BaseClasses/ClassWithImmutablePublicAttr');
const ProtectedScope = require('../classExtensions/ProtectedScope');
const sheets = require('../GoogleAuth/GoogleSheet');
require('dotenv').config();

const googleSheets = new sheets(process.env.e7sheet);

const UNIT_NAME_START = 0;
const BUILD_DATA_START = 5;
const BUILD_DATA_END = 15;
const LINK_LENGTH = 3;
const NO_BUILD_FOUND_STRING = '#N/A';
const NO_DATA_STRING = 'No Data';
const CORRECT_NUM_UNITS = 3;
// const SHEET_LINK = (process.env.sheetlink);
const NOT_ENOUGH_UNITS_STRING = "You didn't provide enough units to search.";
const TOO_MANY_UNITS_STRING = 'You inputed too many units.';


const Vhelp = (() => {
  const sharedProtected = ProtectedScope();

  return class Vhelp extends ClassWithImmutablePublicAttr {
    #message;
    #userId;
    #sharedFunctionality;
    #constants;
    #discordFunctionality

    constructor(message, sharedFunctionality, constants, discordFunctionality) {
      super();

      this.#message = message;
      this.#userId = message.member.user.id;
      this.#sharedFunctionality = sharedFunctionality;
      this.#constants = constants;
      this.#discordFunctionality = discordFunctionality;

      const set = sharedProtected(this).DefineImmutablePublic;

      set('doHelpCommand', this.#doHelpCommand)
      set('denyHelp', this.#denyHelp);
      set('directToHelpCommand', this.#directToHelpCommand);
      set('getCommands', this.#getCommands);
      set('getNoBuildComps', this.#GetNoBuildComps);

      Object.freeze(this);
    }

    //These are all private so we can create public immutable links to the functions
    #buildImageEmbeds(channelLink, imageLinks) {
      const {EmbedBuilder} = this.#discordFunctionality;
      
      return imageLinks.filter((element) => {if(element && element != NO_BUILD_FOUND_STRING) return true}).map((element) => {
        return new EmbedBuilder().setURL(channelLink).setImage(element);
      });
    }
  
    #buildVhelpEmbeds(userTag, channelLink, unitNames, imageLinks, builds) {
      const embedTitle = unitNames.reduce((finalString, currentString, index) => {
          return `${finalString}${index > 0 ? ',' : ''} ${currentString}`;
        }, "");

      const {EmbedBuilder} = this.#discordFunctionality;
      
      const embed = new EmbedBuilder()
        .setTitle(`Enemy Defense: ${embedTitle}`)
        .setURL(channelLink)
        .setDescription(this.#getSayings(userTag))
        .setTimestamp()
        .setThumbnail(this.#constants.embedImage)
        .setColor('#FFC933');
  
        //Loops through all comp info and adds fields for them
        builds.forEach((element,index) => {
          embed.addFields({name: '\u200B', value: '\u200B',},);
  
          let offenseName = `Alternative ${index} Offense`;
          let artifactsName = `Alternative ${index} Artifacts`;
          let notesName = `Notes: Alternative ${index}`;
          
          if(index == 0) {
            offenseName = 'Recommended Offense';
            artifactsName = 'Recomended Artifacts';
            notesName = 'Notes: Recommended';
          }
  
          embed.addFields(
            {name: offenseName, value: element.recommendedUnits, inline: true},
            {name: artifactsName, value: element.recommendedArtifacts, inline: true},
            {name: notesName, value: element.recommendedNotes, inline: false},
          );
        });
        
        // embed.addFields(
        //   {name: '\u200B', value: '\u200B',},
        //   { name: 'Recommended Unit Stat + Link for Additional Stats', value: SHEET_LINK, inline: false},);
          
        embed.setFooter({
          text: `Requested by: ${userTag}`,
          iconURL: this.#message.author.displayAvatarURL(),
        });
        
        const imageEmbeds = Array.isArray(imageLinks) && imageLinks.length > 0 ? this.#buildImageEmbeds(channelLink, imageLinks) : [];
  
      return [embed, ...imageEmbeds];
    }
    
    #constructDataRanges(data) {
      const links = data.slice(data.length - LINK_LENGTH, data.length).map((element) => {return element[LINK_LENGTH]});
    
      return {
        unitNames: data[UNIT_NAME_START],
        buildData: data.slice(BUILD_DATA_START, BUILD_DATA_END),
        imageLinks: links,
      };
    }
    
    #createEmbedFieldsForComps(units, artifacts, notes) {
      let buildEmbeds = [];
      let includeDisclaimer = false;
      
      do {
        const buildUnits = units.splice(0, Math.min(units.length, 4));
        const buildArtifacts = artifacts.splice(0, Math.min(artifacts.length, 4));
        const buildNotes = (notes) ? notes.splice(0, Math.min(notes.length, 4)) : [];
        
        const unitString = `${buildUnits[0]}\n${buildUnits[1]}\n${buildUnits[2]}`;
        const artifactString = `${buildArtifacts[0]}\n${buildArtifacts[1]}\n${buildArtifacts[2]}`;
        const noteString = (buildNotes && buildNotes[0]) ? buildNotes[0] : NO_DATA_STRING;
    
        if(!includeDisclaimer) {
          includeDisclaimer = !this.#constants.nerfedUnits.every((unit) => {
            return buildUnits[0] != unit && buildUnits[1] != unit && buildUnits[2] != unit;
          })
        }
    
        buildEmbeds.push(
          {
            recommendedUnits: unitString, 
            recommendedArtifacts: artifactString, 
            recommendedNotes: noteString
          }
        );
        
      } while(units.length > 0);
    
      return {
        builds: buildEmbeds,
        disclaimer: includeDisclaimer
      }
    }
  
    #denyHelp() {
      this.#sendMessage(this.#constants.ccDenialResponse);
    }
  
    #directToHelpCommand() {
      this.#sendMessage(`Hey <@${this.#userId}>, please use the !cc command.`);
    }
  
    async #doHelpCommand(args, userTag, command) {
      const nickNameDictionary = this.#constants.unitNickNames;
  
      //replaces the user inputed value nicknames with the actual values where applicable
      const theRest = args.split(',').map((element) => { 
        const userInputed = element.toLowerCase().trim();
        const nickName = nickNameDictionary[userInputed];
    
        if(nickName) return nickName;
        
        return userInputed;
      });
      
      if(theRest.length < CORRECT_NUM_UNITS) {
        this.#messageNotEnoughUnits();
        return;
      }
    
      if(theRest.length > CORRECT_NUM_UNITS) {
        this.#messageTooManyUnits();
        return
      }
      
      // add values into cells and read data from sheet
      const getRows = googleSheets.Update('Comp Search!B6:D6', [theRest]);
      const metaData = await googleSheets.GetMetaData();
      const readData = await googleSheets.ReadData('Comp Search!B4:M23');
  
      const {unitNames, buildData, imageLinks} = this.#constructDataRanges(readData);
  
      if(buildData[1] != NO_BUILD_FOUND_STRING) {
        
        //Creates all of the strings used for the embed later
        const {disclaimer, builds} = this.#createEmbedFieldsForComps(buildData[2], buildData[5], buildData[9]);
  
        const channelLink = `https://discord.com/channels/${this.#message.guildId}/${this.#message.channelId}`;
  
        const embeds = this.#buildVhelpEmbeds(userTag, channelLink, unitNames, imageLinks, builds);
        
        if(disclaimer) {
          const disclaimerString = this.#getDisclaimerString();
          this.#sendMessage(`${this.#sharedFunctionality.getPingUserString(command, this.#userId)} ${disclaimerString}`);
        } 
        else {
          this.#sendMessage(this.#sharedFunctionality.getPingUserString(command, this.#userId));
        }
        
        this.#sendMessage({embeds: [...embeds]});
      } 
      else {
        await this.#doNoBuild(theRest, unitNames);
      } 
    }

    async #doNoBuild(theRest, unitNames) {
      let shouldWrite = true;
      
      const output = unitNames.reduce((finalString, currentString, index) => {
        if(currentString == '#N/A') {
          shouldWrite = false;
          return `${finalString}${index > 0 ? ',' : ''} ${theRest[index]}`;
        }
        return `${finalString}${index > 0 ? ',' : ''} ${currentString}`;
      }, "");
      this.#sendMessage(`There is no build for: ${output}`);

      const noBuildData = await googleSheets.ReadData('Non-Response Raw Data!A2:A');
      const nextIndex = noBuildData.length + 2;

      if(shouldWrite) {
        try{
          const written = googleSheets.Update(`Non-Response Raw Data!A${nextIndex}:C${nextIndex}`, [unitNames.sort()]);
        }
        catch(err) {
          console.log(err);
        }
      }
    }

    async #GetNoBuildComps(command, userTag) {
      const noBuildData = await googleSheets.ReadData('Non-Response Report!A3:D');
      const displayString = noBuildData.reduce((finalString, current) => {
        const units = current.slice(0, 3).reduce((finalString, element, index) => {
          return `${finalString}${index > 0 ? ', ' : ''}${element}`;
        }, '');

        const occurrences = current.at(-1);

        return `${finalString}${occurrences} | ${units}\n`
      }, '');

      const channelLink = `https://discord.com/channels/${this.#message.guildId}/${this.#message.channelId}`;

      const {EmbedBuilder} = this.#discordFunctionality;

      const embed = new EmbedBuilder()
        .setTitle(`Inquiries Without Comps`)
        .setURL(channelLink)
        .setTimestamp()
        .setThumbnail(this.#constants.embedImage)
        .setColor('#FFC933')
        .addFields(
          {name: '# | Comps', value: displayString, inline: true},
        )
        .setFooter({
            text: `Requested by: ${userTag}`,
            iconURL: this.#message.author.displayAvatarURL(),
          });

      //{name: '\u200B', value: '\u200B',}
      this.#sendMessage(this.#sharedFunctionality.getPingUserString(command, this.#userId))
      this.#sendMessage({embeds: [embed]});
    }
  
    #getCommands() {
      return [
        {name: '!ccHelp', text: this.#constants.cchelpText},
        // {name: '!ccInfo', text: this.#constants.ccInfo},
        {name: '!ccNoBuild', text: this.#constants.noBuildCommandText}
      ];
    }
  
    #getDisclaimerString() {
      const nerfedUnits = this.#constants.nerfedUnits.reduce((finalString, currentValue, index) => {
        return `${finalString}${index > 0 ? ',' : ''} ${currentValue}`;
      }, "");
          
      return `${this.#constants.nerfedUnitDisclaimer} ${nerfedUnits}`;
    }
  
    #getSayings(userTag) {
      if(userTag == this.#constants.aestheticaId) return this.#constants.aestheticaResponse;
      const randomInt = Math.floor(Math.random() * (this.#constants.sayings.length - 1));
    
      return this.#constants.sayings[randomInt];
    }
  
    #messageNotEnoughUnits() {
      this.#sendMessage(NOT_ENOUGH_UNITS_STRING);
    }
  
    #messageTooManyUnits() {
      this.#sendMessage(TOO_MANY_UNITS_STRING);
    }
  
    #sendMessage(messageString) {
      this.#message.channel.send(messageString);
    }
  }
})();

module.exports = Vhelp;