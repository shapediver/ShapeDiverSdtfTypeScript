import { ISdtfAsset } from "../../structure/components/ISdtfAsset"
import { ISdtfBaseReadableComponent, SdtfReadableBase } from "./ISdtfBaseReadableComponent"
import { ISdtfReadableAccessor } from "./ISdtfReadableAccessor"
import { ISdtfReadableAttributes } from "./ISdtfReadableAttributes"
import { ISdtfReadableBuffer } from "./ISdtfReadableBuffer"
import { ISdtfReadableBufferView } from "./ISdtfReadableBufferView"
import { ISdtfReadableChunk } from "./ISdtfReadableChunk"
import { ISdtfReadableDataItem } from "./ISdtfReadableDataItem"
import { ISdtfReadableFileInfo } from "./ISdtfReadableFileInfo"
import { ISdtfReadableNode } from "./ISdtfReadableNode"
import { ISdtfReadableTypeHint } from "./ISdtfReadableTypeHint"

/** Represents a readable [sdTf](https://github.com/shapediver/sdTF/tree/development/specification/1.0) (Standard Data Transfer Format). */
export interface ISdtfReadableAsset extends ISdtfBaseReadableComponent,
    Omit<SdtfReadableBase<ISdtfAsset>, "fileInfo"> {

    /** Iterator for all accessors referenced by data items. */
    accessors: ISdtfReadableAccessor[]

    /** Iterator for all attributes referenced by chunks, nodes or data items. */
    attributes: ISdtfReadableAttributes[]

    /** Iterator for all buffers referenced by buffer views. */
    buffers: ISdtfReadableBuffer[]

    /** Iterator for all buffer views referenced by accessors. */
    bufferViews: ISdtfReadableBufferView[]

    /** Chunks are the entry points into the hierarchy of a sdTF. */
    chunks: ISdtfReadableChunk[]

    /** Iterator for all data items referenced by nodes. */
    items: ISdtfReadableDataItem[]

    /** Iterator for all nodes part of the hierarchy. */
    nodes: ISdtfReadableNode[]

    /** Iterator for all type hints referenced by chunks, nodes, or data items. */
    typeHints: ISdtfReadableTypeHint[]

    /** Meta information about this asset. */
    fileInfo: ISdtfReadableFileInfo

}
