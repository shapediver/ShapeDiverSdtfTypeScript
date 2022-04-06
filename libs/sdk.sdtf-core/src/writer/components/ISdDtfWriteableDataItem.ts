import { ISdDtfDataItem } from "../../structure/components/ISdDtfDataItem"
import { ISdDtfWriteableAccessor } from "./ISdDtfWriteableAccessor"
import { ISdDtfWriteableAttributes } from "./ISdDtfWriteableAttributes"
import { ISdDtfBaseWriteableComponent, SdDtfWriteableBase } from "./ISdDtfBaseWriteableComponent"
import { ISdDtfWriteableTypeHint } from "./ISdDtfWriteableTypeHint"

/** Representation of a [sdTF data item](https://github.com/shapediver/sdTF/tree/development/specification/1.0#data-items). */
export interface ISdDtfWriteableDataItem extends ISdDtfBaseWriteableComponent,
    Omit<SdDtfWriteableBase<ISdDtfDataItem>, "accessor" | "attributes" | "typeHint"> {

    /** Referenced accessor to binary data. */
    accessor?: ISdDtfWriteableAccessor

    /** Referenced attributes of this data item. */
    attributes?: ISdDtfWriteableAttributes

    /** The type hint of the referenced accessor or value. */
    typeHint?: ISdDtfWriteableTypeHint

    /** Additional custom properties are allowed. */
    additionalProperties: Record<string, unknown>

}
