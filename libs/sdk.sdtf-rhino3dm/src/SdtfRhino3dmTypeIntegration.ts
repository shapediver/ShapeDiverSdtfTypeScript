import {
    enumValues,
    ISdtfIntegration,
    ISdtfTypeReader,
    ISdtfTypeWriter,
    ISdtfWriteableComponentFactory,
    SdtfGrasshopperTypeHintName,
    SdtfRhinoTypeHintName,
} from '@shapediver/sdk.sdtf-core';
import { SdtfRhino3dmSingleton } from './SdtfRhino3dmSingleton';
import { SdtfRhino3dmTypeConfig } from './SdtfRhino3dmTypeConfig';
import { SdtfRhino3dmTypeReader } from './SdtfRhino3dmTypeReader';
import { SdtfRhino3dmTypeWriter } from './SdtfRhino3dmTypeWriter';

/** Supported compression type - GZIP */
export enum CompressionTypes {
    GZIP = 'gzip',
}

/** Partial definition of the integration's config object. */
export type ISdtfRhino3dmTypeConfig = Partial<SdtfRhino3dmTypeConfig>;

export class SdtfRhino3dmTypeIntegration implements ISdtfIntegration {
    private readonly config: SdtfRhino3dmTypeConfig;

    constructor(config?: ISdtfRhino3dmTypeConfig) {
        this.config = new SdtfRhino3dmTypeConfig(config);
    }

    isTypeHintSupported(typeHintName: string): boolean {
        return (
            enumValues(SdtfGrasshopperTypeHintName).includes(typeHintName) ||
            enumValues(SdtfRhinoTypeHintName).includes(typeHintName)
        );
    }

    async init(): Promise<void> {
        await SdtfRhino3dmSingleton.init();
    }

    getReader(): ISdtfTypeReader {
        return new SdtfRhino3dmTypeReader(this.config);
    }

    getWriter(factory: ISdtfWriteableComponentFactory): ISdtfTypeWriter {
        return new SdtfRhino3dmTypeWriter(this.config, factory);
    }
}
