import { ISdDtfAccessor } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfAccessor"
import { ISdDtfAsset } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfAsset"
import { ISdDtfAttributes } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfAttributes"
import { ISdDtfBuffer } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfBuffer"
import { ISdDtfBufferView } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfBufferView"
import { ISdDtfChunk } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfChunk"
import { ISdDtfDataItem } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfDataItem"
import { ISdDtfFileInfo } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfFileInfo"
import { ISdDtfNode } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfNode"
import { ISdDtfTypeHint } from "@shapediver/sdk.sdtf-core/dist/components/ISdDtfTypeHint"

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
