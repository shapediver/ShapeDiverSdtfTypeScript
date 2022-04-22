import {
    enumValues,
    ISdDtfIntegration,
    ISdDtfTypeReader,
    ISdDtfTypeWriter,
    ISdDtfWriteableComponentFactory,
    SdDtfGrasshopperTypeHintName,
    SdDtfRhinoTypeHintName,
} from "@shapediver/sdk.sdtf-core"
import { SdDtfRhino3dmSingleton } from "./SdDtfRhino3dmSingleton"
import { SdDtfRhino3dmTypeConfig } from "./SdDtfRhino3dmTypeConfig"
import { SdDtfRhino3dmTypeReader } from "./SdDtfRhino3dmTypeReader"
import { SdDtfRhino3dmTypeWriter } from "./SdDtfRhino3dmTypeWriter"

/** Supported compression type - GZIP */
export enum CompressionTypes {
    GZIP = "gzip"
}

/** Partial definition of the integration's config object. */
export type ISdDtfRhino3dmTypeConfig = Partial<SdDtfRhino3dmTypeConfig>

export class SdDtfRhino3dmTypeIntegration implements ISdDtfIntegration {

    private readonly config: SdDtfRhino3dmTypeConfig

    constructor (config?: ISdDtfRhino3dmTypeConfig) {
        this.config = new SdDtfRhino3dmTypeConfig(config)
    }

    isTypeHintSupported (typeHintName: string): boolean {
        return enumValues(SdDtfGrasshopperTypeHintName).includes(typeHintName) ||
            enumValues(SdDtfRhinoTypeHintName).includes(typeHintName)
    }

    async init (): Promise<void> {
        await SdDtfRhino3dmSingleton.init()
    }

    getReader (): ISdDtfTypeReader {
        return new SdDtfRhino3dmTypeReader(this.config)
    }

    getWriter (factory: ISdDtfWriteableComponentFactory): ISdDtfTypeWriter {
        return new SdDtfRhino3dmTypeWriter(this.config, factory)
    }

}
