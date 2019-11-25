const {typeSystemSym,
    freeValueSym,
    complexValueSym} = require('./symbols')


const {isEqual, cloneDeep, isObjectLike, isSet}  = require('lodash');

const isObjectNotFunc  = isObjectLike;

const isObjectOrFunc = x => {
    if (x === null) {return false}
    return ['object','function'].includes(typeof x);
}


const inTypeSystem = function (thing) {
    if (!isObjectOrFunc(thing)) {return false;}
    return  (thing[typeSystemSym]) ? true : false
}

const assignNames = function (objOfObjects) {
    for (const name in objOfObjects) {
        if (objOfObjects.hasOwnProperty(name)) {
            const innerObj = objOfObjects[name];
            innerObj.name = name;
        }
    }
}


const base32Digits = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v']

const uuid32 = function (length = 15, prefix = "", suffix = "") {

    //Creates a random 10 digit base 32
    let id = "";
    for (let i = 0; i < length; i++) {
        id +=  base32Digits[Math.floor(Math.random()*32)];
    }
    return prefix + id + suffix;
}

const assignIds = function (collectionOfObjects, registry, prefix, suffix ) {
    Object.values(collectionOfObjects).forEach(innerObj => {
        innerObj.id = uuid32(15, prefix, suffix);
        registry[innerObj.id] = innerObj;
    });
}

const instanceAll = function (Class, objOfArguments, registry) {
    const instances = {};

    for (const name  in objOfArguments) {
        if (objOfArguments.hasOwnProperty(name)) {
            const argument = objOfArguments[name];
            // console.log("instanceAll", argument);
            instances[name] = new Class(argument, registry);
        }
    }
    return instances;
}


module.exports = {
    isEqual,
    isSet,
    cloneDeep,
    isObjectNotFunc,
    isObjectOrFunc,
    inTypeSystem,
    assignNames,
    uuid32,
    assignIds,
    instanceAll
}