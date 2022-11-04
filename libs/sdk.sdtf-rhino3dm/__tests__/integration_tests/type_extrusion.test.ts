import { ISdtfReadableContentComponent, SdtfRhinoTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create, SdtfSdk } from "../../../../packages/sdk.sdtf-v1"
import { SdtfRhino3dmTypeGuard, SdtfRhino3dmTypeIntegration } from "../../src"
import { SdtfRhino3dmSingleton } from "../../src/SdtfRhino3dmSingleton"

describe("type extrusion", function () {

    let sdk: SdtfSdk

    beforeAll(async () => {
        sdk = await create({ integrations: [ new SdtfRhino3dmTypeIntegration() ] })
    })

    test("create sdTF, read and extract content; should return valid rhino component instance", async () => {
        const rhino = SdtfRhino3dmSingleton.getInstance()
        const constructor = sdk.createConstructor()

        const content = rhino.Extrusion.create(new rhino.LineCurve([ 0, 0, 0 ], [ 1, 1, 1 ]), 1, false)
        expect(content.isValid).toBeTruthy()

        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [ {
            content,
            typeHint: SdtfRhinoTypeHintName.RHINO_EXTRUSION,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).value).toBeUndefined()
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).accessor).toBeDefined()
        SdtfRhino3dmTypeGuard.assertExtrusion(await readableAsset.items[0].getContent())
    })

})
