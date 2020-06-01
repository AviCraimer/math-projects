
setEquality = (set1, set2) => {
    const set2Copy =  new Set( set2.values() );

    for (const el of set1) {
        if (set2Copy.has(el)) {
            set2Copy.delete(el);
        } else {
            return false;
        }
    }

    if (Array.from(set2Copy).length === 0) {
        return true;
    } else {
        return false;
    }
}

arrayShallowEq = (arr1, arr2) => {
    if (arr1.length === arr2.length) {
        const nonEqual = arr1.filter( (x,i) => x !== arr2[i])
        return (nonEqual.length === 0) ? true : false;
    }
    return false;
}

const isSubsetOf =  (set1, set2) => {
    for (const el of set1) {
        if (!set2.has(el)) {
            return false;
        }
    }
    return true;
}

const setFunction = (domainSet, codomainSet, map) => {
    //Verfiy that the map contains keys for all elements of domain set
    const mapKeys =   new Set(map.keys());
    if (!setEquality(domainSet, mapKeys) )  {
        throw new Error ("In setFunction call, domain set and map keys are not equal.")
    }

    //Verify that all values of the map are in the codomain set
    const mapValues = new Set(map.values());

    if (!isSubsetOf(mapValues, codomainSet) ) {
        throw new Error ("In setFunction call, map has values which are not in codomain set.")
    }

    //Return function  keys domain, codomain, and map
    const setFunction = (x) => map.get(x);

    setFunction.map = map;
    setFunction.domain = domainSet;
    setFunction.codomain = codomainSet;

    return setFunction;
}

const zip = (arr1, arr2) => {
    return arr1.map( (x, i) => [x, arr2[i]] )
}

const setZipToArray = (set1, set2) => {
    const arr1 = Array.from(set1)
    const arr2 = Array.from(set2)

    return  zip(arr1, arr2);
}

const nub = (arr) => Array.from(new Set(arr));


const allTrue = arrBool => arrayShallowEq(nub(arrBool), [true]   )

const identityFunction = (set) => setFunction(set, set, new Map(setZipToArray(set, set)) )

const arrayProducts =  (...arrays) =>  Combinatorics.cartesianProduct(...arrays).toArray()
const setsToArrayProducts =  (...sets) =>  arrayProducts(...sets.map(s => Array.from(s) ))
const setProducts =  (...sets) =>  new Set(setsToArrayProducts(...sets))

const numRange = (start = 0) => end => {
    const range = [];
    if (end < start) {
        for (let i = start; i >= end; i--) {
            range.push(i)
        }
    } else {
        for (let i = start; i <= end; i++) {
            range.push(i);
        }
    }
    return range;
}

const rangeFromZero = numRange(0)

const testProducts = setsToArrayProducts(new Set([1,2,3]), new Set(["A","B"]), new Set(["cat","dog"]));
console.log({testProducts})

const getLimit = (...setFunctions) => {
    const sets = new Set();
    const domains = new Map ();
    // const codomains = new Map();

    setFunctions.forEach(fn => {
        sets.add( fn.domain);
        sets.add(fn.codomain);
        if (domains.get(fn.domain )) {
            //get set of fns with this domain and add the current function
            domains.get(fn.domain).add(fn)
        } else {
            //create new set with current function
            domains.set(fn.domain, new Set([fn])  )
        }

        // //Same for codomains
            // //Not sure if we need this for limits?
            // if (codomains.get(fn.codomain )) {
            //     //get set of fns with this codomain and add the current function
            //     codomains.get(fn.codomain).add(fn)
            // } else {
            //     //create new set with current function
            //     codomains.set(fn.codomain, new Set([fn])  )
            // }
    });

    const setsArr = Array.from(sets);
    const setsToIndexes = new Map();
    setsArr.forEach( (set,i ) => setsToIndexes.set(set, i));


    //Take the product of all the sets
    const productArr = setsToArrayProducts(...setsArr);
    console.log({setsArr, setsToIndexes, domains, sets, productArr})
    const filterTuples = tuple => {
        const tupleElementOk = tuple.map( (x, i) => {
            const setXBelongsTo = setsArr[i];
            const fnsFromX = domains.get(setXBelongsTo) ? Array.from(domains.get(setXBelongsTo)) : [] ;

            //If there are no functions from x the element passes, else, check limit condition
            return (fnsFromX.length === 0) ? true :  allTrue(fnsFromX.map(fn => fn(x) === tuple[setsToIndexes.get(fn.codomain)]))
        });

        console.log({tuple, tupleElementOk})
        return allTrue(tupleElementOk);
    }

    const limitArray = productArr.filter(filterTuples);
    console.log("Limit array", limitArray);

    const limitSet = new Set(limitArray);

    const tupleSize = limitArray[0].length - 1;
    const projectionIndexes = rangeFromZero(tupleSize);

    const projections = projectionIndexes.map(
        i =>  {
            const projectedElements =  limitArray.map(tuple => tuple[i]);
            // console.log({i},  new Map(  zip(limitArray, projectedElements)) )
            return setFunction(limitSet, setsArr[i], new Map( zip(limitArray, projectedElements) )  )
        });

    return {set: limitSet, diagram: setFunctions, projections};
}




//TESTING

setA = new Set([1,"a",2])

setB = new Set([1,2,"a"])

setC = new Set([1,2,"b"])
setD = new Set([2,"a"])

console.log("setA = setB", setEquality(setA, setB))
console.log("setB = setA", setEquality( setB,setA))
console.log("setA != setC", setEquality( setA,setC))
console.log("SetD subset of SetB", isSubsetOf(setD, setB))
console.log("SetD is not subset of SetC", isSubsetOf(setD, setC))


const mapSetDToSetA = new Map();
mapSetDToSetA.set(2, "a");
mapSetDToSetA.set("a", 1);
console.log(Array.from(mapSetDToSetA.keys()), Array.from(setD))
console.log( setFunction(setD, setA, mapSetDToSetA))
console.log("Identity function", identityFunction(setD))


const limit1 = getLimit(setFunction(setD, setA, mapSetDToSetA) )
console.log({limit1})
