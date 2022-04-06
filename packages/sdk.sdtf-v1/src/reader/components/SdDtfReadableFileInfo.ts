import { ISdDtfReadableFileInfo } from "@shapediver/sdk.sdtf-core"
import { SdDtfReadableBaseComponent } from "./SdDtfReadableBaseComponent"

export class SdDtfReadableFileInfo extends SdDtfReadableBaseComponent implements ISdDtfReadableFileInfo {

    copyright?: string
    generator?: string

    additionalProperties: Record<string, unknown> = {}

    constructor (
        public version: string,
    ) {
        super()
    }

}
