import { ISdtfReadableFileInfo } from "@shapediver/sdk.sdtf-core"
import { SdtfBaseReadableComponent } from "./SdtfBaseReadableComponent"

export class SdtfReadableFileInfo extends SdtfBaseReadableComponent implements ISdtfReadableFileInfo {

    copyright?: string
    generator?: string

    additionalProperties: Record<string, unknown> = {}

    constructor (
        public version: string,
    ) {
        super()
    }

}
