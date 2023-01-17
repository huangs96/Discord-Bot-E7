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
      if(command == this.#constants.vPeasant) return `Here is your cc request <@${userId}>`;  
    
      if(command == this.#constants.vhelpCommand) return `<@${userId}> These are the best options we found to beat this comp!`;
    
      return `<@${userId}> here is your information.`;
    }

    #isOfficer = (message) => {      
      return message.member.roles.cache.some(role => this.#constants.officerRoles.includes(role.name));
    };
  }
})();

module.exports = new SharedFunctionality();