import { ISdtfTypeHint } from "../../structure/components/ISdtfTypeHint"
import { SdtfTypeHintName } from "../../structure/SdtfShapeDiverTypeHints"
import { ISdtfBaseWriteableComponent, SdtfWriteableBase } from "./ISdtfBaseWriteableComponent"

/** Type hints are used to add information about the type of data items found below a specific node in the tree. */
export interface ISdtfWriteableTypeHint extends ISdtfBaseWriteableComponent,
    Omit<SdtfWriteableBase<ISdtfTypeHint>, "name"> {

    /** Name of the type hint. */
    name?: SdtfTypeHintName | string

    /** Additional custom properties are allowed. */
    additionalProperties: Record<string, unknown>

}
