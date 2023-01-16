const googleAuth = require('./GoogleAuthSingleton');
const ClassWithImmutablePublicAttr = require('../BaseClasses/ClassWithImmutablePublicAttr');
const ProtectedScope = require('../classExtensions/ProtectedScope');

const {auth, sheet} = googleAuth;

const GoogleSheet = (() => {
  const sharedProtected = ProtectedScope();

  return class GoogleSheet extends ClassWithImmutablePublicAttr {
    constructor(spreadsheetId) {
      super();

      const set = sharedProtected(this).DefineImmutablePublic;

      set('spreadsheetId', spreadsheetId);
      set('Update', this.#Update);
      set('GetMetaData', this.#GetMetaData);
      set('ReadData', this.#ReadData);
    }

    #Update(range, values) {
      return sheet.spreadsheets.values.update({
        auth,
        spreadsheetId: this.spreadsheetId,
        range: range,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: values
        }
      });
    }
  
    async #GetMetaData() {
      return await sheet.spreadsheets.get({
        auth,
        spreadsheetId: this.spreadsheetId,
      })
    };
  
    async #ReadData(range) {
      const result = await sheet.spreadsheets.values.get({
        auth,
        spreadsheetId: this.spreadsheetId,
        range: range
      });
  
      return result.data.values;
    }
  }
})();

module.exports = GoogleSheet;