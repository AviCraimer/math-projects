const {
    isEqual,
    isSet,
    cloneDeep,
    isObjectNotFunc,
    isObjectOrFunc,
    inTypeSystem,
    assignNames,
    uuid32,
    assignIds,
    instanceAll
} = require('../utils');

const {TypeSystem} = require("../TypeSystem");



describe('Assign names to object of objects', () => {
    const obj = {
        foo: {},
        bar: {}
    }

    it('test', ()=> {
        assignNames(obj);
        expect(obj.foo.name).toBe("foo");
        expect(obj.bar.name).toBe("bar");
    })


} )

describe(" Instance all with class", () => {
    class TestClass {
        constructor (arg) {
            this.prop = arg
        }
    }


    const testArgs = {
        first: "abc",
        second: 123
    }

    it("Make instances and verify prototype and values", () => {
        const instances = instanceAll(TestClass, testArgs);
        expect(Object.getPrototypeOf(instances.first)).toBe(TestClass.prototype)
        expect(Object.getPrototypeOf(instances.second)).toBe(TestClass.prototype)
        expect(instances.first.prop).toBe('abc')
        expect(instances.second.prop).toBe(123)
    })

    it("test with TypeSystem class", () => {
        const testArgs =
            { a:  {name: 'a', id: 'a', is:x=>x}, b: {name: 'b', id: 'b', is:x=>x}}

        reg = {...testArgs}
        const instances = instanceAll(TypeSystem, testArgs, reg);
        expect(Object.getPrototypeOf ( instances.a) ).toBe(TypeSystem.prototype)
    })
})

describe("assign IDs", () => {

    const testObj = {
        a: {},
        b: {}
    }
    const testArr = [{},{}]

    it("test for objects", ()=> {
        const reg = {}
        assignIds(testObj, reg);
        expect(reg[testObj.a.id]).toBe(testObj.a)
        expect(reg[testObj.b.id]).toBe(testObj.b)
    })

    it("test for arrays", () => {
        const reg = {};
        assignIds(testArr, reg);
        expect(reg[testArr[0].id]).toBe(testArr[0])
        expect(reg[testArr[1].id]).toBe(testArr[1])
    })
});

