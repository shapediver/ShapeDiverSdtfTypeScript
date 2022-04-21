import { create } from "../../../../src"
import { SdDtfGrasshopperSdtfBuilder } from "../../../../src/writer/builder/SdDtfGrasshopperSdtfBuilder"

const factory = create().createConstructor().getFactory()

describe("addChunkForListData", function () {

    test("list given; should create a chunk with a single node that holds all data", () => {
        const list = [
            factory.createDataItem("foo", "string"),
            factory.createDataItem("bar", "string"),
        ]
        const chunkAttributes = factory.createAttributes({ "baz": [ "qux" ] })

        const builder = new SdDtfGrasshopperSdtfBuilder(factory)
        builder.addChunkForListData("ce0065af-8a90-4cd7-aa83-b8551fa7174a", list, chunkAttributes)
        const grasshopperAsset = builder.build()

        expect(grasshopperAsset.chunks.length).toBe(1)
        expect(grasshopperAsset.chunks[0].name).toBe("ce0065af-8a90-4cd7-aa83-b8551fa7174a")
        expect(grasshopperAsset.chunks[0].nodes.length).toBe(1)
        expect(grasshopperAsset.chunks[0].nodes[0].name).toBe("[0]")
        expect(grasshopperAsset.chunks[0].nodes[0].items.length).toBe(2)
        expect(grasshopperAsset.chunks[0].nodes[0].items[0].value).toBe("foo")
        expect(grasshopperAsset.chunks[0].nodes[0].items[1].value).toBe("bar")
        expect(grasshopperAsset.chunks[0].attributes).toBeDefined()
        expect(grasshopperAsset.chunks[0].attributes!.entries["baz"]).toBeDefined()
        expect(grasshopperAsset.chunks[0].attributes!.entries["baz"].value).toBe("qux")
    })

})

describe("addChunkForTreeData", function () {

    test("invalid tree - branches and paths are not equal; should throw", () => {
        const branches = [ [ factory.createDataItem("foo", "bar") ] ]
        const paths = [ [ 0 ], [ 1 ] ]

        const builder = new SdDtfGrasshopperSdtfBuilder(factory)
        expect(() => builder.addChunkForTreeData("", { branches, paths }))
            .toThrow(/'branches' and 'paths' of the grasshopper structure must have the same number of elements/)
    })

    test("invalid tree - path holds non-integers; should throw", () => {
        const branches = [ [ factory.createDataItem("foo", "bar") ] ]
        const paths = [ [ 0.23 ] ]

        const builder = new SdDtfGrasshopperSdtfBuilder(factory)
        expect(() => builder.addChunkForTreeData("", { branches, paths }))
            .toThrow(/'paths' of the grasshopper structure must only consist of integer values/)
    })

    test("invalid tree - data items without type hint; should throw", () => {
        const branches = [ [ factory.createDataItem("foo") ] ]
        const paths = [ [ 0 ] ]

        const builder = new SdDtfGrasshopperSdtfBuilder(factory)
        expect(() => builder.addChunkForTreeData("", { branches, paths }))
            .toThrow(/All data items in 'tree.branches' must contain a type hint/)
    })

    test("invalid tree - data items with different type hints; should throw", () => {
        const branches = [ [ factory.createDataItem("foo", "bar") ], [ factory.createDataItem("foo", "baz") ] ]
        const paths = [ [ 0 ], [ 1 ] ]

        const builder = new SdDtfGrasshopperSdtfBuilder(factory)
        expect(() => builder.addChunkForTreeData("", { branches, paths }))
            .toThrow(/All data items in 'tree.branches' must have the same type hint/)
    })

    test("tree given; should create a chunk with multiple nodes which hold the data", () => {
        const branches = [
            [
                factory.createDataItem("foo", "string"),
                factory.createDataItem("bar", "string"),
            ],
            [
                factory.createDataItem("baz", "string"),
            ],
        ]
        const paths = [
            [ 0, 0, 0 ],
            [ 0, 0, 1 ],
        ]
        const chunkAttributes = factory.createAttributes({ "baz": [ "qux" ] })

        const builder = new SdDtfGrasshopperSdtfBuilder(factory)
        builder.addChunkForTreeData("ce0065af-8a90-4cd7-aa83-b8551fa7174a", { branches, paths }, chunkAttributes)
        const grasshopperAsset = builder.build()

        expect(grasshopperAsset.chunks.length).toBe(1)
        expect(grasshopperAsset.chunks[0].name).toBe("ce0065af-8a90-4cd7-aa83-b8551fa7174a")
        expect(grasshopperAsset.chunks[0].nodes.length).toBe(2)
        expect(grasshopperAsset.chunks[0].nodes[0].name).toBe("[0,0,0]")
        expect(grasshopperAsset.chunks[0].nodes[0].items.length).toBe(2)
        expect(grasshopperAsset.chunks[0].nodes[0].items[0].value).toBe("foo")
        expect(grasshopperAsset.chunks[0].nodes[0].items[1].value).toBe("bar")
        expect(grasshopperAsset.chunks[0].nodes[1].name).toBe("[0,0,1]")
        expect(grasshopperAsset.chunks[0].nodes[1].items.length).toBe(1)
        expect(grasshopperAsset.chunks[0].nodes[1].items[0].value).toBe("baz")
        expect(grasshopperAsset.chunks[0].attributes).toBeDefined()
        expect(grasshopperAsset.chunks[0].attributes!.entries["baz"]).toBeDefined()
        expect(grasshopperAsset.chunks[0].attributes!.entries["baz"].value).toBe("qux")
    })

})
