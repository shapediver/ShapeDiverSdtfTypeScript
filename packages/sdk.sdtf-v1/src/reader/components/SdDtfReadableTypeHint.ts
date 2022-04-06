import { ISdDtfReadableTypeHint, SdDtfTypeHintName } from "@shapediver/sdk.sdtf-core"
import { SdDtfReadableBaseComponent } from "./SdDtfReadableBaseComponent"

export class SdDtfReadableTypeHint extends SdDtfReadableBaseComponent implements ISdDtfReadableTypeHint {

    additionalProperties: Record<string, unknown> = {}

    constructor (
        public name: SdDtfTypeHintName | string,
    ) {
        super()
    }

}
