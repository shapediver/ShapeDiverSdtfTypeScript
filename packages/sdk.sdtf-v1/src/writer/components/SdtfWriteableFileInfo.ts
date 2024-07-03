import { ISdtfWriteableFileInfo } from '@shapediver/sdk.sdtf-core';
import { SdtfBaseWriteableComponent } from './SdtfBaseWriteableComponent';

export class SdtfWriteableFileInfo
    extends SdtfBaseWriteableComponent
    implements ISdtfWriteableFileInfo
{
    copyright?: string;
    generator?: string;

    additionalProperties: Record<string, unknown> = {};

    constructor(public readonly version: string) {
        super();
    }

    static clone(original: ISdtfWriteableFileInfo): ISdtfWriteableFileInfo {
        const clone = new SdtfWriteableFileInfo(original.version);

        clone.copyright = original.copyright;
        clone.generator = original.generator;

        clone.additionalProperties = { ...original.additionalProperties };

        return clone;
    }
}
