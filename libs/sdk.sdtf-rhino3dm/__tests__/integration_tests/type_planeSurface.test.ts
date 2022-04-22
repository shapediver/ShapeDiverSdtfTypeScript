import { ISdDtfReadableContentComponent, SdDtfRhinoTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create, SdDtfSdk } from "@shapediver/sdk.sdtf-v1"
import { SdDtfRhino3dmTypeGuard, SdDtfRhino3dmTypeIntegration } from "../../src"
import { SdDtfRhino3dmSingleton } from "../../src/SdDtfRhino3dmSingleton"

describe("type plane-surface", function () {

    let sdk: SdDtfSdk

    beforeAll(async () => {
        sdk = await create({
            integrations: [ new SdDtfRhino3dmTypeIntegration({
                requireValidRhino3dmComponents: false,  // TODO remove when a valid PlaneSurface component can be created
            }) ],
        })
    })

    test("create sdTF, read and extract content; should return valid rhino component instance", async () => {
        const rhino = SdDtfRhino3dmSingleton.getInstance()
        const constructor = sdk.createConstructor()

        const content = new rhino.PlaneSurface()
        // expect(content.isValid).toBeTruthy()    // TODO uncomment when a valid PlaneSurface component can be created

        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [ {
            content,
            typeHint: SdDtfRhinoTypeHintName.RHINO_PLANE_SURFACE,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).value).toBeUndefined()
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).accessor).toBeDefined()

        const contentInstance = await readableAsset.items[0].getContent()
        SdDtfRhino3dmTypeGuard.assertSurface(contentInstance)
        // SdDtfRhino3dmTypeGuard.assertPlaneSurface(contentInstance)   // TODO uncomment when PlaneSurface-components created in TS are not a `Surface` anymore - this should be resolved when PlaneSurface contains at least a single function...
    })

})
