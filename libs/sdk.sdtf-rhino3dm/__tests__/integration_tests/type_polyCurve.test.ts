import { ISdtfReadableContentComponent, SdtfRhinoTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create, SdtfSdk } from "../../../../packages/sdk.sdtf-v1"
import { SdtfRhino3dmTypeGuard, SdtfRhino3dmTypeIntegration } from "../../src"
import { SdtfRhino3dmSingleton } from "../../src"

describe("type poly-curve", function () {

    let sdk: SdtfSdk

    beforeAll(async () => {
        sdk = await create({ integrations: [ new SdtfRhino3dmTypeIntegration() ] })
    })

    test("create sdTF, read and extract content; should return valid rhino component instance", async () => {
        const rhino = SdtfRhino3dmSingleton.getInstance()
        const constructor = sdk.createConstructor()

        const content = new rhino.PolyCurve()
        // @ts-ignore
        content.append(new rhino.LineCurve([ 0, 0, 0 ], [ 1, 1, 1 ]))
        expect(content.isValid).toBeTruthy()

        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [ {
            content,
            typeHint: SdtfRhinoTypeHintName.RHINO_POLY_CURVE,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).value).toBeUndefined()
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).accessor).toBeDefined()

        const contentInstance = await readableAsset.items[0].getContent()
        SdtfRhino3dmTypeGuard.assertCurve(contentInstance)
        SdtfRhino3dmTypeGuard.assertPolyCurve(contentInstance)
    })

})
