import {
    enumValues,
    ISdDtfIntegration,
    ISdDtfTypeReader,
    ISdDtfTypeWriter,
    ISdDtfWriteableComponentFactory,
    SdDtfPrimitiveTypeHintName,
} from "@shapediver/sdk.sdtf-core"
import { SdDtfPrimitiveTypeReader } from "./SdDtfPrimitiveTypeReader"
import { SdDtfPrimitiveTypeWriter } from "./SdDtfPrimitiveTypeWriter"

export class SdDtfPrimitiveTypeIntegration implements ISdDtfIntegration {

    isTypeHintSupported (typeHintName: string): boolean {
        return enumValues(SdDtfPrimitiveTypeHintName).includes(typeHintName)
    }

    async init (): Promise<void> {
    }

    getReader (): ISdDtfTypeReader {
        return new SdDtfPrimitiveTypeReader()
    }

    getWriter (factory: ISdDtfWriteableComponentFactory): ISdDtfTypeWriter {
        return new SdDtfPrimitiveTypeWriter(factory)
    }

}
