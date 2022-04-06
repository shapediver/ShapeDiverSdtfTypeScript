import { ISdDtfReadableFileInfo } from "@shapediver/sdk.sdtf-core"
import { SdDtfBaseReadableComponent } from "./SdDtfBaseReadableComponent"

export class SdDtfReadableFileInfo extends SdDtfBaseReadableComponent implements ISdDtfReadableFileInfo {

    copyright?: string
    generator?: string

    additionalProperties: Record<string, unknown> = {}

    constructor (
        public version: string,
    ) {
        super()
    }

}
