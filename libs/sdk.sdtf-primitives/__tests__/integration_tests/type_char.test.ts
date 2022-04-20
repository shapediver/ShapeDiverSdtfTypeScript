import { create } from "@shapediver/sdk.sdtf-v1"
import { SdDtfPrimitiveTypeGuard, SdDtfPrimitiveTypeIntegration } from "../../src"

const sdk = create({ integrations: [ new SdDtfPrimitiveTypeIntegration() ] })

describe("type char", function () {

    test("read and get content; should not throw", async () => {
        const asset = await sdk.createParser().readFromFile("./test_data/char.sdtf")
        const content = await asset.items[0].getContent()
        expect(content).toBe("C")
        SdDtfPrimitiveTypeGuard.assertString(content)
    })

})
