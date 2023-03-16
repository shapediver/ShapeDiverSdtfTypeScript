import { ISdtfReadableContentComponent, SdtfGeometryTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create, SdtfSdk } from "../../../../packages/sdk.sdtf-v1"
import { SdtfGeometryPoint3d, SdtfGeometryTypeGuard, SdtfGeometryTypeIntegration } from "../../src"

describe("type point3d", function () {

    let sdk: SdtfSdk
    const content: SdtfGeometryPoint3d = [ 1.0, 2.0, 3.0 ]

    beforeAll(async () => {
        sdk = await create({ integrations: [ new SdtfGeometryTypeIntegration() ] })
    })

    test.each([
        "geometry_point3d.sdtf",
        "geometry_point3f.sdtf",
    ])("%s, read and get content; should not throw", async (file) => {
        const asset = await sdk.createParser().readFromFile("./test_data/" + file)
        const data = await asset.items[0].getContent()
        expect(data).toStrictEqual(content)
        SdtfGeometryTypeGuard.assertPoint(data)
        SdtfGeometryTypeGuard.assertPoint3d(data)
    })

    test.each([
        SdtfGeometryTypeHintName.GEOMETRY_POINT,
        SdtfGeometryTypeHintName.GEOMETRY_POINT3D,
    ])("%s, create via writer; should contain value", (typeHint) => {
        const constructor = sdk.createConstructor()
        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [ {
            content,
            typeHint,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).value).toStrictEqual(content)
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).accessor).toBeUndefined()
    })

})
