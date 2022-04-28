import {
    ISdtfAccessor,
    ISdtfAttributes,
    ISdtfBuffer,
    ISdtfBufferView,
    ISdtfChunk,
    ISdtfDataItem,
    ISdtfFileInfo,
    ISdtfNode,
    ISdtfReadableChunk,
    ISdtfReadableContentComponent,
    ISdtfReadableDataItem,
    ISdtfReadableNode,
    ISdtfTypeHint,
} from "@shapediver/sdk.sdtf-core"
import { SdtfBinaryBufferCache } from "../../../src/buffer_cache/SdtfBinaryBufferCache"
import { SdtfReadableAccessor } from "../../../src/reader/components/SdtfReadableAccessor"
import { SdtfReadableAttribute, SdtfReadableAttributes } from "../../../src/reader/components/SdtfReadableAttributes"
import { SdtfReadableBuffer } from "../../../src/reader/components/SdtfReadableBuffer"
import { SdtfReadableBufferView } from "../../../src/reader/components/SdtfReadableBufferView"
import { SdtfReadableDataItem } from "../../../src/reader/components/SdtfReadableDataItem"
import { SdtfReadableTypeHint } from "../../../src/reader/components/SdtfReadableTypeHint"
import { SdtfDataParser } from "../../../src/reader/SdtfDataParser"
import { SdtfReadableComponentFactory } from "../../../src/reader/SdtfReadableComponentFactory"
import { SdtfComponentFactory } from "../../../src/structure/SdtfComponentFactory"

const bufferCache = new SdtfBinaryBufferCache()
const dataParser = new SdtfDataParser([])
const readableFactory = new SdtfReadableComponentFactory(bufferCache, dataParser)

const componentFactory = new SdtfComponentFactory()

describe("createAccessor", function () {

    const buffer = new SdtfReadableBuffer(1, bufferCache),
        bufferView = new SdtfReadableBufferView(buffer, 1, 0, "text"),
        bufferViews = [ bufferView ]

    test("full accessor; should return readable accessor", () => {
        const accessor = componentFactory.createAccessor({
            bufferView: 0,
            id: "[0]",
            foo: "bar",
        }) as ISdtfAccessor

        const readableAccessor = readableFactory.createAccessor(accessor, bufferViews)

        expect(readableAccessor).toBeDefined()
        expect(readableAccessor.bufferView).toBe(bufferView)
        expect(readableAccessor.id).toBe("[0]")
        expect(readableAccessor.additionalProperties).toStrictEqual({ foo: "bar" })
    })

})

describe("createAttributes", function () {

    const buffer = new SdtfReadableBuffer(1, bufferCache),
        bufferView = new SdtfReadableBufferView(buffer, 1, 0, "text"),
        accessor = new SdtfReadableAccessor(bufferView),
        accessors = [ accessor ],
        typeHint = new SdtfReadableTypeHint("rhino.mesh"),
        typeHints = [ typeHint ]

    test("full attributes; should return readable attributes", () => {
        const attributes = componentFactory.createAttributes({
            "name": {
                value: "awesome value",
                accessor: 0,
                typeHint: 0,
            },
        }) as ISdtfAttributes

        const readableAttributes = readableFactory.createAttributes(attributes, accessors, typeHints)

        expect(readableAttributes).toBeDefined()
        expect(Object.keys(readableAttributes.entries).length).toBe(1)
        expect(Object.keys(readableAttributes.entries)[0]).toBe("name")
        const attribute: ISdtfReadableContentComponent = Object.values(readableAttributes.entries)[0]
        expect(attribute.value).toBe("awesome value")
        expect(attribute.accessor).toBe(accessor)
        expect(attribute.typeHint).toBe(typeHint)
    })

})

describe("createBuffer", function () {

    test("full buffer; should return readable buffer", () => {
        const buffer = componentFactory.createBuffer({
            byteLength: 666,
            uri: "data:,foobar",
            foo: "bar",
        }) as ISdtfBuffer

        const readableBuffer = readableFactory.createBuffer(buffer)

        expect(readableBuffer).toBeDefined()
        expect(readableBuffer.byteLength).toBe(666)
        expect(readableBuffer.uri).toBe("data:,foobar")
        expect(readableBuffer.additionalProperties).toStrictEqual({ foo: "bar" })
    })

})

describe("createBufferView", function () {

    const buffer = new SdtfReadableBuffer(1, bufferCache),
        buffers = [ buffer ]

    test("full buffer view; should return readable attributes", () => {
        const bufferView = componentFactory.createBufferView({
            buffer: 0,
            byteLength: 1,
            byteOffset: 2,
            contentEncoding: "gzip",
            contentType: "text",
            name: "[1]",
            foo: "bar",
        }) as ISdtfBufferView

        const readableBufferView = readableFactory.createBufferView(bufferView, buffers)

        expect(readableBufferView).toBeDefined()
        expect(readableBufferView.buffer).toBe(buffer)
        expect(readableBufferView.byteLength).toBe(1)
        expect(readableBufferView.byteOffset).toBe(2)
        expect(readableBufferView.contentEncoding).toBe("gzip")
        expect(readableBufferView.contentType).toBe("text")
        expect(readableBufferView.name).toBe("[1]")
        expect(readableBufferView.additionalProperties).toStrictEqual({ foo: "bar" })
    })

})

describe("createChunk", function () {

    const attribute = new SdtfReadableAttributes(),
        attributes = [ attribute ],
        dataItem = new SdtfReadableDataItem(dataParser),
        dataItems = [ dataItem ],
        typeHint = new SdtfReadableTypeHint("rhino.mesh"),
        typeHints = [ typeHint ]

    // Set some data, otherwise .toBe fails
    attribute.entries["name"] = new SdtfReadableAttribute(dataParser)
    dataItem.value = "value"

    test("full chunk; should return readable chunk", () => {
        const chunk = componentFactory.createChunk({
            attributes: 0,
            items: [ 0 ],
            name: "[0]",
            nodes: [ 0 ],
            typeHint: 0,
            foo: "bar",
        }) as ISdtfChunk

        const readableChunk = readableFactory.createChunk(chunk, attributes, dataItems, typeHints)

        expect(readableChunk).toBeDefined()
        expect(readableChunk.attributes).toBe(attribute)
        expect(readableChunk.items).toStrictEqual(dataItems)
        expect(readableChunk.name).toStrictEqual("[0]")
        expect(readableChunk.nodes).toStrictEqual([])
        expect(readableChunk.typeHint).toBe(typeHint)
        expect(readableChunk.additionalProperties).toStrictEqual({ foo: "bar" })
    })

})

describe("createDataItem", function () {

    const buffer = new SdtfReadableBuffer(1, bufferCache),
        bufferView = new SdtfReadableBufferView(buffer, 1, 0, "text"),
        accessor = new SdtfReadableAccessor(bufferView),
        accessors = [ accessor ],
        attribute = new SdtfReadableAttributes(),
        attributes = [ attribute ],
        typeHint = new SdtfReadableTypeHint("rhino.mesh"),
        typeHints = [ typeHint ]

    // Set some data, otherwise .toBe fails
    attribute.entries["name"] = new SdtfReadableAttribute(dataParser)

    test("full data item data; should return data item instance", () => {
        const dataItem = componentFactory.createDataItem({
            accessor: 0,
            attributes: 0,
            typeHint: 0,
            value: "awesome value",
            foo: "bar",
        }) as ISdtfDataItem

        const readableDataItem: (ISdtfReadableDataItem & ISdtfReadableContentComponent) =
            readableFactory.createDataItem(dataItem, accessors, attributes, typeHints)

        expect(readableDataItem).toBeDefined()
        expect(readableDataItem.accessor).toBe(accessor)
        expect(readableDataItem.attributes).toBe(attribute)
        expect(readableDataItem.typeHint).toBe(typeHint)
        expect(readableDataItem.value).toBe("awesome value")
        expect(readableDataItem.additionalProperties).toStrictEqual({ foo: "bar" })
    })

})

describe("createFileInfo", function () {

    test("full file info data; should return file info instance", () => {
        const fileInfo = componentFactory.createFileInfo({
            version: "1.0",
            copyright: "GPLv3",
            generator: "ShapeDiverSdtfWriter",
            foo: "bar",
        }) as ISdtfFileInfo

        const readableFileInfo = readableFactory.createFileInfo(fileInfo)

        expect(readableFileInfo).toBeDefined()
        expect(readableFileInfo.copyright).toStrictEqual("GPLv3")
        expect(readableFileInfo.generator).toBe("ShapeDiverSdtfWriter")
        expect(readableFileInfo.version).toBe("1.0")
        expect(readableFileInfo.additionalProperties).toStrictEqual({ foo: "bar" })
    })

})

describe("createNode", function () {

    const attribute = new SdtfReadableAttributes(),
        attributes = [ attribute ],
        dataItem = new SdtfReadableDataItem(dataParser),
        dataItems = [ dataItem ],
        typeHint = new SdtfReadableTypeHint("rhino.mesh"),
        typeHints = [ typeHint ]

    // Set some data, otherwise .toBe fails
    attribute.entries["name"] = new SdtfReadableAttribute(dataParser)
    dataItem.value = "value"

    test("full node; should return readable node", () => {
        const node = componentFactory.createNode({
            attributes: 0,
            items: [ 0 ],
            name: "[0]",
            nodes: [ 0 ],
            typeHint: 0,
            foo: "bar",
        }) as ISdtfNode

        const readableNode = readableFactory.createNode(node, attributes, dataItems, typeHints)

        expect(readableNode).toBeDefined()
        expect(readableNode.attributes).toBe(attribute)
        expect(readableNode.items).toStrictEqual(dataItems)
        expect(readableNode.name).toStrictEqual("[0]")
        expect(readableNode.nodes).toStrictEqual([])
        expect(readableNode.typeHint).toBe(typeHint)
        expect(readableNode.additionalProperties).toStrictEqual({ foo: "bar" })
    })

})

describe("createTypeHint", function () {

    test("full type hint; should return type hint instance", () => {
        const typeHint = componentFactory.createTypeHint({
            name: "rhino.mesh",
            foo: "bar",
        }) as ISdtfTypeHint

        const readableTypeHint = readableFactory.createTypeHint(typeHint)

        expect(readableTypeHint).toBeDefined()
        expect(readableTypeHint.name).toBe("rhino.mesh")
        expect(readableTypeHint.additionalProperties).toStrictEqual({ foo: "bar" })
    })

})

describe("setChunkReferences", function () {

    const chunks: ISdtfChunk[] = [
        componentFactory.createNode({ nodes: [ 1, 2 ] }) as ISdtfChunk,
        componentFactory.createNode({ nodes: [ 0 ] }) as ISdtfChunk,
        componentFactory.createNode({ nodes: [] }) as ISdtfChunk,
    ]

    const readableChunks: ISdtfReadableChunk[] = [
        readableFactory.createChunk(chunks[0], [], [], []),
        readableFactory.createChunk(chunks[1], [], [], []),
        readableFactory.createChunk(chunks[2], [], [], []),
    ]

    const readableNodes: ISdtfReadableNode[] = [
        readableFactory.createNode(componentFactory.createNode({}) as ISdtfNode, [], [], []),
        readableFactory.createNode(componentFactory.createNode({}) as ISdtfNode, [], [], []),
        readableFactory.createNode(componentFactory.createNode({}) as ISdtfNode, [], [], []),
    ]

    test("should set readable chunk references", () => {
        readableFactory.setChunkReferences(readableChunks, chunks, readableNodes)
        expect(readableChunks[0].nodes).toStrictEqual([ readableNodes[1], readableNodes[2] ])
        expect(readableChunks[1].nodes).toStrictEqual([ readableNodes[0] ])
        expect(readableChunks[2].nodes).toStrictEqual([])
    })

})

describe("setNodeReferences", function () {

    const nodes: ISdtfNode[] = [
        componentFactory.createNode({ nodes: [ 1, 2 ] }) as ISdtfNode,
        componentFactory.createNode({ nodes: [ 0 ] }) as ISdtfNode,
        componentFactory.createNode({ nodes: [] }) as ISdtfNode,
    ]

    const readableNodes: ISdtfReadableNode[] = [
        readableFactory.createNode(nodes[0], [], [], []),
        readableFactory.createNode(nodes[1], [], [], []),
        readableFactory.createNode(nodes[2], [], [], []),
    ]

    test("should set readable node references", () => {
        readableFactory.setNodeReferences(readableNodes, nodes)
        expect(readableNodes[0].nodes).toStrictEqual([ readableNodes[1], readableNodes[2] ])
        expect(readableNodes[1].nodes).toStrictEqual([ readableNodes[0] ])
        expect(readableNodes[2].nodes).toStrictEqual([])
    })

})
