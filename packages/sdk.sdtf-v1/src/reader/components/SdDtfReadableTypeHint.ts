import { ISdDtfReadableTypeHint, SdDtfTypeHintName } from "@shapediver/sdk.sdtf-core"
import { SdDtfBaseReadableComponent } from "./SdDtfBaseReadableComponent"

export class SdDtfReadableTypeHint extends SdDtfBaseReadableComponent implements ISdDtfReadableTypeHint {

    additionalProperties: Record<string, unknown> = {}

    constructor (
        public name: SdDtfTypeHintName | string,
    ) {
        super()
    }

}
