import { ISdDtfWriteableFileInfo } from "@shapediver/sdk.sdtf-core"
import { SdDtfBaseWriteableComponent } from "./SdDtfBaseWriteableComponent"

export class SdDtfWriteableFileInfo extends SdDtfBaseWriteableComponent implements ISdDtfWriteableFileInfo {

    copyright?: string
    generator?: string

    additionalProperties: Record<string, unknown> = {}

    constructor (
        public readonly version: string,
    ) {
        super()
    }

}
