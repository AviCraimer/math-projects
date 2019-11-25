const syms = require('../symbols');
const {
    isEqual,
    cloneDeep,
    isObjectOrFunc,
    inTypeSystem,
    TypeSymstemObject
} = require('../utils');

const Value = function (rawVal = undefined, ...args) {
    //If more than one value is passed as an argument, it cannot be a Value, return false

    // Functions cannot be stored as values.
    if ( args.length !== 0 || typeof rawVal === "function") { return false ;}

    //If the value is undefined, then the variable is considered free
    //The value can later by specified. In this way, you can have an instance of a Value with a free variable, that is it represents any single value.


    if (inTypeSystem(rawVal)) {
        throw new Error ('Passed a type system object. You can only form new Values from raw Javascript values, not from Type System values.')
    }

    if (!isObjectOrFunc(rawVal) && rawVal !== undefined) {
        const queryStore = Value.getExistingValue(rawVal);
        if (queryStore !== undefined) {
            //Value object already exists in value store.
            return queryStore;
        }
    }


    const valueInstance = TypeSymstemObject(ValueInstProto);

    //Name can be changed by method in prototype
    valueInstance.name = (rawVal === undefined) ? "Free Value Variable" : rawVal.toString().slice(0,40);
    valueInstance.category = "value";

    //This should eventually be changed to a deep clone of the value so it can't be affected by stuff happening outside the type system.
    valueInstance.terms.rawJS  = cloneDeep(rawVal);

    Value.addValue(valueInstance)

    return valueInstance;
}

Value.valuesStore = new Map(); //Private

Value.isValue = function (thing) {
    return inTypeSystem(thing) &&  thing.category === 'value';
}

Value.getExistingValue = function (rawJS) {
    const valueInst = Value.valuesStore.get(rawJS);
    if (valueInst === undefined) {
        return undefined;
    } else {
        return valueInst;
    }
}

Value.addValue =  function (valueInst) {
    const {rawJS} = valueInst.terms;

    if ((!isObjectOrFunc(rawJS) && rawJS !== undefined)) {
        Value.valuesStore.set(rawJS, valueInst);
    }
}


const ValueInstProto = {
    getRawJS () {
        const rawJS = this.terms.rawJS;
        return cloneDeep(rawJS)
    },
    specifyValue(value) {
        if (this.terms.rawJS !== undefined) {
            throw new Error("Attempted to specify the value of a bound value variable.")
        } else {
            const query = Value.getExistingValue(value);
            if (query === undefined) {
                this.terms.value = cloneDeep(value);
                Value.addValue(this);
                return this;
            } else {
                return query;
                //The problem with this is we lose the referential identity of the value object. It substitutes the existing value object which is good in terms of having one cannonical object, but bad because any references to the object which had the free variable will still point to the free variable object, i.e., there is no record of the fact that this free variable was specified.
                //Maybe I am expecting too much from a value object. I could force value objects to always have a defined value. Then the possibilty of a free value variable would only exist at the level of simple types. YES, that's the solution.
            }

        }
    },

}




module.exports = {
    Value
}