import { ISdDtfTypeHint, SdDtfTypeHintName } from "@shapediver/sdk.sdtf-core"

export class SdDtfTypeHint implements ISdDtfTypeHint {

    [custom: string]: unknown

    constructor (
        public name: SdDtfTypeHintName | string,
    ) {
    }

}
