import { SdtfPartialAsset } from "../../../src/structure/components/SdtfPartialAsset"
import { SdtfPartialFileInfo } from "../../../src/structure/components/SdtfPartialFileInfo"
import { ISdtfPartialComponentList } from "../../../src/structure/ISdtfComponentList"
import { SdtfComponentFactory } from "../../../src/structure/SdtfComponentFactory"
import { ISdtfComponentValidator } from "../../../src/validation/ISdtfComponentValidator"
import { SdtfComponentValidator } from "../../../src/validation/SdtfComponentValidator"

const factory = new SdtfComponentFactory()

describe("validateAccessor", function () {

    const validator: ISdtfComponentValidator = new SdtfComponentValidator(createComponentList({
        bufferViews: [ factory.createBufferView({}) ],
    }))

    test("valid; should return", () => {
        const accessor = factory.createAccessor({ bufferView: 0 })
        validator.validateAccessor(accessor)
    })

    test("invalid - bufferView not a uint; should throw", () => {
        // missing
        let accessor = factory.createAccessor({})
        expect(() => validator.validateAccessor(accessor)).toThrow(/Required property 'bufferView' must be an unsigned integer/)

        // invalid type
        accessor = factory.createAccessor({ bufferView: -1 })
        expect(() => validator.validateAccessor(accessor)).toThrow(/Required property 'bufferView' must be an unsigned integer/)
    })

    test("invalid - bufferView out of range; should throw", () => {
        const accessor = factory.createAccessor({ bufferView: 1 })
        expect(() => validator.validateAccessor(accessor)).toThrow(/Buffer view index is out of range/)
    })

})

describe("validateAsset", function () {

    const validator: ISdtfComponentValidator = new SdtfComponentValidator(createComponentList({}))

    test("valid; should return", () => {
        const asset = factory.createAsset({})
        validator.validateAsset(asset)
    })

    test("invalid - fileInfo not a uint; should throw", () => {
        // missing
        let asset = factory.createAsset({})
        asset.fileInfo = undefined
        expect(() => validator.validateAsset(asset)).toThrow(/Required property 'fileInfo' must be an unsigned integer/)

        // invalid type
        asset = factory.createAsset({})
        asset.fileInfo = -1
        expect(() => validator.validateAsset(asset)).toThrow(/Required property 'fileInfo' must be an unsigned integer/)
    })

    test("invalid - fileInfo out of range; should throw", () => {
        const asset = factory.createAsset({})
        asset.fileInfo = 1

        expect(() => validator.validateAsset(asset)).toThrow(/Type hint index is out of range/)
    })

})

describe("validateAttributes", function () {

    const validator: ISdtfComponentValidator = new SdtfComponentValidator(createComponentList({
        accessors: [ factory.createAccessor({}) ],
        typeHints: [ factory.createTypeHint({}) ],
    }))

    test("valid; should return", () => {
        const attributes = factory.createAttributes({ "name": {} })
        validator.validateAttributes(attributes)
    })

    test("invalid - entries not an object; should throw", () => {
        const attributes = factory.createAttributes({})
        attributes.entries = undefined

        expect(() => validator.validateAttributes(attributes)).toThrow(/Required property 'entries' must be a string-keyed object/)
    })

    test("invalid - accessor not a uint; should throw", () => {
        const attributes = factory.createAttributes({ "name": { accessor: -1 } })
        expect(() => validator.validateAttributes(attributes)).toThrow(/Optional property 'accessor' must be an unsigned integer/)
    })

    test("invalid - typeHint not a uint; should throw", () => {
        const attributes = factory.createAttributes({ "name": { typeHint: -1 } })
        expect(() => validator.validateAttributes(attributes)).toThrow(/Optional property 'typeHint' must be an unsigned integer/)
    })

    test("invalid - accessor out of range; should throw", () => {
        const attributes = factory.createAttributes({ "name": { accessor: 1 } })
        expect(() => validator.validateAttributes(attributes)).toThrow(/Accessor index is out of range/)
    })

    test("invalid- typeHint out of range; should throw", () => {
        const attributes = factory.createAttributes({ "name": { typeHint: 1 } })
        expect(() => validator.validateAttributes(attributes)).toThrow(/Type hint index is out of range/)
    })

})

describe("validateBuffer", function () {

    const validator: ISdtfComponentValidator = new SdtfComponentValidator(createComponentList({}))

    test("valid; should return", () => {
        const attributes = factory.createBuffer({ byteLength: 666 })
        validator.validateBuffer(attributes)
    })

    test("invalid - byteLength not a uint; should throw", () => {
        // missing
        let buffer = factory.createBuffer({})
        expect(() => validator.validateBuffer(buffer)).toThrow(/Required property 'byteLength' must be an unsigned integer/)

        // invalid type
        buffer = factory.createBuffer({ byteLength: -1 })
        expect(() => validator.validateBuffer(buffer)).toThrow(/Required property 'byteLength' must be an unsigned integer/)
    })

})

describe("validateBufferView", function () {

    const validator: ISdtfComponentValidator = new SdtfComponentValidator(createComponentList({
        buffers: [ factory.createBuffer({}) ],
    }))

    test("valid; should return", () => {
        const bufferView = factory.createBufferView({ buffer: 0, byteLength: 0, byteOffset: 0, contentType: "text" })
        validator.validateBufferView(bufferView)
    })

    test("invalid - buffer not a uint; should throw", () => {
        // missing
        let bufferView = factory.createBufferView({ byteLength: 0, byteOffset: 0, contentType: "text" })
        expect(() => validator.validateBufferView(bufferView)).toThrow(/Required property 'buffer' must be an unsigned integer/)

        // missing
        bufferView = factory.createBufferView({ buffer: -1, byteLength: 0, byteOffset: 0, contentType: "text" })
        expect(() => validator.validateBufferView(bufferView)).toThrow(/Required property 'buffer' must be an unsigned integer/)
    })

    test("invalid - byteLength not a uint; should throw", () => {
        // missing
        let bufferView = factory.createBufferView({ buffer: 0, byteOffset: 0, contentType: "text" })
        expect(() => validator.validateBufferView(bufferView)).toThrow(/Required property 'byteLength' must be an unsigned integer/)

        // missing
        bufferView = factory.createBufferView({ buffer: 0, byteLength: -1, byteOffset: 0, contentType: "text" })
        expect(() => validator.validateBufferView(bufferView)).toThrow(/Required property 'byteLength' must be an unsigned integer/)
    })

    test("invalid - byteOffset not a uint; should throw", () => {
        // missing
        let bufferView = factory.createBufferView({ buffer: 0, byteLength: 0, contentType: "text" })
        expect(() => validator.validateBufferView(bufferView)).toThrow(/Required property 'byteOffset' must be an unsigned integer/)

        // missing
        bufferView = factory.createBufferView({ buffer: 0, byteLength: 0, byteOffset: -1, contentType: "text" })
        expect(() => validator.validateBufferView(bufferView)).toThrow(/Required property 'byteOffset' must be an unsigned integer/)
    })

    test("invalid - contentType not a uint; should throw", () => {
        // missing
        let bufferView = factory.createBufferView({ buffer: 0, byteLength: 0, byteOffset: 0 })
        expect(() => validator.validateBufferView(bufferView)).toThrow(/Required property 'contentType' must be a non-empty string/)

        // missing
        bufferView = factory.createBufferView({ buffer: 0, byteLength: 0, byteOffset: 0, contentType: "" })
        expect(() => validator.validateBufferView(bufferView)).toThrow(/Required property 'contentType' must be a non-empty string/)
    })

})

describe("validateChunk", function () {

    const validator: ISdtfComponentValidator = new SdtfComponentValidator(createComponentList({}))

    test("valid; should return", () => {
        const chunk = factory.createChunk({ name: "" })
        validator.validateChunk(chunk)
    })

    test("invalid - name not a string; should throw", () => {
        const bufferView = factory.createChunk({})
        expect(() => validator.validateChunk(bufferView)).toThrow(/Required property 'name' must be a string/)
    })

})

describe("validateDataItem", function () {

    const validator: ISdtfComponentValidator = new SdtfComponentValidator(createComponentList({
        accessors: [ factory.createAccessor({}) ],
        attributes: [ factory.createAttributes({}) ],
        typeHints: [ factory.createTypeHint({}) ],
    }))

    test("valid; should return", () => {
        const dataItem = factory.createDataItem({})
        validator.validateDataItem(dataItem)
    })

    test("invalid - accessor not a uint; should throw", () => {
        const dataItem = factory.createDataItem({ accessor: -1 })
        expect(() => validator.validateDataItem(dataItem)).toThrow(/Optional property 'accessor' must be an unsigned integer/)
    })

    test("invalid - attributes not a uint; should throw", () => {
        const dataItem = factory.createDataItem({ attributes: -1 })
        expect(() => validator.validateDataItem(dataItem)).toThrow(/Optional property 'attributes' must be an unsigned integer/)
    })

    test("invalid - typeHint not a uint; should throw", () => {
        const dataItem = factory.createDataItem({ typeHint: -1 })
        expect(() => validator.validateDataItem(dataItem)).toThrow(/Optional property 'typeHint' must be an unsigned integer/)
    })

    test("invalid - accessor out of range; should throw", () => {
        const dataItem = factory.createDataItem({ accessor: 1 })
        expect(() => validator.validateDataItem(dataItem)).toThrow(/Accessor index is out of range/)
    })

    test("invalid - attributes out of range; should throw", () => {
        const dataItem = factory.createDataItem({ attributes: 1 })
        expect(() => validator.validateDataItem(dataItem)).toThrow(/Attributes index is out of range/)
    })

    test("invalid - typeHint out of range; should throw", () => {
        const dataItem = factory.createDataItem({ typeHint: 1 })
        expect(() => validator.validateDataItem(dataItem)).toThrow(/Type hint index is out of range/)
    })

})

describe("validateFileInfo", function () {

    const validator: ISdtfComponentValidator = new SdtfComponentValidator(createComponentList({}))

    test("valid; should return", () => {
        const fileInfo = factory.createFileInfo({ version: "1.0" })
        validator.validateFileInfo(fileInfo)
    })

    test("invalid - version not a non-empty string; should throw", () => {
        // missing
        let fileInfo = factory.createFileInfo({})
        expect(() => validator.validateFileInfo(fileInfo)).toThrow(/Required property 'version' must be a non-empty string/)

        // invalid type
        fileInfo = factory.createFileInfo({ version: "" })
        expect(() => validator.validateFileInfo(fileInfo)).toThrow(/Required property 'version' must be a non-empty string/)
    })

})

describe("validateTypeHint", function () {

    const validator: ISdtfComponentValidator = new SdtfComponentValidator(createComponentList({}))

    test("valid; should return", () => {
        const typeHint = factory.createTypeHint({ name: "some type" })
        validator.validateTypeHint(typeHint)
    })

    test("invalid - name not a non-empty string; should throw", () => {
        // missing
        let typeHint = factory.createTypeHint({})
        expect(() => validator.validateTypeHint(typeHint)).toThrow(/Required property 'name' must be a non-empty string/)

        // invalid type
        typeHint = factory.createTypeHint({ name: "" })
        expect(() => validator.validateTypeHint(typeHint)).toThrow(/Required property 'name' must be a non-empty string/)
    })

})

describe("validateChunkOrNode", function () {

    const validator: SdtfComponentValidator = new SdtfComponentValidator(createComponentList({
        attributes: [ factory.createAttributes({}) ],
        items: [ factory.createDataItem({}) ],
        nodes: [ factory.createNode({}) ],
        typeHints: [ factory.createTypeHint({}) ],
    }))

    test("valid; should return", () => {
        const node = factory.createNode({})
        validator.validateChunkOrNode(node)
    })

    test("invalid - attributes is not a uint; should throw", () => {
        const node = factory.createNode({ attributes: -1 })
        expect(() => validator.validateChunkOrNode(node)).toThrow(/Optional property 'attributes' must be an unsigned integer/)
    })

    test("invalid - items  is not a uint array; should throw", () => {
        // missing
        let node = factory.createNode({})
        node.items = undefined
        expect(() => validator.validateChunkOrNode(node)).toThrow(/Required property 'items' must be an array of unsigned integers/)

        // invalid type
        node = factory.createNode({ items: [ -1 ] })
        expect(() => validator.validateChunkOrNode(node)).toThrow(/Required property 'items' must be an array of unsigned integers/)
    })

    test("invalid - nodes is not a uint array; should throw", () => {
        // missing
        let node = factory.createNode({})
        node.nodes = undefined
        expect(() => validator.validateChunkOrNode(node)).toThrow(/Required property 'nodes' must be an array of unsigned integers/)

        // invalid type
        node = factory.createNode({ nodes: [ -1 ] })
        expect(() => validator.validateChunkOrNode(node)).toThrow(/Required property 'nodes' must be an array of unsigned integers/)
    })

    test("invalid - typeHint is not a uint; should throw", () => {
        const node = factory.createNode({ typeHint: -1 })
        expect(() => validator.validateChunkOrNode(node)).toThrow(/Optional property 'typeHint' must be an unsigned integer/)
    })

    test("invalid - self-referencing node; should throw", () => {
        const node = factory.createNode({ nodes: [ 1 ] })
        // @ts-ignore
        validator.componentList.nodes.push(node)
        expect(() => validator.validateChunkOrNode(node)).toThrow(/Node is referencing itself in the 'nodes' property/)
    })

})

/** Helper functions */
function createComponentList (partialList: Partial<ISdtfPartialComponentList>): ISdtfPartialComponentList {
    return {
        accessors: (partialList.accessors) ? partialList.accessors : [],
        asset: (partialList.asset) ? partialList.asset : new SdtfPartialAsset(),
        attributes: (partialList.attributes) ? partialList.attributes : [],
        bufferViews: (partialList.bufferViews) ? partialList.bufferViews : [],
        buffers: (partialList.buffers) ? partialList.buffers : [],
        chunks: (partialList.chunks) ? partialList.chunks : [],
        fileInfo: new SdtfPartialFileInfo(),
        items: (partialList.items) ? partialList.items : [],
        nodes: (partialList.nodes) ? partialList.nodes : [],
        typeHints: (partialList.typeHints) ? partialList.typeHints : [],

    }
}
