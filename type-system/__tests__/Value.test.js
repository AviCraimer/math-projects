const {Value} = require("../Value.js");
const {syms} = require("../symbols");


describe("test Value", () => {
    it("Call Value without error", () => {
        Value('abc');
    })

    it("Test value store", () => {
        Value('abc');Value('abc');
        expect(Value.valuesStore.size).toBe(1);
        expect(Value('abc')).toBe(Value('abc'))
        Value('cat');
        expect(Value.valuesStore.size).toBe(2);
        const objectValue = Value({});
        expect(Value({})).not.toBe(objectValue);

        expect(Value.valuesStore.size).toBe(2);
        const freeValue1 = Value(undefined);
        const freeValue2 = Value(undefined);
        expect(freeValue1).not.toBe(freeValue2);
        expect(Value.valuesStore.size).toBe(2);
        expect(Value.valuesStore.get(undefined)).toBe(undefined);
        expect(freeValue1.terms.value).toBe(freeValue2.terms.value)
    })



})

describe("Test Value Static Methods", () => {
    Value.valuesStore = new Map();
    it("isValue", () => {
        const {isValue} = Value;
        const testObj = {
            [syms.typeSystem]: true,
            category: 'value'
        }
        expect(isValue(testObj)).toBe(true)
        expect(isValue({category: "other"})).toBe(false)
        expect(isValue({...testObj, [syms.typeSystem]: false})).toBe(false)
    })

    it("getExistingValue", () => {
        const {getExistingValue} = Value;
        const inst = Value('abc');
        expect(getExistingValue('abc')).toBe(inst);
    });

    it("addValue", () => {
        const {addValue} = Value;
        let inst = {
            terms: {
                rawJS: "123"
            }
        };
        addValue(inst)
        expect(Value.valuesStore.get("123")).toBe(inst);
        const rawObj = {};
        inst = {
            terms: {
                rawJS: rawObj
            }
        };
        addValue(inst)
        expect(Value.valuesStore.get(rawObj)).toBe(undefined);
    });

})


describe("Test Value Instance Prototype Methods", () => {
    it("getRawJS", () => {
        let inst = Value('abc');
        expect(inst.getRawJS()).toBe('abc');
        const testObj = {"foo":"Bar"}
        inst = Value(testObj);
        expect(inst.getRawJS()).toStrictEqual(testObj);
        expect(inst.getRawJS()).not.toBe(testObj);
        expect(inst.getRawJS()).not.toBe(inst.getRawJS());
    });

    it("specifyValue", () => {
        let inst = Value();
        expect(inst.getRawJS()).toBe(undefined);
        expect(() => Value("abc").specifyValue("x") ).toThrowError();
        expect(() => Value(undefined).specifyValue("x") ).not.toThrowError();

        const existing = Value.valuesStore.get('abc');
        expect(inst).not.toBe(existing);
        expect(inst.specifyValue("abc")).toBe(existing);
        //SEE NOT IN Value.js. I need to change how this works.
        console.log(inst)
        console.log( "\n", Value.valuesStore)
    });

})