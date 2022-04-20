import { ISdDtfReadableContentComponent, SdDtfPrimitiveTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create } from "@shapediver/sdk.sdtf-v1"
import { SdDtfPrimitiveTypeGuard, SdDtfPrimitiveTypeIntegration } from "../../src"

const sdk = create({ integrations: [ new SdDtfPrimitiveTypeIntegration() ] })

describe("type uint8", function () {

    test("read and get content; should not throw", async () => {
        const asset = await sdk.createParser().readFromFile("./test_data/uint8.sdtf")
        const content = await asset.items[0].getContent()
        expect(content).toBe(42)
        SdDtfPrimitiveTypeGuard.assertNumber(content)
    })

    test("create via writer; should contain value", () => {
        const constructor = sdk.createConstructor()
        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [], [ {
            content: 42,
            typeHint: SdDtfPrimitiveTypeHintName.UINT8,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).value).toBe(42)
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).accessor).toBeUndefined()
    })

})
