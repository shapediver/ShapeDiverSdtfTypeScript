import { SdDtfPrimitiveTypeHintName } from "@shapediver/sdk.sdtf-core"
import { SdDtfPrimitiveTypeIntegration } from "../../src"

const integration = new SdDtfPrimitiveTypeIntegration()

describe("isTypeHintSupported", function () {

    test.each([
        SdDtfPrimitiveTypeHintName.BOOLEAN,
        SdDtfPrimitiveTypeHintName.CHAR,
        SdDtfPrimitiveTypeHintName.COLOR,
        SdDtfPrimitiveTypeHintName.DATA,
        SdDtfPrimitiveTypeHintName.DECIMAL,
        SdDtfPrimitiveTypeHintName.DOUBLE,
        SdDtfPrimitiveTypeHintName.GUID,
        SdDtfPrimitiveTypeHintName.IMAGE,
        SdDtfPrimitiveTypeHintName.INT8,
        SdDtfPrimitiveTypeHintName.INT16,
        SdDtfPrimitiveTypeHintName.INT32,
        SdDtfPrimitiveTypeHintName.INT64,
        SdDtfPrimitiveTypeHintName.SINGLE,
        SdDtfPrimitiveTypeHintName.STRING,
        SdDtfPrimitiveTypeHintName.UINT8,
        SdDtfPrimitiveTypeHintName.UINT16,
        SdDtfPrimitiveTypeHintName.UINT32,
        SdDtfPrimitiveTypeHintName.UINT64,
    ])("supported type %s; should return true", (type) => {
        expect(integration.isTypeHintSupported(type)).toBeTruthy()
    })

    test("unsupported type; should return false", () => {
        expect(integration.isTypeHintSupported("foobar")).toBeFalsy()
    })

})
