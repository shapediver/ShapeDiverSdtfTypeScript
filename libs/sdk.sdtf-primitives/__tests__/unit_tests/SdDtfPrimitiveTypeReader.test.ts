import {
    ISdDtfReadableContentComponent,
    ISdDtfReadableTypeHint,
    SdDtfPrimitiveTypeHintName,
} from "@shapediver/sdk.sdtf-core"
import { SdDtfPrimitiveTypeReader } from "../../src/SdDtfPrimitiveTypeReader"
import { SdDtfPrimitiveTypeValidator } from "../../src/SdDtfPrimitiveTypeValidator"

const reader = new SdDtfPrimitiveTypeReader()

describe("readComponent", function () {

    let origValidateComponent: any, origMapColor: any, origMapGenericData: any

    const mapColorRes = "map color result",
        mapGenericDataRes = "map generic data res"

    beforeAll(() => {
        origValidateComponent = SdDtfPrimitiveTypeValidator.prototype.validateComponent

        origMapColor = SdDtfPrimitiveTypeReader.prototype.mapColor
        SdDtfPrimitiveTypeReader.prototype.mapColor = jest.fn(() => mapColorRes)

        origMapGenericData = SdDtfPrimitiveTypeReader.prototype.mapGenericData
        SdDtfPrimitiveTypeReader.prototype.mapGenericData = jest.fn(() => mapGenericDataRes)
    })

    afterAll(() => {
        SdDtfPrimitiveTypeValidator.prototype.validateComponent = origValidateComponent
        SdDtfPrimitiveTypeReader.prototype.mapColor = origMapColor
        SdDtfPrimitiveTypeReader.prototype.mapGenericData = origMapGenericData
    })

    test("invalid component; should throw", async () => {
        // Mock
        SdDtfPrimitiveTypeValidator.prototype.validateComponent = jest.fn(() => false)

        expect(async () => reader.readComponent({})).rejects.toThrow()
    })

    test("unsupported type hint name; should throw", async () => {
        // Mock
        SdDtfPrimitiveTypeValidator.prototype.validateComponent = jest.fn(() => true)

        expect(async () => reader.readComponent({})).rejects.toThrow()
    })

    test.each([
        SdDtfPrimitiveTypeHintName.BOOLEAN,
        SdDtfPrimitiveTypeHintName.CHAR,
        SdDtfPrimitiveTypeHintName.DECIMAL,
        SdDtfPrimitiveTypeHintName.DOUBLE,
        SdDtfPrimitiveTypeHintName.GUID,
        SdDtfPrimitiveTypeHintName.INT8,
        SdDtfPrimitiveTypeHintName.INT16,
        SdDtfPrimitiveTypeHintName.INT32,
        SdDtfPrimitiveTypeHintName.INT64,
        SdDtfPrimitiveTypeHintName.SINGLE,
        SdDtfPrimitiveTypeHintName.STRING,
        SdDtfPrimitiveTypeHintName.UINT8,
        SdDtfPrimitiveTypeHintName.UINT16,
        SdDtfPrimitiveTypeHintName.UINT32,
        SdDtfPrimitiveTypeHintName.UINT64,
    ])("component of type %s; should return value", async (typeHintName) => {
        // Mock
        SdDtfPrimitiveTypeValidator.prototype.validateComponent = jest.fn(() => true)

        let component: ISdDtfReadableContentComponent = {
            typeHint: { name: typeHintName } as ISdDtfReadableTypeHint,
            value: "value",
        }

        expect(await reader.readComponent(component)).toBe("value")
    })

    test.each([
        SdDtfPrimitiveTypeHintName.COLOR,
    ])("component of type %s; should return mapped color res", async (typeHintName) => {
        // Mock
        SdDtfPrimitiveTypeValidator.prototype.validateComponent = jest.fn(() => true)

        let component: ISdDtfReadableContentComponent = {
            typeHint: { name: typeHintName } as ISdDtfReadableTypeHint,
            value: "value",
        }

        expect(await reader.readComponent(component)).toBe(mapColorRes)
    })

    test.each([
        SdDtfPrimitiveTypeHintName.DATA,
        SdDtfPrimitiveTypeHintName.IMAGE,
    ])("component of type %s; should return map generic data res", async (typeHintName) => {
        // Mock
        SdDtfPrimitiveTypeValidator.prototype.validateComponent = jest.fn(() => true)

        let component: ISdDtfReadableContentComponent = {
            typeHint: { name: typeHintName } as ISdDtfReadableTypeHint,
            value: "value",
        }

        expect(await reader.readComponent(component)).toBe(mapGenericDataRes)
    })

})

describe("mapColor", function () {

    test("new color format", () => {
        expect(reader.mapColor([ 1, 1, 1 ])).toStrictEqual([ 1, 1, 1, 1 ])
        expect(reader.mapColor([ 1, 1, 1, 0 ])).toStrictEqual([ 1, 1, 1, 0 ])
    })

    test("legacy color format", () => {
        expect(reader.mapColor("1,1,1")).toStrictEqual([ 1, 1, 1, 1 ])
        expect(reader.mapColor("1,1,1,0")).toStrictEqual([ 1, 1, 1, 0 ])
    })

})

describe("mapGenericData", function () {

    const data = new DataView(new ArrayBuffer(1))

    test("should extract inner data", () => {
        expect(reader.mapGenericData({ id: "foo", data })).toStrictEqual(data)
    })

})
