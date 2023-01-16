const ProtectedScope = require('/home/runner/Discord-Bot-E7/ClassExtensions/ProtectedScope.js');

const ClassWithImmutablePublicAttr = (() => {
  const sharedProtected = ProtectedScope();

  return class ClassWithImmutablePublicAttr {
    constructor() {

      sharedProtected(this).DefineImmutablePublic = (attributeName, value) => {
          Object.defineProperty(this, attributeName, {
            value: value,
            writable : false,
            enumerable : true,
            configurable : false
          });
      };
    }
  };
})();

module.exports = ClassWithImmutablePublicAttr;