import { ISdDtfReadableContentComponent, SdDtfGeometryTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create, SdDtfSdk } from "@shapediver/sdk.sdtf-v1"
import { SdDtfGeometryPoint4d, SdDtfGeometryTypeGuard, SdDtfGeometryTypeIntegration } from "../../src"

describe("type point4d", function () {

    let sdk: SdDtfSdk
    const content: SdDtfGeometryPoint4d = [ 1.0, 2.0, 3.0, 4.0 ]

    beforeAll(async () => {
        sdk = await create({ integrations: [ new SdDtfGeometryTypeIntegration() ] })
    })

    test("read and get content; should not throw", async () => {
        const asset = await sdk.createParser().readFromFile("./test_data/geometry_point4d.sdtf")
        const content = await asset.items[0].getContent()
        expect(content).toStrictEqual(content)
        SdDtfGeometryTypeGuard.assertPoint(content)
        SdDtfGeometryTypeGuard.assertPoint4d(content)
    })

    test("create via writer; should contain value", () => {
        const constructor = sdk.createConstructor()
        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [ {
            content,
            typeHint: SdDtfGeometryTypeHintName.GEOMETRY_POINT,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).value).toStrictEqual(content)
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).accessor).toBeUndefined()
    })

})
