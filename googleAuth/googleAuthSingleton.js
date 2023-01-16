const {google} = require('googleapis');
const ClassWithImmutablePublicAttr = require('../BaseClasses/ClassWithImmutablePublicAttr');
const ProtectedScope = require('../classExtensions/ProtectedScope');

const GoogleSingleton = (() => {
  const sharedProtected = ProtectedScope();

  return class GoogleSingleton extends ClassWithImmutablePublicAttr {
    constructor() {
      super();

      const set = sharedProtected(this).DefineImmutablePublic;

      set('auth', this.#getAuth());
      set('sheet', google.sheets({version: "v4"}));

      Object.freeze(this);
    }

    #getAuth() {
      return new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
      });
    }
  }
})();

module.exports = new GoogleSingleton();