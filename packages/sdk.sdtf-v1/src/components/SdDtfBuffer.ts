import { ISdDtfBuffer } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfBuffer"

export class SdDtfBuffer implements ISdDtfBuffer {

    uri?: string
    [custom: string]: unknown

    constructor (
        public byteLength: number,
    ) {
    }

}
