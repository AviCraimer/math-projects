const {syms} = require('./symbols');

const {isEqual, cloneDeep, isObjectLike}  = require('lodash');

const isObjectNotFunc  = isObjectLike;

const isObjectOrFunc = x => {
    if (x === null) {return false}
    return ['object','function'].includes(typeof x);
}

const markTypeSystem = function (type = {})  {
    //If not object or function it's invalid
    if (!isObjectOrFunc(type)) {return false;}

    //Mark with special symbol that indicates it is part of the type system.
    type[syms.typeSystem] = true;
    return type;
}


const inTypeSystem = function (type) {
    if (!isObjectOrFunc(type)) {return false;}

    return  (type[syms.typeSystem]) ? true : false
}

const TypeSymstemObject  = function (...prototypes) {
    const proto = {};

    prototypes.forEach(p => Object.assign(proto, p));

    const template = Object.create(proto);

    Object.assign(template, {
        name: "",
        category: "", // value, atomic, or higher
        terms: {},
        [syms.typeSystem]: true
    });
    return template;
};

module.exports = {
    isEqual,
    cloneDeep,
    isObjectNotFunc,
    isObjectOrFunc,
    markTypeSystem,
    inTypeSystem,
    TypeSymstemObject

}