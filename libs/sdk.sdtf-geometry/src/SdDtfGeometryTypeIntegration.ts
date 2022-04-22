import {
    enumValues,
    ISdDtfIntegration,
    ISdDtfTypeReader,
    ISdDtfTypeWriter,
    ISdDtfWriteableComponentFactory,
    SdDtfGeometryTypeHintName,
} from "@shapediver/sdk.sdtf-core"
import { SdDtfGeometryTypeReader } from "./SdDtfGeometryTypeReader"
import { SdDtfGeometryTypeWriter } from "./SdDtfGeometryTypeWriter"

export class SdDtfGeometryTypeIntegration implements ISdDtfIntegration {

    isTypeHintSupported (typeHintName: string): boolean {
        return enumValues(SdDtfGeometryTypeHintName).includes(typeHintName)
    }

    async init (): Promise<void> {
    }

    getReader (): ISdDtfTypeReader {
        return new SdDtfGeometryTypeReader()
    }

    getWriter (factory: ISdDtfWriteableComponentFactory): ISdDtfTypeWriter {
        return new SdDtfGeometryTypeWriter(factory)
    }

}
