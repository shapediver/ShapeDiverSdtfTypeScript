import { ISdtfReadableTypeHint, SdtfTypeHintName } from "@shapediver/sdk.sdtf-core"
import { SdtfBaseReadableComponent } from "./SdtfBaseReadableComponent"

export class SdtfReadableTypeHint extends SdtfBaseReadableComponent implements ISdtfReadableTypeHint {

    additionalProperties: Record<string, unknown> = {}

    constructor (
        public name: SdtfTypeHintName | string,
    ) {
        super()
    }

}
