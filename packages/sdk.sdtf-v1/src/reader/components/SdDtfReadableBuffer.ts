import { ISdDtfReadableBuffer, SdDtfError } from "@shapediver/sdk.sdtf-core"
import { ISdDtfBufferCache } from "../../buffer_cache/ISdDtfBufferCache"
import { SdDtfReadableBaseComponent } from "./SdDtfReadableBaseComponent"

export class SdDtfReadableBuffer extends SdDtfReadableBaseComponent implements ISdDtfReadableBuffer {

    uri?: string

    additionalProperties: Record<string, unknown> = {}

    constructor (
        public byteLength: number,
        private bufferCache: ISdDtfBufferCache,
    ) {
        super()
    }

    /** @override */
    toDataObject (): Record<string, unknown> {
        const dataObject = super.toDataObject()
        delete dataObject.bufferCache
        return dataObject
    }

    async getContent (offset: number, length: number): Promise<DataView> {
        if (offset + length > this.byteLength)
            throw new SdDtfError("Unable to get content of buffer: Requested content is out of range.")

        return this.bufferCache.getBuffer(this.uri, offset, length)
    }

}
