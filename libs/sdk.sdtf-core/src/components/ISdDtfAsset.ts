import { ISdDtfAccessor } from "./ISdDtfAccessor"
import { ISdDtfAttributes } from "./ISdDtfAttributes"
import { ISdDtfBaseComponent } from "./ISdDtfBaseComponent"
import { ISdDtfBuffer } from "./ISdDtfBuffer"
import { ISdDtfBufferView } from "./ISdDtfBufferView"
import { ISdDtfChunk } from "./ISdDtfChunk"
import { ISdDtfDataItem } from "./ISdDtfDataItem"
import { ISdDtfFileInfo } from "./ISdDtfFileInfo"
import { ISdDtfNode } from "./ISdDtfNode"
import { ISdDtfTypeHint } from "./ISdDtfTypeHint"

/** A ShapeDiver Data Transfer Format (sdTf) asset. */
export interface ISdDtfAsset extends ISdDtfBaseComponent {

    /** Iterator for all accessors referenced by data items. */
    accessors: ISdDtfAccessor[]

    /** Iterator for all attributes referenced by chunks, nodes or data items. */
    attributes: ISdDtfAttributes[]

    /** Iterator for all buffers referenced by buffer views. */
    buffers: ISdDtfBuffer[]

    /** Iterator for all buffer views referenced by accessors. */
    bufferViews: ISdDtfBufferView[]

    /** Chunks are the entry points into the hierarchy of a sdTF. */
    chunks: ISdDtfChunk[]

    /** Iterator for all data items referenced by nodes. */
    items: ISdDtfDataItem[]

    /** Iterator for all nodes part of the hierarchy. */
    nodes: ISdDtfNode[]

    /** Iterator for all type hints referenced by chunks, nodes, or data items. */
    typeHints: ISdDtfTypeHint[]

    /** Meta information about this asset. */
    fileInfo?: ISdDtfFileInfo

    /** Additional properties are allowed. */
    [custom: string]: unknown

}
