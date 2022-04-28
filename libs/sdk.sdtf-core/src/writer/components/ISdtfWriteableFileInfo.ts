import { ISdtfFileInfo } from "../../structure/components/ISdtfFileInfo"
import { ISdtfBaseWriteableComponent, SdtfWriteableBase } from "./ISdtfBaseWriteableComponent"

/** Representation of a [sdTF file info](https://github.com/shapediver/sdTF/tree/development/specification/1.0#fileinfo). */
export interface ISdtfWriteableFileInfo extends ISdtfBaseWriteableComponent,
    SdtfWriteableBase<ISdtfFileInfo> {

    /** The version of this sdTF asset. */
    readonly version: string

    /** Additional custom properties are allowed. */
    additionalProperties: Record<string, unknown>

}
