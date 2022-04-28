import { ISdtfWriteableAsset, ISdtfWriteableChunk, ISdtfWriteableFileInfo } from "@shapediver/sdk.sdtf-core"
import { SdtfBaseWriteableComponent } from "./SdtfBaseWriteableComponent"

export class SdtfWriteableAsset extends SdtfBaseWriteableComponent implements ISdtfWriteableAsset {

    chunks: ISdtfWriteableChunk[] = []

    additionalProperties: Record<string, unknown> = {}

    constructor (
        public readonly fileInfo: ISdtfWriteableFileInfo,
    ) {
        super()
    }

}
