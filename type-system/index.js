const {TypeSystem} = require('./TypeSystem')
const {ValueTypes, valueTypesRegistry} = require('./Value');
const {instanceAll} = require('./utils')


const valueTypeInstances =  instanceAll(TypeSystem, ValueTypes, valueTypesRegistry);

module.exports = valueTypeInstances;
