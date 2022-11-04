import { ISdtfReadableContentComponent, SdtfPrimitiveTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create, SdtfSdk } from "../../../../packages/sdk.sdtf-v1"
import { SdtfPrimitiveTypeGuard, SdtfPrimitiveTypeIntegration } from "../../src"

describe("type int32", function () {

    let sdk: SdtfSdk

    beforeAll(async () => {
        sdk = await create({ integrations: [ new SdtfPrimitiveTypeIntegration() ] })
    })

    test("read and get content; should not throw", async () => {
        const asset = await sdk.createParser().readFromFile("./test_data/int32.sdtf")
        const content = await asset.items[0].getContent()
        expect(content).toBe(-42)
        SdtfPrimitiveTypeGuard.assertNumber(content)
    })

    test("create via writer; should contain value", () => {
        const constructor = sdk.createConstructor()
        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [ {
            content: -42,
            typeHint: SdtfPrimitiveTypeHintName.INT32,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        const item = readableAsset.items[0] as ISdtfReadableContentComponent
        expect(SdtfPrimitiveTypeGuard.isNumberType(item.typeHint?.name)).toBeTruthy()
        expect(item.value).toBe(-42)
        expect(item.accessor).toBeUndefined()
    })

})
