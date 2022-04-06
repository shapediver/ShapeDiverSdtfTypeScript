import { SdDtfComponentFactory } from "../../../src/structure/SdDtfComponentFactory"

const factory = new SdDtfComponentFactory()

describe("createAccessor", function () {

    test("empty accessor data; should return empty accessor instance", () => {
        const accessor = factory.createAccessor({})
        expect(accessor).toBeDefined()
        expect(accessor.componentId).toBeDefined()
        expect(accessor.bufferView).toBeUndefined()
        expect(accessor.id).toBeUndefined()
        expect(accessor.additionalProperties).toStrictEqual({})
    })

    test("full accessor data; should return accessor instance", () => {
        const accessor = factory.createAccessor({ bufferView: 0, id: "[0]" })
        expect(accessor).toBeDefined()
        expect(accessor.componentId).toBeDefined()
        expect(accessor.bufferView).toBe(0)
        expect(accessor.id).toBe("[0]")
        expect(accessor.additionalProperties).toStrictEqual({})
    })

    test("accessor with additional properties; should add additional properties to accessor", () => {
        const accessor = factory.createAccessor({ foo: "bar" })
        expect(accessor).toBeDefined()
        expect(accessor.componentId).toBeDefined()
        expect(accessor.bufferView).toBeUndefined()
        expect(accessor.id).toBeUndefined()
        expect(accessor.additionalProperties).toStrictEqual({ foo: "bar" })
    })

    test("invalid properties; should return empty instance", () => {
        const accessor = factory.createAccessor({ bufferView: "1", id: 123 })
        expect(accessor).toBeDefined()
        expect(accessor.componentId).toBeDefined()
        expect(accessor.bufferView).toBeUndefined()
        expect(accessor.additionalProperties).toStrictEqual({})
    })

})

describe("createAsset", function () {

    test("asset data; should return asset instance", () => {
        const asset = factory.createAsset({})
        expect(asset).toBeDefined()
        expect(asset.componentId).toBeDefined()
        expect(asset.fileInfo).toBe(0)
        expect(asset.additionalProperties).toStrictEqual({})
    })

    test("asset with additional properties; should add additional properties to asset", () => {
        const asset = factory.createAsset({
            accessors: false,
            attributes: false,
            bufferViews: false,
            buffers: false,
            chunks: false,
            items: false,
            asset: false,
            fileInfo: false,
            nodes: false,
            typeHints: false,
            foo: "bar",
        })
        expect(asset).toBeDefined()
        expect(asset.componentId).toBeDefined()
        expect(asset.fileInfo).toBe(0)
        expect(asset.additionalProperties).toStrictEqual({ foo: "bar" })
    })

})

describe("createAttributes", function () {

    test("empty attributes data; should return empty attributes instance", () => {
        const attributes = factory.createAttributes({})
        expect(attributes).toBeDefined()
        expect(attributes.componentId).toBeDefined()
        expect(attributes.entries).toStrictEqual({})
    })

    test("full attributes data; should return attributes instance", () => {
        const attributes = factory.createAttributes({
            "name": {
                value: "awesome value",
                accessor: 0,
                typeHint: 1,
            },
        })
        expect(attributes).toBeDefined()
        expect(attributes.componentId).toBeDefined()
        expect(attributes.entries).toBeDefined()
        expect(Object.keys(attributes.entries!).length).toBe(1)
        expect(Object.keys(attributes.entries!)[0]).toBe("name")
        expect(attributes.entries!["name"].value).toBe("awesome value")
        expect(attributes.entries!["name"].accessor).toBe(0)
        expect(attributes.entries!["name"].typeHint).toBe(1)
    })

    test("attributes with additional properties; should ignore them", () => {
        const attributes = factory.createAttributes({ name: { foo: "bar" } })
        expect(attributes).toBeDefined()
        expect(attributes.componentId).toBeDefined()
        expect(attributes.entries).toBeDefined()
        expect(Object.keys(attributes.entries!).length).toBe(1)
        expect(Object.keys(attributes.entries!)[0]).toBe("name")
        expect(attributes.entries!["name"].value).toBeUndefined()
        expect(attributes.entries!["name"].accessor).toBeUndefined()
        expect(attributes.entries!["name"].typeHint).toBeUndefined()
    })

    test("invalid attribute item; should throw", () => {
        // invalid property value
        expect(() => factory.createAttributes({ name: "" })).toThrow(/Item \[0] must be an object/)
    })

    test("invalid properties; should return empty instance", () => {
        const attributes = factory.createAttributes({
            "name": {
                value: null,
                accessor: "0",
                typeHint: "1",
            },
        })
        expect(attributes).toBeDefined()
        expect(attributes.componentId).toBeDefined()
        expect(attributes.entries).toBeDefined()
        expect(Object.keys(attributes.entries!).length).toBe(1)
        expect(Object.keys(attributes.entries!)[0]).toBe("name")
        expect(attributes.entries!["name"].value).toBe(null)
        expect(attributes.entries!["name"].accessor).toBeUndefined()
        expect(attributes.entries!["name"].typeHint).toBeUndefined()
    })

})

describe("createBuffer", function () {

    test("empty buffer data; should return empty buffer instance", () => {
        const buffer = factory.createBuffer({})
        expect(buffer).toBeDefined()
        expect(buffer.componentId).toBeDefined()
        expect(buffer.byteLength).toBeUndefined()
        expect(buffer.uri).toBeUndefined()
        expect(buffer.additionalProperties).toStrictEqual({})
    })

    test("full buffer data; should return buffer instance", () => {
        const buffer = factory.createBuffer({ byteLength: 666, uri: "data:,foobar" })
        expect(buffer).toBeDefined()
        expect(buffer.componentId).toBeDefined()
        expect(buffer.byteLength).toBe(666)
        expect(buffer.uri).toBe("data:,foobar")
        expect(buffer.additionalProperties).toStrictEqual({})
    })

    test("buffer with additional properties; should add additional properties to buffer", () => {
        const buffer = factory.createBuffer({ foo: "bar" })
        expect(buffer).toBeDefined()
        expect(buffer.componentId).toBeDefined()
        expect(buffer.byteLength).toBeUndefined()
        expect(buffer.uri).toBeUndefined()
        expect(buffer.additionalProperties).toStrictEqual({ foo: "bar" })
    })

    test("invalid properties; should return empty instance", () => {
        const buffer = factory.createBuffer({ byteLength: "666", uri: 123 })
        expect(buffer).toBeDefined()
        expect(buffer.componentId).toBeDefined()
        expect(buffer.byteLength).toBeUndefined()
        expect(buffer.uri).toBeUndefined()
        expect(buffer.additionalProperties).toStrictEqual({})
    })

})

describe("createBufferView", function () {

    test("empty buffer view data; should return empty buffer view instance", () => {
        const bufferView = factory.createBufferView({})
        expect(bufferView).toBeDefined()
        expect(bufferView.componentId).toBeDefined()
        expect(bufferView.buffer).toBeUndefined()
        expect(bufferView.byteLength).toBeUndefined()
        expect(bufferView.byteOffset).toBeUndefined()
        expect(bufferView.contentEncoding).toBeUndefined()
        expect(bufferView.contentType).toBeUndefined()
        expect(bufferView.name).toBeUndefined()
        expect(bufferView.additionalProperties).toStrictEqual({})
    })

    test("full buffer view data; should return buffer view instance", () => {
        const bufferView = factory.createBufferView({
            buffer: 0,
            byteLength: 1,
            byteOffset: 2,
            contentType: "text",
            contentEncoding: "gzip",
            name: "[1]",
        })
        expect(bufferView).toBeDefined()
        expect(bufferView.componentId).toBeDefined()
        expect(bufferView.buffer).toBe(0)
        expect(bufferView.byteLength).toBe(1)
        expect(bufferView.byteOffset).toBe(2)
        expect(bufferView.contentEncoding).toBe("gzip")
        expect(bufferView.contentType).toBe("text")
        expect(bufferView.name).toBe("[1]")
        expect(bufferView.additionalProperties).toStrictEqual({})
    })

    test("buffer view with additional properties; should add additional properties to buffer view", () => {
        const bufferView = factory.createBufferView({ foo: "bar" })
        expect(bufferView).toBeDefined()
        expect(bufferView.componentId).toBeDefined()
        expect(bufferView.buffer).toBeUndefined()
        expect(bufferView.byteLength).toBeUndefined()
        expect(bufferView.byteOffset).toBeUndefined()
        expect(bufferView.contentEncoding).toBeUndefined()
        expect(bufferView.contentType).toBeUndefined()
        expect(bufferView.name).toBeUndefined()
        expect(bufferView.additionalProperties).toStrictEqual({ foo: "bar" })
    })

    test("invalid properties; should return empty instance", () => {
        const bufferView = factory.createBufferView({
            buffer: "0",
            byteLength: "1",
            byteOffset: "2",
            contentType: 3,
            contentEncoding: 4,
            name: 5,
        })
        expect(bufferView).toBeDefined()
        expect(bufferView.componentId).toBeDefined()
        expect(bufferView.buffer).toBeUndefined()
        expect(bufferView.byteLength).toBeUndefined()
        expect(bufferView.byteOffset).toBeUndefined()
        expect(bufferView.contentEncoding).toBeUndefined()
        expect(bufferView.contentType).toBeUndefined()
        expect(bufferView.name).toBeUndefined()
        expect(bufferView.additionalProperties).toStrictEqual({})
    })

})

describe("createChunk", function () {

    test("empty node data; should return empty node instance", () => {
        const chunk = factory.createChunk({})
        expect(chunk).toBeDefined()
        expect(chunk.componentId).toBeDefined()
        expect(chunk.attributes).toBeUndefined()
        expect(chunk.items).toStrictEqual([])
        expect(chunk.name).toBeUndefined()
        expect(chunk.nodes).toStrictEqual([])
        expect(chunk.typeHint).toBeUndefined()
        expect(chunk.additionalProperties).toStrictEqual({})
    })

    test("full node data; should return node instance", () => {
        const chunk = factory.createChunk({
            attributes: 0,
            items: [ 1 ],
            name: "[2]",
            nodes: [ 3 ],
            typeHint: 4,
        })
        expect(chunk).toBeDefined()
        expect(chunk.componentId).toBeDefined()
        expect(chunk.attributes).toBe(0)
        expect(chunk.items).toStrictEqual([ 1 ])
        expect(chunk.name).toBe("[2]")
        expect(chunk.nodes).toStrictEqual([ 3 ])
        expect(chunk.typeHint).toBe(4)
        expect(chunk.additionalProperties).toStrictEqual({})
    })

    test("data item with additional properties; should add additional properties to data item", () => {
        const chunk = factory.createChunk({ foo: "bar" })
        expect(chunk).toBeDefined()
        expect(chunk.componentId).toBeDefined()
        expect(chunk.attributes).toBeUndefined()
        expect(chunk.items).toStrictEqual([])
        expect(chunk.name).toBeUndefined()
        expect(chunk.nodes).toStrictEqual([])
        expect(chunk.typeHint).toBeUndefined()
        expect(chunk.additionalProperties).toStrictEqual({ foo: "bar" })
    })

    test("invalid properties; should return empty instance", () => {
        const chunk = factory.createChunk({
            attributes: "0",
            items: "1",
            name: 2,
            nodes: "3",
            typeHint: "4",
        })
        expect(chunk).toBeDefined()
        expect(chunk.componentId).toBeDefined()
        expect(chunk.attributes).toBeUndefined()
        expect(chunk.items).toStrictEqual([])
        expect(chunk.name).toBeUndefined()
        expect(chunk.nodes).toStrictEqual([])
        expect(chunk.typeHint).toBeUndefined()
        expect(chunk.additionalProperties).toStrictEqual({})
    })

})

describe("createDataItem", function () {

    test("empty data item data; should return empty data item instance", () => {
        const dataItem = factory.createDataItem({})
        expect(dataItem).toBeDefined()
        expect(dataItem.componentId).toBeDefined()
        expect(dataItem.accessor).toBeUndefined()
        expect(dataItem.attributes).toBeUndefined()
        expect(dataItem.typeHint).toBeUndefined()
        expect(dataItem.value).toBeUndefined()
        expect(dataItem.additionalProperties).toStrictEqual({})
    })

    test("full data item data; should return data item instance", () => {
        const dataItem = factory.createDataItem({
            accessor: 0,
            attributes: 1,
            typeHint: 2,
            value: "awesome value",
        })
        expect(dataItem).toBeDefined()
        expect(dataItem.componentId).toBeDefined()
        expect(dataItem.accessor).toBe(0)
        expect(dataItem.attributes).toBe(1)
        expect(dataItem.typeHint).toBe(2)
        expect(dataItem.value).toBe("awesome value")
        expect(dataItem.additionalProperties).toStrictEqual({})
    })

    test("invalid properties; should return empty instance", () => {
        const dataItem = factory.createDataItem({
            accessor: "0",
            attributes: "1",
            typeHint: "2",
            value: null,
        })
        expect(dataItem).toBeDefined()
        expect(dataItem.componentId).toBeDefined()
        expect(dataItem.accessor).toBeUndefined()
        expect(dataItem.attributes).toBeUndefined()
        expect(dataItem.typeHint).toBeUndefined()
        expect(dataItem.value).toBe(null)
        expect(dataItem.additionalProperties).toStrictEqual({})
    })

})

describe("createFileInfo", function () {

    test("empty file info data; should return empty file info instance", () => {
        const fileInfo = factory.createFileInfo({})
        expect(fileInfo).toBeDefined()
        expect(fileInfo.componentId).toBeDefined()
        expect(fileInfo.copyright).toBeUndefined()
        expect(fileInfo.generator).toBeUndefined()
        expect(fileInfo.version).toBeUndefined()
        expect(fileInfo.additionalProperties).toStrictEqual({})
    })

    test("full file info data; should return file info instance", () => {
        const fileInfo = factory.createFileInfo({
            copyright: "GPLv3",
            generator: "ShapeDiverSdtfWriter",
            version: "1.0",
        })
        expect(fileInfo).toBeDefined()
        expect(fileInfo.componentId).toBeDefined()
        expect(fileInfo.copyright).toStrictEqual("GPLv3")
        expect(fileInfo.generator).toBe("ShapeDiverSdtfWriter")
        expect(fileInfo.version).toBe("1.0")
        expect(fileInfo.additionalProperties).toStrictEqual({})
    })

    test("file info with additional properties; should add additional properties to file info", () => {
        const fileInfo = factory.createFileInfo({ foo: "bar" })
        expect(fileInfo).toBeDefined()
        expect(fileInfo.componentId).toBeDefined()
        expect(fileInfo.copyright).toBeUndefined()
        expect(fileInfo.generator).toBeUndefined()
        expect(fileInfo.version).toBeUndefined()
        expect(fileInfo.additionalProperties).toStrictEqual({ foo: "bar" })
    })

    test("invalid properties; should return empty instance", () => {
        const fileInfo = factory.createFileInfo({
            copyright: 123,
            generator: 123,
            version: 123,
        })
        expect(fileInfo).toBeDefined()
        expect(fileInfo.componentId).toBeDefined()
        expect(fileInfo.copyright).toBeUndefined()
        expect(fileInfo.generator).toBeUndefined()
        expect(fileInfo.version).toBeUndefined()
        expect(fileInfo.additionalProperties).toStrictEqual({})
    })

})

describe("createNode", function () {

    test("empty node data; should return empty node instance", () => {
        const node = factory.createNode({})
        expect(node).toBeDefined()
        expect(node.attributes).toBeUndefined()
        expect(node.items).toStrictEqual([])
        expect(node.name).toBeUndefined()
        expect(node.nodes).toStrictEqual([])
        expect(node.typeHint).toBeUndefined()
        expect(node.additionalProperties).toStrictEqual({})
    })

    test("full node data; should return node instance", () => {
        const node = factory.createNode({
            attributes: 0,
            items: [ 1 ],
            name: "[2]",
            nodes: [ 3 ],
            typeHint: 4,
        })
        expect(node).toBeDefined()
        expect(node.attributes).toBe(0)
        expect(node.items).toStrictEqual([ 1 ])
        expect(node.name).toBe("[2]")
        expect(node.nodes).toStrictEqual([ 3 ])
        expect(node.typeHint).toBe(4)
        expect(node.additionalProperties).toStrictEqual({})
    })

    test("data item with additional properties; should add additional properties to data item", () => {
        const node = factory.createNode({ foo: "bar" })
        expect(node).toBeDefined()
        expect(node.attributes).toBeUndefined()
        expect(node.items).toStrictEqual([])
        expect(node.name).toBeUndefined()
        expect(node.nodes).toStrictEqual([])
        expect(node.typeHint).toBeUndefined()
        expect(node.additionalProperties).toStrictEqual({ foo: "bar" })
    })

    test("invalid attributes property - not a number; should not set property", () => {
        const node = factory.createNode({ attributes: "1" })
        expect(node).toBeDefined()
        expect(node.attributes).toBeUndefined()
        expect(node.items).toStrictEqual([])
        expect(node.name).toBeUndefined()
        expect(node.nodes).toStrictEqual([])
        expect(node.typeHint).toBeUndefined()
        expect(node.additionalProperties).toStrictEqual({})
    })

    test("invalid items property - not a number array; should not set property", () => {
        const node = factory.createNode({ items: 1 })
        expect(node).toBeDefined()
        expect(node.attributes).toBeUndefined()
        expect(node.items).toStrictEqual([])
        expect(node.name).toBeUndefined()
        expect(node.nodes).toStrictEqual([])
        expect(node.typeHint).toBeUndefined()
        expect(node.additionalProperties).toStrictEqual({})
    })

    test("invalid name property - not a string; should not set property", () => {
        const node = factory.createNode({ name: 123 })
        expect(node).toBeDefined()
        expect(node.attributes).toBeUndefined()
        expect(node.items).toStrictEqual([])
        expect(node.name).toBeUndefined()
        expect(node.nodes).toStrictEqual([])
        expect(node.typeHint).toBeUndefined()
        expect(node.additionalProperties).toStrictEqual({})
    })

    test("invalid nodes property - not a number array; should not set property", () => {
        const node = factory.createNode({ nodes: 1 })
        expect(node).toBeDefined()
        expect(node.attributes).toBeUndefined()
        expect(node.items).toStrictEqual([])
        expect(node.name).toBeUndefined()
        expect(node.nodes).toStrictEqual([])
        expect(node.typeHint).toBeUndefined()
        expect(node.additionalProperties).toStrictEqual({})
    })

    test("invalid typeHint property - not a number; should not set property", () => {
        const node = factory.createNode({ typeHint: "1" })
        expect(node).toBeDefined()
        expect(node.attributes).toBeUndefined()
        expect(node.items).toStrictEqual([])
        expect(node.name).toBeUndefined()
        expect(node.nodes).toStrictEqual([])
        expect(node.typeHint).toBeUndefined()
        expect(node.additionalProperties).toStrictEqual({})
    })

})

describe("createTypeHint", function () {

    test("empty type hint data; should return empty type hint instance", () => {
        const typeHint = factory.createTypeHint({})
        expect(typeHint).toBeDefined()
        expect(typeHint.name).toBeUndefined()
        expect(typeHint.additionalProperties).toStrictEqual({})
    })

    test("full type hint data; should return type hint instance", () => {
        const typeHint = factory.createTypeHint({ name: "some type" })
        expect(typeHint).toBeDefined()
        expect(typeHint.name).toBe("some type")
        expect(typeHint.additionalProperties).toStrictEqual({})
    })

    test("type hint with additional properties; should add additional properties to type hint", () => {
        const typeHint = factory.createTypeHint({ foo: "bar" })
        expect(typeHint).toBeDefined()
        expect(typeHint.name).toBeUndefined()
        expect(typeHint.additionalProperties).toStrictEqual({ foo: "bar" })
    })

    test("invalid properties; should return empty instance", () => {
        const typeHint = factory.createTypeHint({ name: 123 })
        expect(typeHint).toBeDefined()
        expect(typeHint.name).toBeUndefined()
        expect(typeHint.additionalProperties).toStrictEqual({})
    })

})
