const syms = {
    typeSystem: Symbol("This javascript object is part of the type system"),
    terms: Symbol("Variable for a term, the term may be free or boud, type or value"),
        // term Object
        // {x : undefined } //Free term, scope determined by containing type
        // {x : 'abc'  }   // bound term
        // {x : SomeType} // bound term
}

module.exports = {
    syms
}