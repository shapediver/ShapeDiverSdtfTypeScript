import { ISdtfReadableContentComponent, SdtfRhinoTypeHintName } from "@shapediver/sdk.sdtf-core"
import { create, SdtfSdk } from "../../../../packages/sdk.sdtf-v1"
import { SdtfRhino3dmTypeGuard, SdtfRhino3dmTypeIntegration } from "../../src"
import { SdtfRhino3dmSingleton } from "../../src"

describe("type brep", function () {

    let sdk: SdtfSdk

    beforeAll(async () => {
        sdk = await create({ integrations: [ new SdtfRhino3dmTypeIntegration() ] })
    })

    test("read example file; should return valid rhino component instance", async () => {
        await SdtfRhino3dmSingleton.init()
        const asset = await sdk.createParser().readFromFile("./test_data/rhinoTypesGzipped.sdtf")
        const content = await asset.items[19].getContent()
        expect(content).toBeDefined()
        expect(typeof content).toBe("object")
        SdtfRhino3dmTypeGuard.assertBrep(content)
    })

    test("create sdTF, read and extract content; should return valid rhino component instance", async () => {
        const rhino = SdtfRhino3dmSingleton.getInstance()
        const constructor = sdk.createConstructor()

        const content = rhino.Brep.createFromBox(new rhino.BoundingBox([ 0, 0, 0 ], [ 1, 1, 1 ]))
        expect(content.isValid).toBeTruthy()

        const writeableAsset = constructor.getWriter().createSimpleDataSdtf("", [ {
            content,
            typeHint: SdtfRhinoTypeHintName.RHINO_BREP,
        } ])
        const sdTF = constructor.createBinarySdtf(writeableAsset)
        const readableAsset = sdk.createParser().readFromBuffer(sdTF)
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).value).toBeUndefined()
        expect((<ISdtfReadableContentComponent>readableAsset.items[0]).accessor).toBeDefined()
        SdtfRhino3dmTypeGuard.assertBrep(await readableAsset.items[0].getContent())
    })

})
