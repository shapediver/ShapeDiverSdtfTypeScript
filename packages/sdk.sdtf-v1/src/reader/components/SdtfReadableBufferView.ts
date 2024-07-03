import { ISdtfReadableBuffer, ISdtfReadableBufferView } from '@shapediver/sdk.sdtf-core';
import { SdtfBaseReadableComponent } from './SdtfBaseReadableComponent';

export class SdtfReadableBufferView
    extends SdtfBaseReadableComponent
    implements ISdtfReadableBufferView
{
    contentEncoding?: string;
    name?: string;

    additionalProperties: Record<string, unknown> = {};

    constructor(
        public buffer: ISdtfReadableBuffer,
        public byteLength: number,
        public byteOffset: number,
        public contentType: string
    ) {
        super();
    }

    async getContent(): Promise<DataView> {
        return this.buffer.getContent(this.byteOffset, this.byteLength);
    }
}
