import { ISdDtfBuffer, ISdDtfBufferView } from "@shapediver/sdk.sdtf-core"

export class SdDtfBufferView implements ISdDtfBufferView {

    contentEncoding?: string
    name?: string

    [custom: string]: unknown

    constructor (
        public buffer: ISdDtfBuffer,
        public byteLength: number,
        public byteOffset: number,
        public contentType: string,
    ) {
    }

    async getContent (): Promise<DataView> {
        return this.buffer.getContent(this.byteOffset, this.byteLength)
    }

}
