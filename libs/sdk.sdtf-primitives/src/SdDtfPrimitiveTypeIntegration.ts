import { ISdDtfIntegration, ISdDtfReader } from "@shapediver/sdk.sdtf-core"
import { SdDtfPrimitiveTypeReader } from "./SdDtfPrimitiveTypeReader"

export class SdDtfPrimitiveTypeIntegration implements ISdDtfIntegration {

    getReader (): ISdDtfReader {
        return new SdDtfPrimitiveTypeReader()
    }

}
