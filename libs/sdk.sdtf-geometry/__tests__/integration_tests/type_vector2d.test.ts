import { ISdDtfReadableContentComponent, SdDtfGeometryTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create } from "@shapediver/sdk.sdtf-v1"
import { SdDtfGeometryTypeGuard, SdDtfGeometryTypeIntegration, SdDtfGeometryVector2d } from "../../src"

const sdk = create({ integrations: [ new SdDtfGeometryTypeIntegration() ] })

describe("type vector2d", function () {

    const content: SdDtfGeometryVector2d = [ 1.0, 2.0 ]

    test.each([
        "geometry_vector2d.sdtf",
        "geometry_vector2f.sdtf",
    ])("%s, read and get content; should not throw", async (file) => {
        const asset = await sdk.createParser().readFromFile("./test_data/" + file)
        const content = await asset.items[0].getContent()
        expect(content).toStrictEqual(content)
        SdDtfGeometryTypeGuard.assertVector(content)
        SdDtfGeometryTypeGuard.assertVector2d(content)
    })

    test("create via writer; should contain value", () => {
        const constructor = sdk.createConstructor()
        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [], [ {
            content,
            typeHint: SdDtfGeometryTypeHintName.GEOMETRY_VECTOR,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).value).toStrictEqual(content)
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).accessor).toBeUndefined()
    })

})
