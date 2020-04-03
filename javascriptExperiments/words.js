

const strToWords = str => {
    const words = str.split(" ").map(str => ({text: str}) )
    words.forEach( (word, i) => {
        word.preceding = (i === 0) ? null : words[i -1]
        word.following = (words[i+1]) ? words[i+1]  : null
        word.selectionStarts = new Set()
        word.selectionEnds = new Set()
    } )

    return words[0];
}

const findEnd = (word) => {
    return (word.following === null) ? word : findEnd(word.following)
}

const findStart = (word) => {
    return (word.preceding === null) ? word : findStart(word.preceding)
}

const isAfter = (word, current) => {
    if (current.preceding === null) {
        return false;
    }
    return (current.preceding === word) ? true : isAfter(word, current.preceding )
}

const isBefore = (word, current) => {
    if (current.following === null) {
        return false;
    }
    return (current.following === word) ? true : isBefore(word, current.following )
}

const areInSequence = (word1, word2) => {
    return findEnd(word1) === findEnd(word2)
}

const wordsToStr = (word) => {
    const first = findStart(word)
    let current = first;
    let text = "";
    while (current) {

        text += " " + current.text;
        current = current.following;
    }

    return text.trim();
}


const joinText = (word1, word2, punctuation = "") => {
    if (areInSequence(word1, word2) === false) {
        word1 =  findEnd( word1)
        word2 = findStart( word2 )
        word1.text = word1.text + punctuation;
        word1.following = word2;
        word2.preceding = word1;
        return findStart(word1)
    } else {
        //Already in sequence so no change.
        return findStart(word1)
    }

}

let a = strToWords("Converting speech and silence into one another")

let b = strToWords("Is a quote from Merleau-Ponty")

const together = joinText(a, b, ".")


const selection = (start, end, selectionDataObj = {}) => {
    start.selectionStarts.add(selectionDataObj)
    end.selectionEnds.add(selectionDataObj)
    selectionDataObj.start = start;
    selectionDataObj.end = end;
    return selectionDataObj
}

/// Words form a linear order category

/// selections are sub-categories
   // Could be a functor from disjoint category with two objects labeled start and end

