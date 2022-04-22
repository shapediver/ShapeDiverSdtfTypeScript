import { ISdDtfReadableContentComponent, SdDtfGeometryTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create, SdDtfSdk } from "@shapediver/sdk.sdtf-v1"
import { SdDtfGeometryLineType, SdDtfGeometryTypeGuard, SdDtfGeometryTypeIntegration } from "../../src"

describe("type line", function () {

    let sdk: SdDtfSdk
    const content: SdDtfGeometryLineType = [ [ 1.0, 2.0, 3.0 ], [ 4.0, 5.0, 6.0 ] ]

    beforeAll(async () => {
        sdk = await create({ integrations: [ new SdDtfGeometryTypeIntegration() ] })
    })

    test("read and get content; should not throw", async () => {
        const asset = await sdk.createParser().readFromFile("./test_data/geometry_line.sdtf")
        const content = await asset.items[0].getContent()
        expect(content).toStrictEqual(content)
        SdDtfGeometryTypeGuard.assertLine(content)
    })

    test("create via writer; should contain value", () => {
        const constructor = sdk.createConstructor()
        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [ {
            content,
            typeHint: SdDtfGeometryTypeHintName.GEOMETRY_LINE,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).value).toStrictEqual(content)
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).accessor).toBeUndefined()
    })

})
