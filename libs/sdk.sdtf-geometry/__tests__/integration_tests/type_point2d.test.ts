import { ISdtfReadableContentComponent, SdtfGeometryTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create, SdtfSdk } from "../../../../packages/sdk.sdtf-v1"
import { SdtfGeometryPoint2d, SdtfGeometryTypeGuard, SdtfGeometryTypeIntegration } from "../../src"

describe("type point2d", function () {

    let sdk: SdtfSdk
    const content: SdtfGeometryPoint2d = [ 1.0, 2.0 ]

    beforeAll(async () => {
        sdk = await create({ integrations: [ new SdtfGeometryTypeIntegration() ] })
    })

    test.each([
        "geometry_point2d.sdtf",
        "geometry_point2f.sdtf",
    ])("%s, read and get content; should not throw", async (file) => {
        const asset = await sdk.createParser().readFromFile("./test_data/" + file)
        const data = await asset.items[0].getContent()
        expect(data).toStrictEqual(content)
        SdtfGeometryTypeGuard.assertPoint(data)
        SdtfGeometryTypeGuard.assertPoint2d(data)
    })

    test("create via writer; should contain value", () => {
        const constructor = sdk.createConstructor()
        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [ {
            content,
            typeHint: SdtfGeometryTypeHintName.GEOMETRY_POINT,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).value).toStrictEqual(content)
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).accessor).toBeUndefined()
    })

})
