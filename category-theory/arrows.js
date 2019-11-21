const {uuid32} = require('util');

const getArrowCompositionSignature = function (arrowsArr) {

    let sig = `{${arrowsArr[0].source}}${arrowsArr[0].id}{${arrowsArr[0].target}}`;

    //Example
    //"{tic57mvhb573vut}70pjtqp8hd2hm75{tic57mvhb573vut}";
    // Source object id, arrow, target object id

    const len = arrowsArr.length;

    for (let i = 1; len > 1 && i < len; i++) {
        const arrow = arrowsArr[i];
        const prevArrow = arrowsArr[i-1];

        if (prevArrow.target === arrow.source ) {
            sig += `${arrow.id}{${arrow.target}}`
        } else {

            console.error(`Arrow ${prevArrow.id} has as target ${prevArrow.target}, while the next arrow ${arrow.id} has as source ${arrow.source}

            ${prevArrow.target} != ${arrow.source}
            `);
            throw new Error('Arrows are not composable')

        }
    }
    console.log("Signature for\n", arrowsArr, "\n", sig );
    return sig;
}


const humanReadableSig = function (machineSig) {

}


function tests () {
    const testArrows1 = [
        {id: 'a1', source: 'o1', target: 'o2'  },
        {id:'a2', source: 'o2', target: 'o3'},
        {id:'a3', source: 'o3', target: 'o4'}
    ]

    const testArrows2 = [ //Not composable
        {id: 'a1', source: 'o1', target: 'o2'  },
        {id:'a2', source: 'o10', target: 'o3'},
        {id:'a3', source: 'o3', target: 'o4'}
    ]

    const test1 = getArrowCompositionSignature(testArrows1);
    console.log('test 1 pass/fail', test1 === "{o1}a1{o2}a2{o3}a3{o4}");

    getArrowCompositionSignature(testArrows2);
    //Expect error
}

//run tests with test command.
if (process && process.argv &&  process.argv.includes("test")) {
    tests();
}



module.exports = {
    getArrowCompositionSignature
}