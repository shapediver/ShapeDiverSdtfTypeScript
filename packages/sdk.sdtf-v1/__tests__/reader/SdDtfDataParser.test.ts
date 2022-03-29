import { ISdDtfReader } from "@shapediver/sdk.sdtf-core"
import { SdDtfBinaryBufferCache } from "../../src/buffer_cache/SdDtfBinaryBufferCache"
import { SdDtfAccessor } from "../../src/components/SdDtfAccessor"
import { SdDtfBuffer } from "../../src/components/SdDtfBuffer"
import { SdDtfBufferView } from "../../src/components/SdDtfBufferView"
import { SdDtfTypeHint } from "../../src/components/SdDtfTypeHint"
import { SdDtfDataParser } from "../../src/reader/SdDtfDataParser"

const bufferCache = new SdDtfBinaryBufferCache()

describe("parseContent", function () {

    const parser = new SdDtfDataParser([])

    const buffer = new SdDtfBuffer(1, bufferCache),
        bufferView = new SdDtfBufferView(buffer, 1, 0, "text"),
        accessor = new SdDtfAccessor(bufferView),
        value = "foobar",
        data = new DataView(new ArrayBuffer(1))

    beforeAll(() => {
        accessor.getContent = jest.fn(async () => Promise.resolve({ data }))
    })

    test("value only; should return value", async () => {
        expect(await parser.parseContent(value, undefined, undefined)).toBe(value)
    })

    test("accessor only; should return accessor-content", async () => {
        expect(await parser.parseContent(undefined, accessor, undefined)).toStrictEqual({ data })
    })

    test("value and accessor; should return value", async () => {
        expect(await parser.parseContent(value, accessor, undefined)).toBe(value)
    })

})

describe("parseData", function () {

    let isSupported: boolean
    const parsedValue: unknown = "parsed foobar",
        typeHint = new SdDtfTypeHint("type")

    const dummyReader: ISdDtfReader = {
        isTypeHintSupported (_: string) {
            return isSupported
        },
        parseValue (): unknown {
            return parsedValue
        },
    }

    test("no data; should return undefined", () => {
        expect(new SdDtfDataParser([]).parseData(undefined, typeHint)).toBeUndefined()
    })

    test("no type hint; should return data", () => {
        expect(new SdDtfDataParser([]).parseData("foobar", undefined)).toBe("foobar")
    })

    test("value and type hint, type hint not supported; should return data", () => {
        isSupported = false
        expect(new SdDtfDataParser([ dummyReader ]).parseData("foobar", typeHint)).toBe("foobar")
    })

    test("value and type hint, type hint is supported; should return parsed data", () => {
        isSupported = true
        expect(new SdDtfDataParser([ dummyReader ]).parseData("foobar", typeHint)).toBe(parsedValue)
    })

})
