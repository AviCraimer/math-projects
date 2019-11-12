const _ = require('lodash');
const {listN} = require('./utils');
const {isEqual, isPlainObject} = _;
const {cartesianProduct, operationDirectProduct} = require('./cartesianProduct');
const {groupObjectSym} = require('./symbols');


function addModN (n) { // Returns a function for addition modulo n, n must be a positive integer
    if ( !(Number.isInteger(n) && n > 0)) {
        throw new Error();
    }


    const modN =  function (a,b) {
        if (Array.isArray(a) || Array.isArray(b)) {
            if (a.length !== 1) {
                throw new Error();
            }
            if (b.length !== 1) {
                throw new Error();
            }
        }

        a = (Array.isArray(a)) ? a[0]  : a;
        b = (Array.isArray(b)) ? b[0]  : b;

        return (a + b)  % n;
    }
    Object.defineProperty(modN, "name", { value: "mod" + n });
    modN.modulo = [n];
    return modN;
}

function modDirectProduct (modFunc1, modFunc2) {
    const prod = operationDirectProduct(modFunc1, modFunc2);

    prod.modulo = [...modFunc1.modulo, ...modFunc2.modulo]
    Object.defineProperty(prod, "name", { value: "mod" + prod.modulo.join('_') });
    return prod;
}


function cyclicGroup (n) {
    return {
        groupElements: listN(n),
        groupOperation: addModN(n),
        name: "Z" + n,
        [groupObjectSym]: true
    }
}



function directProductOfGroups (g1, g2, composeOperationsFunction = operationDirectProduct) {

    //Check that both arguments are group objects.
    if (!(isPlainObject(g1) && isPlainObject(g2) && g1[groupObjectSym] && g2[groupObjectSym] ) ) {
        throw Error;
    }


    const productGroup = {
        groupElements: cartesianProduct(g1.groupElements,g2.groupElements),
        groupOperation: composeOperationsFunction(g1.groupOperation,g2.groupOperation),
        name: g1.name + "_X_" + g2.name,
        [groupObjectSym]: true
    }
    return productGroup;
}


function definingEquations (modFunc, equations, name = "") { //array of objects
    //Example: ba = ab^2

    // inputs:  [0,1], [1,0]
    // output: [1,2]

    if (!modFunc.modulo) {
        throw new Error("Not a modulo operation");
    }

    const size = modFunc.size;
    equations.forEach(equation => {

        const [a,b] = equation.inputs;
        const c = equation.output;

        let throwError = (a.length === b.length && b.length === c.length ) ? true : false;
        throwError = (!a.length === size) ? true : false;

        if (throwError) {
            console.error("Defining equation arrays are the wrong size", "\nFunction Size: ", size , "\nDefining equation arrays:",  a,b,c);
            throw new Error("");
        }

    });

    const newFunc = function (list1, list2) {
        for (const equation of equations) {
                const {inputs, output} = equation;
                if (isEqual([list1, list2], inputs)) {
                    return output;
                }
        }
        return modFunc(list1, list2);
    }

    newFunc.generators = modFunc.modulo;
    newFunc.size = modFunc.size;
    newFunc.defEq = equations;
    Object.defineProperty(newFunc, "name", { value:  name + "__gen" + newFunc.generators.join('_')});


    return newFunc;
}


const g_2_X_3 = directProductOfGroups(  cyclicGroup(2), cyclicGroup(3), modDirectProduct);




// const Z2_X_Z2_X_Z3 = directProductOfGroups(cyclicGroup(2),  g_2_X_3, modDirectProduct);
// console.log(Z2_X_Z2_X_Z3);

let a = [1,0], b = [0,1];
let op = g_2_X_3.groupOperation;

// console.log(op)
console.log(   op([1,0], [0,1]) )


const ba_ab2 = [
    {
        inputs: [[0,1],[1,0]] ,
        output: [1,2]
    }
]

op = definingEquations(op, ba_ab2, "S3"    )

console.log(op.defEq[0]);
// console.log(   op([1,0], [0,1]) )
console.log(   op([0,1], [1,0]) )
// console.log(cyclicGroup(2).groupOperation([1],[0,2]))

// let [,a,,,, b]  =  Z2_X_Z2_X_Z3.groupElements;


// let op = Z2_X_Z2_X_Z3.groupOperation;
// console.log("Z2_X_Z2_X_Z3.groupOperation",  op)


// console.log("a, b, op(a,b)\n",  a,b,   op(   a,b ))

