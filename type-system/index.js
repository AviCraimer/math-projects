// const syms = {
//     set: Symbol("A type's Set"), // May be a javascript set object or a function that will test any element for membership
//     inst: Symbol("Instanciate a type"), // A type method that takes an argument and returns an representative of given type.
//     singletonElement: Symbol("A singleton element")
// }


const intersection = (a,b) => {
    return new Set([...a].filter(x => b.has(x)) );
}



const typeSyms = {
    Type: Symbol("This is a type"),
    TypeInstance: Symbol("Is Type Instance"),
    String: Symbol("Is of String Type"),
    Pair: Symbol("Is of Pair Type")
}




const typeProto = {
    // getTypeSym: function () {
    //     return typeSyms[this.type]
    // },
    same: function (typeInstance) {
        const commonTypes = intersection(this.types, typeInstance.types);
        if (commonTypes.size === 0 ) {
            return false;
        } else {
            return commonTypes;
        }
    }
}



function Type (obj) {
    if ( obj.types &&  obj.types.add) {
        obj.types.add('Type');
    } else {
        obj.types = new Set(["Type"])
    }
    obj[typeSyms.Type] = true;

    let typeFunc = function  (...args) {
        return obj.constructor(...args);
    };
    typeFunc = typeFunc.bind(typeFunc);
    typeFunc.same = typeProto.same.bind(typeFunc);

    Object.assign(typeFunc, obj);

   return Object.freeze(typeFunc);
}

const TypeInstance = function (obj) {
    if ( obj.types &&  obj.types.add) {
        obj.types.add('TypeInstance');
    } else {
        obj.types = new Set(["TypeInstance"])
    }
    obj[typeSyms.TypeInstance] = true;
   return Object.freeze(Object.assign(Object.create(typeProto), obj));
}

const typeConstructors = {
    String: function (el) {
        const val = el.toString();
        const str = {
            types: new Set([this.name]),
            val,
            toString: () => {
                return val
            }
        }
        return TypeInstance(str)
    },
    Pair: function (car, cdr) {
        const pair = {
            car,
            cdr,
            types: new Set([this.name])
        };


        if (car.types && car.types.has("Type") && cdr.types && cdr.types.has("Type")  ) { //Both sides of pair are types
            //Returns a new type


            return Type(pair)
        } else {
            //Returns a Type instance
            return TypeInstance(pair);
        }
    }
}

function bindFuncToSelf ([name, func]) {
    func = func.bind(func);
    Object.defineProperty(func, "name", { value:  name });
    return func;
}

function bindFuncBag (functionBag) {
    Object.entries(functionBag).map( bindFuncToSelf).forEach(fn => functionBag[fn.name] = fn );
}

function wrapFuncBag (functionBag) {
    Object.entries(functionBag).map( bindFuncToSelf).forEach(fn => functionBag[fn.name] = fn );
}

function transformEntries (obj, ...callbacks) {
    let nextCallback = callbacks[0];
    return Object.entries(functionBag)
        .map(([key, value]) => {
            let transformedValue = value;
            callbacks.forEach(callback => transformedValue = callback(transformedValue) )
            return [key, transformedValue];
        });
}

function fromEntries (entires) { //Creates a new object from entries.
    let obj = {};
    entries.forEach(([key, value]) => obj[key] = value )
    return obj;
}

function getTransformedObject (obj, ...callbacks) { //Transformed values and returns a new object with same properties
    return fromEntries(transformEntries(obj, ...callbacks));
}

function transformObject (obj, ...callbacks) { // Takes an object, transforms  values, then replaces then mutates the  properteis in the same object with the new values
    let entries = transformEntries(obj, ...callbacks);
    entries.forEach(([key, value]) => obj[key] = value )
    return obj;
}



bindFuncBag(types, Type);
