import { create } from "@shapediver/sdk.sdtf-v1"
import { SdDtfPrimitiveTypeGuard, SdDtfPrimitiveTypeIntegration } from "../../src"

const sdk = create({ integrations: [ new SdDtfPrimitiveTypeIntegration() ] })

describe("type image", function () {

    test("read and get content; should not throw", async () => {
        const asset = await sdk.createParser().readFromFile("./test_data/image.sdtf")
        const content = await asset.items[0].getContent()
        expect(ArrayBuffer.isView(content)).toBeTruthy()
        SdDtfPrimitiveTypeGuard.assertDataView(content)
    })

})
