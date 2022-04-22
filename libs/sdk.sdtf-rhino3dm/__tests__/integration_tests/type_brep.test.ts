import { ISdDtfReadableContentComponent, SdDtfRhinoTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create, SdDtfSdk } from "@shapediver/sdk.sdtf-v1"
import { SdDtfRhino3dmTypeGuard, SdDtfRhino3dmTypeIntegration } from "../../src"
import { SdDtfRhino3dmSingleton } from "../../src/SdDtfRhino3dmSingleton"

describe("type brep", function () {

    let sdk: SdDtfSdk

    beforeAll(async () => {
        sdk = await create({ integrations: [ new SdDtfRhino3dmTypeIntegration() ] })
    })

    test("read example file; should return valid rhino component instance", async () => {
        await SdDtfRhino3dmSingleton.init()
        const asset = await sdk.createParser().readFromFile("./test_data/RhinoTypesGzipped.sdtf")
        const content = await asset.items[19].getContent()
        expect(content).toBeDefined()
        expect(typeof content).toBe("object")
        SdDtfRhino3dmTypeGuard.assertBrep(content)
    })

    test("create sdTF, read and extract content; should return valid rhino component instance", async () => {
        const rhino = SdDtfRhino3dmSingleton.getInstance()
        const constructor = sdk.createConstructor()

        const content = rhino.Brep.createFromBox(new rhino.BoundingBox([ 0, 0, 0 ], [ 1, 1, 1 ]))
        expect(content.isValid).toBeTruthy()

        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [ {
            content,
            typeHint: SdDtfRhinoTypeHintName.RHINO_BREP,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).value).toBeUndefined()
        expect((<ISdDtfReadableContentComponent>readableAsset.items[0]).accessor).toBeDefined()
        SdDtfRhino3dmTypeGuard.assertBrep(await readableAsset.items[0].getContent())
    })

})
