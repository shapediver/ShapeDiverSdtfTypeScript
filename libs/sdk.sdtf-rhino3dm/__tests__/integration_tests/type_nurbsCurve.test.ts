import { ISdDtfReadableContentComponent, SdDtfRhinoTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create, SdDtfSdk } from "@shapediver/sdk.sdtf-v1"
import { SdDtfRhino3dmTypeGuard, SdDtfRhino3dmTypeIntegration } from "../../src"
import { SdDtfRhino3dmSingleton } from "../../src/SdDtfRhino3dmSingleton"

describe("type nurbs-curve", function () {

    let sdk: SdDtfSdk

    beforeAll(async () => {
        sdk = await create({ integrations: [ new SdDtfRhino3dmTypeIntegration() ] })
    })

    test("read example file; should return valid rhino component instance", async () => {
        await SdDtfRhino3dmSingleton.init()
        const asset = await sdk.createParser().readFromFile("./test_data/RhinoTypesGzipped.sdtf")
        const content = await asset.items[16].getContent()
        expect(content).toBeDefined()
        expect(typeof content).toBe("object")
        SdDtfRhino3dmTypeGuard.assertCurve(content)
        SdDtfRhino3dmTypeGuard.assertNurbsCurve(content)
    })

    test("create sdTF, read and extract content; should return valid rhino component instance", async () => {
        const rhino = SdDtfRhino3dmSingleton.getInstance()
        const constructor = sdk.createConstructor()

        // @ts-ignore
        const content = rhino.NurbsCurve.createFromCircle(new rhino.Circle(5))
        expect(content.isValid).toBeTruthy()

        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [ {
            content,
            typeHint: SdDtfRhinoTypeHintName.RHINO_NURBS_CURVE,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).value).toBeUndefined()
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).accessor).toBeDefined()

        const contentInstance = await readableAsset.items[0].getContent()
        SdDtfRhino3dmTypeGuard.assertCurve(contentInstance)
        SdDtfRhino3dmTypeGuard.assertNurbsCurve(contentInstance)
    })

})
