import { ISdDtfBufferValue } from "@shapediver/sdk.sdtf-core"
import { create } from "../../src"
import { readableComponentListFromAsset } from "../../src/reader/ISdDtfReadableComponentList"
import { SdDtfComponentFactoryWrapper } from "../../src/structure/SdDtfComponentFactoryWrapper"

describe("read_sdTF_spec_example", () => {

    test("check structure", async () => {
        const asset = await create().createParser().readFromFile("./test_data/sdTF_spec_example.sdtf")
        expect(asset).toBeDefined()

        const readableList = readableComponentListFromAsset(asset)
        const componentList = new SdDtfComponentFactoryWrapper().createFromReadable(readableList)

        expect(componentList.asset.fileInfo).toBe(0)
        expect(componentList.asset.additionalProperties).toStrictEqual({})

        expect(componentList.fileInfo.version).toBe("1.0")
        expect(componentList.fileInfo.generator).toBe("ShapeDiverSdtfWriter")
        expect(componentList.fileInfo.additionalProperties).toStrictEqual({})

        expect(componentList.chunks.length).toBe(3)
        expect(componentList.chunks[0].name).toBe("57e60008-ee18-4864-8711-1cbc8adfc821")
        expect(componentList.chunks[0].nodes).toStrictEqual([ 0, 1 ])
        expect(componentList.chunks[0].typeHint).toBe(0)
        expect(componentList.chunks[0].attributes).toBe(1)
        expect(componentList.chunks[0].additionalProperties).toStrictEqual({})
        expect(componentList.chunks[1].name).toBe("c641e0f8-ecfd-4607-936f-01ed06ac7dbd")
        expect(componentList.chunks[1].nodes).toStrictEqual([ 2 ])
        expect(componentList.chunks[1].typeHint).toBe(1)
        expect(componentList.chunks[1].attributes).toBe(2)
        expect(componentList.chunks[1].additionalProperties).toStrictEqual({})
        expect(componentList.chunks[2].name).toBe("fc5cedb5-42c0-4238-ae01-9cf94d194130")
        expect(componentList.chunks[2].nodes).toStrictEqual([ 3, 4 ])
        expect(componentList.chunks[2].typeHint).toBe(2)
        expect(componentList.chunks[2].attributes).toBe(3)
        expect(componentList.chunks[2].additionalProperties).toStrictEqual({})

        expect(componentList.nodes.length).toBe(5)
        expect(componentList.nodes[0].name).toBe("[0,0]")
        expect(componentList.nodes[0].items).toStrictEqual([ 0 ])
        expect(componentList.nodes[0].typeHint).toBe(0)
        expect(componentList.nodes[0].additionalProperties).toStrictEqual({})
        expect(componentList.nodes[1].name).toBe("[0,1]")
        expect(componentList.nodes[1].items).toStrictEqual([ 1 ])
        expect(componentList.nodes[1].typeHint).toBe(0)
        expect(componentList.nodes[1].additionalProperties).toStrictEqual({})
        expect(componentList.nodes[2].name).toBe("[0]")
        expect(componentList.nodes[2].items).toStrictEqual([ 2 ])
        expect(componentList.nodes[2].typeHint).toBe(1)
        expect(componentList.nodes[2].additionalProperties).toStrictEqual({})
        expect(componentList.nodes[3].name).toBe("[0,0]")
        expect(componentList.nodes[3].items).toStrictEqual([ 3, 4, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ])
        expect(componentList.nodes[3].typeHint).toBe(2)
        expect(componentList.nodes[3].additionalProperties).toStrictEqual({})
        expect(componentList.nodes[4].name).toBe("[0,1]")
        expect(componentList.nodes[4].items).toStrictEqual([ 4, 5, 6, 7, 15, 16, 9, 17, 18, 19, 20 ])
        expect(componentList.nodes[4].typeHint).toBe(2)
        expect(componentList.nodes[4].additionalProperties).toStrictEqual({})

        expect(componentList.items.length).toBe(21)
        expect(componentList.items[0].accessor).toBe(0)
        expect(componentList.items[0].typeHint).toBe(0)
        expect(componentList.items[0].attributes).toBe(0)
        expect(componentList.items[0].additionalProperties).toStrictEqual({})
        expect(componentList.items[1].accessor).toBe(1)
        expect(componentList.items[1].typeHint).toBe(0)
        expect(componentList.items[1].additionalProperties).toStrictEqual({})
        expect(componentList.items[2].accessor).toBe(2)
        expect(componentList.items[2].typeHint).toBe(1)
        expect(componentList.items[2].additionalProperties).toStrictEqual({})
        expect(componentList.items[3].value).toBe(0.0)
        expect(componentList.items[3].typeHint).toBe(2)
        expect(componentList.items[3].additionalProperties).toStrictEqual({})
        expect(componentList.items[4].value).toBe(1.0)
        expect(componentList.items[4].typeHint).toBe(2)
        expect(componentList.items[4].additionalProperties).toStrictEqual({})
        expect(componentList.items[5].value).toBe(2.0)
        expect(componentList.items[5].typeHint).toBe(2)
        expect(componentList.items[5].additionalProperties).toStrictEqual({})
        expect(componentList.items[6].value).toBe(3.0)
        expect(componentList.items[6].typeHint).toBe(2)
        expect(componentList.items[6].additionalProperties).toStrictEqual({})
        expect(componentList.items[7].value).toBe(5.0)
        expect(componentList.items[7].typeHint).toBe(2)
        expect(componentList.items[7].additionalProperties).toStrictEqual({})
        expect(componentList.items[8].value).toBe(8.0)
        expect(componentList.items[8].typeHint).toBe(2)
        expect(componentList.items[8].additionalProperties).toStrictEqual({})
        expect(componentList.items[9].value).toBe(13.0)
        expect(componentList.items[9].typeHint).toBe(2)
        expect(componentList.items[9].additionalProperties).toStrictEqual({})
        expect(componentList.items[10].value).toBe(21.0)
        expect(componentList.items[10].typeHint).toBe(2)
        expect(componentList.items[10].additionalProperties).toStrictEqual({})
        expect(componentList.items[11].value).toBe(34.0)
        expect(componentList.items[11].typeHint).toBe(2)
        expect(componentList.items[11].additionalProperties).toStrictEqual({})
        expect(componentList.items[12].value).toBe(55.0)
        expect(componentList.items[12].typeHint).toBe(2)
        expect(componentList.items[12].additionalProperties).toStrictEqual({})
        expect(componentList.items[13].value).toBe(89.0)
        expect(componentList.items[13].typeHint).toBe(2)
        expect(componentList.items[13].additionalProperties).toStrictEqual({})
        expect(componentList.items[14].value).toBe(144.0)
        expect(componentList.items[14].typeHint).toBe(2)
        expect(componentList.items[14].additionalProperties).toStrictEqual({})
        expect(componentList.items[15].value).toBe(7.0)
        expect(componentList.items[15].typeHint).toBe(2)
        expect(componentList.items[15].additionalProperties).toStrictEqual({})
        expect(componentList.items[16].value).toBe(11.0)
        expect(componentList.items[16].typeHint).toBe(2)
        expect(componentList.items[16].additionalProperties).toStrictEqual({})
        expect(componentList.items[17].value).toBe(17.0)
        expect(componentList.items[17].typeHint).toBe(2)
        expect(componentList.items[17].additionalProperties).toStrictEqual({})
        expect(componentList.items[18].value).toBe(19.0)
        expect(componentList.items[18].typeHint).toBe(2)
        expect(componentList.items[18].additionalProperties).toStrictEqual({})
        expect(componentList.items[19].value).toBe(23.0)
        expect(componentList.items[19].typeHint).toBe(2)
        expect(componentList.items[19].additionalProperties).toStrictEqual({})
        expect(componentList.items[20].value).toBe(27.0)
        expect(componentList.items[20].typeHint).toBe(2)
        expect(componentList.items[20].additionalProperties).toStrictEqual({})

        expect(componentList.attributes.length).toBe(4)
        expect(Object.keys(componentList.attributes[0].entries).length).toBe(4)
        expect(componentList.attributes[0].entries["Name"]).toBeDefined()
        expect(componentList.attributes[0].entries["Name"].value).toBe("Mesh sphere")
        expect(componentList.attributes[0].entries["Name"].typeHint).toBe(3)
        expect(componentList.attributes[0].entries["Color"]).toBeDefined()
        expect(componentList.attributes[0].entries["Color"].value).toBe("126, 156, 255")
        expect(componentList.attributes[0].entries["Color"].typeHint).toBe(4)
        expect(componentList.attributes[0].entries["Layer"]).toBeDefined()
        expect(componentList.attributes[0].entries["Layer"].value).toBe("Some layer")
        expect(componentList.attributes[0].entries["Layer"].typeHint).toBe(3)
        expect(componentList.attributes[0].entries["Preview"]).toBeDefined()
        expect(componentList.attributes[0].entries["Preview"].accessor).toBe(3)
        expect(componentList.attributes[0].entries["Preview"].typeHint).toBe(1)
        expect(Object.keys(componentList.attributes[1].entries).length).toBe(3)
        expect(componentList.attributes[1].entries["Id"]).toBeDefined()
        expect(componentList.attributes[1].entries["Id"].value).toBe("57e60008-ee18-4864-8711-1cbc8adfc821")
        expect(componentList.attributes[1].entries["Id"].typeHint).toBe(5)
        expect(componentList.attributes[1].entries["Name"]).toBeDefined()
        expect(componentList.attributes[1].entries["Name"].value).toBe("Mesh")
        expect(componentList.attributes[1].entries["Name"].typeHint).toBe(3)
        expect(componentList.attributes[1].entries["Type"]).toBeDefined()
        expect(componentList.attributes[1].entries["Type"].value).toBe("Mesh")
        expect(componentList.attributes[1].entries["Type"].typeHint).toBe(3)
        expect(Object.keys(componentList.attributes[2].entries).length).toBe(3)
        expect(componentList.attributes[2].entries["Id"]).toBeDefined()
        expect(componentList.attributes[2].entries["Id"].value).toBe("c641e0f8-ecfd-4607-936f-01ed06ac7dbd")
        expect(componentList.attributes[2].entries["Id"].typeHint).toBe(5)
        expect(componentList.attributes[2].entries["Name"]).toBeDefined()
        expect(componentList.attributes[2].entries["Name"].value).toBe("Images")
        expect(componentList.attributes[2].entries["Name"].typeHint).toBe(3)
        expect(componentList.attributes[2].entries["Type"]).toBeDefined()
        expect(componentList.attributes[2].entries["Type"].value).toBe("GrasshopperBitmap")
        expect(componentList.attributes[2].entries["Type"].typeHint).toBe(3)
        expect(Object.keys(componentList.attributes[3].entries).length).toBe(3)
        expect(componentList.attributes[3].entries["Id"]).toBeDefined()
        expect(componentList.attributes[3].entries["Id"].value).toBe("fc5cedb5-42c0-4238-ae01-9cf94d194130")
        expect(componentList.attributes[3].entries["Id"].typeHint).toBe(5)
        expect(componentList.attributes[3].entries["Name"]).toBeDefined()
        expect(componentList.attributes[3].entries["Name"].value).toBe("Numbers")
        expect(componentList.attributes[3].entries["Name"].typeHint).toBe(3)
        expect(componentList.attributes[3].entries["Type"]).toBeDefined()
        expect(componentList.attributes[3].entries["Type"].value).toBe("Number")
        expect(componentList.attributes[3].entries["Type"].typeHint).toBe(3)

        expect(componentList.typeHints.length).toBe(6)
        expect(componentList.typeHints[0].name).toBe("rhino.mesh")
        expect(componentList.typeHints[0].additionalProperties).toStrictEqual({})
        expect(componentList.typeHints[1].name).toBe("image")
        expect(componentList.typeHints[1].additionalProperties).toStrictEqual({})
        expect(componentList.typeHints[2].name).toBe("double")
        expect(componentList.typeHints[2].additionalProperties).toStrictEqual({})
        expect(componentList.typeHints[3].name).toBe("string")
        expect(componentList.typeHints[3].additionalProperties).toStrictEqual({})
        expect(componentList.typeHints[4].name).toBe("color")
        expect(componentList.typeHints[4].additionalProperties).toStrictEqual({})
        expect(componentList.typeHints[5].name).toBe("guid")
        expect(componentList.typeHints[5].additionalProperties).toStrictEqual({})

        expect(componentList.accessors.length).toBe(4)
        expect(componentList.accessors[0].bufferView).toBe(0)
        expect(componentList.accessors[0].id).toBe("d16103f1-f64f-4dd6-9d87-924520d554cd")
        expect(componentList.accessors[0].additionalProperties).toStrictEqual({})
        expect(componentList.accessors[1].bufferView).toBe(0)
        expect(componentList.accessors[1].id).toBe("e2bb8f80-5df3-41a4-b6ad-ce5e71f2bd06")
        expect(componentList.accessors[1].additionalProperties).toStrictEqual({})
        expect(componentList.accessors[2].bufferView).toBe(1)
        expect(componentList.accessors[3].bufferView).toBe(2)
        expect(componentList.accessors[3].additionalProperties).toStrictEqual({})

        expect(componentList.bufferViews.length).toBe(3)
        expect(componentList.bufferViews[0].byteLength).toBe(11590)
        expect(componentList.bufferViews[0].byteOffset).toBe(0)
        expect(componentList.bufferViews[0].contentEncoding).toBe("gzip")
        expect(componentList.bufferViews[0].contentType).toBe("model/vnd.3dm")
        expect(componentList.bufferViews[0].buffer).toBe(0)
        expect(componentList.bufferViews[0].additionalProperties).toStrictEqual({})
        expect(componentList.bufferViews[1].byteLength).toBe(2172131)
        expect(componentList.bufferViews[1].byteOffset).toBe(11592)
        expect(componentList.bufferViews[1].contentType).toBe("image/png")
        expect(componentList.bufferViews[1].buffer).toBe(0)
        expect(componentList.bufferViews[1].additionalProperties).toStrictEqual({})
        expect(componentList.bufferViews[2].byteLength).toBe(173507)
        expect(componentList.bufferViews[2].byteOffset).toBe(2183724)
        expect(componentList.bufferViews[2].contentType).toBe("image/png")
        expect(componentList.bufferViews[2].buffer).toBe(0)
        expect(componentList.bufferViews[2].additionalProperties).toStrictEqual({})

        expect(componentList.buffers.length).toBe(1)
        expect(componentList.buffers[0].byteLength).toBe(2357231)
        expect(componentList.buffers[0].additionalProperties).toStrictEqual({})
    })

    test("check content access", async () => {
        const asset = await create().createParser().readFromFile("./test_data/sdTF_spec_example.sdtf")
        expect(asset).toBeDefined()

        // Data item content
        let itemBufferData0 = (await asset.items[0].getContent()) as ISdDtfBufferValue
        expect(itemBufferData0.id).toBe("d16103f1-f64f-4dd6-9d87-924520d554cd")
        expect(itemBufferData0.data.byteLength).toBe(11590)
        let itemBufferData1 = (await asset.items[1].getContent()) as ISdDtfBufferValue
        expect(itemBufferData1.id).toBe("e2bb8f80-5df3-41a4-b6ad-ce5e71f2bd06")
        expect(itemBufferData1.data.byteLength).toBe(11590)
        let itemBufferData2 = (await asset.items[2].getContent()) as ISdDtfBufferValue
        expect(itemBufferData2.id).toBeUndefined()
        expect(itemBufferData2.data.byteLength).toBe(2172131)
        expect(await asset.items[3].getContent()).toBe(0.0)
        expect(await asset.items[4].getContent()).toBe(1.0)
        expect(await asset.items[5].getContent()).toBe(2.0)
        expect(await asset.items[6].getContent()).toBe(3.0)
        expect(await asset.items[7].getContent()).toBe(5.0)
        expect(await asset.items[8].getContent()).toBe(8.0)
        expect(await asset.items[9].getContent()).toBe(13.0)
        expect(await asset.items[10].getContent()).toBe(21.0)
        expect(await asset.items[11].getContent()).toBe(34.0)
        expect(await asset.items[12].getContent()).toBe(55.0)
        expect(await asset.items[13].getContent()).toBe(89.0)
        expect(await asset.items[14].getContent()).toBe(144.0)
        expect(await asset.items[15].getContent()).toBe(7.0)
        expect(await asset.items[16].getContent()).toBe(11.0)
        expect(await asset.items[17].getContent()).toBe(17.0)
        expect(await asset.items[18].getContent()).toBe(19.0)
        expect(await asset.items[19].getContent()).toBe(23.0)
        expect(await asset.items[20].getContent()).toBe(27.0)

        // Attributes content
        expect(await asset.attributes[0].entries["Name"].getContent()).toBe("Mesh sphere")
        expect(await asset.attributes[0].entries["Color"].getContent()).toBe("126, 156, 255")
        expect(await asset.attributes[0].entries["Layer"].getContent()).toBe("Some layer")
        let attributeBufferData2 = (await asset.attributes[0].entries["Preview"].getContent()) as ISdDtfBufferValue
        expect(attributeBufferData2.id).toBeUndefined()
        expect(attributeBufferData2.data.byteLength).toBe(173507)
        expect(await asset.attributes[1].entries["Id"].getContent()).toBe("57e60008-ee18-4864-8711-1cbc8adfc821")
        expect(await asset.attributes[1].entries["Name"].getContent()).toBe("Mesh")
        expect(await asset.attributes[1].entries["Type"].getContent()).toBe("Mesh")
        expect(await asset.attributes[2].entries["Id"].getContent()).toBe("c641e0f8-ecfd-4607-936f-01ed06ac7dbd")
        expect(await asset.attributes[2].entries["Name"].getContent()).toBe("Images")
        expect(await asset.attributes[2].entries["Type"].getContent()).toBe("GrasshopperBitmap")
        expect(await asset.attributes[3].entries["Id"].getContent()).toBe("fc5cedb5-42c0-4238-ae01-9cf94d194130")
        expect(await asset.attributes[3].entries["Name"].getContent()).toBe("Numbers")
        expect(await asset.attributes[3].entries["Type"].getContent()).toBe("Number")
    })

})
