import {
    ISdDtfAccessor,
    ISdDtfAsset,
    ISdDtfAttributes,
    ISdDtfBuffer,
    ISdDtfBufferView,
    ISdDtfChunk,
    ISdDtfDataItem,
    ISdDtfFileInfo,
    ISdDtfNode,
    ISdDtfTypeHint,
} from "@shapediver/sdk.sdtf-core"

export class SdDtfAsset implements ISdDtfAsset {

    fileInfo?: ISdDtfFileInfo

    [custom: string]: unknown

    accessors: ISdDtfAccessor[] = []
    attributes: ISdDtfAttributes[] = []
    buffers: ISdDtfBuffer[] = []
    bufferViews: ISdDtfBufferView[] = []
    chunks: ISdDtfChunk[] = []
    items: ISdDtfDataItem[] = []
    nodes: ISdDtfNode[] = []
    typeHints: ISdDtfTypeHint[] = []

}
