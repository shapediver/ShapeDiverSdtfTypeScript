import { ISdDtfTypeHint } from "../../structure/components/ISdDtfTypeHint"
import { SdDtfTypeHintName } from "../../structure/SdDtfShapeDiverTypeHints"
import { ISdDtfBaseWriteableComponent, SdDtfWriteableBase } from "./ISdDtfBaseWriteableComponent"

/** Type hints are used to add information about the type of data items found below a specific node in the tree. */
export interface ISdDtfWriteableTypeHint extends ISdDtfBaseWriteableComponent,
    Omit<SdDtfWriteableBase<ISdDtfTypeHint>, "name"> {

    /** Name of the type hint. */
    name?: SdDtfTypeHintName | string

    /** Additional custom properties are allowed. */
    additionalProperties: Record<string, unknown>

}
