import { ISdDtfNode } from "@shapediver/sdk.sdtf-core"
import { SdDtfAccessor } from "../../src/components/SdDtfAccessor"
import { SdDtfAttributes } from "../../src/components/SdDtfAttributes"
import { SdDtfBuffer } from "../../src/components/SdDtfBuffer"
import { SdDtfBufferView } from "../../src/components/SdDtfBufferView"
import { SdDtfDataItem } from "../../src/components/SdDtfDataItem"
import { SdDtfNode } from "../../src/components/SdDtfNode"
import { SdDtfTypeHint } from "../../src/components/SdDtfTypeHint"
import { SdDtfComponentFactory } from "../../src/reader/SdDtfComponentFactory"

const factory = new SdDtfComponentFactory()

describe("createAccessor", function () {

    const buffer = new SdDtfBuffer(1),
        bufferView = new SdDtfBufferView(buffer, 1, 0, "text"),
        bufferViews = [ bufferView ]

    test("minimal accessor data; should return accessor instance", () => {
        const accessor = factory.createAccessor({ bufferView: 0 }, bufferViews)
        expect(accessor).toBeDefined()
        expect(accessor.bufferView).toBe(bufferView)
    })

    test("full accessor data; should return accessor instance", () => {
        const accessor = factory.createAccessor({ bufferView: 0, id: "[0]" }, bufferViews)
        expect(accessor).toBeDefined()
        expect(accessor.bufferView).toBe(bufferView)
        expect(accessor.id).toBe("[0]")
    })

    test("accessor with additional properties; should add additional properties to accessor", () => {
        const accessor = factory.createAccessor({ bufferView: 0, foo: "bar" }, bufferViews)
        expect(accessor).toBeDefined()
        expect(accessor.bufferView).toBe(bufferView)
        expect(accessor.foo).toBe("bar")
    })

    test("invalid bufferView property; should throw", () => {
        // property missing
        expect(() => factory.createAccessor({}, bufferViews)).toThrow(/Required property 'bufferView' must be an unsigned integer/)

        // invalid property value
        expect(() => factory.createAccessor({ bufferView: -1 }, bufferViews)).toThrow(/Required property 'bufferView' must be an unsigned integer/)

        // invalid reference
        expect(() => factory.createAccessor({ bufferView: 1 }, bufferViews)).toThrow(/Buffer view index is out of range/)
    })

    test("invalid id property; should throw", () => {
        // invalid property value
        expect(() => factory.createAccessor({
            bufferView: 0,
            id: 1,
        }, bufferViews)).toThrow(/Optional property 'id' must be a string/)
    })

})

describe("createAttribute", function () {

    const buffer = new SdDtfBuffer(1),
        bufferView = new SdDtfBufferView(buffer, 1, 0, "text"),
        accessor = new SdDtfAccessor(bufferView),
        accessors = [ accessor ],
        typeHint = new SdDtfTypeHint("rhino.mesh"),
        typeHints = [ typeHint ]

    test("minimal attributes data; should return attribute instance", () => {
        const attributes = factory.createAttribute({}, accessors, typeHints)
        expect(attributes).toBeDefined()
        expect(Object.keys(attributes).length).toBe(0)
    })

    test("full attributes data; should return attribute instance", () => {
        const attributes = factory.createAttribute({
            "name": {
                value: "awesome value",
                accessor: 0,
                typeHint: 0,
            },
        }, accessors, typeHints)
        expect(attributes).toBeDefined()
        expect(Object.keys(attributes).length).toBe(1)
        expect(Object.keys(attributes)[0]).toBe("name")
        expect(Object.values(attributes)[0].value).toBe("awesome value")
        expect(Object.values(attributes)[0].accessor).toBe(accessor)
        expect(Object.values(attributes)[0].typeHint).toBe(typeHint)
    })

    test("attributes with additional properties; should throw", () => {
        expect(() => factory.createAttribute({ name: { foo: "bar" } }, accessors, typeHints)).toThrow(/Unspecified properties are not allowed/)
    })

    test("invalid attribute item; should throw", () => {
        // invalid property value
        expect(() => factory.createAttribute({ name: "" }, accessors, typeHints)).toThrow(/Item must be an object/)
    })

    test("invalid accessors property; should throw", () => {
        // invalid property value
        expect(() => factory.createAttribute({
            "name": { accessor: -1 },
        }, accessors, typeHints)).toThrow(/Optional property 'accessor' must be an unsigned integer/)

        // invalid reference
        expect(() => factory.createAttribute({
            "name": { accessor: 1 },
        }, accessors, typeHints)).toThrow(/Accessor index is out of range/)
    })

    test("invalid type hints property; should throw", () => {
        // invalid property value
        expect(() => factory.createAttribute({
            "name": { typeHint: -1 },
        }, accessors, typeHints)).toThrow(/Optional property 'typeHint' must be an unsigned integer/)

        // invalid reference
        expect(() => factory.createAttribute({
            "name": { typeHint: 1 },
        }, accessors, typeHints)).toThrow(/Type hint index is out of range/)
    })

})

describe("createBuffer", function () {

    test("minimal buffer data; should return buffer instance", () => {
        const buffer = factory.createBuffer({ byteLength: 666 })
        expect(buffer).toBeDefined()
        expect(buffer.byteLength).toBe(666)
    })

    test("full buffer data; should return buffer instance", () => {
        const buffer = factory.createBuffer({ byteLength: 666, uri: "data:,foobar" })
        expect(buffer).toBeDefined()
        expect(buffer.byteLength).toBe(666)
        expect(buffer.uri).toBe("data:,foobar")
    })

    test("buffer with additional properties; should add additional properties to buffer", () => {
        const buffer = factory.createBuffer({ byteLength: 666, foo: "bar" })
        expect(buffer).toBeDefined()
        expect(buffer.byteLength).toBe(666)
        expect(buffer.foo).toBe("bar")
    })

    test("invalid byteLength property; should throw", () => {
        // property missing
        expect(() => factory.createBuffer({})).toThrow(/Required property 'byteLength' must be an unsigned integer/)

        // invalid property value
        expect(() => factory.createBuffer({ byteLength: "666" })).toThrow(/Required property 'byteLength' must be an unsigned integer/)
    })

    test("invalid uri property; should throw", () => {
        // invalid property value
        expect(() => factory.createBuffer({
            byteLength: 666,
            uri: 0,
        })).toThrow(/Optional property 'uri' must be a string/)
    })

})

describe("createBufferView", function () {

    const buffer = new SdDtfBuffer(1),
        buffers = [ buffer ]

    test("minimal buffer view data; should return buffer view instance", () => {
        const bufferView = factory.createBufferView({
            buffer: 0,
            byteLength: 1,
            byteOffset: 0,
            contentType: "text",
        }, buffers)
        expect(bufferView).toBeDefined()
        expect(bufferView.buffer).toBe(buffer)
        expect(bufferView.byteLength).toBe(1)
        expect(bufferView.byteOffset).toBe(0)
        expect(bufferView.contentType).toBe("text")
    })

    test("full buffer view data; should return buffer view instance", () => {
        const bufferView = factory.createBufferView({
            buffer: 0,
            byteLength: 1,
            byteOffset: 0,
            contentType: "text",
            contentEncoding: "gzip",
            name: "[1]",
        }, buffers)
        expect(bufferView).toBeDefined()
        expect(bufferView.buffer).toBe(buffer)
        expect(bufferView.byteLength).toBe(1)
        expect(bufferView.byteOffset).toBe(0)
        expect(bufferView.contentType).toBe("text")
        expect(bufferView.contentEncoding).toBe("gzip")
        expect(bufferView.name).toBe("[1]")
    })

    test("buffer view with additional properties; should add additional properties to buffer view", () => {
        const bufferView = factory.createBufferView({
            buffer: 0,
            byteLength: 1,
            byteOffset: 0,
            contentType: "text",
            foo: "bar",
        }, buffers)
        expect(bufferView).toBeDefined()
        expect(bufferView.buffer).toBe(buffer)
        expect(bufferView.byteLength).toBe(1)
        expect(bufferView.byteOffset).toBe(0)
        expect(bufferView.contentType).toBe("text")
        expect(bufferView.foo).toBe("bar")
    })

    test("invalid buffer property; should throw", () => {
        // property missing
        expect(() => factory.createBufferView({
            byteLength: 1,
            byteOffset: 0,
            contentType: "text",
        }, buffers)).toThrow(/Required property 'buffer' must be an unsigned integer/)

        // invalid property value
        expect(() => factory.createBufferView({
            buffer: -1,
            byteLength: 1,
            byteOffset: 0,
            contentType: "text",
        }, buffers)).toThrow(/Required property 'buffer' must be an unsigned integer/)

        // invalid reference
        expect(() => factory.createBufferView({
            buffer: 1,
            byteLength: 1,
            byteOffset: 0,
            contentType: "text",
        }, buffers)).toThrow(/Buffer index is out of range/)
    })

    test("invalid byteLength property; should throw", () => {
        // property missing
        expect(() => factory.createBufferView({
            buffer: 0,
            byteOffset: 0,
            contentType: "text",
        }, buffers)).toThrow(/Required property 'byteLength' must be an unsigned integer/)

        // invalid property value
        expect(() => factory.createBufferView({
            buffer: 0,
            byteLength: -1,
            byteOffset: 0,
            contentType: "text",
        }, buffers)).toThrow(/Required property 'byteLength' must be an unsigned integer/)
    })

    test("invalid byteOffset property; should throw", () => {
        // property missing
        expect(() => factory.createBufferView({
            buffer: 0,
            byteLength: 1,
            contentType: "text",
        }, buffers)).toThrow(/Required property 'byteOffset' must be an unsigned integer/)

        // invalid property value
        expect(() => factory.createBufferView({
            buffer: 0,
            byteLength: 1,
            byteOffset: -1,
            contentType: "text",
        }, buffers)).toThrow(/Required property 'byteOffset' must be an unsigned integer/)
    })

    test("invalid contentType property; should throw", () => {
        // property missing
        expect(() => factory.createBufferView({
            buffer: 0,
            byteLength: 1,
            byteOffset: 0,
        }, buffers)).toThrow(/Required property 'contentType' must be a non-empty string/)

        // invalid property value
        expect(() => factory.createBufferView({
            buffer: 0,
            byteLength: 1,
            byteOffset: 0,
            contentType: "",
        }, buffers)).toThrow(/Required property 'contentType' must be a non-empty string/)
    })

    test("invalid contentEncoding property; should throw", () => {
        // invalid property value
        expect(() => factory.createBufferView({
            buffer: 0,
            byteLength: 1,
            byteOffset: 0,
            contentType: "text",
            contentEncoding: false,
        }, buffers)).toThrow(/Optional property 'contentEncoding' must be a string/)
    })

    test("invalid name property; should throw", () => {
        // invalid property value
        expect(() => factory.createBufferView({
            buffer: 0,
            byteLength: 1,
            byteOffset: 0,
            contentType: "text",
            name: 1,
        }, buffers)).toThrow(/Optional property 'name' must be a string/)
    })

})

describe("createChunk", function () {

    const attribute = new SdDtfAttributes(),
        attributes = [ attribute ],
        dataItem = new SdDtfDataItem(),
        dataItems = [ dataItem ],
        node = new SdDtfNode(),
        nodes = [ node ],
        typeHint = new SdDtfTypeHint("rhino.mesh"),
        typeHints = [ typeHint ]

    // Set some data, otherwise .toBe fails
    attribute["name"] = { value: "value" }
    dataItem.value = "value"
    node.name = "[0]"

    test("minimal node data; should return node instance", () => {
        const node = factory.createChunk({ name: "root" }, attributes, dataItems, nodes, typeHints)
        expect(node).toBeDefined()
        expect(node.name).toBe("root")
    })

    test("full node data; should return node instance", () => {
        const node = factory.createChunk({
            attributes: 0,
            items: [ 0 ],
            name: "[0]",
            nodes: [ 0 ],
            typeHint: 0,
        }, attributes, dataItems, nodes, typeHints)
        expect(node).toBeDefined()
        expect(node.attributes).toBe(attribute)
        expect(node.items).toStrictEqual(dataItems)
        expect(node.name).toStrictEqual("[0]")
        expect(node.nodes).toStrictEqual(nodes)
        expect(node.typeHint).toBe(typeHint)
    })

    test("data item with additional properties; should add additional properties to data item", () => {
        const node = factory.createChunk({ name: "root", foo: "bar" }, attributes, dataItems, nodes, typeHints)
        expect(node).toBeDefined()
        expect(node.name).toBe("root")
        expect(node.foo).toBe("bar")
    })

    test("invalid name property; should throw", () => {
        // property missing
        expect(() => factory.createChunk({}, attributes, dataItems, nodes, typeHints)).toThrow(/Required property 'name' must be a string/)

        // invalid property value
        expect(() => factory.createChunk({ name: 1 }, attributes, dataItems, nodes, typeHints)).toThrow(/Required property 'name' must be a string/)
    })

    test("invalid attributes property; should throw", () => {
        // invalid property value
        expect(() => factory.createChunk({
            name: "root",
            attributes: -1,
        }, attributes, dataItems, nodes, typeHints)).toThrow(/Optional property 'attributes' must be an unsigned integer/)

        // invalid reference
        expect(() => factory.createChunk({
            name: "root",
            attributes: 1,
        }, attributes, dataItems, nodes, typeHints)).toThrow(/Attributes index is out of range/)
    })

    test("invalid items property; should throw", () => {
        // invalid property value
        expect(() => factory.createChunk({
            name: "root",
            items: [ -1 ],
        }, attributes, dataItems, nodes, typeHints)).toThrow(/Optional property 'items' must be an array of unsigned integers/)

        // invalid reference
        expect(() => factory.createChunk({
            name: "root",
            items: [ 1 ],
        }, attributes, dataItems, nodes, typeHints)).toThrow(/Data item index is out of range/)
    })

    test("invalid nodes property; should throw", () => {
        // invalid property value
        expect(() => factory.createChunk({
            name: "root",
            nodes: [ -1 ],
        }, attributes, dataItems, nodes, typeHints)).toThrow(/Optional property 'nodes' must be an array of unsigned integers/)

        // invalid reference
        expect(() => factory.createChunk({
            name: "root",
            nodes: [ 1 ],
        }, attributes, dataItems, nodes, typeHints)).toThrow(/Node index is out of range/)
    })

    test("invalid type hints property; should throw", () => {
        // invalid property value
        expect(() => factory.createChunk({
            name: "root",
            typeHint: -1,
        }, attributes, dataItems, nodes, typeHints)).toThrow(/Optional property 'typeHint' must be an unsigned integer/)

        // invalid reference
        expect(() => factory.createChunk({
            name: "root",
            typeHint: 1,
        }, attributes, dataItems, nodes, typeHints)).toThrow(/Type hint index is out of range/)
    })

})

describe("createDataItem", function () {

    const buffer = new SdDtfBuffer(1),
        bufferView = new SdDtfBufferView(buffer, 1, 0, "text"),
        accessor = new SdDtfAccessor(bufferView),
        accessors = [ accessor ],
        attribute = new SdDtfAttributes(),
        attributes = [ attribute ],
        typeHint = new SdDtfTypeHint("rhino.mesh"),
        typeHints = [ typeHint ]

    // Set some data, otherwise .toBe fails
    attribute["name"] = { value: "value" }

    test("minimal data item data; should return data item instance", () => {
        const dataItem = factory.createDataItem({}, accessors, attributes, typeHints)
        expect(dataItem).toBeDefined()
    })

    test("full data item data; should return data item instance", () => {
        const dataItem = factory.createDataItem({
            accessor: 0,
            attributes: 0,
            typeHint: 0,
            value: "awesome value",
        }, accessors, attributes, typeHints)
        expect(dataItem).toBeDefined()
        expect(dataItem.accessor).toBe(accessor)
        expect(dataItem.attributes).toBe(attribute)
        expect(dataItem.typeHint).toBe(typeHint)
        expect(dataItem.value).toBe("awesome value")
    })

    test("data item with additional properties; should add additional properties to data item", () => {
        const dataItem = factory.createDataItem({ foo: "bar" }, accessors, attributes, typeHints)
        expect(dataItem).toBeDefined()
        expect(dataItem.foo).toBe("bar")
    })

    test("invalid accessor property; should throw", () => {
        // invalid property value
        expect(() => factory.createDataItem({ accessor: -1 }, accessors, attributes, typeHints)).toThrow(/Optional property 'accessor' must be an unsigned integer/)

        // invalid reference
        expect(() => factory.createDataItem({ accessor: 1 }, accessors, attributes, typeHints)).toThrow(/Accessor index is out of range/)
    })

    test("invalid attributes property; should throw", () => {
        // invalid property value
        expect(() => factory.createDataItem({ attributes: -1 }, accessors, attributes, typeHints)).toThrow(/Optional property 'attributes' must be an unsigned integer/)

        // invalid reference
        expect(() => factory.createDataItem({ attributes: 1 }, accessors, attributes, typeHints)).toThrow(/Attributes index is out of range/)
    })

    test("invalid type hints property; should throw", () => {
        // invalid property value
        expect(() => factory.createDataItem({ typeHint: -1 }, accessors, attributes, typeHints)).toThrow(/Optional property 'typeHint' must be an unsigned integer/)

        // invalid reference
        expect(() => factory.createDataItem({ typeHint: 1 }, accessors, attributes, typeHints)).toThrow(/Type hint index is out of range/)
    })

})

describe("createFileInfo", function () {

    test("minimal file info data; should return file info instance", () => {
        const fileInfo = factory.createFileInfo({ version: "1.0" })
        expect(fileInfo).toBeDefined()
        expect(fileInfo.version).toBe("1.0")
    })

    test("full file info data; should return file info instance", () => {
        const fileInfo = factory.createFileInfo({
            version: "1.0",
            copyright: "GPLv3",
            generator: "ShapeDiverSdtfWriter",
        })
        expect(fileInfo).toBeDefined()
        expect(fileInfo.version).toBe("1.0")
        expect(fileInfo.copyright).toStrictEqual("GPLv3")
        expect(fileInfo.generator).toBe("ShapeDiverSdtfWriter")
    })

    test("file info with additional properties; should add additional properties to file info", () => {
        const fileInfo = factory.createFileInfo({ version: "1.0", foo: "bar" })
        expect(fileInfo).toBeDefined()
        expect(fileInfo.version).toBe("1.0")
        expect(fileInfo.foo).toBe("bar")
    })

    test("invalid version property; should throw", () => {
        // property missing
        expect(() => factory.createFileInfo({})).toThrow(/Required property 'version' must be a non-empty string/)

        // invalid property value
        expect(() => factory.createFileInfo({ version: "" })).toThrow(/Required property 'version' must be a non-empty string/)
    })

    test("invalid copyright property; should throw", () => {
        // invalid property value
        expect(() => factory.createFileInfo({
            version: "1.0",
            copyright: false,
        })).toThrow(/Optional property 'copyright' must be a string/)
    })

    test("invalid generator property; should throw", () => {
        // invalid property value
        expect(() => factory.createFileInfo({
            version: "1.0",
            generator: false,
        })).toThrow(/Optional property 'generator' must be a string/)
    })

})

describe("createNode", function () {

    const attribute = new SdDtfAttributes(),
        attributes = [ attribute ],
        dataItem = new SdDtfDataItem(),
        dataItems = [ dataItem ],
        typeHint = new SdDtfTypeHint("rhino.mesh"),
        typeHints = [ typeHint ]

    // Set some data, otherwise .toBe fails
    attribute["name"] = { value: "value" }
    dataItem.value = "value"

    test("minimal node data; should return node instance", () => {
        const node = factory.createNode({}, attributes, dataItems, typeHints)
        expect(node).toBeDefined()
    })

    test("full node data; should return node instance", () => {
        const node = factory.createNode({
            attributes: 0,
            items: [ 0 ],
            name: "[0]",
            typeHint: 0,
        }, attributes, dataItems, typeHints)
        expect(node).toBeDefined()
        expect(node.attributes).toBe(attribute)
        expect(node.items).toStrictEqual(dataItems)
        expect(node.name).toStrictEqual("[0]")
        expect(node.nodes).toStrictEqual([])
        expect(node.typeHint).toBe(typeHint)
    })

    test("data item with additional properties; should add additional properties to data item", () => {
        const node = factory.createNode({ foo: "bar" }, attributes, dataItems, typeHints)
        expect(node).toBeDefined()
        expect(node.foo).toBe("bar")
    })

    test("invalid attributes property; should throw", () => {
        // invalid property value
        expect(() => factory.createNode({ attributes: -1 }, attributes, dataItems, typeHints)).toThrow(/Optional property 'attributes' must be an unsigned integer/)

        // invalid reference
        expect(() => factory.createNode({ attributes: 1 }, attributes, dataItems, typeHints)).toThrow(/Attributes index is out of range/)
    })

    test("invalid items property; should throw", () => {
        // invalid property value
        expect(() => factory.createNode({ items: [ -1 ] }, attributes, dataItems, typeHints)).toThrow(/Optional property 'items' must be an array of unsigned integers/)

        // invalid reference
        expect(() => factory.createNode({ items: [ 1 ] }, attributes, dataItems, typeHints)).toThrow(/Data item index is out of range/)
    })

    test("invalid name property; should throw", () => {
        expect(() => factory.createNode({ name: 123 }, attributes, dataItems, typeHints)).toThrow(/Optional property 'name' must be a string/)
    })

    test("invalid type hints property; should throw", () => {
        // invalid property value
        expect(() => factory.createNode({ typeHint: -1 }, attributes, dataItems, typeHints)).toThrow(/Optional property 'typeHint' must be an unsigned integer/)

        // invalid reference
        expect(() => factory.createNode({ typeHint: 1 }, attributes, dataItems, typeHints)).toThrow(/Type hint index is out of range/)
    })

})

describe("createTypeHint", function () {

    test("full type hint data; should return type hint instance", () => {
        const typeHint = factory.createTypeHint({ name: "rhino.mesh" })
        expect(typeHint).toBeDefined()
        expect(typeHint.name).toBe("rhino.mesh")
    })

    test("type hint with additional properties; should add additional properties to type hint", () => {
        const typeHint = factory.createTypeHint({ name: "grasshopper.path", foo: "bar" })
        expect(typeHint).toBeDefined()
        expect(typeHint.name).toBe("grasshopper.path")
        expect(typeHint.foo).toBe("bar")
    })

    test("type hint without name property; should throw", () => {
        // property missing
        expect(() => factory.createTypeHint({})).toThrow(/Required property 'name' must be a non-empty string/)

        // invalid property value
        expect(() => factory.createTypeHint({ name: "" })).toThrow(/Required property 'name' must be a non-empty string/)
    })

})

describe("setNodeReferences", function () {

    const attribute = new SdDtfAttributes(),
        attributes = [ attribute ],
        dataItem = new SdDtfDataItem(),
        dataItems = [ dataItem ],
        typeHint = new SdDtfTypeHint("rhino.mesh"),
        typeHints = [ typeHint ]

    // Set some data, otherwise .toBe fails
    attribute["name"] = { value: "value" }
    dataItem.value = "value"

    const nodeData = [
        { nodes: [ 1, 2 ] },
        { nodes: [ 0 ] },
        { nodes: [] },
    ]

    const nodes: ISdDtfNode[] = []

    beforeAll(() => {
        nodeData.forEach(data => nodes.push(factory.createNode(data, attributes, dataItems, typeHints)))
    })

    test("similar number of node data and instances; should set node-references ", () => {
        factory.setNodeReferences(nodeData, nodes)
        expect(nodes[0].nodes).toStrictEqual([ nodes[1], nodes[2] ])
        expect(nodes[1].nodes).toStrictEqual([ nodes[0] ])
        expect(nodes[2].nodes).toStrictEqual([])
    })

    test("number of node data and instances does not match; should throw", () => {
        expect(() => factory.setNodeReferences([ { nodes: [ 1 ] } ], nodes)).toThrow(/Invalid combination of node data and node instances/)
    })

    test("invalid nodes property; should throw", () => {
        // invalid property value
        expect(() => factory.setNodeReferences([ { nodes: [ -1 ] } ], [ nodes[0] ])).toThrow(/Optional property 'nodes' must be an array of unsigned integers/)

        // invalid reference
        expect(() => factory.setNodeReferences([ { nodes: [ 1 ] } ], [ nodes[0] ])).toThrow(/Node index is out of range/)

        // references itself
        expect(() => factory.setNodeReferences([ { nodes: [ 0 ] } ], [ nodes[0] ])).toThrow(/A node cannot reference itself/)
    })

})
