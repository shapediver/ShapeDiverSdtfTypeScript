import { ISdDtfTypeHint, SdDtfTypeHintName } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfTypeHint"

export class SdDtfTypeHint implements ISdDtfTypeHint {

    [custom: string]: unknown

    constructor (
        public name: SdDtfTypeHintName | string,
    ) {
    }

}
