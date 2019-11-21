const syms = {
    Type: Symbol("This is a type"),
    variablesKey: Symbol("Key for type variables"),
    SingletonValue: Symbol("This is a singleton Value type"),
    TypeInstance: Symbol("Is Type Instance"),
    String: Symbol("Is of String Type"),
    Pair: Symbol("Is of Pair Type")
}

const isObjectLike = x => ['object','function'].includes(typeof x)


const markType = function (type = {})  {
    //If not object or function it's invalid
    if (!isObjectLike(type)) {return false;}

    //Mark with special symbol that indicates it is part of the type system.
    type[syms.Type] = true;
    return type;
}

const typeTemplate = function (...prototypes) {
    const proto = {};

    prototypes.forEach(p => Object.assign(proto, p));

    const template = Object.create(proto);

    Object.assign(template, {
        name: "",
        category: "", // value, atomic, or higher
        [syms.variablesKey]: {},
        [syms.Type]: true
    });

    return template;
};


const isType = function (type) {
    if (!isObjectLike(type)) {return false;}

    return  (type[syms.Type]) ? true : false
}

//This function should be memoized so it doesn't return multiple distinct singletons for the same value input.
//Definition of "Same" here should be deep equality, but this is problematic for as number of values gets big
//In practice, singleton values should be literals such as strings, numbers, or symbols.
const SingletonValue = function (value, ...args) {
    //If more than one value is passed as an argument, it cannot be a singleton, return false
    if (args.length !== 0) {
        return false;
    }


    //If the value is undefined, then the variable is considered free
    //The value can later by specified. In this way, you can have an instance of a singletonValue with a free variable, that is it represents any single value.
    //Once a SingletonValue has been specified, that instance cannot be unspecified. Another instance can be generated from the type constructor.

    if (isType(value)) {
        //Dive inside to see if there is just a single bound instance variable, if so return that value with singleton wrapper.

        //Come back to this after I've written more types
    }

    const singleton = typeTemplate(singletonProto);

    //Name can be changed by method in prototype
    singleton.name = value.toString().slice(0,40);
    singleton.category = "value";

    //This should eventually be changed to a deep clone of the value so it can't be affected by stuff happening outside the type system.
    singleton[syms.variablesKey]["value"] = value;

    singleton[syms.SingletonValue] = true;
    return singleton;
}


const singletonProto = {
    getValue () {
        ///Eventually return a deep copy
        return this[syms.variablesKey]["value"]
    },
    specifyValue(value) {
        if (this[syms.variablesKey]["value"] !== undefined) {
            return false;
        } else {
            this[syms.variablesKey]["value"] = value;
            return this;
        }
    }
}


const Atom = function (type) {
    //An Atom is a type that either is a SingletonValue type, or a SingletonValue type that is wrapped in another type with a singleton type variable

    if ( !isType(type) ) {
        return (SingletonValue(type));
    }

    if (type[syms.SingletonValue]) {
        return type
    }

    //Dive inside the type and see if it contains just one variable that ranges over values or singletonValues.
    const variables = type[syms.variablesKey];
    const varNames = Object.keys(variables);

    if (varNames > 1) {
        return false;
    }

    //The single variable does not have a type of SingletonValue, hence it is not an atom
    if (!varNames[0].type === SingletonValue) {
        return false
    }
    //Now we know that the input is a type that it has a single variable that ranges over singletonValues. We also know (from earlier) that this type is not itself a SingletonValue type.

    //Next we unwrap the variable and re-wrap it as an instance of the Atom type.
    const value = variables[varNames[0]];

    const atomInst = typeTemplate();
    atomInst.name = "Atom Instance";
    atomInst.category = "atomic";

    //The value will be either undefined, or the singletonType that was wrapped in the input type.
    atomInst[syms.variablesKey]["value"] = value;

}
