import { SdDtfWriteableComponentFactory } from "../../../src/writer/SdDtfWriteableComponentFactory"

const writeableFactory = new SdDtfWriteableComponentFactory()

describe("createAccessor", function () {

    test("no arguments; should create an empty accessor instance", () => {
        const writeableAccessor = writeableFactory.createAccessor()
        expect(writeableAccessor).toBeDefined()
        expect(writeableAccessor.componentId).toBeDefined()
        expect(writeableAccessor.bufferView).toBeUndefined()
        expect(writeableAccessor.id).toBeUndefined()
        expect(writeableAccessor.additionalProperties).toStrictEqual({})
    })

    test("buffer data given; should an accessor with a buffer view", () => {
        const writeableAccessor = writeableFactory.createAccessor({ data: new ArrayBuffer(0), contentType: "a" })
        expect(writeableAccessor).toBeDefined()
        expect(writeableAccessor.componentId).toBeDefined()
        expect(writeableAccessor.bufferView).toBeDefined()
        expect(writeableAccessor.id).toBeUndefined()
        expect(writeableAccessor.additionalProperties).toStrictEqual({})
    })

})

describe("createAsset", function () {

    test("no arguments; should create an asset with a file info", () => {
        const writeableAsset = writeableFactory.createAsset()
        expect(writeableAsset).toBeDefined()
        expect(writeableAsset.componentId).toBeDefined()
        expect(writeableAsset.fileInfo).toBeDefined()
        expect(writeableAsset.fileInfo.copyright).toBeUndefined()
        expect(writeableAsset.fileInfo.generator).toBe(writeableFactory.ASSET_GENERATOR)
        expect(writeableAsset.fileInfo.version).toBe(writeableFactory.ASSET_VERSION)
        expect(writeableAsset.chunks).toStrictEqual([])
        expect(writeableAsset.additionalProperties).toStrictEqual({})
    })

})

describe("createAttribute", function () {

    test("no arguments; should create an attribute", () => {
        const writeableAttribute = writeableFactory.createAttribute()
        expect(writeableAttribute).toBeDefined()
        expect(writeableAttribute.accessor).toBeUndefined()
        expect(writeableAttribute.typeHint).toBeUndefined()
        expect(writeableAttribute.value).toBeUndefined()
    })

    test("value data and type hint arguments; should create an attribute with a value and a type hint", () => {
        const writeableAttribute = writeableFactory.createAttribute("foo", "bar")
        expect(writeableAttribute).toBeDefined()
        expect(writeableAttribute.accessor).toBeUndefined()
        expect(writeableAttribute.typeHint).toBeDefined()
        expect(writeableAttribute.value).toBe("foo")
    })

    test("buffer data and type hint arguments; should create an attribute with an accessor and a type hint", () => {
        const writeableAttribute = writeableFactory.createAttribute({
            data: new ArrayBuffer(0),
            contentType: "a",
        }, "bar")
        expect(writeableAttribute).toBeDefined()
        expect(writeableAttribute.accessor).toBeDefined()
        expect(writeableAttribute.typeHint).toBeDefined()
        expect(writeableAttribute.value).toBeUndefined()
    })

})

describe("createAttributes", function () {

    test("no arguments; should create an attributes instance", () => {
        const writeableAttributes = writeableFactory.createAttributes()
        expect(writeableAttributes).toBeDefined()
        expect(writeableAttributes.componentId).toBeDefined()
        expect(writeableAttributes.entries).toStrictEqual({})
    })

    test("attribute data arguments; should create an attributes instance with two attribute", () => {
        const writeableAttributes = writeableFactory.createAttributes({
            attr1: [ "foo", "bar" ],
            attr2: [ { data: new ArrayBuffer(0), contentType: "a" }, "baz" ],
        })
        expect(writeableAttributes).toBeDefined()
        expect(writeableAttributes.componentId).toBeDefined()
        expect(Object.keys(writeableAttributes.entries).length).toBe(2)
        expect(writeableAttributes.entries["attr1"].accessor).toBeUndefined()
        expect(writeableAttributes.entries["attr1"].typeHint).toBeDefined()
        expect(writeableAttributes.entries["attr1"].value).toBe("foo")
        expect(writeableAttributes.entries["attr2"].accessor).toBeDefined()
        expect(writeableAttributes.entries["attr2"].typeHint).toBeDefined()
        expect(writeableAttributes.entries["attr2"].value).toBeUndefined()
    })

})

describe("createBuffer", function () {

    test("no arguments; should create a buffer", () => {
        const writeableBuffer = writeableFactory.createBuffer()
        expect(writeableBuffer).toBeDefined()
        expect(writeableBuffer.componentId).toBeDefined()
        expect(writeableBuffer.data).toBeUndefined()
        expect(writeableBuffer.uri).toBeUndefined()
        expect(writeableBuffer.additionalProperties).toStrictEqual({})
    })

    test("data arguments; should create a buffer with data", () => {
        const data = new ArrayBuffer(0)
        const writeableBuffer = writeableFactory.createBuffer(data)
        expect(writeableBuffer).toBeDefined()
        expect(writeableBuffer.componentId).toBeDefined()
        expect(writeableBuffer.data).toStrictEqual(data)
        expect(writeableBuffer.uri).toBeUndefined()
        expect(writeableBuffer.additionalProperties).toStrictEqual({})
    })

})

describe("createBufferView", function () {

    test("no arguments; should create a buffer view", () => {
        const writeableBufferView = writeableFactory.createBufferView()
        expect(writeableBufferView).toBeDefined()
        expect(writeableBufferView.componentId).toBeDefined()
        expect(writeableBufferView.buffer).toBeUndefined()
        expect(writeableBufferView.byteLength).toBeUndefined()
        expect(writeableBufferView.byteOffset).toBeUndefined()
        expect(writeableBufferView.contentEncoding).toBeUndefined()
        expect(writeableBufferView.contentType).toBeUndefined()
        expect(writeableBufferView.name).toBeUndefined()
        expect(writeableBufferView.additionalProperties).toStrictEqual({})
    })

    test("data arguments; should create a buffer view with a buffer", () => {
        const writeableBufferView = writeableFactory.createBufferView({ data: new ArrayBuffer(0), contentType: "a" })
        expect(writeableBufferView).toBeDefined()
        expect(writeableBufferView.componentId).toBeDefined()
        expect(writeableBufferView.buffer).toBeDefined()
        expect(writeableBufferView.byteLength).toBeUndefined()
        expect(writeableBufferView.byteOffset).toBeUndefined()
        expect(writeableBufferView.contentEncoding).toBeUndefined()
        expect(writeableBufferView.contentType).toBe("a")
        expect(writeableBufferView.name).toBeUndefined()
        expect(writeableBufferView.additionalProperties).toStrictEqual({})
    })

})

describe("createChunk", function () {

    test("no arguments; should create a chunk", () => {
        const writeableChunk = writeableFactory.createChunk()
        expect(writeableChunk).toBeDefined()
        expect(writeableChunk.componentId).toBeDefined()
        expect(writeableChunk.attributes).toBeUndefined()
        expect(writeableChunk.items).toStrictEqual([])
        expect(writeableChunk.name).toBeUndefined()
        expect(writeableChunk.nodes).toStrictEqual([])
        expect(writeableChunk.typeHint).toBeUndefined()
        expect(writeableChunk.additionalProperties).toStrictEqual({})
    })

    test("name arguments; should create a chunk with a name", () => {
        const writeableChunk = writeableFactory.createChunk("[0]")
        expect(writeableChunk).toBeDefined()
        expect(writeableChunk.componentId).toBeDefined()
        expect(writeableChunk.attributes).toBeUndefined()
        expect(writeableChunk.items).toStrictEqual([])
        expect(writeableChunk.name).toBe("[0]")
        expect(writeableChunk.nodes).toStrictEqual([])
        expect(writeableChunk.typeHint).toBeUndefined()
        expect(writeableChunk.additionalProperties).toStrictEqual({})
    })

})

describe("createDataItem", function () {

    test("no arguments; should create a data item", () => {
        const writeableDataItem = writeableFactory.createDataItem()
        expect(writeableDataItem).toBeDefined()
        expect(writeableDataItem.componentId).toBeDefined()
        expect(writeableDataItem.accessor).toBeUndefined()
        expect(writeableDataItem.attributes).toBeUndefined()
        expect(writeableDataItem.typeHint).toBeUndefined()
        expect(writeableDataItem.value).toBeUndefined()
        expect(writeableDataItem.additionalProperties).toStrictEqual({})
    })

    test("value data and type hint arguments; should create a data item with a value and a type hint", () => {
        const writeableDataItem = writeableFactory.createDataItem("foo", "bar")
        expect(writeableDataItem).toBeDefined()
        expect(writeableDataItem.componentId).toBeDefined()
        expect(writeableDataItem.accessor).toBeUndefined()
        expect(writeableDataItem.attributes).toBeUndefined()
        expect(writeableDataItem.typeHint).toBeDefined()
        expect(writeableDataItem.value).toBe("foo")
        expect(writeableDataItem.additionalProperties).toStrictEqual({})
    })

    test("buffer data and type hint arguments; should create a data item with an accessor and a type hint", () => {
        const writeableDataItem = writeableFactory.createDataItem({ data: new ArrayBuffer(0), contentType: "a" }, "bar")
        expect(writeableDataItem).toBeDefined()
        expect(writeableDataItem.componentId).toBeDefined()
        expect(writeableDataItem.accessor).toBeDefined()
        expect(writeableDataItem.attributes).toBeUndefined()
        expect(writeableDataItem.typeHint).toBeDefined()
        expect(writeableDataItem.value).toBeUndefined()
        expect(writeableDataItem.additionalProperties).toStrictEqual({})
    })

})

describe("createNode", function () {

    test("no arguments; should create a node", () => {
        const writeableNode = writeableFactory.createNode()
        expect(writeableNode).toBeDefined()
        expect(writeableNode.componentId).toBeDefined()
        expect(writeableNode.attributes).toBeUndefined()
        expect(writeableNode.items).toStrictEqual([])
        expect(writeableNode.name).toBeUndefined()
        expect(writeableNode.nodes).toStrictEqual([])
        expect(writeableNode.typeHint).toBeUndefined()
        expect(writeableNode.additionalProperties).toStrictEqual({})
    })

})

describe("createTypeHint", function () {

    test("no arguments; should create a type hint", () => {
        const writeableTypeHint = writeableFactory.createTypeHint()
        expect(writeableTypeHint).toBeDefined()
        expect(writeableTypeHint.componentId).toBeDefined()
        expect(writeableTypeHint.name).toBeUndefined()
        expect(writeableTypeHint.additionalProperties).toStrictEqual({})
    })

    test("name arguments; should create a type hint with a name", () => {
        const writeableTypeHint = writeableFactory.createTypeHint("foobar")
        expect(writeableTypeHint).toBeDefined()
        expect(writeableTypeHint.componentId).toBeDefined()
        expect(writeableTypeHint.name).toBe("foobar")
        expect(writeableTypeHint.additionalProperties).toStrictEqual({})
    })

})
