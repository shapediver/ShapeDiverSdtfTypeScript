import { ISdDtfBuffer } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfBuffer"
import { ISdDtfBufferView } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfBufferView"

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

}
