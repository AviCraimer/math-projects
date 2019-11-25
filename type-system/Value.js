const {typeSystemSym,
    freeValueSym,
    complexValueSym} = require('./symbols')

const {
    isEqual,
    cloneDeep,
    isObjectOrFunc,
    inTypeSystem,
    assignNames,
    assignIds
} = require('./utils');



const ValueType = {
    superSet: undefined,
    is:  function (thing) {
        if (inTypeSystem(thing) && thing[complexValueSym] !== true) {
            return false
        }
        return true
    }
}

const PrimitiveValueType =  {
    // All javascript values that are not in the type system
    superSet: ValueType,
    is: function (thing) {
            if (!inTypeSystem(thing)) {
                return true;
            } else {return false}
        }
}



const ComplexValueType = {
    superSet: ValueType,
    is: function (thing) { // This should replaced with logical negation of primitive value type
            if (inTypeSystem(thing)) {
                return  Boolean(thing[complexValueSym]);
            } else {
                return false;
            }
        }
}

const StrType = {
    // A subset of primitive values
    superSet: PrimitiveValueType,
    is: function (value) {
            if (typeof value === 'string') {
                return true;
            }
            return false;
        }
}

const PairValuesType = {
    //May include pairs of primitives or pairs of pairs (or other complex value types)
    is: (val) => {
        if (ComplexValueType.is(val) === true) {
            if (val.terms && Array.isArray(val.terms) && val.terms.length  === 2) {
                return true;
            }
        }
        return false;
    },
    construct: function (first, second)  {
        const pr = {
            type: this,
            terms: [first, second]
        }

        return;
    }
}

const  VariableType =  {
    is: function (val) {
        if (ComplexValueType.is(val) === true) {
            if (val.type && val.type === this) {
                return true;
            }
        }
        return false;
    },
    construct: function (varDomain, varToken = Symbol("A " +  varDomain.name +  ' variable') )  { //Token must be a string or a symbol
            return  {
                type: VariableType,
                varToken,
                varDomain: this, //This is the type that the variable varies across
                value: freeValueSym,
            }
    }
}




const ValueTypes =
    {
        ValueType,
        PrimitiveValueType,
        ComplexValueType,
        StrType,
        PairValuesType,
        VariableType
    }

const valueTypesRegistry = {

}

assignIds(ValueTypes, valueTypesRegistry);

assignNames(ValueTypes);


module.exports = {
    ValueTypes,
    valueTypesRegistry
};



//     if (!isObjectOrFunc(rawVal) && rawVal !== undefined) {
//         const queryStore = Value.getExistingValue(rawVal);
//         if (queryStore !== undefined) {
//             //Value object already exists in value store.
//             return queryStore;
//         }
//     }


//     const valueInstance = TypeSymstemObject(ValueInstProto);

//     //Name can be changed by method in prototype
//     valueInstance.name = (rawVal === undefined) ? "Free Value Variable" : rawVal.toString().slice(0,40);
//     valueInstance.category = "value";

//     //This should eventually be changed to a deep clone of the value so it can't be affected by stuff happening outside the type system.
//     valueInstance.terms.rawJS  = cloneDeep(rawVal);

//     Value.addValue(valueInstance)

//     return valueInstance;
// }

// Value.valuesStore = new Map(); //Private

// Value.isValue = function (thing) {
//     return inTypeSystem(thing) &&  thing.category === 'value';
// }

// Value.getExistingValue = function (rawJS) {
//     const valueInst = Value.valuesStore.get(rawJS);
//     if (valueInst === undefined) {
//         return undefined;
//     } else {
//         return valueInst;
//     }
// }

// Value.addValue =  function (valueInst) {
//     const {rawJS} = valueInst.terms;

//     if ((!isObjectOrFunc(rawJS) && rawJS !== undefined)) {
//         Value.valuesStore.set(rawJS, valueInst);
//     }
// }


// const ValueInstProto = {
//     getRawJS () {
//         const rawJS = this.terms.rawJS;
//         return cloneDeep(rawJS)
//     },
//     specifyValue(value) {
//         if (this.terms.rawJS !== undefined) {
//             throw new Error("Attempted to specify the value of a bound value variable.")
//         } else {
//             const query = Value.getExistingValue(value);
//             if (query === undefined) {
//                 this.terms.value = cloneDeep(value);
//                 Value.addValue(this);
//                 return this;
//             } else {
//                 return query;
//                 //The problem with this is we lose the referential identity of the value object. It substitutes the existing value object which is good in terms of having one cannonical object, but bad because any references to the object which had the free variable will still point to the free variable object, i.e., there is no record of the fact that this free variable was specified.
//                 //Maybe I am expecting too much from a value object. I could force value objects to always have a defined value. Then the possibilty of a free value variable would only exist at the level of simple types. YES, that's the solution.
//             }

//         }
//     },

// }



