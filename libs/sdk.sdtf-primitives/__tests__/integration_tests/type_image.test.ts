import { ISdDtfReadableContentComponent, SdDtfPrimitiveTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create } from "@shapediver/sdk.sdtf-v1"
import { SdDtfPrimitiveTypeGuard, SdDtfPrimitiveTypeIntegration } from "../../src"

const sdk = create({ integrations: [ new SdDtfPrimitiveTypeIntegration() ] })

describe("type image", function () {

    test("read and get content; should not throw", async () => {
        const asset = await sdk.createParser().readFromFile("./test_data/image.sdtf")
        const content = await asset.items[0].getContent()
        expect(ArrayBuffer.isView(content)).toBeTruthy()
        SdDtfPrimitiveTypeGuard.assertDataView(content)
    })

    test("create via writer; should contain accessor", () => {
        const constructor = sdk.createConstructor()
        const factory = constructor.getFactory()

        // TODO replace with high-level writer
        const item = factory.createDataItem(undefined, SdDtfPrimitiveTypeHintName.DATA)
        item.accessor = factory.createAccessor(new ArrayBuffer(1))
        item.accessor.bufferView!.contentType = "png"
        item.typeHint = factory.createTypeHint(SdDtfPrimitiveTypeHintName.DATA)
        const chunk = factory.createChunk("[0]")
        chunk.items.push(item)
        const asset = factory.createAsset()
        asset.chunks.push(chunk)

        const sdTF = constructor.createBinarySdtf(asset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).value).toBeUndefined()
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).accessor).toBeDefined()
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).accessor?.bufferView).toBeDefined()
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).accessor?.bufferView.byteLength).toBe(1)
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).accessor?.bufferView.contentType).toBe("png")
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).accessor?.bufferView.buffer).toBeDefined()
    })

})
