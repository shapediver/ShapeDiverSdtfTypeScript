import { ISdtfReadableContentComponent, SdtfGeometryTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create, SdtfSdk } from "@shapediver/sdk.sdtf-v1"
import { SdtfGeometryTransformType, SdtfGeometryTypeGuard, SdtfGeometryTypeIntegration } from "../../src"

describe("type transform", function () {

    let sdk: SdtfSdk
    const content: SdtfGeometryTransformType = [ [ 1.0, 0.0, 0.0, 0.0 ], [ 0.0, 2.0, 0.0, 0.0 ], [ 0.0, 0.0, 3.0, 0.0 ], [ 0.0, 0.0, 0.0, 1.0 ] ]

    beforeAll(async () => {
        sdk = await create({ integrations: [ new SdtfGeometryTypeIntegration() ] })
    })

    test("read and get content; should not throw", async () => {
        const asset = await sdk.createParser().readFromFile("./test_data/geometry_transform.sdtf")
        const content = await asset.items[0].getContent()
        expect(content).toStrictEqual(content)
        SdtfGeometryTypeGuard.assertTransform(content)
    })

    test("create via writer; should contain value", () => {
        const constructor = sdk.createConstructor()
        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [ {
            content,
            typeHint: SdtfGeometryTypeHintName.GEOMETRY_TRANSFORM,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).value).toStrictEqual(content)
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).accessor).toBeUndefined()
    })

})
