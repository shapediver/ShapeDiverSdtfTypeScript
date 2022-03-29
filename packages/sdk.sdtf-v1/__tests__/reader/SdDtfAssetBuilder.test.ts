import { SdDtfBinaryBufferCache } from "../../src/buffer_cache/SdDtfBinaryBufferCache"
import { SdDtfAccessor } from "../../src/components/SdDtfAccessor"
import { SdDtfAttributes } from "../../src/components/SdDtfAttributes"
import { SdDtfBuffer } from "../../src/components/SdDtfBuffer"
import { SdDtfBufferView } from "../../src/components/SdDtfBufferView"
import { SdDtfChunk } from "../../src/components/SdDtfChunk"
import { SdDtfDataItem } from "../../src/components/SdDtfDataItem"
import { SdDtfFileInfo } from "../../src/components/SdDtfFileInfo"
import { SdDtfNode } from "../../src/components/SdDtfNode"
import { SdDtfTypeHint } from "../../src/components/SdDtfTypeHint"
import { SdDtfAssetBuilder } from "../../src/reader/SdDtfAssetBuilder"
import { SdDtfComponentFactory } from "../../src/reader/SdDtfComponentFactory"
import { SdDtfDataParser } from "../../src/reader/SdDtfDataParser"

const bufferCache = new SdDtfBinaryBufferCache()
const dataParser = new SdDtfDataParser([])

describe("buildAccessor", function () {

    let origCreateAccessor: any

    beforeAll(() => {
        origCreateAccessor = SdDtfComponentFactory.prototype.createAccessor
        SdDtfComponentFactory.prototype.createAccessor = jest.fn(() => {
            // @ts-ignore
            return new SdDtfAccessor()
        })
    })

    afterAll(() => {
        SdDtfComponentFactory.prototype.createAccessor = origCreateAccessor
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
        origCreateAttribute = SdDtfComponentFactory.prototype.createAttribute
        SdDtfComponentFactory.prototype.createAttribute = jest.fn(() => new SdDtfAttributes())
    })

    afterAll(() => {
        SdDtfComponentFactory.prototype.createAttribute = origCreateAttribute
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
        origCreateBuffer = SdDtfComponentFactory.prototype.createBuffer
        SdDtfComponentFactory.prototype.createBuffer = jest.fn(() => new SdDtfBuffer(666, bufferCache))
    })

    afterAll(() => {
        SdDtfComponentFactory.prototype.createBuffer = origCreateBuffer
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
        origCreateBufferView = SdDtfComponentFactory.prototype.createBufferView
        SdDtfComponentFactory.prototype.createBufferView = jest.fn(() => {
            // @ts-ignore
            return new SdDtfBufferView()
        })
    })

    afterAll(() => {
        SdDtfComponentFactory.prototype.createBufferView = origCreateBufferView
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
        origCreateChunk = SdDtfComponentFactory.prototype.createChunk
        SdDtfComponentFactory.prototype.createChunk = jest.fn(() => {
            // @ts-ignore
            return new SdDtfChunk()
        })
    })

    afterAll(() => {
        SdDtfComponentFactory.prototype.createChunk = origCreateChunk
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
        origCreateDataItem = SdDtfComponentFactory.prototype.createDataItem
        SdDtfComponentFactory.prototype.createDataItem = jest.fn(() => new SdDtfDataItem(dataParser))
    })

    afterAll(() => {
        SdDtfComponentFactory.prototype.createDataItem = origCreateDataItem
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
        origCreateFileInfo = SdDtfComponentFactory.prototype.createFileInfo
        SdDtfComponentFactory.prototype.createFileInfo = jest.fn(() => new SdDtfFileInfo("test"))
    })

    afterAll(() => {
        SdDtfComponentFactory.prototype.createFileInfo = origCreateFileInfo
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
        origCreateNode = SdDtfComponentFactory.prototype.createNode
        SdDtfComponentFactory.prototype.createNode = jest.fn(() => new SdDtfNode())
    })

    afterAll(() => {
        SdDtfComponentFactory.prototype.createNode = origCreateNode
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
        origCreateTypeHint = SdDtfComponentFactory.prototype.createTypeHint
        SdDtfComponentFactory.prototype.createTypeHint = jest.fn(() => new SdDtfTypeHint(""))
    })

    afterAll(() => {
        SdDtfComponentFactory.prototype.createTypeHint = origCreateTypeHint
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
        origCreateTypeHint = SdDtfComponentFactory.prototype.createTypeHint
        SdDtfComponentFactory.prototype.createTypeHint = jest.fn(() => new SdDtfTypeHint("test"))
    })

    afterAll(() => {
        SdDtfComponentFactory.prototype.createTypeHint = origCreateTypeHint
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
