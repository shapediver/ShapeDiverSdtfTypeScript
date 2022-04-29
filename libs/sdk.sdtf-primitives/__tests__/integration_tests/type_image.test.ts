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
        const item = readableAsset.items[0] as ISdtfReadableContentComponent
        expect(SdtfPrimitiveTypeGuard.isDataViewType(item.typeHint?.name)).toBeTruthy()
        expect(item.value).toBeUndefined()
        expect(item.accessor).toBeDefined()
        expect(item.accessor?.bufferView).toBeDefined()
        expect(item.accessor?.bufferView.byteLength).toBe(1)
        expect(item.accessor?.bufferView.contentType).toBe("png")
        expect(item.accessor?.bufferView.buffer).toBeDefined()
    })

})
