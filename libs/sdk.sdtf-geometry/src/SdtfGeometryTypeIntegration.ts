import {
    enumValues,
    ISdtfIntegration,
    ISdtfTypeReader,
    ISdtfTypeWriter,
    ISdtfWriteableComponentFactory,
    SdtfGeometryTypeHintName,
} from '@shapediver/sdk.sdtf-core';
import { SdtfGeometryTypeReader } from './SdtfGeometryTypeReader';
import { SdtfGeometryTypeWriter } from './SdtfGeometryTypeWriter';

export class SdtfGeometryTypeIntegration implements ISdtfIntegration {
    isTypeHintSupported(typeHintName: string): boolean {
        return enumValues(SdtfGeometryTypeHintName).includes(typeHintName);
    }

    async init(): Promise<void> {}

    getReader(): ISdtfTypeReader {
        return new SdtfGeometryTypeReader();
    }

    getWriter(factory: ISdtfWriteableComponentFactory): ISdtfTypeWriter {
        return new SdtfGeometryTypeWriter(factory);
    }
}
