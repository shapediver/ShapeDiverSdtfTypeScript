import {
    enumValues,
    ISdtfIntegration,
    ISdtfTypeReader,
    ISdtfTypeWriter,
    ISdtfWriteableComponentFactory,
    SdtfPrimitiveTypeHintName,
} from "@shapediver/sdk.sdtf-core"
import { SdtfPrimitiveTypeReader } from "./SdtfPrimitiveTypeReader"
import { SdtfPrimitiveTypeWriter } from "./SdtfPrimitiveTypeWriter"

export class SdtfPrimitiveTypeIntegration implements ISdtfIntegration {

    isTypeHintSupported (typeHintName: string): boolean {
        return enumValues(SdtfPrimitiveTypeHintName).includes(typeHintName)
    }

    async init (): Promise<void> {
    }

    getReader (): ISdtfTypeReader {
        return new SdtfPrimitiveTypeReader()
    }

    getWriter (factory: ISdtfWriteableComponentFactory): ISdtfTypeWriter {
        return new SdtfPrimitiveTypeWriter(factory)
    }

}
