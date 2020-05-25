const pipe =  (...fns) => initialValue =>  fns.reduce( (result , f ) => f(result), initialValue   )

const trace = logLabel => value => {
    console.log(logLabel, " -- ", value  )
    return value;
}

pipeTrace = (...fns) => {
    const withTraces = [trace("Initial value")];
    fns.forEach( f => {
        withTraces.push(f);
        withTraces.push(trace( f.name ))
    }  )
    return pipe(...withTraces);
}

addIsACat = str => str + " is a Cat."

toWords = str => str.split(" ");

const wordsPlusThree = pipeTrace( addIsACat, toWords)

// wordsPlusThree("Frank Wright" )


getFunctionWithType =  ({domain, codomain} )  => untypedAtomicFunction => {
    untypedAtomicFunction.type = {
        "->": {domain, codomain}
    }
    return untypedAtomicFunction;
}

const addIsACatTyped = getFunctionWithType({domain:  "String", codomain: "String"})(addIsACat)
const toWordsTyped =  getFunctionWithType({domain: "String", codomain: {Array: "String"} } )(toWords)

// console.log(addIsACatTyped,
//     toWordsTyped)

const tPipe  =  (...fns) => {
    //If g is true for intial value, if g is ever false, then it will reduce to false. If all the functions pass, it it return the last function. The condition also checks that it is a typed function by looking for the "->" key.
    const isComposable =  fns.reduce( (g, f) =>  {
        return   ( g === true || (f.type["->"] &&  _.isEqual(g.type["->"].codomain, f.type["->"].domain) ) ) ? f : false
    },  true );


    if (isComposable !== false && fns.length > 0) {
        return  getFunctionWithType({domain: fns[0].type["->"].domain, codomain: fns[fns.length - 1].type["->"].codomain})(pipeTrace(...fns))
    } else {
        throw  Error ("The functions passed to tPipe are not composable typed functions or no functions were passed" );
    }

}


tPipe(addIsACatTyped, toWordsTyped )("dog")

// tPipe(toWordsTyped   ,addIsACatTyped)("dog")


const Z = (() => {
    const Zero = Symbol("Zero")
    return () => ({
        value: Zero,
        type: "Nat"
    })

})();

const S = nat => ({
    value: { S: nat.value }, //We don't want to duplicate the type property
    type: "Nat"

} )


const numberToNat = num => {
    let nat =  Z();

    for (let i = 1; i <= num; i++) {
        nat = S(nat)
    }
    return nat;
}



const natValueToNumber =  natValue => {
    if (natValue  === Z().value) {
        return 0;
    }

    return 1 + natValueToNumber(natValue.S)
}

const natToNumber = nat => natValueToNumber(nat.value);

let nat3 = numberToNat(3);

let number3 = natToNumber(nat3)

//Note some testing shows that it can handle nats of about 42000.


// const S = (() => {

//     const Suc = Symbol("Successor of")
//     return nat => {
//         const sNat = {
//             type: "nat"
//         }
//         sNat[Suc] = nat.value //We don't want to duplicate the type property
//         // console.log(nat.value)
//         return sNat;
//     };

// })();


// const numberToNat = num => {
//     let nat =  Z();

//     for (let i = 1; i <= num; i++) {
//         console.log(nat)
//         nat = S(nat)
//     }
//     return nat;
// }
