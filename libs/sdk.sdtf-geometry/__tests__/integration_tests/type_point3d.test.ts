import { ISdDtfReadableContentComponent, SdDtfGeometryTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create, SdDtfSdk } from "@shapediver/sdk.sdtf-v1"
import { SdDtfGeometryPoint3d, SdDtfGeometryTypeGuard, SdDtfGeometryTypeIntegration } from "../../src"

describe("type point3d", function () {

    let sdk: SdDtfSdk
    const content: SdDtfGeometryPoint3d = [ 1.0, 2.0, 3.0 ]

    beforeAll(async () => {
        sdk = await create({ integrations: [ new SdDtfGeometryTypeIntegration() ] })
    })

    test.each([
        "geometry_point3d.sdtf",
        "geometry_point3f.sdtf",
    ])("%s, read and get content; should not throw", async (file) => {
        const asset = await sdk.createParser().readFromFile("./test_data/" + file)
        const content = await asset.items[0].getContent()
        expect(content).toStrictEqual(content)
        SdDtfGeometryTypeGuard.assertPoint(content)
        SdDtfGeometryTypeGuard.assertPoint3d(content)
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
