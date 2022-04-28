import { ISdtfDataItem } from "../../structure/components/ISdtfDataItem"
import { ISdtfWriteableAccessor } from "./ISdtfWriteableAccessor"
import { ISdtfWriteableAttributes } from "./ISdtfWriteableAttributes"
import { ISdtfBaseWriteableComponent, SdtfWriteableBase } from "./ISdtfBaseWriteableComponent"
import { ISdtfWriteableTypeHint } from "./ISdtfWriteableTypeHint"

/** Representation of a [sdTF data item](https://github.com/shapediver/sdTF/tree/development/specification/1.0#data-items). */
export interface ISdtfWriteableDataItem extends ISdtfBaseWriteableComponent,
    Omit<SdtfWriteableBase<ISdtfDataItem>, "accessor" | "attributes" | "typeHint"> {

    /** Referenced accessor to binary data. */
    accessor?: ISdtfWriteableAccessor

    /** Referenced attributes of this data item. */
    attributes?: ISdtfWriteableAttributes

    /** The type hint of the referenced accessor or value. */
    typeHint?: ISdtfWriteableTypeHint

    /** Additional custom properties are allowed. */
    additionalProperties: Record<string, unknown>

}
