import { ISdtfWriteableFileInfo } from "@shapediver/sdk.sdtf-core"
import { SdtfBaseWriteableComponent } from "./SdtfBaseWriteableComponent"

export class SdtfWriteableFileInfo extends SdtfBaseWriteableComponent implements ISdtfWriteableFileInfo {

    copyright?: string
    generator?: string

    additionalProperties: Record<string, unknown> = {}

    constructor (
        public readonly version: string,
    ) {
        super()
    }

}
