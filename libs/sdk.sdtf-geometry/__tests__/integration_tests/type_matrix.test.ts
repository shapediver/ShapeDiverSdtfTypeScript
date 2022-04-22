import { ISdDtfReadableContentComponent, SdDtfGeometryTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create, SdDtfSdk } from "@shapediver/sdk.sdtf-v1"
import { SdDtfGeometryMatrixType, SdDtfGeometryTypeGuard, SdDtfGeometryTypeIntegration } from "../../src"

describe("type matrix", function () {

    let sdk: SdDtfSdk
    const content: SdDtfGeometryMatrixType = [ [ 1.0, 0.0, 0.0, 0.0 ], [ 0.0, 2.0, 0.0, 0.0 ], [ 0.0, 0.0, 3.0, 0.0 ], [ 0.0, 0.0, 0.0, 1.0 ] ]

    beforeAll(async () => {
        sdk = await create({ integrations: [ new SdDtfGeometryTypeIntegration() ] })
    })

    test("read and get content; should not throw", async () => {
        const asset = await sdk.createParser().readFromFile("./test_data/geometry_matrix.sdtf")
        const content = await asset.items[0].getContent()
        expect(content).toStrictEqual(content)
        SdDtfGeometryTypeGuard.assertMatrix(content)
    })

    test("create via writer; should contain value", () => {
        const constructor = sdk.createConstructor()
        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [ {
            content,
            typeHint: SdDtfGeometryTypeHintName.GEOMETRY_MATRIX,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).value).toStrictEqual(content)
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).accessor).toBeUndefined()
    })

})
