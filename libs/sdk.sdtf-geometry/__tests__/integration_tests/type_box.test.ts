import { ISdtfReadableContentComponent, SdtfGeometryTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create, SdtfSdk } from "../../../../packages/sdk.sdtf-v1"
import { SdtfGeometryBoxType, SdtfGeometryTypeGuard, SdtfGeometryTypeIntegration } from "../../src"

describe("type box", function () {

    let sdk: SdtfSdk
    const content: SdtfGeometryBoxType = {
        plane: [ [ 0, 0, 0 ], [ 1, 0, 0 ], [ 0, 1, 0 ] ],
        extents: [ [ -1, 4 ], [ -2, 5 ], [ -3, 6 ] ],
    }

    beforeAll(async () => {
        sdk = await create({ integrations: [ new SdtfGeometryTypeIntegration() ] })
    })

    test("read and get content; should not throw", async () => {
        const asset = await sdk.createParser().readFromFile("./test_data/geometry_box.sdtf")
        const data = await asset.items[0].getContent()
        expect(data).toStrictEqual(content)
        SdtfGeometryTypeGuard.assertBox(data)
    })

    test("create via writer; should contain value", () => {
        const constructor = sdk.createConstructor()
        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [ {
            content,
            typeHint: SdtfGeometryTypeHintName.GEOMETRY_BOX,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).value).toStrictEqual(content)
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).accessor).toBeUndefined()
    })

})
