import { ISdDtfReadableContentComponent, SdDtfPrimitiveTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create } from "@shapediver/sdk.sdtf-v1"
import { SdDtfPrimitiveTypeGuard, SdDtfPrimitiveTypeIntegration } from "../../src"

const sdk = create({ integrations: [ new SdDtfPrimitiveTypeIntegration() ] })

describe("type color", function () {

    test("read and get content; should not throw", async () => {
        const asset = await sdk.createParser().readFromFile("./test_data/color.sdtf")
        const content = await asset.items[0].getContent()
        expect(content).toStrictEqual([ 0.0, 0.74901960784313726, 1.0, 1.0 ])
        SdDtfPrimitiveTypeGuard.assertColor(content)
    })

    test("read legacy and get content", async () => {
        const asset = await sdk.createParser().readFromFile("./test_data/color_legacy.sdtf")
        const content = await asset.items[0].getContent()
        expect(content).toStrictEqual([ 126, 156, 255, 1 ])
        SdDtfPrimitiveTypeGuard.assertColor(content)
    })

    test("create via writer; should contain value", () => {
        const constructor = sdk.createConstructor()
        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [ {
            content: [ 0.0, 0.74901960784313726, 1.0, 1.0 ],
            typeHint: SdDtfPrimitiveTypeHintName.COLOR,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).value).toStrictEqual([ 0.0, 0.74901960784313726, 1.0, 1.0 ])
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).accessor).toBeUndefined()
    })

})
