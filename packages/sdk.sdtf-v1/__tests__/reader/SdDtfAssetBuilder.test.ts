import { SdDtfBinaryBufferCache } from "../../src/buffer_cache/SdDtfBinaryBufferCache"
import { SdDtfReadableAccessor } from "../../src/reader/components/SdDtfReadableAccessor"
import { SdDtfReadableAttributes } from "../../src/reader/components/SdDtfReadableAttributes"
import { SdDtfReadableBuffer } from "../../src/reader/components/SdDtfReadableBuffer"
import { SdDtfReadableBufferView } from "../../src/reader/components/SdDtfReadableBufferView"
import { SdDtfReadableChunk } from "../../src/reader/components/SdDtfReadableChunk"
import { SdDtfReadableDataItem } from "../../src/reader/components/SdDtfReadableDataItem"
import { SdDtfReadableFileInfo } from "../../src/reader/components/SdDtfReadableFileInfo"
import { SdDtfReadableNode } from "../../src/reader/components/SdDtfReadableNode"
import { SdDtfReadableTypeHint } from "../../src/reader/components/SdDtfReadableTypeHint"
import { SdDtfReadableComponentFactory } from "../../src/reader/SdDtfReadableComponentFactory"
import { SdDtfDataParser } from "../../src/reader/SdDtfDataParser"

const bufferCache = new SdDtfBinaryBufferCache()
const dataParser = new SdDtfDataParser([])

describe("buildAccessor", function () {

    let origCreateAccessor: any

    beforeAll(() => {
        origCreateAccessor = SdDtfReadableComponentFactory.prototype.createReadableAccessor
        SdDtfReadableComponentFactory.prototype.createReadableAccessor = jest.fn(() => {
            // @ts-ignore
            return new SdDtfReadableAccessor()
        })
    })

    afterAll(() => {
        SdDtfReadableComponentFactory.prototype.createReadableAccessor = origCreateAccessor
    })

    test("happy path; should add one accessor to asset", () => {
        const builder = new SdDtfAssetBuilder({ accessors: [ {} ] }, bufferCache, dataParser)
        builder.buildAccessor()
        expect(builder.asset.accessors.length).toBe(1)
    })

})

describe("buildAttribute", function () {

    let origCreateAttribute: any

    beforeAll(() => {
        origCreateAttribute = SdDtfReadableComponentFactory.prototype.createAttribute
        SdDtfReadableComponentFactory.prototype.createAttribute = jest.fn(() => new SdDtfReadableAttributes())
    })

    afterAll(() => {
        SdDtfReadableComponentFactory.prototype.createAttribute = origCreateAttribute
    })

    test("happy path; should add one attribute to asset", () => {
        const builder = new SdDtfAssetBuilder({ attributes: [ {} ] }, bufferCache, dataParser)
        builder.buildAttributes()
        expect(builder.asset.attributes.length).toBe(1)
    })

})

describe("buildBuffer", function () {

    let origCreateBuffer: any

    beforeAll(() => {
        origCreateBuffer = SdDtfReadableComponentFactory.prototype.createReadableBuffer
        SdDtfReadableComponentFactory.prototype.createReadableBuffer = jest.fn(() => new SdDtfReadableBuffer(666, bufferCache))
    })

    afterAll(() => {
        SdDtfReadableComponentFactory.prototype.createReadableBuffer = origCreateBuffer
    })

    test("happy path; should add one buffer to asset", () => {
        const builder = new SdDtfAssetBuilder({ buffers: [ {} ] }, bufferCache, dataParser)
        builder.buildBuffer()
        expect(builder.asset.buffers.length).toBe(1)
    })

})

describe("buildBufferView", function () {

    let origCreateBufferView: any

    beforeAll(() => {
        origCreateBufferView = SdDtfReadableComponentFactory.prototype.createReadableBufferView
        SdDtfReadableComponentFactory.prototype.createReadableBufferView = jest.fn(() => {
            // @ts-ignore
            return new SdDtfReadableBufferView()
        })
    })

    afterAll(() => {
        SdDtfReadableComponentFactory.prototype.createReadableBufferView = origCreateBufferView
    })

    test("happy path; should add one buffer view to asset", () => {
        const builder = new SdDtfAssetBuilder({ bufferViews: [ {} ] }, bufferCache, dataParser)
        builder.buildBufferView()
        expect(builder.asset.bufferViews.length).toBe(1)
    })

})

describe("buildChunks", function () {

    let origCreateChunk: any

    beforeAll(() => {
        origCreateChunk = SdDtfReadableComponentFactory.prototype.createReadableChunk
        SdDtfReadableComponentFactory.prototype.createReadableChunk = jest.fn(() => {
            // @ts-ignore
            return new SdDtfReadableChunk()
        })
    })

    afterAll(() => {
        SdDtfReadableComponentFactory.prototype.createReadableChunk = origCreateChunk
    })

    test("happy path; should add one buffer view to asset", () => {
        const builder = new SdDtfAssetBuilder({ chunks: [ {} ] }, bufferCache, dataParser)
        builder.buildChunks()
        expect(builder.asset.chunks.length).toBe(1)
    })

})

describe("buildDataItem", function () {

    let origCreateDataItem: any

    beforeAll(() => {
        origCreateDataItem = SdDtfReadableComponentFactory.prototype.createReadableDataItem
        SdDtfReadableComponentFactory.prototype.createReadableDataItem = jest.fn(() => new SdDtfReadableDataItem(dataParser))
    })

    afterAll(() => {
        SdDtfReadableComponentFactory.prototype.createReadableDataItem = origCreateDataItem
    })

    test("happy path; should add one buffer view to asset", () => {
        const builder = new SdDtfAssetBuilder({ items: [ {} ] }, bufferCache, dataParser)
        builder.buildDataItem()
        expect(builder.asset.items.length).toBe(1)
    })

})

describe("buildFileInfo", function () {

    let origCreateFileInfo: any

    beforeAll(() => {
        origCreateFileInfo = SdDtfReadableComponentFactory.prototype.createReadableFileInfo
        SdDtfReadableComponentFactory.prototype.createReadableFileInfo = jest.fn(() => new SdDtfReadableFileInfo("test"))
    })

    afterAll(() => {
        SdDtfReadableComponentFactory.prototype.createReadableFileInfo = origCreateFileInfo
    })

    test("content contains no type hints; should not call create-fn", () => {
        const builder = new SdDtfAssetBuilder({}, bufferCache, dataParser)
        builder.buildFileInfo()
        expect(builder.asset.fileInfo).toBeUndefined()
    })

    test("content contains multiple type hints; should create all type hints", () => {
        const builder = new SdDtfAssetBuilder({ asset: { version: "test" } }, bufferCache, dataParser)
        builder.buildFileInfo()
        expect(builder.asset.fileInfo).toBeDefined()
    })

    test("type hint item not an object; should throw", () => {
        const builder = new SdDtfAssetBuilder({ asset: [ {} ] }, bufferCache, dataParser)
        expect(() => builder.buildFileInfo()).toThrow(/Property must be an object/)
    })

})

describe("buildNode", function () {

    let origCreateNode: any

    beforeAll(() => {
        origCreateNode = SdDtfReadableComponentFactory.prototype.createReadableNode
        SdDtfReadableComponentFactory.prototype.createReadableNode = jest.fn(() => new SdDtfReadableNode())
    })

    afterAll(() => {
        SdDtfReadableComponentFactory.prototype.createReadableNode = origCreateNode
    })

    test("happy path; should add one buffer view to asset", () => {
        const builder = new SdDtfAssetBuilder({ nodes: [ {} ] }, bufferCache, dataParser)
        builder.buildNode()
        expect(builder.asset.nodes.length).toBe(1)
    })

})

describe("buildTypeHint", function () {

    let origCreateTypeHint: any

    beforeAll(() => {
        origCreateTypeHint = SdDtfReadableComponentFactory.prototype.createReadableTypeHint
        SdDtfReadableComponentFactory.prototype.createReadableTypeHint = jest.fn(() => new SdDtfReadableTypeHint(""))
    })

    afterAll(() => {
        SdDtfReadableComponentFactory.prototype.createReadableTypeHint = origCreateTypeHint
    })

    test("happy path; should add one buffer view to asset", () => {
        const builder = new SdDtfAssetBuilder({ typeHints: [ {} ] }, bufferCache, dataParser)
        builder.buildTypeHint()
        expect(builder.asset.typeHints.length).toBe(1)
    })

})

describe("buildComponent", function () {

    // We use type hint as an example here
    let origCreateTypeHint: any
    let spyCreateFn: number,
        createFn = () => spyCreateFn++

    beforeAll(() => {
        origCreateTypeHint = SdDtfReadableComponentFactory.prototype.createReadableTypeHint
        SdDtfReadableComponentFactory.prototype.createReadableTypeHint = jest.fn(() => new SdDtfReadableTypeHint("test"))
    })

    afterAll(() => {
        SdDtfReadableComponentFactory.prototype.createReadableTypeHint = origCreateTypeHint
    })

    beforeEach(() => {
        spyCreateFn = 0
    })

    test("content contains no type hints; should not call create-fn", () => {
        const builder = new SdDtfAssetBuilder({}, bufferCache, dataParser)
        builder.buildComponent(builder.PROPERTY_NAME_TYPEHINTS, createFn)
        expect(spyCreateFn).toBe(0)
    })

    test("content contains multiple type hints; should create all type hints", () => {
        const builder = new SdDtfAssetBuilder({
            typeHints: [
                { name: "rhino.mesh" },
                { name: "image" },
            ],
        }, bufferCache, dataParser)
        builder.buildComponent(builder.PROPERTY_NAME_TYPEHINTS, createFn)
        expect(spyCreateFn).toBe(2)
    })

    test("type hints not an array; should throw", () => {
        const builder = new SdDtfAssetBuilder({ typeHints: { name: "rhino.mesh" } }, bufferCache, dataParser)
        expect(() => builder.buildComponent(builder.PROPERTY_NAME_TYPEHINTS, createFn)).toThrow(/'typeHints' must be an array/)
    })

    test("type hint item not an object; should throw", () => {
        const builder = new SdDtfAssetBuilder({ typeHints: [ "rhino.mesh" ] }, bufferCache, dataParser)
        expect(() => builder.buildComponent(builder.PROPERTY_NAME_TYPEHINTS, createFn)).toThrow(/Item must be an object/)
    })

})
