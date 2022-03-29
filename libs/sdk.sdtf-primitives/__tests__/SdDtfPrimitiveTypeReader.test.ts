import { SdDtfPrimitiveTypeHintName } from "@shapediver/sdk.sdtf-core"
import { SdDtfPrimitiveTypeReader } from "../src"

const reader = new SdDtfPrimitiveTypeReader()

describe("isTypeHintSupported", function () {

    test("supported types; should return true", () => {
        expect(reader.isTypeHintSupported(SdDtfPrimitiveTypeHintName.BOOLEAN)).toBeTruthy()
        expect(reader.isTypeHintSupported(SdDtfPrimitiveTypeHintName.CHAR)).toBeTruthy()
        expect(reader.isTypeHintSupported(SdDtfPrimitiveTypeHintName.COLOR)).toBeTruthy()
        expect(reader.isTypeHintSupported(SdDtfPrimitiveTypeHintName.DECIMAL)).toBeTruthy()
        expect(reader.isTypeHintSupported(SdDtfPrimitiveTypeHintName.DOUBLE)).toBeTruthy()
        expect(reader.isTypeHintSupported(SdDtfPrimitiveTypeHintName.GUID)).toBeTruthy()
        expect(reader.isTypeHintSupported(SdDtfPrimitiveTypeHintName.IMAGE)).toBeTruthy()
        expect(reader.isTypeHintSupported(SdDtfPrimitiveTypeHintName.INT8)).toBeTruthy()
        expect(reader.isTypeHintSupported(SdDtfPrimitiveTypeHintName.INT16)).toBeTruthy()
        expect(reader.isTypeHintSupported(SdDtfPrimitiveTypeHintName.INT32)).toBeTruthy()
        expect(reader.isTypeHintSupported(SdDtfPrimitiveTypeHintName.INT64)).toBeTruthy()
        expect(reader.isTypeHintSupported(SdDtfPrimitiveTypeHintName.SINGLE)).toBeTruthy()
        expect(reader.isTypeHintSupported(SdDtfPrimitiveTypeHintName.STRING)).toBeTruthy()
        expect(reader.isTypeHintSupported(SdDtfPrimitiveTypeHintName.UINT8)).toBeTruthy()
        expect(reader.isTypeHintSupported(SdDtfPrimitiveTypeHintName.UINT16)).toBeTruthy()
        expect(reader.isTypeHintSupported(SdDtfPrimitiveTypeHintName.UINT32)).toBeTruthy()
        expect(reader.isTypeHintSupported(SdDtfPrimitiveTypeHintName.UINT64)).toBeTruthy()
    })

    test("unsupported type; should return false", () => {
        expect(reader.isTypeHintSupported("foobar")).toBeFalsy()
    })

})

describe("parseValue", function () {

    test("boolean", () => {
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.BOOLEAN, false)).toBe(false)
    })

    test("char", () => {
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.CHAR, "C")).toBe("C")
    })

    test("color", () => {
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.COLOR, [ 0.0, 0.74901960784313726, 1.0, 1.0 ])).toStrictEqual([ 0.0, 0.74901960784313726, 1.0, 1.0 ])
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.COLOR, "0, 0, 0")).toStrictEqual([ 0, 0, 0, 1 ])
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.COLOR, "1,1,1,1")).toStrictEqual([ 1, 1, 1, 1 ])
    })

    test("decimal", () => {
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.DECIMAL, "0.3333333333333333333333333333")).toBe(0.3333333333333333333333333333)
    })

    test("double", () => {
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.DOUBLE, "0.3333333333333333")).toBe(0.3333333333333333)
    })

    test("guid", () => {
        const value = "77bdc9dd-55be-4c90-865d-144da1d6a3ab"
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.GUID, value)).toBe(value)
    })

    test("image", () => {
        const value = new DataView(new ArrayBuffer(4))
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.IMAGE, value)).toStrictEqual(value)
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.IMAGE, {
            id: undefined,
            data: value
        })).toStrictEqual(value)
    })

    test("int8", () => {
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.INT8, "-128")).toBe(-128)
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.INT8, "127")).toBe(127)
    })

    test("int16", () => {
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.INT16, "-32768")).toBe(-32768)
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.INT16, "32767")).toBe(32767)
    })

    test("int32", () => {
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.INT32, "-2147483648")).toBe(-2147483648)
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.INT32, "2147483647")).toBe(2147483647)
    })

    test("int64", () => {
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.INT64, "-9223372036854775808")).toBe(-9223372036854775808)
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.INT64, "9223372036854775807")).toBe(9223372036854775807)
    })

    test("single", () => {
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.SINGLE, "0.33333334")).toBe(0.33333334)
    })

    test("string", () => {
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.STRING, "foobar")).toBe("foobar")
    })

    test("uint8", () => {
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.UINT8, "0")).toBe(0)
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.UINT8, "255")).toBe(255)
    })

    test("uint16", () => {
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.UINT16, "0")).toBe(0)
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.UINT16, "65535")).toBe(65535)
    })

    test("uint32", () => {
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.UINT32, "0")).toBe(0)
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.UINT32, "4294967295")).toBe(4294967295)
    })

    test("uint64", () => {
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.UINT64, "0")).toBe(0)
        expect(reader.parseValue(SdDtfPrimitiveTypeHintName.UINT64, "18446744073709551615")).toBe(18446744073709551615)
    })

})
