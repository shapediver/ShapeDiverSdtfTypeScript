import { enumValues, ISdDtfIntegration, ISdDtfTypeReader, SdDtfPrimitiveTypeHintName } from "@shapediver/sdk.sdtf-core"
import { SdDtfPrimitiveTypeReader } from "./SdDtfPrimitiveTypeReader"

export class SdDtfPrimitiveTypeIntegration implements ISdDtfIntegration {

    isTypeHintSupported (typeHintName: string): boolean {
        return enumValues(SdDtfPrimitiveTypeHintName).includes(typeHintName)
    }

    getReader (): ISdDtfTypeReader {
        return new SdDtfPrimitiveTypeReader()
    }

}
