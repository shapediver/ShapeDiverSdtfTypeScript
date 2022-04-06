import { ISdDtfWriteableAsset, ISdDtfWriteableChunk, ISdDtfWriteableFileInfo } from "@shapediver/sdk.sdtf-core"
import { SdDtfBaseWriteableComponent } from "./SdDtfBaseWriteableComponent"

export class SdDtfWriteableAsset extends SdDtfBaseWriteableComponent implements ISdDtfWriteableAsset {

    chunks: ISdDtfWriteableChunk[] = []

    additionalProperties: Record<string, unknown> = {}

    constructor (
        public readonly fileInfo: ISdDtfWriteableFileInfo,
    ) {
        super()
    }

}
