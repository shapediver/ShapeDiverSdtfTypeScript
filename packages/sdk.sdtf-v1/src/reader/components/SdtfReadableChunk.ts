import { ISdtfReadableChunk } from '@shapediver/sdk.sdtf-core';
import { SdtfReadableNode } from './SdtfReadableNode';

export class SdtfReadableChunk extends SdtfReadableNode implements ISdtfReadableChunk {
    name: string;

    constructor(name: string) {
        super();
        this.name = name;
    }
}
