import { ISdDtfReadableContentComponent, SdDtfRhinoTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create, SdDtfSdk } from "@shapediver/sdk.sdtf-v1"
import { SdDtfRhino3dmTypeGuard, SdDtfRhino3dmTypeIntegration } from "../../src"
import { SdDtfRhino3dmSingleton } from "../../src/SdDtfRhino3dmSingleton"

describe("type subD", function () {

    let sdk: SdDtfSdk

    beforeAll(async () => {
        sdk = await create({
            integrations: [ new SdDtfRhino3dmTypeIntegration({
                requireValidRhino3dmComponents: false,  // TODO remove when a valid SubD component can be created
            }) ] })
    })

    // TODO enable when SubD-components created in rhino are not a `NurbsCurve` anymore
    test.skip("read example file; should return valid rhino component instance", async () => {
        await SdDtfRhino3dmSingleton.init()
        const asset = await sdk.createParser().readFromFile("./test_data/RhinoTypesGzipped.sdtf")
        const content = await asset.items[16].getContent()
        expect(content).toBeDefined()
        expect(typeof content).toBe("object")
        SdDtfRhino3dmTypeGuard.assertSubD(content)
    })

    test("create sdTF, read and extract content; should return valid rhino component instance", async () => {
        const rhino = SdDtfRhino3dmSingleton.getInstance()
        const constructor = sdk.createConstructor()

        const content = new rhino.SubD()
        // expect(content.isValid).toBeTruthy()    // TODO uncomment when a valid SubD component can be created

        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [ {
            content,
            typeHint: SdDtfRhinoTypeHintName.RHINO_SUBD,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).value).toBeUndefined()
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).accessor).toBeDefined()
        SdDtfRhino3dmTypeGuard.assertSubD(await readableAsset.items[0].getContent())
    })

})
