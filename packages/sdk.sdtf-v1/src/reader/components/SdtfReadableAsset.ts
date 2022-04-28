import {
    ISdtfReadableAccessor,
    ISdtfReadableAsset,
    ISdtfReadableAttributes,
    ISdtfReadableBuffer,
    ISdtfReadableBufferView,
    ISdtfReadableChunk,
    ISdtfReadableDataItem,
    ISdtfReadableFileInfo,
    ISdtfReadableNode,
    ISdtfReadableTypeHint,
} from "@shapediver/sdk.sdtf-core"
import { SdtfBaseReadableComponent } from "./SdtfBaseReadableComponent"

export class SdtfReadableAsset extends SdtfBaseReadableComponent implements ISdtfReadableAsset {

    accessors: ISdtfReadableAccessor[] = []
    attributes: ISdtfReadableAttributes[] = []
    buffers: ISdtfReadableBuffer[] = []
    bufferViews: ISdtfReadableBufferView[] = []
    chunks: ISdtfReadableChunk[] = []
    items: ISdtfReadableDataItem[] = []
    nodes: ISdtfReadableNode[] = []
    typeHints: ISdtfReadableTypeHint[] = []

    additionalProperties: Record<string, unknown> = {}

    constructor (
        public fileInfo: ISdtfReadableFileInfo,
    ) {
        super()
    }

}
