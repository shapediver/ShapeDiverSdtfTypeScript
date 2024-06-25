import { ISdtfReadableContentComponent, SdtfPrimitiveTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create, SdtfSdk } from "../../../../packages/sdk.sdtf-v1"
import { SdtfPrimitiveColorType, SdtfPrimitiveTypeGuard, SdtfPrimitiveTypeIntegration } from "../../src"

describe("type color", function () {

    let sdk: SdtfSdk
    const content: SdtfPrimitiveColorType = [ 0.0, 0.74901960784313726, 1.0, 1.0 ]

    beforeAll(async () => {
        sdk = await create({ integrations: [ new SdtfPrimitiveTypeIntegration() ] })
    })

    test("read and get content; should not throw", async () => {
        const asset = await sdk.createParser().readFromFile("./test_data/color.sdtf")
        const data = await asset.items[0].getContent()
        expect(data).toStrictEqual(content)
        SdtfPrimitiveTypeGuard.assertColor(data)
    })

    test("read legacy and get content", async () => {
        const asset = await sdk.createParser().readFromFile("./test_data/color_legacy.sdtf")
        const content = await asset.items[0].getContent()
        expect(content).toStrictEqual([ 126 / 255, 156 / 255, 255 / 255, 1 ])
        SdtfPrimitiveTypeGuard.assertColor(content)
    })

    test("create via writer; should contain value", () => {
        const constructor = sdk.createConstructor()
        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [ {
            content,
            typeHint: SdtfPrimitiveTypeHintName.COLOR,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        const item = readableAsset.items[0] as ISdtfReadableContentComponent
        expect(SdtfPrimitiveTypeGuard.isColorType(item.typeHint?.name)).toBeTruthy()
        expect(item.value).toStrictEqual(content)
        expect(item.accessor).toBeUndefined()
    })

})
