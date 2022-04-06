import { ISdDtfTypeHint } from "../../structure/components/ISdDtfTypeHint"
import { SdDtfTypeHintName } from "../../structure/SdDtfShapeDiverTypeHints"
import { ISdDtfReadableBaseComponent, SdDtfReadableBase } from "./ISdDtfReadableBaseComponent"

/** Representation of a [sdTF type hint](https://github.com/shapediver/sdTF/tree/development/specification/1.0#type-hints). */
export interface ISdDtfReadableTypeHint extends ISdDtfReadableBaseComponent,
    SdDtfReadableBase<ISdDtfTypeHint> {

    /** Name of the type hint. */
    name: SdDtfTypeHintName | string

}
