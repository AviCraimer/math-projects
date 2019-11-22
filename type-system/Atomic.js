
const Atom = function (type) {
    //An Atom is a type that either is a Value type, or a Value type that is wrapped in another type with a singleton type variable

    if ( !inTypeSystem(type) ) {
        return (Value(type));
    }

    if (type[syms.Value]) {
        return type
    }

    //Dive inside the type and see if it contains just one variable that ranges over values or Values.
    const variables = type.terms ;
    const varNames = Object.keys(variables);

    if (varNames > 1) {
        return false;
    }

    //The single variable does not have a type of Value, hence it is not an atom
    if (!varNames[0].type === Value) {
        return false
    }
    //Now we know that the input is a type that it has a single variable that ranges over Values. We also know (from earlier) that this type is not itself a Value type.

    //Next we unwrap the variable and re-wrap it as an instance of the Atom type.
    const value = variables[varNames[0]];

    const atomInst = TypeSymstemObject();
    atomInst.name = "Atom Instance";
    atomInst.category = "atomic";

    //The value will be either undefined, or the singletonType that was wrapped in the input type.
    atomInst[syms.terms]["value"] = value;

}