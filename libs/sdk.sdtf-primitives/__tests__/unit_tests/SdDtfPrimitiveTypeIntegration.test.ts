import { SdDtfPrimitiveTypeHintName } from "@shapediver/sdk.sdtf-core"
import { SdDtfPrimitiveTypeIntegration } from "../../src"

const integration = new SdDtfPrimitiveTypeIntegration()

describe("isTypeHintSupported", function () {

    test("supported types; should return true", () => {
        expect(integration.isTypeHintSupported(SdDtfPrimitiveTypeHintName.BOOLEAN)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfPrimitiveTypeHintName.CHAR)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfPrimitiveTypeHintName.COLOR)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfPrimitiveTypeHintName.DATA)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfPrimitiveTypeHintName.DECIMAL)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfPrimitiveTypeHintName.DOUBLE)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfPrimitiveTypeHintName.GUID)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfPrimitiveTypeHintName.IMAGE)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfPrimitiveTypeHintName.INT8)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfPrimitiveTypeHintName.INT16)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfPrimitiveTypeHintName.INT32)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfPrimitiveTypeHintName.INT64)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfPrimitiveTypeHintName.SINGLE)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfPrimitiveTypeHintName.STRING)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfPrimitiveTypeHintName.UINT8)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfPrimitiveTypeHintName.UINT16)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfPrimitiveTypeHintName.UINT32)).toBeTruthy()
        expect(integration.isTypeHintSupported(SdDtfPrimitiveTypeHintName.UINT64)).toBeTruthy()
    })

    test("unsupported type; should return false", () => {
        expect(integration.isTypeHintSupported("foobar")).toBeFalsy()
    })

})
