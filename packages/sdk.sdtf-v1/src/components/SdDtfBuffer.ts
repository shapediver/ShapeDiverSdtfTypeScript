import { ISdDtfBuffer, SdDtfError } from "@shapediver/sdk.sdtf-core"
import { ISdDtfBufferCache } from "../buffer_cache/ISdDtfBufferCache"

export class SdDtfBuffer implements ISdDtfBuffer {

    uri?: string

    [custom: string]: unknown

    constructor (
        public byteLength: number,
        private bufferCache: ISdDtfBufferCache,
    ) {
    }

    async getContent (offset: number, length: number): Promise<DataView> {
        if (offset + length > this.byteLength)
            throw new SdDtfError("Unable to get content of buffer: Requested content is out of range.")

        return this.bufferCache.getBuffer(this.uri, offset, length)
    }

}
