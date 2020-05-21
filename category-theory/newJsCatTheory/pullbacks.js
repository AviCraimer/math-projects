

const dynamicSet = testFunction =>  {
    return ({
        has (value) {
            return testFunction(value);
        }
    })
}

const isPerfectSquare = x => Math.sqrt(x) === Math.floor(Math.sqrt(x))

const perfectSquares = dynamicSet(isPerfectSquare );

const isEvenNumberOfLetters = str => (str.length % 2) === 0;

const evenLetters = (dynamicSet(isEvenNumberOfLetters))



const evenLettersToLength = (x) => {
    if (evenLetters.has(x)) {
        return x.length;
    } else {
        throw new error(x,  "is not in the set")
    }
}

const eachPerfectSqaure = (x) => {
    if (perfectSquares.has(x)) {
        return x;
    } else {
        throw new error(x,  "is not in the set")
    }
}

getPullback (evenLettersToLength, eachPerfectSqaure)