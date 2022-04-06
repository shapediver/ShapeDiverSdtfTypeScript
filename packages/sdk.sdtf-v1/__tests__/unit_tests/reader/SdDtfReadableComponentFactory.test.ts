import {
    ISdDtfAccessor,
    ISdDtfAttributes,
    ISdDtfBuffer,
    ISdDtfBufferView,
    ISdDtfChunk,
    ISdDtfDataItem,
    ISdDtfFileInfo,
    ISdDtfNode,
    ISdDtfReadableChunk,
    ISdDtfReadableNode,
    ISdDtfTypeHint,
} from "@shapediver/sdk.sdtf-core"
import { SdDtfBinaryBufferCache } from "../../../src/buffer_cache/SdDtfBinaryBufferCache"
import { SdDtfReadableAccessor } from "../../../src/reader/components/SdDtfReadableAccessor"
import { SdDtfReadableAttribute, SdDtfReadableAttributes } from "../../../src/reader/components/SdDtfReadableAttributes"
import { SdDtfReadableBuffer } from "../../../src/reader/components/SdDtfReadableBuffer"
import { SdDtfReadableBufferView } from "../../../src/reader/components/SdDtfReadableBufferView"
import { SdDtfReadableDataItem } from "../../../src/reader/components/SdDtfReadableDataItem"
import { SdDtfReadableTypeHint } from "../../../src/reader/components/SdDtfReadableTypeHint"
import { SdDtfDataParser } from "../../../src/reader/SdDtfDataParser"
import { SdDtfReadableComponentFactory } from "../../../src/reader/SdDtfReadableComponentFactory"
import { SdDtfComponentFactory } from "../../../src/structure/SdDtfComponentFactory"

const bufferCache = new SdDtfBinaryBufferCache()
const dataParser = new SdDtfDataParser([])
const readableFactory = new SdDtfReadableComponentFactory(bufferCache, dataParser)

const componentFactory = new SdDtfComponentFactory()

describe("createAccessor", function () {

    const buffer = new SdDtfReadableBuffer(1, bufferCache),
        bufferView = new SdDtfReadableBufferView(buffer, 1, 0, "text"),
        bufferViews = [ bufferView ]

    test("full accessor; should return readable accessor", () => {
        const accessor = componentFactory.createAccessor({
            bufferView: 0,
            id: "[0]",
            foo: "bar",
        }) as ISdDtfAccessor
        const readableAccessor = readableFactory.createAccessor(accessor, bufferViews)
        expect(readableAccessor).toBeDefined()
        expect(readableAccessor.bufferView).toBe(bufferView)
        expect(readableAccessor.id).toBe("[0]")
        expect(readableAccessor.additionalProperties).toStrictEqual({ foo: "bar" })
    })

})

describe("createAttributes", function () {

    const buffer = new SdDtfReadableBuffer(1, bufferCache),
        bufferView = new SdDtfReadableBufferView(buffer, 1, 0, "text"),
        accessor = new SdDtfReadableAccessor(bufferView),
        accessors = [ accessor ],
        typeHint = new SdDtfReadableTypeHint("rhino.mesh"),
        typeHints = [ typeHint ]

    test("full attributes; should return readable attributes", () => {
        const attributes = componentFactory.createAttributes({
            "name": {
                value: "awesome value",
                accessor: 0,
                typeHint: 0,
            },
        }) as ISdDtfAttributes
        const readableAttributes = readableFactory.createAttributes(attributes, accessors, typeHints)
        expect(readableAttributes).toBeDefined()
        expect(Object.keys(readableAttributes.entries).length).toBe(1)
        expect(Object.keys(readableAttributes.entries)[0]).toBe("name")
        expect(Object.values(readableAttributes.entries)[0].value).toBe("awesome value")
        expect(Object.values(readableAttributes.entries)[0].accessor).toBe(accessor)
        expect(Object.values(readableAttributes.entries)[0].typeHint).toBe(typeHint)
    })

})

describe("createBuffer", function () {

    test("full buffer; should return readable buffer", () => {
        const buffer = componentFactory.createBuffer({
            byteLength: 666,
            uri: "data:,foobar",
            foo: "bar",
        }) as ISdDtfBuffer
        const readableBuffer = readableFactory.createBuffer(buffer)
        expect(readableBuffer).toBeDefined()
        expect(readableBuffer.byteLength).toBe(666)
        expect(readableBuffer.uri).toBe("data:,foobar")
        expect(readableBuffer.additionalProperties).toStrictEqual({ foo: "bar" })
    })

})

describe("createBufferView", function () {

    const buffer = new SdDtfReadableBuffer(1, bufferCache),
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
        }) as ISdDtfBufferView
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

    const attribute = new SdDtfReadableAttributes(),
        attributes = [ attribute ],
        dataItem = new SdDtfReadableDataItem(dataParser),
        dataItems = [ dataItem ],
        typeHint = new SdDtfReadableTypeHint("rhino.mesh"),
        typeHints = [ typeHint ]

    // Set some data, otherwise .toBe fails
    attribute.entries["name"] = new SdDtfReadableAttribute(dataParser)
    dataItem.value = "value"

    test("full chunk; should return readable chunk", () => {
        const chunk = componentFactory.createChunk({
            attributes: 0,
            items: [ 0 ],
            name: "[0]",
            nodes: [ 0 ],
            typeHint: 0,
            foo: "bar",
        }) as ISdDtfChunk
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

    const buffer = new SdDtfReadableBuffer(1, bufferCache),
        bufferView = new SdDtfReadableBufferView(buffer, 1, 0, "text"),
        accessor = new SdDtfReadableAccessor(bufferView),
        accessors = [ accessor ],
        attribute = new SdDtfReadableAttributes(),
        attributes = [ attribute ],
        typeHint = new SdDtfReadableTypeHint("rhino.mesh"),
        typeHints = [ typeHint ]

    // Set some data, otherwise .toBe fails
    attribute.entries["name"] = new SdDtfReadableAttribute(dataParser)

    test("full data item data; should return data item instance", () => {
        const dataItem = componentFactory.createDataItem({
            accessor: 0,
            attributes: 0,
            typeHint: 0,
            value: "awesome value",
            foo: "bar",
        }) as ISdDtfDataItem
        const readableDataItem = readableFactory.createDataItem(dataItem, accessors, attributes, typeHints)
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
        }) as ISdDtfFileInfo
        const readableFileInfo = readableFactory.createFileInfo(fileInfo)
        expect(readableFileInfo).toBeDefined()
        expect(readableFileInfo.copyright).toStrictEqual("GPLv3")
        expect(readableFileInfo.generator).toBe("ShapeDiverSdtfWriter")
        expect(readableFileInfo.version).toBe("1.0")
        expect(readableFileInfo.additionalProperties).toStrictEqual({ foo: "bar" })
    })

})

describe("createNode", function () {

    const attribute = new SdDtfReadableAttributes(),
        attributes = [ attribute ],
        dataItem = new SdDtfReadableDataItem(dataParser),
        dataItems = [ dataItem ],
        typeHint = new SdDtfReadableTypeHint("rhino.mesh"),
        typeHints = [ typeHint ]

    // Set some data, otherwise .toBe fails
    attribute.entries["name"] = new SdDtfReadableAttribute(dataParser)
    dataItem.value = "value"

    test("full node; should return readable node", () => {
        const node = componentFactory.createNode({
            attributes: 0,
            items: [ 0 ],
            name: "[0]",
            nodes: [ 0 ],
            typeHint: 0,
            foo: "bar",
        }) as ISdDtfNode
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
        }) as ISdDtfTypeHint
        const readableTypeHint = readableFactory.createTypeHint(typeHint)
        expect(readableTypeHint).toBeDefined()
        expect(readableTypeHint.name).toBe("rhino.mesh")
        expect(readableTypeHint.additionalProperties).toStrictEqual({ foo: "bar" })
    })

})

describe("setChunkReferences", function () {

    const chunks: ISdDtfChunk[] = [
        componentFactory.createNode({ nodes: [ 1, 2 ] }) as ISdDtfChunk,
        componentFactory.createNode({ nodes: [ 0 ] }) as ISdDtfChunk,
        componentFactory.createNode({ nodes: [] }) as ISdDtfChunk,
    ]

    const readableChunks: ISdDtfReadableChunk[] = [
        readableFactory.createChunk(chunks[0], [], [], []),
        readableFactory.createChunk(chunks[1], [], [], []),
        readableFactory.createChunk(chunks[2], [], [], []),
    ]

    const readableNodes: ISdDtfReadableNode[] = [
        readableFactory.createNode(componentFactory.createNode({}) as ISdDtfNode, [], [], []),
        readableFactory.createNode(componentFactory.createNode({}) as ISdDtfNode, [], [], []),
        readableFactory.createNode(componentFactory.createNode({}) as ISdDtfNode, [], [], []),
    ]

    test("should set readable chunk references", () => {
        readableFactory.setChunkReferences(readableChunks, chunks, readableNodes)
        expect(readableChunks[0].nodes).toStrictEqual([ readableNodes[1], readableNodes[2] ])
        expect(readableChunks[1].nodes).toStrictEqual([ readableNodes[0] ])
        expect(readableChunks[2].nodes).toStrictEqual([])
    })

})

describe("setNodeReferences", function () {

    const nodes: ISdDtfNode[] = [
        componentFactory.createNode({ nodes: [ 1, 2 ] }) as ISdDtfNode,
        componentFactory.createNode({ nodes: [ 0 ] }) as ISdDtfNode,
        componentFactory.createNode({ nodes: [] }) as ISdDtfNode,
    ]

    const readableNodes: ISdDtfReadableNode[] = [
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
