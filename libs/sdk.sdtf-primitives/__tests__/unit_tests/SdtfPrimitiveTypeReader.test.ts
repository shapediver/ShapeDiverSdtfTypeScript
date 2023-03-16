import {
    ISdtfReadableContentComponent,
    ISdtfReadableTypeHint,
    SdtfPrimitiveTypeHintName,
} from "@shapediver/sdk.sdtf-core"
import { SdtfPrimitiveTypeReader } from "../../src/SdtfPrimitiveTypeReader"
import { SdtfPrimitiveTypeValidator } from "../../src/SdtfPrimitiveTypeValidator"

const reader = new SdtfPrimitiveTypeReader()

describe("readComponent", function () {

    let origValidateComponent: any, origMapColor: any, origMapGenericData: any

    const mapColorRes = "map color result",
        mapGenericDataRes = "map generic data res"

    beforeAll(() => {
        origValidateComponent = SdtfPrimitiveTypeValidator.prototype.validateComponent

        origMapColor = SdtfPrimitiveTypeReader.prototype.mapColor
        SdtfPrimitiveTypeReader.prototype.mapColor = jest.fn(() => mapColorRes)

        origMapGenericData = SdtfPrimitiveTypeReader.prototype.mapGenericData
        SdtfPrimitiveTypeReader.prototype.mapGenericData = jest.fn(() => mapGenericDataRes)
    })

    afterAll(() => {
        SdtfPrimitiveTypeValidator.prototype.validateComponent = origValidateComponent
        SdtfPrimitiveTypeReader.prototype.mapColor = origMapColor
        SdtfPrimitiveTypeReader.prototype.mapGenericData = origMapGenericData
    })

    test("invalid component; should throw", async () => {
        // Mock
        SdtfPrimitiveTypeValidator.prototype.validateComponent = jest.fn(() => false)

        expect(async () => reader.readComponent({})).rejects.toThrow()
    })

    test("unsupported type hint name; should throw", async () => {
        // Mock
        SdtfPrimitiveTypeValidator.prototype.validateComponent = jest.fn(() => true)

        expect(async () => reader.readComponent({})).rejects.toThrow()
    })

    test.each([
        SdtfPrimitiveTypeHintName.BOOLEAN,
        SdtfPrimitiveTypeHintName.CHAR,
        SdtfPrimitiveTypeHintName.DECIMAL,
        SdtfPrimitiveTypeHintName.DOUBLE,
        SdtfPrimitiveTypeHintName.GUID,
        SdtfPrimitiveTypeHintName.INT8,
        SdtfPrimitiveTypeHintName.INT16,
        SdtfPrimitiveTypeHintName.INT32,
        SdtfPrimitiveTypeHintName.INT64,
        SdtfPrimitiveTypeHintName.JSON,
        SdtfPrimitiveTypeHintName.SINGLE,
        SdtfPrimitiveTypeHintName.STRING,
        SdtfPrimitiveTypeHintName.UINT8,
        SdtfPrimitiveTypeHintName.UINT16,
        SdtfPrimitiveTypeHintName.UINT32,
        SdtfPrimitiveTypeHintName.UINT64,
    ])("component of type %s; should return value", async (typeHintName) => {
        // Mock
        SdtfPrimitiveTypeValidator.prototype.validateComponent = jest.fn(() => true)

        let component: ISdtfReadableContentComponent = {
            typeHint: { name: typeHintName } as ISdtfReadableTypeHint,
            value: "value",
        }

        expect(await reader.readComponent(component)).toBe("value")
    })

    test.each([
        SdtfPrimitiveTypeHintName.COLOR,
    ])("component of type %s; should return mapped color res", async (typeHintName) => {
        // Mock
        SdtfPrimitiveTypeValidator.prototype.validateComponent = jest.fn(() => true)

        let component: ISdtfReadableContentComponent = {
            typeHint: { name: typeHintName } as ISdtfReadableTypeHint,
            value: "value",
        }

        expect(await reader.readComponent(component)).toBe(mapColorRes)
    })

    test.each([
        SdtfPrimitiveTypeHintName.DATA,
        SdtfPrimitiveTypeHintName.IMAGE,
    ])("component of type %s; should return map generic data res", async (typeHintName) => {
        // Mock
        SdtfPrimitiveTypeValidator.prototype.validateComponent = jest.fn(() => true)

        let component: ISdtfReadableContentComponent = {
            typeHint: { name: typeHintName } as ISdtfReadableTypeHint,
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
