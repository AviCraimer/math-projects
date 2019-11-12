const assert =  require('assert');


const getArrowCompositionSignature = function (arrowsArr) {

    let sig = `{${arrowsArr[0].sourceId}}${arrowsArr[0].id}{${arrowsArr[0].targetId}}`;

    //Example
    //"{tic57mvhb573vut}70pjtqp8hd2hm75{tic57mvhb573vut}";
    // Source object id, arrow, target object id

    const len = arrowsArr.length;

    for (let i = 1; len > 1 && i < len; i++) {
        const arrow = arrowsArr[i];
        const prevArrow = arrowsArr[i-1];

        if (prevArrow.targetId === arrow.sourceId  ) {
            sig += `${arrow.id}{${arrow.targetId}}`
        } else {
            //arrows are not composable
            return false;
        }
    }

    return sig;
}



const humanReadable = "{tic57mvhb573vut}--70pjtqp8hd2hm75-->{aic67mv3b5v3sin}--i3qon6a5lnpbbmg-->{tic57mvhb573vut}";

const machineReadable = "{tic57mvhb573vut}70pjtqp8hd2hm75{tic57mvhb573vut}";









//Test
const testArrows = [{id: 'a1'},{id:'a2'},{id:'a3'}]

console.log("getArrowCompositionSignature: ",
getArrowCompositionSignature(testArrows) === 'a1->a2->a3');

//idea, to make it more similar to morphism composition notation.
// 'a1*a2*a3=a4*a5'

module.exports = {
    getArrowCompositionSignature
}