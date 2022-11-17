import { ISdtfReadableContentComponent, SdtfRhinoTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create, SdtfSdk } from "../../../../packages/sdk.sdtf-v1"
import { SdtfRhino3dmTypeGuard, SdtfRhino3dmTypeIntegration } from "../../src"
import { SdtfRhino3dmSingleton } from "../../src"

describe("type plane-surface", function () {

    let sdk: SdtfSdk

    beforeAll(async () => {
        sdk = await create({
            integrations: [ new SdtfRhino3dmTypeIntegration({
                requireValidRhino3dmComponents: false,  // TODO remove when a valid PlaneSurface component can be created
            }) ],
        })
    })

    test("create sdTF, read and extract content; should return valid rhino component instance", async () => {
        const rhino = SdtfRhino3dmSingleton.getInstance()
        const constructor = sdk.createConstructor()

        const content = new rhino.PlaneSurface()
        // expect(content.isValid).toBeTruthy()    // TODO uncomment when a valid PlaneSurface component can be created

        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [ {
            content,
            typeHint: SdtfRhinoTypeHintName.RHINO_PLANE_SURFACE,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).value).toBeUndefined()
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).accessor).toBeDefined()

        const contentInstance = await readableAsset.items[0].getContent()
        SdtfRhino3dmTypeGuard.assertSurface(contentInstance)
        // SdtfRhino3dmTypeGuard.assertPlaneSurface(contentInstance)   // TODO uncomment when PlaneSurface-components created in TS are not a `Surface` anymore - this should be resolved when PlaneSurface contains at least a single function...
    })

})
