const Vhelp = require('./cc.js');
const GuildManager = require('./GuildManager.js');

const internal_GetVhelp = (message, sharedFunctionality, constants, discordFunctionality) => {
  return new Vhelp(message, sharedFunctionality, constants, discordFunctionality);
}

const internal_GetGuildManager = (message, sharedFunctionality, constants, discordFunctionality) => {
  return new GuildManager(message, sharedFunctionality, constants, discordFunctionality);
}
const internal_exportFunctionality = () => {

  const functionality = {
    GetVhelp: internal_GetVhelp,
    GetGuildManager: internal_GetGuildManager
  }

  Object.freeze(functionality);
  
  return functionality;

}
module.exports = internal_exportFunctionality();