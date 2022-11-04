import { ISdtfReadableContentComponent, SdtfRhinoTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create, SdtfSdk } from "../../../../packages/sdk.sdtf-v1"
import { SdtfRhino3dmTypeGuard, SdtfRhino3dmTypeIntegration } from "../../src"
import { SdtfRhino3dmSingleton } from "../../src/SdtfRhino3dmSingleton"

describe("type subD", function () {

    let sdk: SdtfSdk

    beforeAll(async () => {
        sdk = await create({
            integrations: [ new SdtfRhino3dmTypeIntegration({
                requireValidRhino3dmComponents: false,  // TODO remove when a valid SubD component can be created
            }) ] })
    })

    // TODO enable when SubD-components created in rhino are not a `NurbsCurve` anymore
    test.skip("read example file; should return valid rhino component instance", async () => {
        await SdtfRhino3dmSingleton.init()
        const asset = await sdk.createParser().readFromFile("./test_data/rhinoTypesGzipped.sdtf")
        const content = await asset.items[16].getContent()
        expect(content).toBeDefined()
        expect(typeof content).toBe("object")
        SdtfRhino3dmTypeGuard.assertSubD(content)
    })

    test("create sdTF, read and extract content; should return valid rhino component instance", async () => {
        const rhino = SdtfRhino3dmSingleton.getInstance()
        const constructor = sdk.createConstructor()

        const content = new rhino.SubD()
        // expect(content.isValid).toBeTruthy()    // TODO uncomment when a valid SubD component can be created

        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [ {
            content,
            typeHint: SdtfRhinoTypeHintName.RHINO_SUBD,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).value).toBeUndefined()
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).accessor).toBeDefined()
        SdtfRhino3dmTypeGuard.assertSubD(await readableAsset.items[0].getContent())
    })

})
