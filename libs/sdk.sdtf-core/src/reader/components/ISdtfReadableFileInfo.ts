import { ISdtfFileInfo } from "../../structure/components/ISdtfFileInfo"
import { ISdtfBaseReadableComponent, SdtfReadableBase } from "./ISdtfBaseReadableComponent"

/** Representation of a [sdTF file info](https://github.com/shapediver/sdTF/tree/development/specification/1.0#fileinfo). */
export interface ISdtfReadableFileInfo extends ISdtfBaseReadableComponent,
    SdtfReadableBase<ISdtfFileInfo> {
}
