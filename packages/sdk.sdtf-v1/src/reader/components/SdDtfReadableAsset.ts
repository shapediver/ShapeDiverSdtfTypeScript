import {
    ISdDtfReadableAccessor,
    ISdDtfReadableAsset,
    ISdDtfReadableAttributes,
    ISdDtfReadableBuffer,
    ISdDtfReadableBufferView,
    ISdDtfReadableChunk,
    ISdDtfReadableDataItem,
    ISdDtfReadableFileInfo,
    ISdDtfReadableNode,
    ISdDtfReadableTypeHint,
} from "@shapediver/sdk.sdtf-core"
import { SdDtfReadableBaseComponent } from "./SdDtfReadableBaseComponent"

export class SdDtfReadableAsset extends SdDtfReadableBaseComponent implements ISdDtfReadableAsset {

    accessors: ISdDtfReadableAccessor[] = []
    attributes: ISdDtfReadableAttributes[] = []
    buffers: ISdDtfReadableBuffer[] = []
    bufferViews: ISdDtfReadableBufferView[] = []
    chunks: ISdDtfReadableChunk[] = []
    items: ISdDtfReadableDataItem[] = []
    nodes: ISdDtfReadableNode[] = []
    typeHints: ISdDtfReadableTypeHint[] = []

    additionalProperties: Record<string, unknown> = {}

    constructor (
        public fileInfo: ISdDtfReadableFileInfo,
    ) {
        super()
    }

}
