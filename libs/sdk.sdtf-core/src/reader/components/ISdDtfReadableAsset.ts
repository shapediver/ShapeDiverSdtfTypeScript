import { ISdDtfAsset } from "../../structure/components/ISdDtfAsset"
import { ISdDtfReadableAccessor } from "./ISdDtfReadableAccessor"
import { ISdDtfReadableAttributes } from "./ISdDtfReadableAttributes"
import { ISdDtfBaseReadableComponent, SdDtfReadableBase } from "./ISdDtfBaseReadableComponent"
import { ISdDtfReadableBuffer } from "./ISdDtfReadableBuffer"
import { ISdDtfReadableBufferView } from "./ISdDtfReadableBufferView"
import { ISdDtfReadableChunk } from "./ISdDtfReadableChunk"
import { ISdDtfReadableDataItem } from "./ISdDtfReadableDataItem"
import { ISdDtfReadableFileInfo } from "./ISdDtfReadableFileInfo"
import { ISdDtfReadableNode } from "./ISdDtfReadableNode"
import { ISdDtfReadableTypeHint } from "./ISdDtfReadableTypeHint"

/** Represents a readable [sdTf](https://github.com/shapediver/sdTF/tree/development/specification/1.0) (Standard Data Transfer Format). */
export interface ISdDtfReadableAsset extends ISdDtfBaseReadableComponent,
    Omit<SdDtfReadableBase<ISdDtfAsset>, "fileInfo"> {

    /** Iterator for all accessors referenced by data items. */
    accessors: ISdDtfReadableAccessor[]

    /** Iterator for all attributes referenced by chunks, nodes or data items. */
    attributes: ISdDtfReadableAttributes[]

    /** Iterator for all buffers referenced by buffer views. */
    buffers: ISdDtfReadableBuffer[]

    /** Iterator for all buffer views referenced by accessors. */
    bufferViews: ISdDtfReadableBufferView[]

    /** Chunks are the entry points into the hierarchy of a sdTF. */
    chunks: ISdDtfReadableChunk[]

    /** Iterator for all data items referenced by nodes. */
    items: ISdDtfReadableDataItem[]

    /** Iterator for all nodes part of the hierarchy. */
    nodes: ISdDtfReadableNode[]

    /** Iterator for all type hints referenced by chunks, nodes, or data items. */
    typeHints: ISdDtfReadableTypeHint[]

    /** Meta information about this asset. */
    fileInfo: ISdDtfReadableFileInfo

}
