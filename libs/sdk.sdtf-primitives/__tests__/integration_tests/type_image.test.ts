import { ISdDtfReadableContentComponent, SdDtfPrimitiveTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create, SdDtfSdk } from "@shapediver/sdk.sdtf-v1"
import { SdDtfPrimitiveTypeGuard, SdDtfPrimitiveTypeIntegration } from "../../src"

describe("type image", function () {

    let sdk: SdDtfSdk

    beforeAll(async () => {
        sdk = await create({ integrations: [ new SdDtfPrimitiveTypeIntegration() ] })
    })

    test("read and get content; should not throw", async () => {
        const asset = await sdk.createParser().readFromFile("./test_data/image.sdtf")
        const content = await asset.items[0].getContent()
        expect(ArrayBuffer.isView(content)).toBeTruthy()
        SdDtfPrimitiveTypeGuard.assertDataView(content)
    })

    test("create via writer; should contain accessor", () => {
        const constructor = sdk.createConstructor()
        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [ {
            content: { data: new ArrayBuffer(1), contentType: "png" },
            typeHint: SdDtfPrimitiveTypeHintName.IMAGE,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).value).toBeUndefined()
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).accessor).toBeDefined()
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).accessor?.bufferView).toBeDefined()
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).accessor?.bufferView.byteLength).toBe(1)
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).accessor?.bufferView.contentType).toBe("png")
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).accessor?.bufferView.buffer).toBeDefined()
    })

})
