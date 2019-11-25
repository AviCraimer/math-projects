const { typeSystemSym,
    freeValueSym,
    complexValueSym,
    TypeSystem} = require('../TypeSystem');



describe("Test class instanciation", () => {
    it("New Type from empty object", () => {
        const type = new TypeSystem({});
        expect( Object.getPrototypeOf(type)).toBe( TypeSystem.prototype) ;
    })
});


describe("Test .is", () => {
    const testSingle = {
        is: function (thing) {
            if (Object.getPrototypeOf(this) ===  TypeSystem.prototype) {
                return true;
            }
        }
    }
    const testSequential = {
        is: new Set([
            function (val) {
                if (typeof val === 'string' && Object.getPrototypeOf(this) ===  TypeSystem.prototype) {
                    return true
                }
                return false;
            },
            function (val) {
                if (val.length === 5 && Object.getPrototypeOf(this) ===  TypeSystem.prototype) {
                    return true
                } else {return false}
            }
        ])
    };

    it("test single function is verify this binding", ()=> {
        // console.log("testSingle", testSingle, Object.getOwnPropertyDescriptors( Object.getPrototypeOf( testSingle.is) ))
        const singleIs = new  TypeSystem(testSingle);
        // console.log(singleIs)
       expect(singleIs.is("str" )  ).toBe(true)
       expect(singleIs.is(5)).toBe(true)
       expect(singleIs.is( )).toBe(true)

    })

    it("test sequential function is verify this binding", ()=> {
        // console.log("testSingle", testSingle, Object.getOwnPropertyDescriptors( Object.getPrototypeOf( testSingle.is) ))
        const seqIs = new  TypeSystem(testSequential);
        // console.log(singleIs)
       expect(seqIs.is("str" )  ).toBe(false)
       expect(seqIs.is("12345" )).toBe(true)
       expect(seqIs.is(5)).toBe(false)
       expect(seqIs.is([1,2,3,4,5] )).toBe(false)
       expect(seqIs.is( )).toBe(false)

    })



})