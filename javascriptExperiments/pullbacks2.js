
                    // (a -> Bool)
const DynamicSet = membershipFunction => {
    const dynamicSet =  function (value) {
        return !dynamicSet.membershipFunctions.map(fn => fn(value)).includes(false)
    };
    dynamicSet.membershipFunctions = [membershipFunction]

    return dynamicSet;

}


const isNumber = n => typeof n === "number" && n !== NaN;
const isString = s => typeof s === "string";

const greaterThan5 = n => isNumber(n) && n > 5;



const numbersGreaterThan5 = DynamicSet(greaterThan5)
const strings = DynamicSet(isString);
const numbers = DynamicSet(isNumber);

const setFunction = (domain, codomain, fn) => {
    const setFunction = (x => {
        if (!domain(x)) {
            return undefined;
        } else {
            const result = fn(x);
            return (codomain(result)) ? result : new Error("result is not in the codomain")
        }
    });

    setFunction.domain = domain;
    setFunction.codomain = codomain;

    return setFunction;
}

const numberOfWords  = setFunction(strings, numbers, str => str.split(" ").length);
const fiveLessButPositive =   setFunction( numbersGreaterThan5, numbers, n => n - 5)

const getPullback = (setFn1, setFn2 ) => {
    if (setFn1.codomain !== setFn2.codomain) {
        throw new Error("Codomains don't match")
    }

    const membershipFunction = val => {
        if (!Array.isArray(val)) {
            return false;
        }
        const [a, b] = val;
        return setFn1.domain(a) && setFn2.domain(b) &&  setFn1(a) === setFn2(b)
    }

    const pullback = DynamicSet(membershipFunction);

    pullback.elementShape = [setFn1.domain, setFn2.domain];

    pullback.universal = {
        type: "pullback",
        inputs: [setFn1, setFn2]
    }

    pullback.first = (el) => {
        if (pullback(el)) {
            return el[0];
        } else {
            return undefined;
        }
    }

    pullback.second = (el) => {
        if (pullback(el)) {
            return el[1];
        } else {
            return undefined;
        }
    }

    return pullback;
}


const pullback1 = getPullback(numberOfWords, fiveLessButPositive)


