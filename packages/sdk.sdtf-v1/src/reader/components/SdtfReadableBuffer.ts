import { ISdtfReadableBuffer, SdtfError } from '@shapediver/sdk.sdtf-core';
import { ISdtfBufferCache } from '../../buffer_cache/ISdtfBufferCache';
import { SdtfBaseReadableComponent } from './SdtfBaseReadableComponent';

export class SdtfReadableBuffer extends SdtfBaseReadableComponent implements ISdtfReadableBuffer {
    uri?: string;

    additionalProperties: Record<string, unknown> = {};

    constructor(
        public byteLength: number,
        private bufferCache: ISdtfBufferCache
    ) {
        super();
    }

    /** @override */
    toDataObject(): Record<string, unknown> {
        const dataObject = super.toDataObject();
        delete dataObject.bufferCache;
        return dataObject;
    }

    async getContent(offset: number, length: number): Promise<DataView> {
        if (offset + length > this.byteLength)
            throw new SdtfError(
                'Unable to get content of buffer: Requested content is out of range.'
            );

        return this.bufferCache.getBuffer(this.uri, offset, length);
    }
}
