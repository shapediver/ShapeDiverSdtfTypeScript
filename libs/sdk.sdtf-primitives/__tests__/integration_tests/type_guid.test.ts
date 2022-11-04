import { ISdtfReadableContentComponent, SdtfPrimitiveTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create, SdtfSdk } from "../../../../packages/sdk.sdtf-v1"
import { SdtfPrimitiveTypeGuard, SdtfPrimitiveTypeIntegration } from "../../src"

describe("type guid", function () {

    let sdk: SdtfSdk

    beforeAll(async () => {
        sdk = await create({ integrations: [ new SdtfPrimitiveTypeIntegration() ] })
    })

    test("read and get content; should not throw", async () => {
        const asset = await sdk.createParser().readFromFile("./test_data/guid.sdtf")
        const content = await asset.items[0].getContent()
        expect(content).toBe("77bdc9dd-55be-4c90-865d-144da1d6a3ab")
        SdtfPrimitiveTypeGuard.assertString(content)
    })

    test("create via writer; should contain value", () => {
        const constructor = sdk.createConstructor()
        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [ {
            content: "77bdc9dd-55be-4c90-865d-144da1d6a3ab",
            typeHint: SdtfPrimitiveTypeHintName.GUID,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        const item = readableAsset.items[0] as ISdtfReadableContentComponent
        expect(SdtfPrimitiveTypeGuard.isStringType(item.typeHint?.name)).toBeTruthy()
        expect(item.value).toBe("77bdc9dd-55be-4c90-865d-144da1d6a3ab")
        expect(item.accessor).toBeUndefined()
    })

})
