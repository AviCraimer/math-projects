const fromArray = arr => {
    const objects  = arr.map(label => ({label}) )
    objects.forEach( (obj, i) => {
        obj.preceding = (i === 0) ? null : objects[i -1]
        obj.following = (objects[i+1]) ? objects[i+1]  : null
    } )

    return objects[0];
}

const findEnd = (obj) => {
    return (obj.following === null) ? obj : findEnd(obj.following)
}

const findStart = (obj) => {
    return (obj.preceding === null) ? obj : findStart(obj.preceding)
}

const isAfter = (obj, current) => {
    if (current.preceding === null) {
        return false;
    }
    return (current.preceding === obj) ? true : isAfter(obj, current.preceding )
}

const isBefore = (obj, current) => {
    if (current.following === null) {
        return false;
    }
    return (current.following === obj) ? true : isBefore(obj, current.following )
}

const areInSequence = (obj1, obj2) => {
    return findEnd(obj1) === findEnd(obj2)
}

const toArray = (obj) => {
    const first = findStart(obj)
    let current = first;
    let arr = [];
    while (current) {
        arr.push ( current.label);
        current = current.following;
    }

    return arr;
}

const id = x => x

const joinLinearOrders = (obj1, obj2, labelTransform1 = id, labelTransform2 = id) => {
    if (areInSequence(obj1, obj2) === false) {
        obj1 =  findEnd( obj1)
        obj2 = findStart( obj2 )
        obj1.label =  labelTransform1(obj1.label);
        obj2.label =  labelTransform2(obj2.label);
        obj1.following = obj2;
        obj2.preceding = obj1;
        return findStart(obj1)
    } else {
        //Already in sequence so no change.
        return findStart(obj1)
    }
}

const subOrder = (start, end, label = null) => {
    if (areInSequence(start, end)) {
        return {
            start, end, label
        }
    } else {
        return null;
    }
}


let a = fromArray("Converting speech and silence into one another".split(" "))

let b = fromArray("Is a quote from Merleau-Ponty".split(" "))

const together = joinLinearOrders(a, b,  a => a + ".")
console.log(toArray(  together ).join(" ") )
        //Output: "Converting speech and silence into one another. Is a quote from Merleau-Ponty"

