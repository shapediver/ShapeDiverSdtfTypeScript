import { ISdtfReadableContentComponent, SdtfGeometryTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create, SdtfSdk } from "../../../../packages/sdk.sdtf-v1"
import { SdtfGeometryComplexType, SdtfGeometryTypeGuard, SdtfGeometryTypeIntegration } from "../../src"

describe("type complex", function () {

    let sdk: SdtfSdk
    const content: SdtfGeometryComplexType = [ 1.0, -2.0 ]

    beforeAll(async () => {
        sdk = await create({ integrations: [ new SdtfGeometryTypeIntegration() ] })
    })

    test("read and get content; should not throw", async () => {
        const asset = await sdk.createParser().readFromFile("./test_data/geometry_complex.sdtf")
        const content = await asset.items[0].getContent()
        expect(content).toStrictEqual(content)
        SdtfGeometryTypeGuard.assertComplex(content)
    })

    test("create via writer; should contain value", () => {
        const constructor = sdk.createConstructor()
        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [ {
            content,
            typeHint: SdtfGeometryTypeHintName.GEOMETRY_COMPLEX,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).value).toStrictEqual(content)
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).accessor).toBeUndefined()
    })

})
