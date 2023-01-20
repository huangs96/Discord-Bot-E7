const ClassWithImmutablePublicAttr = require('../BaseClasses/ClassWithImmutablePublicAttr');
const ProtectedScope = require('../classExtensions/ProtectedScope');
const Constants = require('../constants');

const SharedFunctionality = (() => {
  const sharedProtected = ProtectedScope();
  
  return class SharedFunctionality extends ClassWithImmutablePublicAttr {
    #constants = Constants;
  
    constructor() {
      super();

      const set = sharedProtected(this).DefineImmutablePublic;

      set('constants', this.#constants);
      set('getPingUserString', this.#getPingUserString);
      set('isOfficer', this.#isOfficer);

      Object.freeze(this);
    }

    #getPingUserString = (command, userId) => {
      console.log('ccgc', this.#constants.ccGC);
      if(command == this.#constants.ccHelpCommand && this.#constants.bullied) return `It's you again.. <@${userId}>, ${this.#constants.ccNoobMsg}`;  
    
      if(command == this.#constants.ccHelpCommand) return `<@${userId}> These are the best options we found to beat this comp!`;

      if(command == this.#constants.ccHelpCommand && this.#constants.ccGC) return `<@${userId}> Here is your gear score:`
    
      return `<@${userId}> here is your information.`;
    }

    #isOfficer = (message) => {      
      return message.member.roles.cache.some(role => this.#constants.officerRoles.includes(role.name));
    };
  }
})();

module.exports = new SharedFunctionality();