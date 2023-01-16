const ClassWithImmutablePublicAttr = require('../BaseClasses/ClassWithImmutablePublicAttr');
const ProtectedScope = require('../classExtensions/ProtectedScope');
const sheets = require('../GoogleAuth/GoogleSheet');

const googleSheets = new sheets(process.env.guildWarStatSheet);

const MEMBER_NAME_INDEX = 1;
const VCROX_NAME = 'vcrox';
const GVG_OFFENSE_STAT_START = 0;
const GVG_OFFENSE_STAT_END = 8;
const GVG_DEFENSE_STAT_START = 12;
const GVG_DEFENSE_STAT_END = 20;
const WEIGHTED_WINRATE_INDEX = 7;

const GuildManager = (() => {
  const sharedProtected = ProtectedScope();

  return class GuildManager extends ClassWithImmutablePublicAttr {
    #interaction;
    #sharedFunctionality;
    #userId;
    #constants;
    #discordFunctionality;

    constructor(message, sharedFunctionality, constants, discordFunctionality) {
      super();
  
      this.#interaction = message;
      this.#userId = message.member.user.id;
      this.#sharedFunctionality = sharedFunctionality;
      this.#constants = constants;
      this.#discordFunctionality = discordFunctionality;

      const set = sharedProtected(this).DefineImmutablePublic;
  
      set('getCommands', this.#getCommands);
      set('checkWinrate', this.#checkWinrate);

      Object.freeze(this);
    }

    #getCommands() {
      //All Member Functionality
      const functionality = [
        {name: '!VWinrate', text: this.#constants.checkWinrateText},
      ];
          
      
      if(this.#sharedFunctionality.isOfficer(this.#interaction)) {
      }

      return functionality;
    }

    async #checkWinrate(command, theRest, userTag) {
      if(theRest.toLowerCase() == command) {
        this.#interaction.channel.send('You did not provide a user to look up.');  
        return;
      }

      const getRows = googleSheets.Update('GVG Stats!C2:H2', [['','','','','','']]);
      const metaData = await googleSheets.GetMetaData();
      
      const readData = await googleSheets.ReadData('GVG Stats!A7:T36');

      const {offenseStats, defenseStats} = this.#splitGvGStatsData(readData);

      const memberToLookFor = theRest.toLowerCase();

      const offenseData = offenseStats.find((element) => {
        return element[MEMBER_NAME_INDEX] ? element[MEMBER_NAME_INDEX].toLowerCase().includes(memberToLookFor) : false;
      });

      const defenseData = defenseStats.find((element) => {
        return element[MEMBER_NAME_INDEX] ? element[MEMBER_NAME_INDEX].toLowerCase().includes(memberToLookFor) : false;
      });

      if(!offenseData && !defenseData) {
        this.#interaction.channel.send(`Could not find data for member: ${theRest}`);
        return;
      }

      const vData = readData.find((element) => {
        return element[MEMBER_NAME_INDEX].toLowerCase() == VCROX_NAME;
      });

      const {EmbedBuilder} = this.#discordFunctionality;
      const channelLink = `https://discord.com/channels/${this.#interaction.guildId}/${this.#interaction.channelId}`;
      const memberName = offenseData ? offenseData[MEMBER_NAME_INDEX] : defenseData[MEMBER_NAME_INDEX];
      const isVcrox = memberName.toLowerCase() == 'vcrox';

      //TODO: Clean this shit up
      let description = 'Here is the winrate.';
      if(vData) {
        const vcroxWr = parseInt(vData[WEIGHTED_WINRATE_INDEX]);
        const memberWr = parseInt(offenseData[WEIGHTED_WINRATE_INDEX]);

        if(vcroxWr > memberWr) description = 'Imagine having a lower winrate than Vcrox...';
        else if (vcroxWr == memberWr) description = 'Vcrox is just as powerful...';
        else description = 'You are more powerful than Vcrox.'
      }

      const embed = new EmbedBuilder()
        .setTitle(`Winrates for: ${memberName}`)
        .setDescription(description)
        .setURL(channelLink)
        .setTimestamp()
        .setThumbnail(this.#constants.embedImage)
        .setColor('#FFC933');

      //TODO: Clean this shit up
      if(offenseData) {
        if(offenseData[0]) {
          offenseData.forEach((element, index) => {
            if(!element) offenseData[index] = 'No Data';
          });
          
          const offenseEmbedValue = `Rank ${isVcrox ? 30 : offenseData[0]}\n${offenseData[2]} <:JustWin:1031792733691592704>  ${offenseData[3]} <:AtLeastYouTried:1032014983896244224>  ${offenseData[4]} <:JustApe:1031799157272354816>\n${isVcrox ? `-${offenseData[6]}`: offenseData[6]} WR\n${isVcrox ? `-${offenseData[7]}` : offenseData[7]} Weighted WR`;
          
          embed.addFields(
            {name: 'Offense Stats', value: offenseEmbedValue, inline: false},
          );
        }
      }

      //TODO: Clean this shit up
      if(defenseData) {
        if(defenseData[0]) {
          defenseData.forEach((element, index) => {
            if(!element) defenseData[index] = 'No Data';
          });
          
          const defenseEmbedValue = `Rank ${isVcrox ? 30 : defenseData[0]}\n${defenseData[2]} <:GLGettingThese:1031798492122853426>  ${defenseData[3]} <:AtLeastYouTried:1032014983896244224>  ${defenseData[4]} <:TypicalPBDefense:1031799094466850837>\n${isVcrox ? `-${defenseData[6]}`: defenseData[6]} WR\n${isVcrox ? `-${defenseData[7]}` : defenseData[7]} Weighted WR`;  
          
          embed.addFields(
            {name: 'Defense Stats', value: defenseEmbedValue, inline: false},
          );
        }
      }

      embed.setFooter({
          text: `Stats Requested by: ${userTag}`,
          iconURL: this.#interaction.author.displayAvatarURL(),
      });

      this.#interaction.channel.send(this.#sharedFunctionality.getPingUserString(command, this.#userId));
      
      this.#interaction.channel.send({embeds: [embed]});
    }

    #splitGvGStatsData(readData) {
      const offenseStats = [];
      const defenseStats = [];
      
      readData.forEach((currentRow) => {
        const offenseData = currentRow.slice(GVG_OFFENSE_STAT_START, GVG_OFFENSE_STAT_END);
        const defenseData = currentRow.slice(GVG_DEFENSE_STAT_START,GVG_DEFENSE_STAT_END);
        
        offenseStats.push(offenseData);

        defenseStats.push(defenseData);
        
      });

      return {offenseStats: offenseStats, defenseStats: defenseStats};
    }
  }
})();

module.exports = GuildManager;