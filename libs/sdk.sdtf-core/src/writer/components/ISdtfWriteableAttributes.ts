import { ISdtfAttribute, ISdtfAttributes } from "../../structure/components/ISdtfAttributes"
import { ISdtfWriteableAccessor } from "./ISdtfWriteableAccessor"
import { ISdtfBaseWriteableComponent, SdtfWriteableBase } from "./ISdtfBaseWriteableComponent"
import { ISdtfWriteableTypeHint } from "./ISdtfWriteableTypeHint"

/** Representation of a [sdTF attributes](https://github.com/shapediver/sdTF/tree/development/specification/1.0#attributes-1). */
export interface ISdtfWriteableAttributes extends ISdtfBaseWriteableComponent,
    Omit<SdtfWriteableBase<ISdtfAttributes>, "entries"> {

    entries: Record<string, ISdtfWriteableAttribute>

}

/** The value of a single attributes dictionary key */
export interface ISdtfWriteableAttribute extends Omit <ISdtfAttribute, "toJson" | "accessor" | "typeHint"> {

    /** Referenced accessor to binary data. */
    accessor?: ISdtfWriteableAccessor

    /** The type hint of the referenced accessor or value. */
    typeHint?: ISdtfWriteableTypeHint,

}
