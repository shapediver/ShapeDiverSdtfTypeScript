import { ISdDtfFileInfo } from "../../structure/components/ISdDtfFileInfo"
import { ISdDtfReadableBaseComponent, SdDtfReadableBase } from "./ISdDtfReadableBaseComponent"

/** Representation of a [sdTF file info](https://github.com/shapediver/sdTF/tree/development/specification/1.0#fileinfo). */
export interface ISdDtfReadableFileInfo extends ISdDtfReadableBaseComponent,
    SdDtfReadableBase<ISdDtfFileInfo> {
}
