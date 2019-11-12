const getPermutations = require('get-permutations')
const _ = require('lodash');
const {listN, fac, randomElement} = require('./utils');
const {isEqual} = _;


function permutationName (permutationList) { //Gets a unique string that works as an object key from permutation array
    return 'p_' + permutationList.join('_');

}


function permutationFunction (listPermuted) {
    //Takes a list of N numbers from 0 to N a function that permutes a list of the same n elements according to that list.

    const permFunc = function (listToPermute) {

        return listToPermute.map((toPermute) => {
            //Using the number from listToPermute as an index in the listPermuted gets us the permuted value. However, the order in the new list is determined by the order of listToPermute so the function isn't just changing listToPermute into listPermuted.

            const permuted = listPermuted[toPermute];
            return permuted;
        })
    }
    permFunc.size = listPermuted.length;

    Object.defineProperty(permFunc, "name", { value: permutationName(listPermuted) });
    permFunc.cycle =  generateCycle(permFunc);
    permFunc.order = permFunc.cycle.length;
    return permFunc;
}

function composePermutations (permFuncLeft, permFuncRight, optionalFunctionObj = {}) {
    //Composes two permutations into a new permutation function

    if (permFuncRight.size !== permFuncLeft.size ) {
        throw new Error("Permutation functions are different sizes!");
    }

    const start = listN( permFuncRight.size);

    const end = permFuncLeft(permFuncRight(start));

    //Check if the function is already in the function object
    const maybeFunction =   optionalFunctionObj[permutationName(end)];
    return (maybeFunction) ? maybeFunction : permutationFunction(end);
}



// console.log(getPermutations(listN(4)))

// const reverse3 = permutationFunction([2,1,0]);

// console.log(reverse3([0,1,2]),  " === [2,1,0] " )
// console.log(reverse3([1,0,2]), " === [1, 2, 0] " )
// console.log(reverse3 ( reverse3([0,1,2])) , " === [0,1,2] " )
// console.log(composePermutations(reverse3, reverse3)([0,1,2])  )

function generateCycle (generator) {
    const start = listN(generator.size);

    const permCycle = [];

    let next;
    let failSafe = 0;
    while (!isEqual(start, next) && failSafe < 25) {
        if (!next) {
            next = start;
        }
        permCycle.push(next);
        next = generator(next);

        failSafe++;
    }
    return permCycle.map(a => permutationName(a));
}



function getSymmetricGroup (n) {
    const permutations = getPermutations(listN(n));

    const group = {};
    permutations.forEach((permList) => {
        const func = permutationFunction(permList);
        group[func.name] = func;
    });

    return group;
}


function getUniqueGeneratorCycles (group) {
    let values = Object.values(group);

    const generatorCycles = [];

    // {cycle: [], generators: []}

    values.forEach(v => {
        const {cycle} = v;
        let match = null;
        if (generatorCycles.length > 0) {
            for (let i = 0; i < generatorCycles.length; i++) {
                const knownCycle = generatorCycles[i].cycle;
                if ( _.xor(knownCycle, cycle).length === 0) {
                    match = generatorCycles[i];
                    break;
                }

            }
        }
        if (match === null) { //Cycle was not found in list
            generatorCycles.push( {
                cycle,
                generators: [v.name]
            } );
        } else { //cycle is already in the list
            match.generators.push(v.name);
        }
    }); //End values.forEach
    return generatorCycles;

}// end getUniqueGeneratorCycles

const numberOfCyclesOfEachLength = function (uniqueGeneratorCycles) {
    return uniqueGeneratorCycles.reduce((acc, cur) => {
        // console.log("acc:", acc, "\ncur: ", cur)
        const cycleLength = cur.cycle.length;

        const count = (acc[cycleLength]) ? acc[cycleLength] + 1 : 1;
        acc[cycleLength] =  count;
        return acc;
    }, {});
}

// const mCyclesInSn = function (m,n) {
// //https://proofwiki.org/wiki/Number_of_m-Cycles_in_Symmetric_Group

// //If we have a symetrical group S(n), we want to find how many cycles of length m
//     //This doesn't seem to work
//     let product = 1;
//     for (let i = n; i < (n - m +1) ; i--) {
//         product = product * i;
//     }
//     return product / m;
// }

function numberOfCyclesSymetricGroupToN (n) {
    const list = [{}];
    for (let i = 1; i <= n; i++) {
        const group = getSymmetricGroup(i);

        const genCycles = getUniqueGeneratorCycles(group);
        const numCycles =  numberOfCyclesOfEachLength(genCycles)
        // console.log({group, genCycles, numCycles});

        list[i] = numCycles;
    }
    return list;
}


function organizeByCycle (group) {

    //This is wrong. It doesn't take into account that a single element can feature in multiple cycles.

    //For example, in S4, p_1_0_3_2 is in both a two cycle and a 4 cycle. So the order is determined by the cycle generated by nothing other than the element itself, but other elements might generate the element in their cycles. This also says nothing about cycles that come from combining elements rather than just taking a single element to a power.

    //I need more math knowledge to solve this.







    const organized = {};
    let values = Object.values(group);

    //Get the identity identifier
    const identityName =  values[0].cycle[0];

    organized['e__' +  identityName ] = group[identityName];
    let groupRemaining  = {...group};
    delete groupRemaining[identityName];

    values = Object.values(groupRemaining)
    let cycleCounter = {};
    while (values.length > 0) {


        const func = values[0];
        const cycleLength = func.cycle.length;
        if (cycleCounter[ cycleLength ] === undefined) {


            cycleCounter[ cycleLength ] = 1;
        }

        const cycleNumber = cycleCounter[ cycleLength ];


        func.cycle.forEach( (p, exponent) => {
            if (exponent > 0) {
                const newKey = `c${cycleLength}#${cycleNumber}__${p}`;
                organized[newKey] = group[p];
                organized[newKey].cycleNumber = cycleNumber;

                delete groupRemaining[p];
            }
        });
        cycleCounter[cycleLength] = cycleCounter[cycleLength] + 1 ;
        values = Object.values(groupRemaining);

    }

    return organized;
}



// let generator = permutationFunction(randomElement(perms4) );
// console.log(generator([0,1,2,3]));

// console.log(generateCycle(generator))  ;

// console.log(isEqual([1,2,3], [1,2,3]  ));

const S4 = getSymmetricGroup(4);

const S4_gen_cycles = getUniqueGeneratorCycles(S4);

const S4_num_cycles = numberOfCyclesOfEachLength(S4_gen_cycles);



// console.log(S4_num_cycles)
// console.log( numberOfCyclesSymetricGroupToN(7));

// console.log(getSymmetricGroup (1))

console.log(numberOfCyclesOfEachLength(  getUniqueGeneratorCycles(   getSymmetricGroup(8) ) ))

//First seven generator cycles (eight including the empty group)

// I have validated that the values produced are correct according to this link

// https://oeis.org/A074881
const firstEight = [ {},
    { '1': 1 }, //1
    { '1': 1, '2': 1 }, //2
    { '1': 1, '2': 3, '3': 1 }, //3
    { '1': 1, '2': 9, '3': 4, '4': 3 }, //4
    { '1': 1, '2': 25, '3': 10, '4': 15, '5': 6, '6': 10 }, //5
    { '1': 1, '2': 75, '3': 40, '4': 90, '5': 36, '6': 120 }, //6  A lot of these numbers look familiar from polyheral geometry.
    { '1': 1, //7
      '2': 231,
      '3': 175,
      '4': 420,
      '5': 126,
      '6': 735,
      '7': 120,
      '10': 126,
      '12': 105 },
      { '1': 1, // 8  -- This took about 15 minutes to compute!
      '2': 763,
      '3': 616,
      '4': 2730,
      '5': 336,
      '6': 5320,
      '7': 960,
      '8': 1260,
      '10': 1008,
      '12': 840,
      '15': 336 }
    ];

