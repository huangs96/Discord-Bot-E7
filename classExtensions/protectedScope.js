const sharedScope = new WeakMap();

//Extends hashmap functionality so user doesn't need to do container.get or container.set
//Example: container(this) can either get or set the value for this within the hashmap
const sharedScopeAccess = (container) => {
    
    return function(context) {
        if (!container.has(context)) {
            container.set(context, {});
        };
        return container.get(context);
    };
    
};

const createSharedScope = () => {
    return sharedScopeAccess(sharedScope);
};


module.exports = createSharedScope;