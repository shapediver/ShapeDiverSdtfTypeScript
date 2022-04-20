import { ISdDtfIntegration, ISdDtfTypeReader, ISdDtfTypeWriter } from "@shapediver/sdk.sdtf-core"
import { SdDtfBinaryBufferCache } from "../../../src/buffer_cache/SdDtfBinaryBufferCache"
import { SdDtfReadableAccessor } from "../../../src/reader/components/SdDtfReadableAccessor"
import { SdDtfReadableBuffer } from "../../../src/reader/components/SdDtfReadableBuffer"
import { SdDtfReadableBufferView } from "../../../src/reader/components/SdDtfReadableBufferView"
import { SdDtfReadableTypeHint } from "../../../src/reader/components/SdDtfReadableTypeHint"
import { SdDtfDataParser } from "../../../src/reader/SdDtfDataParser"

const bufferCache = new SdDtfBinaryBufferCache()

describe("parseValue", function () {

    let isSupported: boolean
    const parsedContent: unknown = "parsed content",
        accessorData = new DataView(new ArrayBuffer(1)),
        typeHint = new SdDtfReadableTypeHint("type"),
        buffer = new SdDtfReadableBuffer(1, bufferCache),
        bufferView = new SdDtfReadableBufferView(buffer, 1, 0, ""),
        accessor = new SdDtfReadableAccessor(bufferView)

    const dummyReader: ISdDtfTypeReader = {
            readComponent () {
                return Promise.resolve(parsedContent)
            },
        },
        dummyIntegration: ISdDtfIntegration = {
            isTypeHintSupported () {
                return isSupported
            },
            getReader () {
                return dummyReader
            },
            getWriter: function (): ISdDtfTypeWriter {
                throw new Error("Should not be called in this test.")
            },
        }

    beforeAll(() => {
        accessor.getContent = jest.fn(async () => Promise.resolve({ data: accessorData }))
    })

    test("no integrations; should return value", async () => {
        expect(await new SdDtfDataParser([]).parseContent({ typeHint, value: "foobar" })).toBe("foobar")
    })

    test("type hint is supported; should return parsed content", async () => {
        isSupported = true
        expect(await new SdDtfDataParser([ dummyIntegration ]).parseContent({})).toBe(parsedContent)
    })

    test("type hint not supported, value and accessor exist; should return value", async () => {
        isSupported = false
        expect(await new SdDtfDataParser([ dummyIntegration ]).parseContent({
            accessor,
            typeHint,
            value: "foobar",
        })).toBe("foobar")
    })

    test("type hint not supported, value exist; should return value", async () => {
        isSupported = false
        expect(await new SdDtfDataParser([ dummyIntegration ]).parseContent({
            typeHint,
            value: "foobar",
        })).toBe("foobar")
    })

    test("type hint not supported, accessor exist; should return accessor data", async () => {
        isSupported = false
        expect(await new SdDtfDataParser([ dummyIntegration ]).parseContent({
            accessor,
            typeHint,
        })).toStrictEqual({ data: accessorData })
    })

})
