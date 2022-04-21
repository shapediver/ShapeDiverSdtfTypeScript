import { ISdDtfReadableContentComponent, SdDtfGeometryTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create } from "@shapediver/sdk.sdtf-v1"
import { SdDtfGeometryCircleType, SdDtfGeometryTypeGuard, SdDtfGeometryTypeIntegration } from "../../src"

const sdk = create({ integrations: [ new SdDtfGeometryTypeIntegration() ] })

describe("type circle", function () {

    const content: SdDtfGeometryCircleType = {
        plane: [ [ 1.0, 2.0, 3.0 ], [ 0.0, 0.0, 1.0 ], [ 1.0, 0.0, 0.0 ] ],
        radius: 2.0,
    }

    test("read and get content; should not throw", async () => {
        const asset = await sdk.createParser().readFromFile("./test_data/geometry_circle.sdtf")
        const content = await asset.items[0].getContent()
        expect(content).toStrictEqual(content)
        SdDtfGeometryTypeGuard.assertCircle(content)
    })

    test("create via writer; should contain value", () => {
        const constructor = sdk.createConstructor()
        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [], [ {
            content,
            typeHint: SdDtfGeometryTypeHintName.GEOMETRY_CIRCLE,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).value).toStrictEqual(content)
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).accessor).toBeUndefined()
    })

})
