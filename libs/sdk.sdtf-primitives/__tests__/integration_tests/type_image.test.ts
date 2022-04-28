import { ISdtfReadableContentComponent, SdtfPrimitiveTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create, SdtfSdk } from "@shapediver/sdk.sdtf-v1"
import { SdtfPrimitiveTypeGuard, SdtfPrimitiveTypeIntegration } from "../../src"

describe("type image", function () {

    let sdk: SdtfSdk

    beforeAll(async () => {
        sdk = await create({ integrations: [ new SdtfPrimitiveTypeIntegration() ] })
    })

    test("read and get content; should not throw", async () => {
        const asset = await sdk.createParser().readFromFile("./test_data/image.sdtf")
        const content = await asset.items[0].getContent()
        expect(ArrayBuffer.isView(content)).toBeTruthy()
        SdtfPrimitiveTypeGuard.assertDataView(content)
    })

    test("create via writer; should contain accessor", () => {
        const constructor = sdk.createConstructor()
        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [ {
            content: { data: new ArrayBuffer(1), contentType: "png" },
            typeHint: SdtfPrimitiveTypeHintName.IMAGE,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).value).toBeUndefined()
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).accessor).toBeDefined()
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).accessor?.bufferView).toBeDefined()
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).accessor?.bufferView.byteLength).toBe(1)
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).accessor?.bufferView.contentType).toBe("png")
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).accessor?.bufferView.buffer).toBeDefined()
    })

})
