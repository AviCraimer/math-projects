const {isSet} = require('./utils');
const {typeSystemSym,
    freeValueSym,
    complexValueSym} = require('./symbols')
// const {VariableType} = require('./Value');


class TypeSystem {
    constructor (type, registry) {

        console.log("args to typesystem\n\n", type)
        this[typeSystemSym] = true;
        this.id = type.id;

        this.registry = registry;
        if (isSet(type.members)) {

            //Default value for is when members set is defined. This can be overrride by custom function
            this.is = (function (x) { this.members.has(x) }).bind(this);
        }

        if  (typeof type.is === 'function') {
            if (type.superSet) {
                const superSetId = type.superSet;
                this.superSet = () => {
                    return this.registry[superSetId]
                }
            } else {
                this.superSet = undefined;
            }

            this.is = (function (...args) {
                if (this.superSet && this.superSet.is  && this.superSet().is(...args) !== true) {
                    return false;
                } else {
                    return type.is.call(this, ...args);
                }
            }).bind(this)
        }


        if (type.type) { //Note this is the type's type. It need not be defined as there will always be a top-level to the type heirarchy.
            this.type = type.type;
        } else {
            this.type = undefined;
        }

        if (type.name) {
            this.name = type.name;
        } else {
            this.name = "";
        }

        if (typeof type.construct === 'function') {
            this.construct = (function (...args)  {
                const newVal = type.construct(...args);
                newVal[complexValueSym] = true;
                newVal[typeSystemSym] = true;
            }).bind(this);
        } else {
            this.construct = () => {
                throw new Error("Value constructor called on a type that has no constructor.")
            };
        }
        registry[type.id] = this;
    } //End of constructor



    // getInstVar (optionalVarToken) {
    //     return VariableType(this, optionalVarToken);
    // }
}


module.exports = {
    TypeSystem
}