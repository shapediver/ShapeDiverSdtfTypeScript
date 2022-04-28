import { ISdtfReadableContentComponent, SdtfPrimitiveTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create, SdtfSdk } from "@shapediver/sdk.sdtf-v1"
import { SdtfPrimitiveTypeGuard, SdtfPrimitiveTypeIntegration } from "../../src"

describe("type color", function () {

    let sdk: SdtfSdk

    beforeAll(async () => {
        sdk = await create({ integrations: [ new SdtfPrimitiveTypeIntegration() ] })
    })

    test("read and get content; should not throw", async () => {
        const asset = await sdk.createParser().readFromFile("./test_data/color.sdtf")
        const content = await asset.items[0].getContent()
        expect(content).toStrictEqual([ 0.0, 0.74901960784313726, 1.0, 1.0 ])
        SdtfPrimitiveTypeGuard.assertColor(content)
    })

    test("read legacy and get content", async () => {
        const asset = await sdk.createParser().readFromFile("./test_data/color_legacy.sdtf")
        const content = await asset.items[0].getContent()
        expect(content).toStrictEqual([ 126, 156, 255, 1 ])
        SdtfPrimitiveTypeGuard.assertColor(content)
    })

    test("create via writer; should contain value", () => {
        const constructor = sdk.createConstructor()
        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [ {
            content: [ 0.0, 0.74901960784313726, 1.0, 1.0 ],
            typeHint: SdtfPrimitiveTypeHintName.COLOR,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).value).toStrictEqual([ 0.0, 0.74901960784313726, 1.0, 1.0 ])
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).accessor).toBeUndefined()
    })

})
