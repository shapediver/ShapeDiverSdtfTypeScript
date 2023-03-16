import { ISdtfReadableContentComponent, SdtfGeometryTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create, SdtfSdk } from "../../../../packages/sdk.sdtf-v1"
import { SdtfGeometryPoint4d, SdtfGeometryTypeGuard, SdtfGeometryTypeIntegration } from "../../src"

describe("type point4d", function () {

    let sdk: SdtfSdk
    const content: SdtfGeometryPoint4d = [ 1.0, 2.0, 3.0, 4.0 ]

    beforeAll(async () => {
        sdk = await create({ integrations: [ new SdtfGeometryTypeIntegration() ] })
    })

    test("read and get content; should not throw", async () => {
        const asset = await sdk.createParser().readFromFile("./test_data/geometry_point4d.sdtf")
        const data = await asset.items[0].getContent()
        expect(data).toStrictEqual(content)
        SdtfGeometryTypeGuard.assertPoint(data)
        SdtfGeometryTypeGuard.assertPoint4d(data)
    })

    test.each([
        SdtfGeometryTypeHintName.GEOMETRY_POINT,
        SdtfGeometryTypeHintName.GEOMETRY_POINT4D,
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
