import {
    ISdtfWriteableAsset,
    ISdtfWriteableChunk,
    ISdtfWriteableFileInfo,
} from '@shapediver/sdk.sdtf-core';
import { SdtfBaseWriteableComponent } from './SdtfBaseWriteableComponent';
import { SdtfWriteableChunk } from './SdtfWriteableChunk';
import { SdtfWriteableFileInfo } from './SdtfWriteableFileInfo';

export class SdtfWriteableAsset extends SdtfBaseWriteableComponent implements ISdtfWriteableAsset {
    chunks: ISdtfWriteableChunk[] = [];

    additionalProperties: Record<string, unknown> = {};

    constructor(public readonly fileInfo: ISdtfWriteableFileInfo) {
        super();
    }

    static clone(original: ISdtfWriteableAsset): ISdtfWriteableAsset {
        const fileInfoClone = SdtfWriteableFileInfo.clone(original.fileInfo);
        const clone = new SdtfWriteableAsset(fileInfoClone);

        clone.chunks = original.chunks.map((c) => SdtfWriteableChunk.clone(c));

        clone.additionalProperties = { ...original.additionalProperties };

        return clone;
    }
}
