import { ISdDtfReadableContentComponent, SdDtfRhinoTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create, SdDtfSdk } from "@shapediver/sdk.sdtf-v1"
import { SdDtfRhino3dmTypeGuard, SdDtfRhino3dmTypeIntegration } from "../../src"
import { SdDtfRhino3dmSingleton } from "../../src/SdDtfRhino3dmSingleton"

describe("type extrusion", function () {

    let sdk: SdDtfSdk

    beforeAll(async () => {
        sdk = await create({ integrations: [ new SdDtfRhino3dmTypeIntegration() ] })
    })

    test("create sdTF, read and extract content; should return valid rhino component instance", async () => {
        const rhino = SdDtfRhino3dmSingleton.getInstance()
        const constructor = sdk.createConstructor()

        const content = rhino.Extrusion.create(new rhino.LineCurve([ 0, 0, 0 ], [ 1, 1, 1 ]), 1, false)
        expect(content.isValid).toBeTruthy()

        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [ {
            content,
            typeHint: SdDtfRhinoTypeHintName.RHINO_EXTRUSION,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).value).toBeUndefined()
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).accessor).toBeDefined()
        SdDtfRhino3dmTypeGuard.assertExtrusion(await readableAsset.items[0].getContent())
    })

})
