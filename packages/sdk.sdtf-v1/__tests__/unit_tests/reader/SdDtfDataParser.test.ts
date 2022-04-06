import { ISdDtfIntegration, ISdDtfTypeReader } from "@shapediver/sdk.sdtf-core"
import { SdDtfBinaryBufferCache } from "../../../src/buffer_cache/SdDtfBinaryBufferCache"
import { SdDtfReadableAccessor } from "../../../src/reader/components/SdDtfReadableAccessor"
import { SdDtfReadableBuffer } from "../../../src/reader/components/SdDtfReadableBuffer"
import { SdDtfReadableBufferView } from "../../../src/reader/components/SdDtfReadableBufferView"
import { SdDtfReadableTypeHint } from "../../../src/reader/components/SdDtfReadableTypeHint"
import { SdDtfDataParser } from "../../../src/reader/SdDtfDataParser"

const bufferCache = new SdDtfBinaryBufferCache()

describe("parseContent", function () {

    let origParseValue: any, origParseAccessor: any

    const parser = new SdDtfDataParser([])

    const buffer = new SdDtfReadableBuffer(1, bufferCache),
        bufferView = new SdDtfReadableBufferView(buffer, 1, 0, "text"),
        accessor = new SdDtfReadableAccessor(bufferView),
        value = "foobar",
        data = new DataView(new ArrayBuffer(1))

    beforeAll(() => {
        origParseValue = SdDtfDataParser.prototype.parseValue
        SdDtfDataParser.prototype.parseValue = jest.fn(() => "VALUE")

        origParseAccessor = SdDtfDataParser.prototype.parseAccessor
        SdDtfDataParser.prototype.parseAccessor = jest.fn(() => "ACCESSOR")

        accessor.getContent = jest.fn(async () => Promise.resolve({ data }))
    })

    afterAll(() => {
        SdDtfDataParser.prototype.parseValue = origParseValue
        SdDtfDataParser.prototype.parseAccessor = origParseAccessor
    })

    test("value only; should return value", async () => {
        expect(await parser.parseContent(value, undefined, undefined)).toBe("VALUE")
    })

    test("accessor only; should return accessor-content", async () => {
        expect(await parser.parseContent(undefined, accessor, undefined)).toStrictEqual("ACCESSOR")
    })

    test("value and accessor; should return value", async () => {
        expect(await parser.parseContent(value, accessor, undefined)).toBe("VALUE")
    })

})

describe("parseValue", function () {

    let isSupported: boolean
    const parsedValue: unknown = "parsed value",
        parsedAccessor: unknown = "parsed accessor",
        typeHint = new SdDtfReadableTypeHint("type")

    const dummyReader: ISdDtfTypeReader = {
            readValue () {
                return parsedValue
            },
            readAccessor: function (): unknown {
                return parsedAccessor
            },
        },
        dummyIntegration: ISdDtfIntegration = {
            isTypeHintSupported () {
                return isSupported
            },
            getReader () {
                return dummyReader
            },
        }

    test("no integrations, no type hint; should return value", () => {
        expect(new SdDtfDataParser([]).parseValue("foobar", undefined)).toBe("foobar")
    })

    test("value and type hint, type hint not supported; should return value", () => {
        isSupported = false
        expect(new SdDtfDataParser([ dummyIntegration ]).parseValue("foobar", typeHint)).toBe("foobar")
    })

    test("value and type hint, type hint is supported; should return parsed value", () => {
        isSupported = true
        expect(new SdDtfDataParser([ dummyIntegration ]).parseValue("foobar", typeHint)).toBe(parsedValue)
    })

})

describe("parseAccessor", function () {

    let isSupported: boolean
    const parsedValue: unknown = "parsed value",
        parsedAccessor: unknown = "parsed accessor",
        data = new DataView(new ArrayBuffer(0)),
        typeHint = new SdDtfReadableTypeHint("type")

    const dummyReader: ISdDtfTypeReader = {
            readValue () {
                return parsedValue
            },
            readAccessor: function (): unknown {
                return parsedAccessor
            },
        },
        dummyIntegration: ISdDtfIntegration = {
            isTypeHintSupported () {
                return isSupported
            },
            getReader () {
                return dummyReader
            },
        }

    test("no integrations, no type hint; should return data", () => {
        expect(new SdDtfDataParser([]).parseAccessor({ data }, undefined)).toStrictEqual({ data })
    })

    test("data and type hint, type hint not supported; should return data", () => {
        isSupported = false
        expect(new SdDtfDataParser([ dummyIntegration ]).parseAccessor({ data }, typeHint)).toStrictEqual({ data })
    })

    test("data and type hint, type hint is supported; should return parsed data", () => {
        isSupported = true
        expect(new SdDtfDataParser([ dummyIntegration ]).parseAccessor({ data }, typeHint)).toBe(parsedAccessor)
    })

})
