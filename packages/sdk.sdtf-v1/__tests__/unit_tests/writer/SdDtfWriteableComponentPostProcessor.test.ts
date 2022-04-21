import { ISdDtfIntegration, ISdDtfTypeReader, ISdDtfTypeWriter } from "@shapediver/sdk.sdtf-core"
import { ISdDtfWriteableComponentFactory } from "../../../src"
import { ISdDtfWriteableComponentList } from "../../../src/writer/ISdDtfWriteableComponentList"
import { SdDtfWriteableComponentFactory } from "../../../src/writer/SdDtfWriteableComponentFactory"
import { SdDtfWriteableComponentPostProcessor } from "../../../src/writer/SdDtfWriteableComponentPostProcessor"

const optimizer = new SdDtfWriteableComponentPostProcessor([])
const factory: ISdDtfWriteableComponentFactory = new SdDtfWriteableComponentFactory()

describe("processDataComponents", () => {

    let isSupported: boolean, spyWriteComponent: boolean

    const dummyWriter: ISdDtfTypeWriter = {
            writeComponent () {
                spyWriteComponent = true
            },
        },
        dummyIntegration: ISdDtfIntegration = {
            isTypeHintSupported () {
                return isSupported
            },
            getReader: function (): ISdDtfTypeReader {
                throw new Error("Should not be called in this test.")
            },
            getWriter () {
                return dummyWriter
            },
        }

    beforeEach(() => {
        spyWriteComponent = false
    })

    test("no integrations; should return", async () => {
        optimizer.processDataComponents([ {} ])
        expect(spyWriteComponent).toBeFalsy()
    })

    test("type hint is not supported; should return", async () => {
        isSupported = false
        new SdDtfWriteableComponentPostProcessor([ dummyIntegration ]).processDataComponents([ {} ])
        expect(spyWriteComponent).toBeFalsy()
    })

    test("type hint is supported; should call writeComponent", async () => {
        isSupported = true
        new SdDtfWriteableComponentPostProcessor([ dummyIntegration ]).processDataComponents([ {} ])
        expect(spyWriteComponent).toBeTruthy()
    })

})

describe("removeDuplicatedTypeHints", function () {

    test("one unique type hint; should merge unique type hints and set references", () => {
        const asset = factory.createAsset(),
            attributes = factory.createAttributes({ "val": [ 1, "number" ] }),
            chunk = factory.createChunk("[0]"),
            dataItem = factory.createDataItem(3, "number"),
            node = factory.createNode()

        chunk.typeHint = factory.createTypeHint("number")
        node.typeHint = factory.createTypeHint("number")

        const componentList: ISdDtfWriteableComponentList = {
            accessors: [],
            asset,
            attributes: [ attributes ],
            buffers: [],
            bufferViews: [],
            chunks: [ chunk ],
            items: [ dataItem ],
            nodes: [ node ],
            typeHints: [ ...Object.values(attributes.entries).map(a => a.typeHint!), chunk.typeHint!, dataItem.typeHint!, node.typeHint! ],
            fileInfo: asset.fileInfo,
        }

        optimizer.removeDuplicatedTypeHints(componentList)

        expect(componentList.typeHints.length).toBe(1)
        const typeHintId = componentList.typeHints[0].componentId
        expect(componentList.attributes[0].entries["val"].typeHint?.componentId).toBe(typeHintId)
        expect(componentList.chunks[0].typeHint?.componentId).toBe(typeHintId)
        expect(componentList.items[0].typeHint?.componentId).toBe(typeHintId)
        expect(componentList.nodes[0].typeHint?.componentId).toBe(typeHintId)
    })

    test("typehints with additional attributes; should only merge unique type hints and additional attributes, and set references", () => {
        const asset = factory.createAsset(),
            attributes = factory.createAttributes({ "val": [ 1, "number" ] }),
            chunk = factory.createChunk("[0]"),
            dataItem = factory.createDataItem(3, "number"),
            node = factory.createNode()

        chunk.typeHint = factory.createTypeHint("number")
        node.typeHint = factory.createTypeHint("number")

        // Set additional attributes for type hints
        attributes.entries["val"].typeHint!.additionalProperties["name"] = "A"
        chunk.typeHint.additionalProperties["name"] = "B"
        dataItem.typeHint!.additionalProperties["name"] = "A"
        node.typeHint.additionalProperties["name"] = "B"

        const componentList: ISdDtfWriteableComponentList = {
            accessors: [],
            asset,
            attributes: [ attributes ],
            buffers: [],
            bufferViews: [],
            chunks: [ chunk ],
            items: [ dataItem ],
            nodes: [ node ],
            typeHints: [ ...Object.values(attributes.entries).map(a => a.typeHint!), chunk.typeHint!, dataItem.typeHint!, node.typeHint! ],
            fileInfo: asset.fileInfo,
        }

        optimizer.removeDuplicatedTypeHints(componentList)

        expect(componentList.typeHints.length).toBe(2)
        const typeHintIdA = componentList.typeHints[0].componentId,
            typeHintIdB = componentList.typeHints[1].componentId
        expect(componentList.attributes[0].entries["val"].typeHint?.componentId).toBe(typeHintIdA)
        expect(componentList.chunks[0].typeHint?.componentId).toBe(typeHintIdB)
        expect(componentList.items[0].typeHint?.componentId).toBe(typeHintIdA)
        expect(componentList.nodes[0].typeHint?.componentId).toBe(typeHintIdB)
    })

})

describe("resolveBuffers", function () {

    test("internal buffers only; should merge buffers and set references", () => {
        const asset = factory.createAsset(),
            bufferViews = [
                factory.createBufferView({ data: new ArrayBuffer(12477), contentType: "a" }),
                factory.createBufferView({ data: new ArrayBuffer(2172131), contentType: "b" }),
                factory.createBufferView({ data: new ArrayBuffer(173507), contentType: "c" }),
            ]

        const componentList: ISdDtfWriteableComponentList = {
            accessors: [],
            asset,
            attributes: [],
            buffers: bufferViews.map(b => b.buffer!),
            bufferViews,
            chunks: [],
            items: [],
            nodes: [],
            typeHints: [],
            fileInfo: asset.fileInfo,
        }

        optimizer.resolveBuffers(componentList)

        expect(componentList.buffers.length).toBe(1)
        const buffer = componentList.buffers[0]
        expect(buffer.uri).toBe("")
        expect(buffer.byteLength).toBe(2358119)
        expect(buffer.data?.byteLength).toBe(2358119)

        expect(componentList.bufferViews.length).toBe(3)
        expect(componentList.bufferViews[0].byteOffset).toBe(0)
        expect(componentList.bufferViews[0].byteLength).toBe(12477)
        expect(componentList.bufferViews[0].buffer).toBe(buffer)
        expect(componentList.bufferViews[0].contentType).toBe("a")
        expect(componentList.bufferViews[1].byteOffset).toBe(12480)
        expect(componentList.bufferViews[1].byteLength).toBe(2172131)
        expect(componentList.bufferViews[1].buffer).toBe(buffer)
        expect(componentList.bufferViews[1].contentType).toBe("b")
        expect(componentList.bufferViews[2].byteOffset).toBe(2184612)
        expect(componentList.bufferViews[2].byteLength).toBe(173507)
        expect(componentList.bufferViews[2].buffer).toBe(buffer)
        expect(componentList.bufferViews[2].contentType).toBe("c")

    })

    test("internal and external buffers; should merge buffers depending on their uri property and set references", () => {
        // Add some external buffers as well
        const externalBufferView1 = factory.createBufferView()
        externalBufferView1.buffer = factory.createBuffer(new ArrayBuffer(5))
        externalBufferView1.buffer.uri = "/foo"

        const externalBufferView2 = factory.createBufferView()
        externalBufferView2.buffer = factory.createBuffer(new ArrayBuffer(10))
        externalBufferView2.buffer.uri = "/foo"

        const externalBufferView3 = factory.createBufferView()
        externalBufferView3.buffer = factory.createBuffer(new ArrayBuffer(20))
        externalBufferView3.buffer.uri = "/foo/bar"

        const internalBuffer1 = factory.createBufferView({ data: new ArrayBuffer(30), contentType: "a" })
        const internalBuffer2 = factory.createBufferView({ data: new ArrayBuffer(40), contentType: "a" })

        const asset = factory.createAsset()

        const componentList: ISdDtfWriteableComponentList = {
            accessors: [],
            asset,
            attributes: [],
            buffers: [ internalBuffer1.buffer!, internalBuffer2.buffer!, externalBufferView1.buffer!, externalBufferView2.buffer!, externalBufferView3.buffer! ],
            bufferViews: [ internalBuffer1, internalBuffer2, externalBufferView1, externalBufferView2, externalBufferView3 ],
            chunks: [],
            items: [],
            nodes: [],
            typeHints: [],
            fileInfo: asset.fileInfo,
        }

        optimizer.resolveBuffers(componentList)

        expect(componentList.buffers.length).toBe(3)
        const internalBuffer = componentList.buffers[0]
        expect(internalBuffer.uri).toBe("")
        const externalBuffer1 = componentList.buffers[1]
        expect(externalBuffer1.uri).toBe("/foo")
        const externalBuffer2 = componentList.buffers[2]
        expect(externalBuffer2.uri).toBe("/foo/bar")

        expect(componentList.bufferViews.length).toBe(5)
        expect(componentList.bufferViews[0].buffer).toBe(internalBuffer)
        expect(componentList.bufferViews[1].buffer).toBe(internalBuffer)
        expect(componentList.bufferViews[2].buffer).toBe(externalBuffer1)
        expect(componentList.bufferViews[3].buffer).toBe(externalBuffer1)
        expect(componentList.bufferViews[4].buffer).toBe(externalBuffer2)
    })

    test("special cases; should merge all together into a single buffer", () => {
        const asset = factory.createAsset(),
            bufferViews = [
                factory.createBufferView({ data: new ArrayBuffer(0), contentType: "a" }),   // empty buffer data
                factory.createBufferView(),                                                            // buffer view without a buffer - should be ignored!
                factory.createBufferView({ data: new ArrayBuffer(10), contentType: "b" }),  // regular internal buffer
            ]

        const componentList: ISdDtfWriteableComponentList = {
            accessors: [],
            asset,
            attributes: [],
            buffers: bufferViews.map(b => b.buffer!),
            bufferViews,
            chunks: [],
            items: [],
            nodes: [],
            typeHints: [],
            fileInfo: asset.fileInfo,
        }

        optimizer.resolveBuffers(componentList)

        expect(componentList.buffers.length).toBe(1)
        const buffer = componentList.buffers[0]
        expect(buffer.uri).toBe("")
        expect(buffer.byteLength).toBe(10)
        expect(buffer.data?.byteLength).toBe(10)

        expect(componentList.bufferViews.length).toBe(3)
        expect(componentList.bufferViews[0].byteOffset).toBe(0)
        expect(componentList.bufferViews[0].byteLength).toBe(0)
        expect(componentList.bufferViews[0].buffer).toBe(buffer)
        expect(componentList.bufferViews[1].byteOffset).toBeUndefined()
        expect(componentList.bufferViews[1].byteLength).toBeUndefined()
        expect(componentList.bufferViews[1].buffer).toBeUndefined()
        expect(componentList.bufferViews[2].byteOffset).toBe(0)
        expect(componentList.bufferViews[2].byteLength).toBe(10)
        expect(componentList.bufferViews[2].buffer).toBe(buffer)
    })

    test("buffers with additional properties; should merge additional properties and override duplicated ones", () => {
        const asset = factory.createAsset(),
            bufferView1 = factory.createBufferView({ data: new ArrayBuffer(1), contentType: "c" }),
            bufferView2 = factory.createBufferView({ data: new ArrayBuffer(1), contentType: "b" })

        // Set additional properties in buffers
        bufferView1.buffer!.additionalProperties.foo = "foo"
        bufferView1.buffer!.additionalProperties.bar = "bar"
        bufferView2.buffer!.additionalProperties.bar = "qux"    // Redeclaration!
        bufferView2.buffer!.additionalProperties.baz = "baz"

        const componentList: ISdDtfWriteableComponentList = {
            accessors: [],
            asset,
            attributes: [],
            buffers: [ bufferView1.buffer!, bufferView2.buffer! ],
            bufferViews: [ bufferView1, bufferView2 ],
            chunks: [],
            items: [],
            nodes: [],
            typeHints: [],
            fileInfo: asset.fileInfo,
        }

        optimizer.resolveBuffers(componentList)

        expect(componentList.buffers.length).toBe(1)
        expect(Object.keys(componentList.buffers[0].additionalProperties).length).toBe(3)
        expect(componentList.buffers[0].additionalProperties.foo).toBe("foo")
        expect(componentList.buffers[0].additionalProperties.bar).toBe("qux")   // last one overrides!
        expect(componentList.buffers[0].additionalProperties.baz).toBe("baz")
    })

})
