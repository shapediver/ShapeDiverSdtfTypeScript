import { create } from "@shapediver/sdk.sdtf-v1"
import { SdDtfPrimitiveTypeGuard, SdDtfPrimitiveTypeIntegration } from "../../src"

const sdk = create({ integrations: [ new SdDtfPrimitiveTypeIntegration() ] })

describe("type guid", function () {

    test("read and get content; should not throw", async () => {
        const asset = await sdk.createParser().readFromFile("./test_data/guid.sdtf")
        const content = await asset.items[0].getContent()
        expect(content).toBe("77bdc9dd-55be-4c90-865d-144da1d6a3ab")
        SdDtfPrimitiveTypeGuard.assertString(content)
    })

})
