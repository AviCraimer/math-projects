const {ValueTypeClass,
    PrimitiveValueType,
    ComplexValueType,
    StrType,
    ValueType,
    VariableType,
    PairValuesType} = require("../index.js");

const {typeSystemSym,
    freeValueSym,
    complexValueSym} = require('../symbols');


    const testType = ({
        [typeSystemSym]: true,
        testType: true
    })

    const testValue = ({
        [typeSystemSym]: true,
        [complexValueSym]: true,
        testValue: true
    })

describe(" Value Type", () => {
    it("Classifies primitive values", () => {
        expect(ValueType.is()).toBe(true);
        expect(ValueType.is(undefined)).toBe(true);
        expect(ValueType.is("abc")).toBe(true);
        expect(ValueType.is(testValue)).toBe(true);
    })

    it("Rejects type system objects that are not complex values", () => {
        expect(ValueType.is(testType)).toBe(false);
    })
})


describe("Primitive Value Type", () => {
    it("Call .is without error", () => {
        expect(PrimitiveValueType.is()).toBe(true);
        expect(PrimitiveValueType.is(undefined)).toBe(true);
        expect(PrimitiveValueType.is(undefined)).toBe(true);
    })

    it("Reject value within type system", () => {
        expect(PrimitiveValueType.is(testType)).toBe(false);
        expect(PrimitiveValueType.is(testValue)).toBe(false);
    })
})


describe("Complex Value Type", () => {

    it("Call is to correctly classify complex values", () => {
        expect(ComplexValueType.is("abc")).toBe(false);
        expect(ComplexValueType.is(testType)).toBe(false);
        expect(ComplexValueType.is(testValue)).toBe(true);
    })
})


describe("String Value Type", () => {
    it("Classify strings ", () => {
        expect(StrType.is('asdfasdf')).toBe(true);
        expect(StrType.is(undefined)).toBe(false);
        expect(StrType.is(323423)).toBe(false);
        expect(StrType.is({})).toBe(false);
        expect(StrType.is(()=>{})).toBe(false);
    })

    it("Reject value within type system", () => {
        expect(StrType.is(testType)).toBe(false);
        expect(StrType.is(testValue)).toBe(false);
    })
})

describe("Variable type", () => {
    it('', ()=>{
        expect(VariableType.construct(StrType)).toBeTruthy;
        // console.log(VariableType.construct(StrType))
    })
} )