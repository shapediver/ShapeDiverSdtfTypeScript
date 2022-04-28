import { ISdtfAsset } from "../../structure/components/ISdtfAsset"
import { ISdtfBaseWriteableComponent, SdtfWriteableBase } from "./ISdtfBaseWriteableComponent"
import { ISdtfWriteableChunk } from "./ISdtfWriteableChunk"
import { ISdtfWriteableFileInfo } from "./ISdtfWriteableFileInfo"

/** Represents a writeable [sdTf](https://github.com/shapediver/sdTF/tree/development/specification/1.0) (Standard Data Transfer Format). */
export interface ISdtfWriteableAsset extends ISdtfBaseWriteableComponent,
    Omit<SdtfWriteableBase<ISdtfAsset>, "fileInfo"> {

    /** Chunks are the entry points into the hierarchy of a sdTF. */
    chunks: ISdtfWriteableChunk[]

    /** Meta information about this asset. */
    readonly fileInfo: ISdtfWriteableFileInfo

    /** Additional custom properties are allowed. */
    additionalProperties: Record<string, unknown>

}
