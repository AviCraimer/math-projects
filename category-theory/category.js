const {isSet  } = require('lodash');
const {getArrowCompositionSignature} = require('./arrows');
const {uuid32} = require('util');

const arrowsInSym = Symbol('arrows in');
const arrowsOutSym = Symbol('arrows out');


function Category (name = "") {
    const cat = Object.create(catProto);
    const catProps = {
        id: uuid32(),
        name,
        objects: {},
        arrowsExplicit: {}
    }

}

const catProto = {
    addObject (name = "") {
        const id = uuid32();

        const obj =  {
            id,
            name,
            arrows: {
                in: {
                    [arrowsInSym]: true
                  },
                out: {
                    [arrowsOutSym]:true
                }
            }
        }

        this.objects[id] = obj
        return obj;
    },
    addArrow (sourceId, targetId = sourceId, name = "", decompositions = {}) {
        const id = uuid32();

        const signature = `${sourceId}->${targetId}`;

        const arrow =  {
            id,
            name,
            decompositions,
            signature,
            source: sourceId,
            target: targetId
        }

        this.arrowsExplicit[id] = arrow;
        const source = this.objects[sourceId];
        const target = this.objects[targetId];

        const updateObjectArrows = (obj, signature, inOut) => { //true for in

            const arrows = obj.arrows[(inOut)?'in' : 'out'];

            //Get the arrows form source to target
            //This will be undefined if none exist
            let arrowsA_B = arrows[signature];

//Arrow signature example:
//"70pjtqp8hd2hm75::{uehu99imnk9cuo0}->{i3qon6a5lnpbbmg}"

            //Check if a set already exists
            if( isSet(arrowsA_B )  ) {
                //Add the idea of the new arrow
                arrowsA_B.add(id)
            } else {
                arrows[signature] = new Set([id]);

                const sym = (inOut) ? arrowsInSym : arrowsOutSym;
                arrows[signature][sym] = true;
            }
        }

        updateObjectArrows(source, signature, false);
        updateObjectArrows(target, signature, true);

        return arrow;
    }


}


/// Start with one object
//Look at it's explict out arrows

// Follow first one to next object,

//from that object all explict out arrows

// Make composition arrows (checking whether these compositions already exist.)