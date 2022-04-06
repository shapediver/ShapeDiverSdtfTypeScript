import { ISdDtfAccessor } from "../../structure/components/ISdDtfAccessor"
import { ISdDtfBaseWriteableComponent, SdDtfWriteableBase } from "./ISdDtfBaseWriteableComponent"
import { ISdDtfWriteableBufferView } from "./ISdDtfWriteableBufferView"

/** Representation of a [sdTF accessor](https://github.com/shapediver/sdTF/tree/development/specification/1.0#accessor). */
export interface ISdDtfWriteableAccessor extends ISdDtfBaseWriteableComponent,
    Omit<SdDtfWriteableBase<ISdDtfAccessor>, "bufferView"> {

    /** The referenced buffer view. */
    bufferView?: ISdDtfWriteableBufferView

    /** Additional custom properties are allowed. */
    additionalProperties: Record<string, unknown>

}
