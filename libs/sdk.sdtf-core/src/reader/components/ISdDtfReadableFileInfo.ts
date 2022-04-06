import { ISdDtfFileInfo } from "../../structure/components/ISdDtfFileInfo"
import { ISdDtfBaseReadableComponent, SdDtfReadableBase } from "./ISdDtfBaseReadableComponent"

/** Representation of a [sdTF file info](https://github.com/shapediver/sdTF/tree/development/specification/1.0#fileinfo). */
export interface ISdDtfReadableFileInfo extends ISdDtfBaseReadableComponent,
    SdDtfReadableBase<ISdDtfFileInfo> {
}
