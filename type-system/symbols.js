
const syms = {
typeSystemSym:  Symbol("This javascript object is part of the type system"),
freeValueSym: Symbol("This variable does not have a fixed value, but ranges across it's type domain"),
complexValueSym: Symbol("This is a value instance for a complex value type")
}


module.exports = {
    ...syms
}