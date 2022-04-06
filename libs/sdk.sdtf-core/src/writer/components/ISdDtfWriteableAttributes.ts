import { ISdDtfAttribute, ISdDtfAttributes } from "../../structure/components/ISdDtfAttributes"
import { ISdDtfWriteableAccessor } from "./ISdDtfWriteableAccessor"
import { ISdDtfBaseWriteableComponent, SdDtfWriteableBase } from "./ISdDtfBaseWriteableComponent"
import { ISdDtfWriteableTypeHint } from "./ISdDtfWriteableTypeHint"

/** Representation of a [sdTF attributes](https://github.com/shapediver/sdTF/tree/development/specification/1.0#attributes-1). */
export interface ISdDtfWriteableAttributes extends ISdDtfBaseWriteableComponent,
    Omit<SdDtfWriteableBase<ISdDtfAttributes>, "entries"> {

    entries: Record<string, ISdDtfWriteableAttribute>

}

/** The value of a single attributes dictionary key */
export interface ISdDtfWriteableAttribute extends Omit <ISdDtfAttribute, "toJson" | "accessor" | "typeHint"> {

    /** Referenced accessor to binary data. */
    accessor?: ISdDtfWriteableAccessor

    /** The type hint of the referenced accessor or value. */
    typeHint?: ISdDtfWriteableTypeHint,

}
