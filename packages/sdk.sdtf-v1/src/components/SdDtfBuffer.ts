import { ISdDtfBuffer, SdDtfError } from "@shapediver/sdk.sdtf-core"
import { ISdDtfBufferCache } from "../buffer_cache/ISdDtfBufferCache"

export class SdDtfBuffer implements ISdDtfBuffer {

    componentId: number = -1
    uri?: string

    [custom: string]: unknown

    constructor (
        public byteLength: number,
        private bufferCache: ISdDtfBufferCache,
    ) {
    }

    toJson (): Record<string, unknown> {
        const json: Record<string, unknown> = { ...this }
        delete json.componentId
        delete json.bufferCache
        return json
    }

    async getContent (offset: number, length: number): Promise<DataView> {
        if (offset + length > this.byteLength)
            throw new SdDtfError("Unable to get content of buffer: Requested content is out of range.")

        return this.bufferCache.getBuffer(this.uri, offset, length)
    }

}
