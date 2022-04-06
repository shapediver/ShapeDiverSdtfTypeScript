import { ISdDtfWriterAttributes, ISdDtfWriterDataItems } from "../../../src"
import { SdDtfWriteableComponentFactory } from "../../../src/writer/SdDtfWriteableComponentFactory"
import { SdDtfWriter } from "../../../src/writer/SdDtfWriter"

const writer = new SdDtfWriter(new SdDtfWriteableComponentFactory())

describe("createSimpleDataSdtf", function () {

    test("should create a single chunk that holds all the data", () => {
        const chunkAttributes: ISdDtfWriterAttributes[] = [
            {
                name: "yes",
                content: true,
                typeHint: "boolean",
            },
            {
                name: "nope",
                content: false,
                typeHint: "boolean",
            },
        ]
        const data: ISdDtfWriterDataItems[] = [
            {
                content: 1,
                typeHint: "single",
                attributes: [ {
                    name: "random",
                    content: Math.random(),
                    typeHint: "double",
                } ],
            },
            {
                content: new ArrayBuffer(123),
            },
            {
                content: 3,
                typeHint: "single",
                attributes: [ {
                    name: "random",
                    content: Math.random(),
                    typeHint: "double",
                } ],
            },
        ]

        const writeableAsset = writer.createSimpleDataSdtf("[0]", chunkAttributes, data)
        expect(writeableAsset.fileInfo.version).toBeDefined()
        expect(writeableAsset.fileInfo.generator).toBeDefined()
        expect(writeableAsset.fileInfo.generator).toBeDefined()
        expect(writeableAsset.chunks.length).toBe(1)
        expect(writeableAsset.chunks[0].name).toBe("[0]")
        expect(writeableAsset.chunks[0].attributes).toBeDefined()
        expect(writeableAsset.chunks[0].attributes!.entries["yes"]).toBeDefined()
        expect(writeableAsset.chunks[0].attributes!.entries["yes"].value).toBe(true)
        expect(writeableAsset.chunks[0].attributes!.entries["yes"].typeHint).toBeDefined()
        expect(writeableAsset.chunks[0].attributes!.entries["yes"].typeHint!.name).toBe("boolean")
        expect(writeableAsset.chunks[0].attributes!.entries["nope"]).toBeDefined()
        expect(writeableAsset.chunks[0].attributes!.entries["nope"].value).toBe(false)
        expect(writeableAsset.chunks[0].attributes!.entries["nope"].typeHint).toBeDefined()
        expect(writeableAsset.chunks[0].attributes!.entries["nope"].typeHint!.name).toBe("boolean")
        expect(writeableAsset.chunks[0].items.length).toBe(3)
        expect(writeableAsset.chunks[0].items[0].value).toBe(1)
        expect(writeableAsset.chunks[0].items[0].typeHint).toBeDefined()
        expect(writeableAsset.chunks[0].items[0].typeHint!.name).toBe("single")
        expect(writeableAsset.chunks[0].items[0].attributes).toBeDefined()
        expect(writeableAsset.chunks[0].items[0].attributes!.entries["random"]).toBeDefined()
        expect(writeableAsset.chunks[0].items[0].attributes!.entries["random"].value).toBeGreaterThanOrEqual(0)
        expect(writeableAsset.chunks[0].items[0].attributes!.entries["random"].typeHint).toBeDefined()
        expect(writeableAsset.chunks[0].items[0].attributes!.entries["random"].typeHint!.name).toBe("double")
        expect(writeableAsset.chunks[0].items[1].value).toStrictEqual(new ArrayBuffer(123))
        expect(writeableAsset.chunks[0].items[2].value).toBe(3)
        expect(writeableAsset.chunks[0].items[2].typeHint).toBeDefined()
        expect(writeableAsset.chunks[0].items[2].typeHint!.name).toBe("single")
        expect(writeableAsset.chunks[0].items[2].attributes).toBeDefined()
        expect(writeableAsset.chunks[0].items[2].attributes!.entries["random"]).toBeDefined()
        expect(writeableAsset.chunks[0].items[2].attributes!.entries["random"].value).toBeGreaterThanOrEqual(0)
        expect(writeableAsset.chunks[0].items[2].attributes!.entries["random"].typeHint).toBeDefined()
        expect(writeableAsset.chunks[0].items[2].attributes!.entries["random"].typeHint!.name).toBe("double")
    })

})
