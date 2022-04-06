import { ISdDtfFileInfo } from "../../structure/components/ISdDtfFileInfo"
import { ISdDtfBaseWriteableComponent, SdDtfWriteableBase } from "./ISdDtfBaseWriteableComponent"

/** Representation of a [sdTF file info](https://github.com/shapediver/sdTF/tree/development/specification/1.0#fileinfo). */
export interface ISdDtfWriteableFileInfo extends ISdDtfBaseWriteableComponent,
    SdDtfWriteableBase<ISdDtfFileInfo> {

    /** The version of this sdTF asset. */
    readonly version: string

    /** Additional custom properties are allowed. */
    additionalProperties: Record<string, unknown>

}
