import { SdDtfWriteableComponentFactory } from "../../../src/writer/SdDtfWriteableComponentFactory"

const writeableFactory = new SdDtfWriteableComponentFactory()

describe("createAccessor", function () {

    test("no arguments; should create empty writeable accessor instance", () => {
        const writeableAccessor = writeableFactory.createAccessor()
        expect(writeableAccessor).toBeDefined()
        expect(writeableAccessor.componentId).toBeDefined()
        expect(writeableAccessor.bufferView).toBeUndefined()
        expect(writeableAccessor.id).toBeUndefined()
        expect(writeableAccessor.additionalProperties).toStrictEqual({})
    })

    test("buffer data given; should a writable accessor instance with a buffer view instance", () => {
        const writeableAccessor = writeableFactory.createAccessor(new ArrayBuffer(0))
        expect(writeableAccessor).toBeDefined()
        expect(writeableAccessor.componentId).toBeDefined()
        expect(writeableAccessor.bufferView).toBeDefined()
        expect(writeableAccessor.id).toBeUndefined()
        expect(writeableAccessor.additionalProperties).toStrictEqual({})
    })

})

describe("createAsset", function () {

    test("no arguments; should create writeable asset instance with a file info instance", () => {
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

    test("no arguments; should create a writeable attribute instance", () => {
        const writeableAttribute = writeableFactory.createAttribute()
        expect(writeableAttribute).toBeDefined()
        expect(writeableAttribute.accessor).toBeUndefined()
        expect(writeableAttribute.typeHint).toBeUndefined()
        expect(writeableAttribute.value).toBeUndefined()
    })

    test("value and type hint arguments; should create a writeable attribue instance with a value and a type hint instance", () => {
        const writeableAttribute = writeableFactory.createAttribute("foo", "bar")
        expect(writeableAttribute).toBeDefined()
        expect(writeableAttribute.accessor).toBeUndefined()
        expect(writeableAttribute.typeHint).toBeDefined()
        expect(writeableAttribute.value).toBe("foo")
    })

})

describe("createAttributes", function () {

    test("no arguments; should create a writeable attributes instance", () => {
        const writeableAttributes = writeableFactory.createAttributes()
        expect(writeableAttributes).toBeDefined()
        expect(writeableAttributes.componentId).toBeDefined()
        expect(writeableAttributes.entries).toStrictEqual({})
    })

    test("attribute data arguments; should create a writeable attributes instance with attribute instances", () => {
        const writeableAttributes = writeableFactory.createAttributes({ prop1: [ "foo", "bar" ], prop2: [ "baz" ] })
        expect(writeableAttributes).toBeDefined()
        expect(writeableAttributes.componentId).toBeDefined()
        expect(Object.keys(writeableAttributes.entries).length).toBe(2)
        expect(writeableAttributes.entries["prop1"].accessor).toBeUndefined()
        expect(writeableAttributes.entries["prop1"].typeHint).toBeDefined()
        expect(writeableAttributes.entries["prop1"].value).toBe("foo")
        expect(writeableAttributes.entries["prop2"].accessor).toBeUndefined()
        expect(writeableAttributes.entries["prop2"].typeHint).toBeUndefined()
        expect(writeableAttributes.entries["prop2"].value).toBe("baz")
    })

})

describe("createBuffer", function () {

    test("no arguments; should create a writeable buffer instance", () => {
        const writeableBuffer = writeableFactory.createBuffer()
        expect(writeableBuffer).toBeDefined()
        expect(writeableBuffer.componentId).toBeDefined()
        expect(writeableBuffer.data).toBeUndefined()
        expect(writeableBuffer.uri).toBeUndefined()
        expect(writeableBuffer.additionalProperties).toStrictEqual({})
    })

    test("data arguments; should create a writeable buffer instance with data", () => {
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

    test("no arguments; should create a writeable buffer view instance", () => {
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

    test("data arguments; should create a writeable buffer view instance with a buffer instance", () => {
        const writeableBufferView = writeableFactory.createBufferView(new ArrayBuffer(0))
        expect(writeableBufferView).toBeDefined()
        expect(writeableBufferView.componentId).toBeDefined()
        expect(writeableBufferView.buffer).toBeDefined()
        expect(writeableBufferView.byteLength).toBeUndefined()
        expect(writeableBufferView.byteOffset).toBeUndefined()
        expect(writeableBufferView.contentEncoding).toBeUndefined()
        expect(writeableBufferView.contentType).toBeUndefined()
        expect(writeableBufferView.name).toBeUndefined()
        expect(writeableBufferView.additionalProperties).toStrictEqual({})
    })

})

describe("createChunk", function () {

    test("no arguments; should create a writeable chunk instance", () => {
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

    test("name arguments; should create a writeable chunk instance with a name", () => {
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

    test("no arguments; should create a data item instance", () => {
        const writeableDataItem = writeableFactory.createDataItem()
        expect(writeableDataItem).toBeDefined()
        expect(writeableDataItem.componentId).toBeDefined()
        expect(writeableDataItem.accessor).toBeUndefined()
        expect(writeableDataItem.attributes).toBeUndefined()
        expect(writeableDataItem.typeHint).toBeUndefined()
        expect(writeableDataItem.value).toBeUndefined()
        expect(writeableDataItem.additionalProperties).toStrictEqual({})
    })

    test("value and type hint arguments; should create a writeable data item instance with a value and a type hint instance", () => {
        const writeableDataItem = writeableFactory.createDataItem("foo", "bar")
        expect(writeableDataItem).toBeDefined()
        expect(writeableDataItem.componentId).toBeDefined()
        expect(writeableDataItem.accessor).toBeUndefined()
        expect(writeableDataItem.attributes).toBeUndefined()
        expect(writeableDataItem.typeHint).toBeDefined()
        expect(writeableDataItem.value).toBe("foo")
        expect(writeableDataItem.additionalProperties).toStrictEqual({})
    })

})

describe("createNode", function () {

    test("no arguments; should create a writeable node instance", () => {
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

    test("no arguments; should create a writeable type hint instance", () => {
        const writeableTypeHint = writeableFactory.createTypeHint()
        expect(writeableTypeHint).toBeDefined()
        expect(writeableTypeHint.componentId).toBeDefined()
        expect(writeableTypeHint.name).toBeUndefined()
        expect(writeableTypeHint.additionalProperties).toStrictEqual({})
    })

    test("name arguments; should create a writeable type hint instance with a name", () => {
        const writeableTypeHint = writeableFactory.createTypeHint("foobar")
        expect(writeableTypeHint).toBeDefined()
        expect(writeableTypeHint.componentId).toBeDefined()
        expect(writeableTypeHint.name).toBe("foobar")
        expect(writeableTypeHint.additionalProperties).toStrictEqual({})
    })

})
