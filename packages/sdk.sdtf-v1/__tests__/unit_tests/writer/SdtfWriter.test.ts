import { ISdtfWriterDataItems } from "../../../src"
import { SdtfWriteableComponentFactory } from "../../../src/writer/SdtfWriteableComponentFactory"
import { SdtfWriter } from "../../../src/writer/SdtfWriter"

const writer = new SdtfWriter(new SdtfWriteableComponentFactory())

describe("createSimpleDataSdtf", function () {

    test("should create a single chunk that holds all the data", () => {
        const data: ISdtfWriterDataItems[] = [
            {
                content: 1.0,
                typeHint: "single",
                attributes: [ {
                    name: "random",
                    content: Math.random(),
                    typeHint: "double",
                } ],
            },
            {
                content: { data: new ArrayBuffer(123), contentType: "png" },
                typeHint: "image",
            },
            {
                content: 666,
                typeHint: "single",
                attributes: [ {
                    name: "random",
                    content: Math.random(),
                    typeHint: "double",
                } ],
            },
        ]

        const writeableAsset = writer.createSimpleDataSdtf("[0]", data)
        expect(writeableAsset.fileInfo.version).toBeDefined()
        expect(writeableAsset.fileInfo.generator).toBeDefined()
        expect(writeableAsset.fileInfo.generator).toBeDefined()
        expect(writeableAsset.chunks.length).toBe(1)
        expect(writeableAsset.chunks[0].name).toBe("[0]")
        expect(writeableAsset.chunks[0].attributes).toBeUndefined()
        expect(writeableAsset.chunks[0].items.length).toBe(3)
        expect(writeableAsset.chunks[0].items[0].value).toBe(1.0)
        expect(writeableAsset.chunks[0].items[0].typeHint).toBeDefined()
        expect(writeableAsset.chunks[0].items[0].typeHint!.name).toBe("single")
        expect(writeableAsset.chunks[0].items[0].attributes).toBeDefined()
        expect(writeableAsset.chunks[0].items[0].attributes!.entries["random"]).toBeDefined()
        expect(writeableAsset.chunks[0].items[0].attributes!.entries["random"].value).toBeGreaterThanOrEqual(0)
        expect(writeableAsset.chunks[0].items[0].attributes!.entries["random"].typeHint).toBeDefined()
        expect(writeableAsset.chunks[0].items[0].attributes!.entries["random"].typeHint!.name).toBe("double")
        expect(writeableAsset.chunks[0].items[1].accessor).toBeDefined()
        expect(writeableAsset.chunks[0].items[1].accessor!.bufferView).toBeDefined()
        expect(writeableAsset.chunks[0].items[1].accessor!.bufferView!.contentType).toBe("png")
        expect(writeableAsset.chunks[0].items[1].accessor!.bufferView!.buffer).toBeDefined()
        expect(writeableAsset.chunks[0].items[1].accessor!.bufferView!.buffer!.data).toStrictEqual(new ArrayBuffer(123))
        expect(writeableAsset.chunks[0].items[2].value).toBe(666)
        expect(writeableAsset.chunks[0].items[2].typeHint).toBeDefined()
        expect(writeableAsset.chunks[0].items[2].typeHint!.name).toBe("single")
        expect(writeableAsset.chunks[0].items[2].attributes).toBeDefined()
        expect(writeableAsset.chunks[0].items[2].attributes!.entries["random"]).toBeDefined()
        expect(writeableAsset.chunks[0].items[2].attributes!.entries["random"].value).toBeGreaterThanOrEqual(0)
        expect(writeableAsset.chunks[0].items[2].attributes!.entries["random"].typeHint).toBeDefined()
        expect(writeableAsset.chunks[0].items[2].attributes!.entries["random"].typeHint!.name).toBe("double")
    })

})
