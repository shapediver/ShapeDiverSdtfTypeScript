import { ISdDtfReadableBuffer, ISdDtfReadableBufferView } from "@shapediver/sdk.sdtf-core"
import { SdDtfReadableBaseComponent } from "./SdDtfReadableBaseComponent"

export class SdDtfReadableBufferView extends SdDtfReadableBaseComponent implements ISdDtfReadableBufferView {

    contentEncoding?: string
    name?: string

    additionalProperties: Record<string, unknown> = {}

    constructor (
        public buffer: ISdDtfReadableBuffer,
        public byteLength: number,
        public byteOffset: number,
        public contentType: string,
    ) {
        super()
    }

    async getContent (): Promise<DataView> {
        return this.buffer.getContent(this.byteOffset, this.byteLength)
    }

}
