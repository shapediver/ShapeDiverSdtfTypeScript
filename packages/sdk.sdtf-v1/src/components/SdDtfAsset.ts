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
    SdDtfError,
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

    toJson (): Record<string, unknown> {
        // This property is required but has been made optional for accessibility reasons
        if (!this.fileInfo) throw new SdDtfError("Incomplete asset: Missing property 'fileInfo'.")

        return this.fileInfo.toJson()
    }

}
