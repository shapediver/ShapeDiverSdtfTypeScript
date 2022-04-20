import { ISdDtfReadableAccessor, SdDtfPrimitiveTypeHintName } from "@shapediver/sdk.sdtf-core"
import { Decimal } from "decimal.js"
import { SdDtfPrimitiveTypeValidator } from "../../src/SdDtfPrimitiveTypeValidator"

const validator = new SdDtfPrimitiveTypeValidator()

describe("validateBooleanType", function () {

    test("valid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.BOOLEAN, false)).toBeTruthy()
    })

    test("invalid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.BOOLEAN, "true")).toBeFalsy()
    })

})

describe("validateCharType", function () {

    test("valid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.CHAR, "C")).toBeTruthy()
    })

    test("invalid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.CHAR, "ch")).toBeFalsy()
    })

})

describe("validateColorType", function () {


    test("valid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.COLOR, "0, 0, 0")).toBeTruthy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.COLOR, "1,1,1,1")).toBeTruthy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.COLOR, [ 0.0, 0.74901960784313726, 1.0 ])).toBeTruthy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.COLOR, [ 0.0, 0.74901960784313726, 1.0, 1.0 ])).toBeTruthy()
    })

    test("invalid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.COLOR, [ 0, 0 ])).toBeFalsy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.COLOR, [ 0, 0, 0, 1, 1 ])).toBeFalsy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.COLOR, "0,0")).toBeFalsy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.COLOR, "0,0,0,0,0")).toBeFalsy()
    })

})

describe("validateDataType", function () {


    test("valid", () => {
        // is stored in buffer, not in json content
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.DATA, undefined, {} as ISdDtfReadableAccessor)).toBeTruthy()
    })

    test("invalid", () => {
        // value must not be defined
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.DATA, "foobar", {} as ISdDtfReadableAccessor)).toBeFalsy()
    })

})

describe("validateDecimalType", function () {

    test("valid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.DECIMAL, 79228162514264337593543950335)).toBeTruthy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.DECIMAL, -79228162514264337593543950335)).toBeTruthy()
    })


    test("invalid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.DECIMAL, "0.3333333333333333333333333333")).toBeFalsy()
    })

})

describe("validateDoubleType", function () {

    test("valid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.DOUBLE, new Decimal(1.7976931348623157E+308).toNumber())).toBeTruthy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.DOUBLE, new Decimal(-1.7976931348623157E+308).toNumber())).toBeTruthy()
    })

    test("invalid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.DOUBLE, "0.3333333333333333")).toBeFalsy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.DOUBLE, new Decimal(1.7976931348623157E+309).toNumber())).toBeFalsy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.DOUBLE, new Decimal(-1.7976931348623157E+309).toNumber())).toBeFalsy()
    })

})

describe("validateGuidType", function () {

    test("valid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.GUID, "77bdc9dd-55be-4c90-865d-144da1d6a3ab")).toBeTruthy()
    })

    test("invalid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.GUID, "foobar")).toBeFalsy()
    })

})

describe("validateImageType", function () {

    test("valid", () => {
        // is stored in buffer, not in json content
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.IMAGE, undefined, {} as ISdDtfReadableAccessor)).toBeTruthy()
    })

    test("invalid", () => {
        // value must not be defined
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.IMAGE, "foobar", {} as ISdDtfReadableAccessor)).toBeFalsy()
    })

})

describe("validateInt8Type", function () {

    test("valid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.INT8, -128)).toBeTruthy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.INT8, 127)).toBeTruthy()
    })

    test("invalid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.INT8, "0")).toBeFalsy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.INT8, -129)).toBeFalsy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.INT8, 128)).toBeFalsy()
    })

})

describe("validateInt16Type", function () {

    test("valid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.INT16, -32768)).toBeTruthy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.INT16, 32767)).toBeTruthy()
    })

    test("invalid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.INT16, "0")).toBeFalsy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.INT16, -32769)).toBeFalsy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.INT16, 32768)).toBeFalsy()
    })

})

describe("validateInt32Type", function () {

    test("valid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.INT32, -2147483648)).toBeTruthy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.INT32, 2147483647)).toBeTruthy()
    })

    test("invalid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.INT32, "0")).toBeFalsy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.INT32, -2147483649)).toBeFalsy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.INT32, 2147483648)).toBeFalsy()
    })

})

describe("validateInt64Type", function () {

    test("valid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.INT64, -9223372036854775808)).toBeTruthy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.INT64, 9223372036854775807)).toBeTruthy()
    })

    test("invalid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.INT64, "0")).toBeFalsy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.INT64, -Number.MAX_VALUE)).toBeFalsy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.INT64, Number.MAX_VALUE)).toBeFalsy()
    })

})

describe("validateSingleType", function () {

    test("valid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.SINGLE, new Decimal(3.40282347E+38).toNumber())).toBeTruthy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.SINGLE, new Decimal(-3.40282347E+38).toNumber())).toBeTruthy()
    })

    test("invalid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.SINGLE, "0.33333334")).toBeFalsy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.SINGLE, new Decimal(3.40282347E+39).toNumber())).toBeFalsy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.SINGLE, new Decimal(3.402823471E+38).toNumber())).toBeFalsy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.SINGLE, new Decimal(-3.40282347E+39).toNumber())).toBeFalsy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.SINGLE, new Decimal(-3.402823471E+38).toNumber())).toBeFalsy()
    })

})

describe("validateStringType", function () {

    test("valid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.STRING, "foobar")).toBeTruthy()
    })

    test("invalid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.STRING, 1234)).toBeFalsy()
    })

})

describe("validateUint8Type", function () {

    test("valid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.UINT8, 0)).toBeTruthy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.UINT8, 255)).toBeTruthy()
    })

    test("invalid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.UINT8, "0")).toBeFalsy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.UINT8, -1)).toBeFalsy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.UINT8, 256)).toBeFalsy()
    })

})

describe("validateUint16Type", function () {

    test("valid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.UINT16, 0)).toBeTruthy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.UINT16, 65535)).toBeTruthy()
    })

    test("invalid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.UINT16, "0")).toBeFalsy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.UINT16, -1)).toBeFalsy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.UINT16, 65536)).toBeFalsy()
    })

})

describe("validateUint32Type", function () {

    test("valid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.UINT32, 0)).toBeTruthy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.UINT32, 4294967295)).toBeTruthy()
    })

    test("invalid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.UINT32, "0")).toBeFalsy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.UINT32, -1)).toBeFalsy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.UINT32, 4294967296)).toBeFalsy()
    })

})

describe("validateUint64Type", function () {

    test("valid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.UINT64, 0)).toBeTruthy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.UINT64, Number.MAX_SAFE_INTEGER)).toBeTruthy()
    })

    test("invalid", () => {
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.UINT64, "0")).toBeFalsy()
        expect(validator.validateComponent(SdDtfPrimitiveTypeHintName.UINT64, -1)).toBeFalsy()
    })

})
