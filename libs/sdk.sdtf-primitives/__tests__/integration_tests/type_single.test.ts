import { create } from "@shapediver/sdk.sdtf-v1"
import { SdDtfPrimitiveTypeGuard, SdDtfPrimitiveTypeIntegration } from "../../src"

const sdk = create({ integrations: [ new SdDtfPrimitiveTypeIntegration() ] })

describe("type single", function () {

    test("read and get content; should not throw", async () => {
        const asset = await sdk.createParser().readFromFile("./test_data/single.sdtf")
        const content = await asset.items[0].getContent()
        expect(content).toBe(3.14159274)
        SdDtfPrimitiveTypeGuard.assertNumber(content)
    })

})
