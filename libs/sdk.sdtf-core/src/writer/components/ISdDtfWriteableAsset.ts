import { ISdDtfAsset } from "../../structure/components/ISdDtfAsset"
import { ISdDtfBaseWriteableComponent, SdDtfWriteableBase } from "./ISdDtfBaseWriteableComponent"
import { ISdDtfWriteableChunk } from "./ISdDtfWriteableChunk"
import { ISdDtfWriteableFileInfo } from "./ISdDtfWriteableFileInfo"

/** Represents a writeable [sdTf](https://github.com/shapediver/sdTF/tree/development/specification/1.0) (Standard Data Transfer Format). */
export interface ISdDtfWriteableAsset extends ISdDtfBaseWriteableComponent,
    Omit<SdDtfWriteableBase<ISdDtfAsset>, "fileInfo"> {

    /** Chunks are the entry points into the hierarchy of a sdTF. */
    chunks: ISdDtfWriteableChunk[]

    /** Meta information about this asset. */
    readonly fileInfo: ISdDtfWriteableFileInfo

    /** Additional custom properties are allowed. */
    additionalProperties: Record<string, unknown>

}
